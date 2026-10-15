import { http } from './http';

export function login(email, password) {
  return http.post('/auth/login', { email, password });
}

export function getCurrentUser() {
  return http.get('/auth/me');
}
