import { API_BASE_URL, REQUEST_TIMEOUT_MS } from '../config/api';

const NETWORK_ERROR_MESSAGE = 'Impossible de joindre le serveur. Vérifiez votre connexion.';
const DEFAULT_ERROR_MESSAGE = 'Une erreur inattendue est survenue.';

let authToken = null;
let unauthorizedHandler = null;

// Token ajouté automatiquement aux requêtes suivantes
export function setAuthToken(token) {
  authToken = token;
}

// Appelé quand le serveur refuse un token (expiré ou invalide)
export function setUnauthorizedHandler(handler) {
  unauthorizedHandler = handler;
}

function buildHeaders(hasBody) {
  const headers = { Accept: 'application/json' };

  if (hasBody) {
    headers['Content-Type'] = 'application/json';
  }
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }
  return headers;
}

async function fetchWithTimeout(url, options) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } catch {
    throw new Error(NETWORK_ERROR_MESSAGE);
  } finally {
    clearTimeout(timeoutId);
  }
}

// 204 et corps vide renvoient null ; un corps non JSON est ignoré
async function parseResponseBody(response) {
  if (response.status === 204) {
    return null;
  }

  const text = await response.text();
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function createHttpError(status, body) {
  const error = new Error(body?.message || DEFAULT_ERROR_MESSAGE);
  error.status = status;
  return error;
}

async function request(path, { method = 'GET', body } = {}) {
  const hasBody = body !== undefined;
  const response = await fetchWithTimeout(`${API_BASE_URL}${path}`, {
    method,
    headers: buildHeaders(hasBody),
    body: hasBody ? JSON.stringify(body) : undefined,
  });
  const data = await parseResponseBody(response);

  if (!response.ok) {
    if (response.status === 401 && authToken && unauthorizedHandler) {
      unauthorizedHandler();
    }
    throw createHttpError(response.status, data);
  }
  return data;
}

export const http = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body }),
  delete: (path) => request(path, { method: 'DELETE' }),
};
