<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 py-16 px-6 relative overflow-hidden">
    <!-- Decorative Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-20 left-20 w-32 h-32 bg-white bg-opacity-10 rounded-full animate-float"></div>
      <div class="absolute top-40 right-32 w-24 h-24 bg-white bg-opacity-15 rounded-full animate-float-delayed"></div>
      <div class="absolute bottom-32 left-40 w-28 h-28 bg-white bg-opacity-8 rounded-full animate-float-slow"></div>
      <div class="absolute bottom-20 right-20 w-20 h-20 bg-white bg-opacity-20 rounded-full animate-float-fast"></div>
    </div>
    
    <div class="max-w-5xl mx-auto relative z-10">
      
      <!-- Messaggio per utenti non autenticati - Migliorato -->
      <div v-if="!isAuthenticated" class="card-enhanced text-center p-12 mt-16 backdrop-blur-md">
        <div class="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
        </div>
        <h2 class="text-3xl font-bold text-gray-800 mb-6">🔐 Accesso Richiesto</h2>
        <p class="text-gray-600 mb-8 text-lg leading-relaxed">Per creare una segnalazione è necessario effettuare il login al sistema</p>
        <router-link to="/login" class="btn-enhanced btn-primary-enhanced inline-flex items-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
          </svg>
          Vai al Login
        </router-link>
      </div>

      <!-- Form per creazione segnalazione (solo autenticati) - Migliorato -->
      <div v-if="isAuthenticated">
        <div class="text-center mb-16 animate-fade-in-up">
          <div class="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-indigo-100 bg-clip-text text-transparent mb-4">📝 Fai una Segnalazione</h1>
          <p class="text-indigo-100 mt-4 text-xl leading-relaxed max-w-3xl mx-auto">Aiuta a rendere Trento più sicura segnalando problemi o situazioni critiche nella tua zona</p>
        </div>

        <!-- Messaggio di conferma - Migliorato -->
        <div v-if="successMessage" class="success-message-enhanced mb-8">
          <div class="flex items-center justify-center">
            <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <div class="font-bold text-lg">✅ {{ successMessage }}</div>
              <div v-if="report.category" class="mt-1 text-sm font-medium opacity-90">Categoria: {{ report.category }}</div>
            </div>
          </div>
        </div>

        <!-- Form Segnalazione - Migliorato -->
        <div class="card-enhanced mb-12 animate-fade-in-up backdrop-blur-md" style="animation-delay: 0.1s">
          <div class="flex items-center mb-8">
            <div class="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-800">📋 Dettagli Segnalazione</h2>
          </div>
          
          <form @submit.prevent="submitReport" class="space-y-8">
            <!-- Titolo - Migliorato -->
            <div class="form-group-enhanced">
              <label class="label-enhanced">📌 Titolo*</label>
              <input 
                v-model="report.title"
                type="text" 
                required
                class="input-field-enhanced"
                placeholder="Breve descrizione del problema (es. Buca pericolosa, Illuminazione guasta...)"
              />
            </div>

            <!-- Descrizione - Migliorata -->
            <div class="form-group-enhanced">
              <label class="label-enhanced">📝 Descrizione*</label>
              <textarea 
                v-model="report.description"
                required
                rows="5"
                class="input-field-enhanced"
                placeholder="Descrivi in dettaglio il problema, quando è stato notato, eventuali rischi..."
              ></textarea>
            </div>

            <!-- Categoria - Migliorata -->
            <div class="form-group-enhanced">
              <label class="label-enhanced">🏷️ Categoria*</label>
              <select 
                v-model="report.category"
                required
                class="input-field-enhanced"
              >
                <option value="" disabled selected>Seleziona una categoria</option>
                <option value="Sicurezza">🚨 Sicurezza</option>
                <option value="Infrastrutture">🏗️ Infrastrutture</option>
                <option value="Ambiente">🌱 Ambiente</option>
                <option value="Traffico">🚦 Traffico</option>
                <option value="Altro">📋 Altro</option>
              </select>
            </div>

            <!-- Posizione - Migliorata -->
            <div class="form-group-enhanced">
              <label class="label-enhanced">📍 Posizione*</label>
              <div class="space-y-4">
                <button type="button" @click="openMapPopup" class="btn-enhanced btn-primary-enhanced w-full flex items-center justify-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7"></path>
                  </svg>
                  🗺️ Scegli Posizione sulla Mappa
                </button>
                <div class="text-center">
                  <span class="text-gray-500 text-sm">oppure</span>
                </div>
                <button type="button" @click="getCurrentLocation" class="btn-enhanced btn-secondary-enhanced w-full flex items-center justify-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  📱 Usa la Mia Posizione Attuale
                </button>
                
                <div v-if="report.lat && report.lng" class="location-status success">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  ✅ Posizione selezionata: {{ report.lat }}, {{ report.lng }}
                </div>
                <div v-else class="location-status error">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  ⚠️ Nessuna posizione selezionata
                </div>
              </div>
            </div>

            <!-- Pop-up Mappa - Migliorato -->
            <div v-if="showMapPopup" class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div class="bg-white/95 backdrop-blur-md rounded-3xl p-8 w-full max-w-4xl mx-4 shadow-2xl border-2 border-white/30">
                <div class="flex justify-between items-center mb-6">
                  <h2 class="text-2xl font-bold text-gray-800 flex items-center">
                    <div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7"></path>
                      </svg>
                    </div>
                    🗺️ Scegli Posizione sulla Mappa
                  </h2>
                  <button @click="closeMapPopup" class="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-all duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div id="map-popup" class="h-[28rem] w-full rounded-2xl border-4 border-indigo-200 mb-6 shadow-xl"></div>
                <div class="flex justify-end">
                  <button @click="confirmLocation" class="btn-enhanced btn-primary-enhanced flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    ✅ Conferma Posizione
                  </button>
                </div>
              </div>
            </div>

            <button type="submit" class="btn-enhanced btn-primary-enhanced w-full text-lg py-4 flex items-center justify-center">
              <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
              🚀 Invia Segnalazione
            </button>
          </form>
        </div>
      </div>

      <!-- Dettaglio Segnalazione come Pop-up - Migliorato -->
      <div v-if="showReportDetails" class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
        <div class="card-enhanced animate-scale-in max-w-4xl w-full max-h-[85vh] overflow-y-auto backdrop-blur-md relative">
          <div class="flex justify-between items-center mb-8 sticky top-0 bg-white/95 backdrop-blur-md z-10 p-6 rounded-t-3xl border-b-2 border-gray-100">
            <h2 class="text-3xl font-bold text-gray-800 flex items-center">
              <div class="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              📋 Dettaglio Segnalazione
            </h2>
            <button @click="showReportDetails = false" class="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div v-if="currentReport" class="space-y-8 p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="col-span-2">
                <label class="label-enhanced">📌 Titolo</label>
                <div class="input-field-display">{{ currentReport.title }}</div>
              </div>
              <div>
                <label class="label-enhanced">🏷️ Categoria</label>
                <div class="input-field-display">{{ currentReport.category }}</div>
              </div>
              <div>
                <label class="label-enhanced">📅 Data</label>
                <div class="input-field-display">{{ formatDate(currentReport.date) }}</div>
              </div>
              <div>
                <label class="label-enhanced">📊 Stato</label>
                <div class="input-field-display">{{ currentReport.status }}</div>
              </div>
              <div>
                <label class="label-enhanced">👤 Segnalato da</label>
                <div class="input-field-display">{{ currentReport.user }}</div>
              </div>
            </div>
            <div>
              <label class="label-enhanced">📝 Descrizione</label>
              <div class="input-field-display min-h-[120px] leading-relaxed">{{ currentReport.description }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Ultime Segnalazioni - Migliorato -->
      <div class="card-enhanced animate-fade-in-up backdrop-blur-md" style="animation-delay: 0.2s">
        <div class="flex items-center mb-8">
          <div class="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-gray-800">📋 Ultime Segnalazioni degli Utenti</h2>
        </div>
        
        <div v-if="loading" class="text-center py-16">
          <div class="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p class="text-indigo-600 font-bold text-lg">⏳ Caricamento segnalazioni...</p>
        </div>
        
        <div v-else-if="reports.length === 0" class="text-center py-16">
          <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
            </svg>
          </div>
          <p class="text-gray-500 font-bold text-lg">📭 Nessuna segnalazione recente</p>
          <p class="text-gray-400 text-sm mt-2">Le nuove segnalazioni appariranno qui</p>
        </div>
        
        <div v-else class="space-y-6">
          <div 
            v-for="(report, index) in reports" 
            :key="report.id"
            class="report-card-enhanced group cursor-pointer animate-fade-in-up transform transition-all duration-300 hover:scale-[1.02]"
            :style="{ animationDelay: `${0.1 * index}s` }"
            @click="fetchReportDetails(report.id)"
          >
            <div class="flex justify-between items-start mb-4">
              <div class="flex-1">
                <h3 class="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors mb-2">📌 {{ report.title }}</h3>
                <div class="flex items-center space-x-3">
                  <span class="category-badge">🏷️ {{ report.category }}</span>
                  <span class="date-badge">📅 {{ formatDate(report.date) }}</span>
                </div>
              </div>
              <span :class="statusClassesEnhanced(report.status)" class="status-badge">
                {{ getStatusIcon(report.status) }} {{ report.status }}
              </span>
            </div>
            <p class="text-gray-600 leading-relaxed mb-4 text-base">{{ report.description }}</p>
            <div class="flex items-center">
              <div class="w-10 h-10 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <span class="text-sm font-medium text-gray-700">👤 {{ report.user }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/utils/api';
import { isAuthenticated } from '@/utils/auth';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'SegnalazioniView',
  setup() {
    const route = useRoute();
    const successMessage = ref('');
    const report = ref({
      title: '',
      description: '',
      category: '',
      lat: '',
      lng: ''
    });
    
    const reports = ref([]);
    const currentReport = ref(null);
    const showReportDetails = ref(false);
    const loading = ref(true);
    const showMapPopup = ref(false);
    const tempLat = ref('');
    const tempLng = ref('');
    
    let map;
    let selectedMarker = null;

    async function fetchReports() {
      try {
        loading.value = true;
        const response = await api.get('/reports');
        reports.value = response.data.map(report => ({
          id: report._id,
          title: report.title,
          description: report.description,
          category: report.tags,
          status: report.status || 'pending',
          date: report.createdAt,
          user: report.organization?.name || 
                (report.user && report.userPhone ? report.user : 'Utente')
        }));
      } catch (error) {
        console.error('Error fetching reports:', error);
        reports.value = [];
      } finally {
        loading.value = false;
      }
    }

    async function fetchReportDetails(id) {
      try {
        loading.value = true;
        const response = await api.get(`/reports/${id}`);
        currentReport.value = {
          id: response.data._id,
          title: response.data.title,
          description: response.data.description,
          category: response.data.tags,
          status: response.data.status || 'pending',
          date: response.data.createdAt,
          user: (response.data.user && response.data.userPhone ? response.data.user : 'Utente')
        };
        showReportDetails.value = true;
      } catch (error) {
        console.error('Error fetching report details:', error);
      } finally {
        loading.value = false;
      }
    }

    async function submitReport() {
      const token = sessionStorage.getItem('authToken');
      
      const payload = {
        reportData: {
          title: report.value.title,
          description: report.value.description,
          tags: report.value.category,
          location: {
            lat: parseFloat(report.value.lat),
            lng: parseFloat(report.value.lng)
          }
        }
      };

      try {
        await api.post('/reports', payload, {
          headers: { Authorization: `Bearer ${token}` }
        });

        successMessage.value = "Segnalazione inviata con successo!";
        
        report.value = {
          title: '',
          description: '',
          category: '',
          lat: '',
          lng: ''
        };
        
        await fetchReports();
      } catch (error) {
        console.error('Error creating report:', error);
        successMessage.value = "Errore durante l'invio della segnalazione. Riprova.";
      }
      
      setTimeout(() => successMessage.value = '', 4000);
    }

    function getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          report.value.lat = pos.coords.latitude.toFixed(6);
          report.value.lng = pos.coords.longitude.toFixed(6);
          alert('Posizione attuale acquisita con successo');
        }, err => {
          alert('Impossibile ottenere la posizione');
        });
      } else {
        alert('Geolocalizzazione non supportata dal browser');
      }
    }
    
    function formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('it-IT', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    
    function statusClasses(status) {
      switch (status) {
        case 'pending':
          return 'bg-yellow-100 text-yellow-800';
        case 'in-progress':
          return 'bg-blue-100 text-blue-800';
        case 'completed':
          return 'bg-green-100 text-green-800';
        case 'rejected':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    }

    // RIMUOVI tutto questo codice che è fuori posto:
    // Rimuovi tutto questo codice che è fuori posto:
    // Aggiungi questi metodi nel setup()
    function statusClassesEnhanced(status) {
      // ... tutto il codice fino alla fine
    };

    function getStatusIcon(status) {
      switch (status) {
        case 'pending': return '⏳';
        case 'in-progress': return '🔄';
        case 'completed': return '✅';
        case 'rejected': return '❌';
        default: return '📋';
      }
    }

    function openMapPopup() {
      showMapPopup.value = true;
      setTimeout(() => {
        initMapPopup();
      }, 100);
    }

    function closeMapPopup() {
      showMapPopup.value = false;
    }

    function confirmLocation() {
      if (tempLat.value && tempLng.value) {
        report.value.lat = tempLat.value;
        report.value.lng = tempLng.value;
      }
      showMapPopup.value = false;
    }

    function initMapPopup() {
      map = L.map('map-popup');
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          map.setView([lat, lng], 13);
          L.marker([lat, lng]).addTo(map)
            .bindPopup('Sei qui')
            .openPopup();
        }, err => {
          console.error('Errore geolocalizzazione:', err);
          map.setView([46.0667, 11.1167], 13);
        });
      } else {
        map.setView([46.0667, 11.1167], 13);
      }

      map.on('click', function(e) {
        if (selectedMarker) {
          map.removeLayer(selectedMarker);
        }
        tempLat.value = e.latlng.lat.toFixed(6);
        tempLng.value = e.latlng.lng.toFixed(6);
        const redIcon = L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34]
        });
        selectedMarker = L.marker([e.latlng.lat, e.latlng.lng], { icon: redIcon }).addTo(map)
          .bindPopup('Posizione selezionata')
          .openPopup();
      });
    }

    function handleReportUpdated() {
      fetchReports();
    }

    onMounted(async () => {
      if (route.params.id) {
        await fetchReportDetails(route.params.id);
      } else {
        await fetchReports();
      }
      
      window.addEventListener('report-updated', handleReportUpdated);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('report-updated', handleReportUpdated);
    });

    watch(() => route.params.id, async (newId) => {
      if (newId) {
        await fetchReportDetails(newId);
      } else {
        showReportDetails.value = false;
        await fetchReports();
      }
    });

    return {
      isAuthenticated,
      successMessage,
      report,
      submitReport,
      getCurrentLocation,
      reports,
      currentReport,
      showReportDetails,
      loading,
      formatDate,
      statusClasses,
      statusClassesEnhanced,  // Aggiungi questa
      getStatusIcon,          // Aggiungi questa
      fetchReportDetails,
      showMapPopup,
      openMapPopup,
      closeMapPopup,
      confirmLocation
    };
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

* {
  font-family: 'Inter', sans-serif;
}

/* Card Styles Enhanced */
.card-enhanced {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 25px rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  margin-bottom: 2rem;
  transition: all 0.4s ease;
}

.card-enhanced:hover {
  transform: translateY(-5px);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.2), 0 12px 35px rgba(0, 0, 0, 0.15);
}

/* Button Styles Enhanced */
.btn-enhanced {
  padding: 1rem 2rem;
  border-radius: 16px;
  font-weight: 700;
  font-size: 1rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  text-transform: none;
  letter-spacing: 0.5px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  transform: translateY(0);
}

.btn-primary-enhanced {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.btn-primary-enhanced:hover {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%);
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(99, 102, 241, 0.4);
}

.btn-secondary-enhanced {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%);
  color: #4f46e5;
  border: 2px solid rgba(99, 102, 241, 0.3);
}

.btn-secondary-enhanced:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(241, 245, 249, 1) 100%);
  border-color: rgba(99, 102, 241, 0.6);
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(99, 102, 241, 0.2);
}

/* Form Styles Enhanced */
.form-group-enhanced {
  margin-bottom: 2rem;
}

.label-enhanced {
  display: block;
  color: #374151;
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 0.75rem;
  letter-spacing: 0.5px;
}

.input-field-enhanced {
  width: 100%;
  padding: 1rem 1.5rem;
  border-radius: 16px;
  border: 2px solid #e5e7eb;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%);
  backdrop-filter: blur(10px);
}

.input-field-enhanced:focus {
  border-color: #6366f1;
  outline: none;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1), 0 8px 25px rgba(99, 102, 241, 0.15);
  background: rgba(255, 255, 255, 0.95);
  transform: translateY(-2px);
}

.input-field-display {
  padding: 1rem 1.5rem;
  border-radius: 16px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border: 2px solid #e5e7eb;
  font-weight: 500;
  color: #374151;
}

/* Location Status */
.location-status {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  border-radius: 16px;
  font-weight: 600;
  font-size: 0.9rem;
}

.location-status.success {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  color: #065f46;
  border: 2px solid #10b981;
}

.location-status.error {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  color: #991b1b;
  border: 2px solid #ef4444;
}

/* Success Message Enhanced */
.success-message-enhanced {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  color: #065f46;
  border-radius: 20px;
  padding: 1.5rem 2rem;
  text-align: center;
  animation: slideInFromTop 0.6s ease-out, fadeOutDelayed 5s forwards;
  font-weight: 600;
  border: 2px solid #10b981;
  box-shadow: 0 10px 30px rgba(16, 185, 129, 0.2);
}

/* Report Card Enhanced */
.report-card-enhanced {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%);
  backdrop-filter: blur(15px);
  border: 2px solid rgba(229, 231, 235, 0.8);
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.4s ease;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
}

.report-card-enhanced:hover {
  border-color: rgba(99, 102, 241, 0.4);
  box-shadow: 0 20px 50px rgba(99, 102, 241, 0.15);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(249, 250, 251, 0.95) 100%);
}

/* Badge Styles */
.category-badge {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  color: #1e40af;
  font-size: 0.8rem;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-weight: 600;
  border: 1px solid #3b82f6;
}

.date-badge {
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  color: #374151;
  font-size: 0.8rem;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-weight: 600;
  border: 1px solid #9ca3af;
}

.status-badge {
  font-size: 0.8rem;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-weight: 700;
  border: 2px solid;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Enhanced Animations */
@keyframes fadeInFromTop {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInFromTop {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes fadeOutDelayed {
  0%, 80% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.95); }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes float {
  0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.8; }
  50% { transform: translateY(-25px) translateX(20px) rotate(180deg); opacity: 0.4; }
  100% { transform: translateY(0) translateX(0) rotate(360deg); opacity: 0.8; }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 1s ease-out forwards;
}

.animate-scale-in {
  animation: scale-in 0.4s ease-out forwards;
}

.animate-float {
  animation: float 12s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float 14s ease-in-out infinite 2s;
}

.animate-float-slow {
  animation: float 18s ease-in-out infinite;
}

.animate-float-fast {
  animation: float 10s ease-in-out infinite;
}

/* Responsive Design */
@media (max-width: 768px) {
  .card-enhanced {
    padding: 2rem 1.5rem;
    margin: 1rem;
  }
  
  .btn-enhanced {
    padding: 0.875rem 1.5rem;
    font-size: 0.9rem;
  }
}
</style>