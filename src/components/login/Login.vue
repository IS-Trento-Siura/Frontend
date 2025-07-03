<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500">
    <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg relative">

      <!-- Notification -->
      <div 
        v-if="notification.message"
        :class="[
          'notification fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-md flex items-center space-x-3 font-semibold max-w-md w-full z-50',
          notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        ]"
      >
        <span class="icon">
          <svg v-if="notification.type === 'success'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </span>
        <span>{{ notification.message }}</span>
      </div>

      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Accedi a TrentoSicura</h1>
        <p class="text-gray-600">Gestione della sicurezza cittadina</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            v-model="email"
            type="email"
            required
            @input="clearError"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="nome@esempio.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            v-model="password"
            type="password"
            required
            @input="clearError"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="••••••••"
          />
        </div>

        <div v-if="errorMessage" class="text-red-500 text-center bg-red-50 py-2 px-4 rounded-lg mb-4">
          {{ errorMessage }}
        </div>

        <button type="submit" class="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
          Accedi
        </button>

        <div class="text-center text-sm text-gray-600 mt-6">
          Non hai un account? 
          <router-link 
            :to="{ name: 'registrazione' }" 
            class="text-blue-600 font-medium hover:underline">
            Registrati
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from '@/utils/api';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      notification: {
        message: '',
        type: '',
      },
    };
  },
  methods: {
    clearError() {
      this.errorMessage = '';
    },
    showNotification(type, message) {
      this.notification.type = type;
      this.notification.message = message;

      setTimeout(() => {
        this.notification.message = '';
        this.notification.type = '';
      }, 2000);
    },
    async handleLogin() {
      this.clearError();
      try {
        const response = await api.post('/users/session', {
          email: this.email,
          password: this.password,
        });

        if (response.status === 200) {
          this.showNotification('success', 'Login effettuato con successo!');
          
          // Salva i dati utente in sessionStorage
          sessionStorage.setItem('userData', JSON.stringify(response.data.user));
          
          // Salva il token in localStorage per l'autenticazione
          localStorage.setItem('authToken', response.data.token);
          
          // Aspetta 1 secondo e poi fai redirect a mappa.vue
          setTimeout(() => {
              window.location.href = '/mappa';
            }, 1000);

        } else {
          this.errorMessage = 'Credenziali non valide';
        }
      } catch (error) {
        if (error.response && error.response.data) {
          this.errorMessage = error.response.data.message || 'Errore nel login';
        } else {
          this.errorMessage = 'Errore di rete: ' + error.message;
        }
        console.error('Login error:', error);
      }
    },
  },
};
</script>

<style>
.notification {
  opacity: 0;
  animation: fadeInOut 3s forwards;
  z-index: 1000;
  box-sizing: border-box;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
    transform: translate(-50%, -20px);
  }
  10%, 90% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -20px);
  }
}
</style>
