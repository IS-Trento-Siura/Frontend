import { ref } from 'vue';

export const isAuthenticated = ref(!!localStorage.getItem('authToken'));

export function login(token) {
  localStorage.setItem('authToken', token);
  isAuthenticated.value = true;
}

export function logout() {
  localStorage.removeItem('authToken');
  isAuthenticated.value = false;
}
