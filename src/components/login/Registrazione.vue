<template>
  <div class="min-h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 flex justify-center items-center">
    <div class="bg-white p-10 rounded-xl shadow-lg max-w-lg w-full space-y-6 relative">

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

      <!-- Selezione tipo di registrazione -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium text-gray-700 text-center">Seleziona il tipo di account</h3>
        <div class="grid grid-cols-2 gap-4">
          <button
            type="button"
            @click="setAccountType('private')"
            :class="[
              'p-4 border-2 rounded-lg transition-all duration-300 text-center',
              accountType === 'private' 
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                : 'border-gray-300 hover:border-gray-400 text-gray-700'
            ]"
          >
            <div class="flex flex-col items-center space-y-2">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span class="font-medium">Privato</span>
              <span class="text-sm opacity-75">Cittadino</span>
            </div>
          </button>
          
          <button
            type="button"
            @click="setAccountType('organization')"
            :class="[
              'p-4 border-2 rounded-lg transition-all duration-300 text-center',
              accountType === 'organization' 
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                : 'border-gray-300 hover:border-gray-400 text-gray-700'
            ]"
          >
            <div class="flex flex-col items-center space-y-2">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span class="font-medium">Ente Pubblico</span>
              <span class="text-sm opacity-75">Organizzazione</span>
            </div>
          </button>
        </div>
      </div>

      <!-- Form di registrazione -->
      <form v-if="accountType" @submit.prevent="register" class="space-y-6">
        <!-- Campi comuni -->
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">Nome utente</label>
          <input
            type="text"
            id="username"
            v-model="formData.username"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            :placeholder="accountType === 'private' ? 'Es. Mario Rossi' : 'Es. Comune di Trento'"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            :placeholder="accountType === 'private' ? 'Es. mario@email.com' : 'Es. info@comune.trento.it'"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            v-model="formData.password"
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

        <!-- Campi specifici per ente pubblico -->
        <div v-if="accountType === 'organization'">
          <label for="phone" class="block text-sm font-medium text-gray-700">Telefono *</label>
          <input
            type="tel"
            id="phone"
            v-model="formData.phone"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Es. 0461123456"
          />
        </div>

        <div v-if="accountType === 'organization'">
          <label for="indirizzo" class="block text-sm font-medium text-gray-700">Indirizzo *</label>
          <input
            type="text"
            id="indirizzo"
            v-model="formData.indirizzo"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Es. Via Roma 1, 38122 Trento TN"
          />
        </div>

        <div v-if="accountType === 'organization'">
          <label for="descrizione" class="block text-sm font-medium text-gray-700">Descrizione *</label>
          <textarea
            id="descrizione"
            v-model="formData.descrizione"
            required
            rows="4"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-vertical"
            placeholder="Descrivi di cosa si occupa la tua organizzazione..."
          ></textarea>
        </div>

        <!-- Campi opzionali per privati -->
        <div v-if="accountType === 'private'">
          <label for="phonePrivate" class="block text-sm font-medium text-gray-700">Telefono (opzionale)</label>
          <input
            type="tel"
            id="phonePrivate"
            v-model="formData.phone"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Es. 3331234567"
          />
        </div>

        <div v-if="accountType === 'private'" class="flex items-center">
          <input
            type="checkbox"
            id="posizione"
            v-model="formData.posizione"
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label for="posizione" class="ml-2 block text-sm text-gray-700">
            Consenti la geolocalizzazione per segnalazioni più precise
          </label>
        </div>

        <div class="flex items-center justify-between">
          <button 
            type="submit" 
            :disabled="!accountType"
            class="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ accountType === 'private' ? 'Registrati come Cittadino' : 'Registrati come Ente Pubblico' }}
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
      accountType: '', // 'private' o 'organization'
      formData: {
        username: '',
        email: '',
        password: '',
        phone: '',
        indirizzo: '', // solo per organizzazioni
        descrizione: '', // solo per organizzazioni
        posizione: false // solo per privati
      },
      confirmPassword: '',
      notification: {
        message: '',
        type: '',
      },
    };
  },
  methods: {
    setAccountType(type) {
      this.accountType = type;
      // Reset form data when changing account type
      this.formData = {
        username: '',
        email: '',
        password: '',
        phone: '',
        indirizzo: '',
        descrizione: '',
        posizione: false
      };
      this.confirmPassword = '';
    },

    showNotification(type, message) {
      this.notification.type = type;
      this.notification.message = message;

      setTimeout(() => {
        this.notification.message = '';
        this.notification.type = '';
      }, 3000);
    },

    async register() {
      if (this.formData.password !== this.confirmPassword) {
        this.showNotification('error', "Le password non corrispondono");
        return;
      }

      // Validazione specifica per ente pubblico
      if (this.accountType === 'organization') {
        if (!this.formData.phone || !this.formData.indirizzo || !this.formData.descrizione) {
          this.showNotification('error', "Tutti i campi obbligatori devono essere compilati per gli enti pubblici");
          return;
        }
        
        // Validazione aggiuntiva per il telefono
        const phoneNumber = parseInt(this.formData.phone);
        if (isNaN(phoneNumber) || phoneNumber <= 0) {
          this.showNotification('error', "Il numero di telefono deve essere un numero valido");
          return;
        }
      }

      try {
        let endpoint, payload;
        
        if (this.accountType === 'private') {
          endpoint = '/users';
          payload = {
            username: this.formData.username,
            email: this.formData.email,
            password: this.formData.password,
            phone: this.formData.phone || undefined,
            posizione: this.formData.posizione
          };
        } else {
          endpoint = '/orgs';
          payload = {
            username: this.formData.username,
            email: this.formData.email,
            password: this.formData.password,
            phone: parseInt(this.formData.phone), // Ora è sicuro
            indirizzo: this.formData.indirizzo,
            descrizione: this.formData.descrizione
          };
        }

        const response = await api.post(endpoint, payload);

        if (response.status === 201) {
          const accountTypeText = this.accountType === 'private' ? 'cittadino' : 'ente pubblico';
          this.showNotification('success', `Registrazione come ${accountTypeText} effettuata con successo!`);
          
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
