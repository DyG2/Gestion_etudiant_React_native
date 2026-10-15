import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

import * as authService from '../services/auth.service';
import { setAuthToken, setUnauthorizedHandler } from '../services/http';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

const AuthContext = createContext(null);

async function readStoredSession() {
  const [token, serializedUser] = await Promise.all([
    SecureStore.getItemAsync(TOKEN_KEY),
    SecureStore.getItemAsync(USER_KEY),
  ]);
  return { token, user: serializedUser ? JSON.parse(serializedUser) : null };
}

async function saveSession(token, user) {
  await Promise.all([
    SecureStore.setItemAsync(TOKEN_KEY, token),
    SecureStore.setItemAsync(USER_KEY, JSON.stringify(user)),
  ]);
}

async function clearStoredSession() {
  await Promise.all([
    SecureStore.deleteItemAsync(TOKEN_KEY),
    SecureStore.deleteItemAsync(USER_KEY),
  ]);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isRestoring, setIsRestoring] = useState(true);

  // Synchronise l'état React et le client HTTP
  const applySession = useCallback((nextToken, nextUser) => {
    setAuthToken(nextToken);
    setToken(nextToken);
    setUser(nextUser);
  }, []);

  const login = useCallback(
    async (email, password) => {
      const session = await authService.login(email, password);
      await saveSession(session.token, session.user);
      applySession(session.token, session.user);
    },
    [applySession],
  );

  const logout = useCallback(async () => {
    applySession(null, null);
    await clearStoredSession();
  }, [applySession]);

  // Un token refusé par l'API ramène à l'écran de connexion
  useEffect(() => {
    setUnauthorizedHandler(logout);
    return () => setUnauthorizedHandler(null);
  }, [logout]);

  // Restauration de la session au démarrage
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const session = await readStoredSession();
        if (session.token) {
          applySession(session.token, session.user);
        }
      } catch {
        await clearStoredSession();
      } finally {
        setIsRestoring(false);
      }
    };

    restoreSession();
  }, [applySession]);

  const value = useMemo(
    () => ({ token, user, isRestoring, login, logout }),
    [token, user, isRestoring, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé à l’intérieur de AuthProvider');
  }
  return context;
}
