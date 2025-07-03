<template>
  <div class="min-h-screen bg-gradient-to-r from-blue-400 via-indigo-600 to-purple-700 py-12">
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
      deleting: false
    };
  },
  async mounted() {
    // Verifica se l'utente è autenticato
    this.isAuthenticated = !!localStorage.getItem('authToken');
    
    // Recupera i dati utente da sessionStorage
    const userData = sessionStorage.getItem('userData');
    console.log('userData in sessionStorage:', userData); // 👈 debug
    if (userData) {
      this.user = JSON.parse(userData);
      
      // Fetch user reports
      try {
        const token = localStorage.getItem('authToken');
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
      }
    }
  },
    methods: {
      confirmDeleteReport(reportId) {
        if (confirm('Sei sicuro di voler eliminare questa segnalazione? Questa azione è irreversibile.')) {
          this.deleteReport(reportId);
        }
      },
      
      async deleteReport(reportId) {
        try {
          const token = localStorage.getItem('authToken');
          await api.delete(`/reports/${reportId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          // Remove the deleted report from activities
          this.activities = this.activities.filter(activity => activity.id !== reportId);
        } catch (error) {
          console.error('Error deleting report:', error);
          alert(`Errore durante l'eliminazione: ${error.response?.data?.message || error.message}`);
        }
      },
      
      formatDate(dateString) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(dateString).toLocaleDateString('it-IT', options);
    },
    confirmDelete() {
      if (confirm('Sei sicuro di voler eliminare il tuo account? Questa azione è irreversibile e cancellerà tutti i tuoi dati.')) {
        this.deleteAccount();
      }
    },
    
    async deleteAccount() {
      this.deleting = true;
      try {
        // Chiamata API usando Axios con cookie automatici
        const response = await api.delete(`/users/${this.user._id}`);

        if (response.status === 200) {
          // Pulisci localStorage/sessionStorage come in logout()
          localStorage.removeItem('authToken');
          sessionStorage.removeItem('userData');

          // Redirect dopo un breve ritardo
          setTimeout(() => {
            window.location.href = '/';
          }, 1000);
        } else {
          alert(`Errore durante l'eliminazione dell'account: ${response.data.message || 'Errore sconosciuto'}`);
        }
      } catch (error) {
        console.error('Errore durante l\'eliminazione dell\'account:', error);
        alert(`Errore: ${error.response?.data?.message || error.message}`);
      } finally {
        this.deleting = false;
      }
    },

    
    async logout() {
      try {
        // No need for token in header since backend uses cookies
        const response = await api.post('/users/logout');

      if (response.status === 200) {
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('userData');
        setTimeout(() => {
              window.location.href = '/';
        }, 1000);
      } 
      else {
          alert(`Errore nel logout: ${response.data.message || 'Errore sconosciuto'}`);
        }
      } catch (error) {
        alert(`Errore nel logout: ${error.response?.data?.message || error.message}`);
      }
    },

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

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.card {
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  padding: 24px;
}

.btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: #3B82F6;
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #2563EB;
}

.btn-secondary {
  background-color: white;
  color: #3B82F6;
  border: 1px solid #3B82F6;
}

.btn-secondary:hover {
  background-color: #EFF6FF;
}

.btn-danger {
  background-color: #EF4444;
  color: white;
  border: none;
}

.btn-danger:hover {
  background-color: #DC2626;
}

.input-field {
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #D1D5DB;
  background-color: #F9FAFB;
  transition: all 0.2s ease;
}

.input-field:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}
</style>
