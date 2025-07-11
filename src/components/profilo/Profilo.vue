<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-400 via-indigo-600 to-purple-700 py-12">
    <!-- Notifica di successo stilizzata -->
    <div v-if="showSuccessNotification" class="fixed top-6 right-6 bg-gradient-to-r from-green-400 to-green-600 text-white px-8 py-4 rounded-xl shadow-2xl z-50 transform transition-all duration-300 ease-out animate-slide-in border border-green-300">
      <div class="flex items-center space-x-3">
        <div class="flex-shrink-0">
          <div class="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>
        <div class="flex-1">
          <p class="text-sm font-semibold">{{ successMessage }}</p>
        </div>
        <div class="flex-shrink-0">
          <button @click="showSuccessNotification = false" class="text-white hover:text-green-100 transition-colors duration-200">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Notifica di errore stilizzata -->
    <div v-if="showErrorNotification" class="fixed top-6 right-6 bg-gradient-to-r from-red-400 to-red-600 text-white px-8 py-4 rounded-xl shadow-2xl z-50 transform transition-all duration-300 ease-out animate-slide-in border border-red-300">
      <div class="flex items-center space-x-3">
        <div class="flex-shrink-0">
          <div class="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
        </div>
        <div class="flex-1">
          <p class="text-sm font-semibold">{{ errorMessage }}</p>
        </div>
        <div class="flex-shrink-0">
          <button @click="showErrorNotification = false" class="text-white hover:text-red-100 transition-colors duration-200">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Modale di Conferma Eliminazione Account -->
    <div v-if="showDeleteAccountModal" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all duration-300 ease-out scale-100">
        <div class="text-center">
          <div class="mx-auto bg-red-100 rounded-full h-20 w-20 flex items-center justify-center mb-6">
            <svg class="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">Elimina Account</h3>
          <p class="text-gray-600 mb-8">Sei sicuro di voler eliminare definitivamente il tuo account? Questa azione è irreversibile e comporterà la perdita di tutti i tuoi dati.</p>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <button @click="showDeleteAccountModal = false" class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition">
            Annulla
          </button>
          <button @click="deleteAccountConfirmed" :disabled="deleting" class="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed">
            <span v-if="deleting">Eliminazione...</span>
            <span v-else>Sì, elimina</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Modale di Conferma Eliminazione -->
    <div v-if="showConfirmModal" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all duration-300 ease-out scale-100">
        <div class="text-center">
          <div class="mx-auto bg-red-100 rounded-full h-16 w-16 flex items-center justify-center mb-6">
            <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">Sei sicuro?</h3>
          <p class="text-gray-600 mb-8">Vuoi davvero eliminare questa segnalazione? L'azione è irreversibile.</p>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <button @click="showConfirmModal = false" class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition">
            Annulla
          </button>
          <button @click="deleteReportConfirmed" class="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition">
            Sì, elimina
          </button>
        </div>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-6">

      <!-- Messaggio per utenti non autenticati -->
      <div v-if="!isAuthenticated" class="max-w-md mx-auto bg-white bg-opacity-90 rounded-xl shadow-lg p-10 mt-20 text-center">
        <h2 class="text-4xl font-extrabold text-gray-900 mb-4">Accesso Richiesto</h2>
        <p class="text-gray-700 mb-10 text-lg leading-relaxed">
          Per accedere a questa pagina devi prima effettuare il login.
        </p>
        <router-link
          to="/login"
          class="inline-block bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 text-white font-semibold py-3 px-10 rounded-lg shadow-md transition duration-300"
        >
          Vai alla pagina di login
        </router-link>
      </div>

      <!-- Contenuto per utenti autenticati -->
      <div v-else>

        <!-- Header -->
        <header class="text-center mb-12 animate-fade-in">
          <h1 class="text-4xl font-extrabold text-gray-100">Profilo Utente</h1>
          <p class="text-indigo-200 mt-2 text-lg">Gestisci il tuo profilo e visualizza le tue attività</p>
        </header>

        <!-- Profile Card -->
        <section class="bg-white rounded-xl shadow-lg p-8 mb-10 animate-fade-in" style="animation-delay: 0.1s;">
          <div class="flex flex-col md:flex-row items-center gap-8">
            
            <!-- Avatar -->
            <div class="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-6xl font-extrabold select-none">
              👤
            </div>
            
            <!-- User Info -->
            <div class="flex-1 w-full">
              <div class="flex justify-between items-start">
                <div>
                  <h2 class="text-3xl font-bold text-gray-900">{{ user.username }}</h2>
                  <p class="text-gray-600 mt-1">{{ user.email }}</p>
                </div>
                <router-link
                  to="/profilo/edit"
                  class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-md shadow-sm transition"
                >
                  Modifica
                </router-link>
              </div>

              <div class="mt-6 text-gray-700">
                <p class="text-sm">Registrato il</p>
                <p class="text-lg font-semibold">{{ formatDate(user.createdAt) }}</p>
              </div>
            </div>
          </div>
        </section>
        
        <!-- Recent Activity -->
        <section
          class="bg-white rounded-xl shadow-lg p-8 mb-10 animate-fade-in"
          style="animation-delay: 0.5s;"
        >
          <h2 class="text-3xl font-bold text-gray-900 mb-8">Attività Recenti</h2>

          <div class="divide-y divide-gray-200">
            <div
              v-for="(activity, index) in activities"
              :key="activity.id"
              class="flex flex-col md:flex-row items-start justify-between py-4 space-y-4 md:space-y-0 md:space-x-4"
            >
              <div class="flex items-center space-x-4 w-full md:w-auto">
                <div :class="activity.iconClass" class="rounded-full p-3 text-white flex items-center justify-center" style="min-width: 48px; min-height: 48px;">
                  <span class="text-2xl select-none">{{ activity.icon }}</span>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">{{ activity.title }}</h3>
                  <p class="text-gray-600">{{ activity.description }}</p>
                  <p class="text-sm text-gray-500 mt-1">{{ activity.date }}</p>
                </div>
              </div>
              <div class="flex space-x-3 mt-3 md:mt-0">
                <router-link
                  :to="'/segnalazioni/edit/' + activity.id"
                  class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-5 rounded-md shadow-sm transition"
                >
                  Modifica
                </router-link>
                <button
                  type="button"
                  @click="confirmDeleteReport(activity.id)"
                  class="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-5 rounded-md shadow-sm transition"
                >
                  Elimina
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Settings -->
        <section
          class="bg-white rounded-xl shadow-lg p-8 animate-fade-in"
          style="animation-delay: 0.6s;"
        >
          <h2 class="text-3xl font-bold text-gray-900 mb-8">Impostazioni</h2>

          <div class="space-y-8">
            <!-- Notifiche Email -->
            <div class="flex justify-between items-center">
              <div>
                <h3 class="font-semibold text-gray-900 text-lg">Notifiche Email</h3>
                <p class="text-gray-600">Ricevi aggiornamenti sulle tue segnalazioni</p>
              </div>
              <label class="relative inline-block w-12 h-7 cursor-pointer">
                <input type="checkbox" class="sr-only" checked />
                <span
                  class="block bg-gray-300 rounded-full h-7 w-12 transition-all duration-300 ease-in-out"
                ></span>
                <span
                  class="absolute left-1 top-1 bg-white w-5 h-5 rounded-full shadow-md transition-transform duration-300 ease-in-out transform"
                ></span>
              </label>
            </div>

            <!-- Notifiche Push -->
            <div class="flex justify-between items-center">
              <div>
                <h3 class="font-semibold text-gray-900 text-lg">Notifiche Push</h3>
                <p class="text-gray-600">Ricevi notifiche in tempo reale</p>
              </div>
              <label class="relative inline-block w-12 h-7 cursor-pointer">
                <input type="checkbox" class="sr-only" checked />
                <span
                  class="block bg-gray-300 rounded-full h-7 w-12 transition-all duration-300 ease-in-out"
                ></span>
                <span
                  class="absolute left-1 top-1 bg-white w-5 h-5 rounded-full shadow-md transition-transform duration-300 ease-in-out transform"
                ></span>
              </label>
            </div>
            
            <!-- Logout -->
            <div class="flex justify-between items-center">
              <div>
                <h3 class="font-semibold text-gray-900 text-lg">Logout</h3>
                <p class="text-gray-600">Esci dal tuo account</p>
              </div>
              <button
                type="button"
                @click="logout"
                class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-md shadow-sm transition"
              >
                Logout
              </button>
            </div>

            <!-- Elimina Account -->
            <div class="flex justify-between items-center mt-8">
              <div>
                <h3 class="font-extrabold text-red-700 text-xl">Elimina Account</h3>
                <p class="text-red-600">
                  Elimina definitivamente il tuo account e tutti i dati associati
                </p>
              </div>
              <button
                type="button"
                @click="confirmDelete"
                :disabled="deleting"
                class="border-2 border-red-700 text-red-700 font-extrabold py-2 px-6 rounded-md transition duration-300 hover:bg-red-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="deleting">Eliminazione in corso...</span>
                <span v-else>ELIMINA ACCOUNT</span>
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  </div>
</template>

<script>
import { logout } from '@/utils/auth'
import api from '@/utils/api';

export default {
  name: 'ProfiloView',
  data() {
    return {
      isAuthenticated: false,
      user: null,
      activities: [],
      deleting: false,
      showSuccessNotification: false,
      successMessage: '',
      showErrorNotification: false,
      errorMessage: '',
      showConfirmModal: false,
      reportToDeleteId: null,
      showDeleteAccountModal: false
    };
  },
  async mounted() {
    await this.initializeUser();
  },
  methods: {
    async initializeUser() {
      this.isAuthenticated = !!sessionStorage.getItem('authToken');
      const userData = sessionStorage.getItem('userData');
      
      if (userData) {
        this.user = JSON.parse(userData);
        await this.fetchUserReports();
      }
    },
    
    async fetchUserReports() {
      try {
        const token = sessionStorage.getItem('authToken');
        const response = await api.get('/reports/mine', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        this.activities = response.data.map(report => ({
          id: report._id,
          title: report.title,
          description: report.description,
          date: this.formatDate(report.createdAt),
          icon: '📝',
          iconClass: 'bg-blue-500'
        }));
      } catch (error) {
        console.error('Error fetching user reports:', error);
        this.showError('Errore nel caricamento delle segnalazioni');
      }
    },
    
    // Report management
    confirmDeleteReport(reportId) {
      this.reportToDeleteId = reportId;
      this.showConfirmModal = true;
    },
    
    deleteReportConfirmed() {
      this.deleteReport(this.reportToDeleteId);
      this.showConfirmModal = false;
      this.reportToDeleteId = null;
    },
    
    async deleteReport(reportId) {
      try {
        const token = sessionStorage.getItem('authToken');
        await api.delete(`/reports/${reportId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        this.activities = this.activities.filter(activity => activity.id !== reportId);
        this.showSuccess('Segnalazione eliminata con successo!');
        
      } catch (error) {
        console.error('Error deleting report:', error);
        this.showError(`Errore durante l'eliminazione: ${error.response?.data?.message || error.message}`);
      }
    },
    
    // Account management
    confirmDelete() {
      this.showDeleteAccountModal = true;
    },
    
    deleteAccountConfirmed() {
      this.showDeleteAccountModal = false;
      this.deleteAccount();
    },
    
    async deleteAccount() {
      try {
        this.deleting = true;
        const token = sessionStorage.getItem('authToken');
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        
        const endpoint = userData.descrizione ? `/orgs/${userData._id}` : `/users/${userData._id}`;
        
        await api.delete(endpoint, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        this.showSuccess('Account eliminato con successo!');
        
        setTimeout(() => {
          sessionStorage.clear();
          window.location.href = '/';
        }, 2000);
        
      } catch (error) {
        console.error('Errore durante l\'eliminazione dell\'account:', error);
        this.showError('Errore durante l\'eliminazione dell\'account. Riprova.');
      } finally {
        this.deleting = false;
      }
    },
    
    logout() {
      logout();
      sessionStorage.removeItem('userData');
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    },
    
    // Utility methods
    formatDate(dateString) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(dateString).toLocaleDateString('it-IT', options);
    },
    
    showSuccess(message) {
      this.successMessage = message;
      this.showSuccessNotification = true;
      setTimeout(() => {
        this.showSuccessNotification = false;
      }, 3000);
    },
    
    showError(message) {
      this.errorMessage = message;
      this.showErrorNotification = true;
      setTimeout(() => {
        this.showErrorNotification = false;
      }, 5000);
    }
  }
}
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #3B82F6;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

/* Animation classes */
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out forwards;
  opacity: 0;
}

/* Animazione migliorata per la notifica */
@keyframes slideIn {
  0% {
    transform: translateX(100%) scale(0.8);
    opacity: 0;
  }
  50% {
    transform: translateX(-10px) scale(1.05);
  }
  100% {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
}

.animate-slide-in {
  animation: slideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

/* Stili per i toggle switch (se necessari altrove, altrimenti si possono rimuovere) */
.relative.inline-block input:checked + span:last-child {
  transform: translateX(1.25rem); /* 20px */
}
.relative.inline-block input:checked + span:first-of-type {
  background-color: #4f46e5; /* indigo-600 */
}
</style>
