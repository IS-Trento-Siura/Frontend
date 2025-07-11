import {ref} from 'vue';

export const isAuthenticated = ref(!!sessionStorage.getItem('authToken'));

// Funzione per ottenere il tipo di account dell'utente
export function getUserAccountType() {
  const userData = sessionStorage.getItem('userData');
  if (userData) {
    const user = JSON.parse(userData);
    return user.accountType || 'user';
  }
  return null;
}

export function login(token) {
  sessionStorage.setItem('authToken', token);
  isAuthenticated.value = true;
}

export function logout() {
  sessionStorage.removeItem('authToken');
  sessionStorage.removeItem('userData');
  isAuthenticated.value = false;
}
