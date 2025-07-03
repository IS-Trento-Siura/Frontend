<template>
  <div class="min-h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 flex justify-center items-center">
    <div class="bg-white p-10 rounded-xl shadow-lg max-w-md w-full space-y-6 relative">

      <!-- Notification -->
      <div 
        v-if="notification.message"
        :class="[
          'notification fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-md flex items-center space-x-3 font-semibold max-w-md w-full',
          notification.type === 'success' ? 'bg-green-100 text-green-800 success-animation' : 'bg-red-100 text-red-800'
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

      <h2 class="text-3xl font-semibold text-center text-gray-800">Crea il tuo account</h2>

      <form @submit.prevent="register" class="space-y-6">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">Nome utente</label>
          <input
            type="text"
            id="username"
            v-model="username"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Es. Mario Rossi"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Es. email@dominio.com"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Conferma Password</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="••••••••"
          />
        </div>

        <div class="flex items-center justify-between">
          <button type="submit" class="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Registrati
          </button>
        </div>
      </form>

      <div class="text-center text-sm text-gray-600">
        Hai già un account? 
        <router-link to="/login" class="text-purple-600 hover:underline">Accedi</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/utils/api';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      notification: {
        message: '',
        type: '',
      },
    };
  },
  methods: {
    showNotification(type, message) {
      this.notification.type = type;
      this.notification.message = message;

      setTimeout(() => {
        this.notification.message = '';
        this.notification.type = '';
      }, 3000);
    },

    async register() {
      if (this.password !== this.confirmPassword) {
        this.showNotification('error', "Le password non corrispondono");
        return;
      }

      try {
        const response = await api.post('/users', {
          username: this.username,
          email: this.email,
          password: this.password,
        });

        if (response.status === 201) {
          this.showNotification('success', 'Registrazione effettuata con successo!');
          // aspetta 3 secondi prima di fare il redirect
          setTimeout(() => {
            this.$router.push('/login');
          }, 3000);
        }
      } catch (error) {
        this.showNotification('error', error.response?.data.message || 'Errore durante la registrazione');
      }
    }
  }
};
</script>

<style>
.notification {
  opacity: 0;
  animation: fadeInOut 3s forwards;
  z-index: 1000;
  box-sizing: border-box;
}

/* animazione fade in/out base */
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

/* animazione extra bounce solo per successo */
.success-animation {
  animation: fadeInOut 3s forwards, bounceIn 0.6s ease forwards;
  animation-delay: 0s, 0s;
}

@keyframes bounceIn {
  0% {
    transform: translate(-50%, -20px) scale(0.8);
    opacity: 0;
  }
  50% {
    transform: translate(-50%, 0) scale(1.2);
    opacity: 1;
  }
  70% {
    transform: translate(-50%, 0) scale(0.95);
  }
  100% {
    transform: translate(-50%, 0) scale(1);
  }
}
</style>
