<template>
  <div class="justify-center min-h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 py-12 px-4">
    <div class="max-w-4xl mx-auto">
      
      <!-- Messaggio per utenti non autenticati -->
      <div v-if="!isAuthenticated" class="card text-center p-8 mt-10">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Creazione segnalazione</h2>
        <p class="text-gray-600 mb-6">
          Effettua prima login
        </p>
        <router-link to="/login" class="btn btn-primary inline-block">Vai alla pagina di login</router-link>
      </div>

      <!-- Form per creazione segnalazione (solo autenticati) -->
      <div v-if="isAuthenticated">
        <!-- Titolo with animation -->
        <div class="text-center mb-10 animate-fade-in">
          <h1 class="text-3xl md:text-4xl font-bold text-gray-800">Fai una segnalazione</h1>
          <p class="text-gray-600 mt-2">Aiuta a rendere Trento più sicura segnalando problemi o situazioni critiche</p>
        </div>

        <!-- Messaggio di conferma -->
        <div v-if="successMessage" class="success-message mb-6">
          {{ successMessage }}
          <div v-if="report.category" class="mt-2 text-sm font-medium">Categoria: {{ report.category }}</div>
        </div>

        <!-- Form Segnalazione -->
        <div class="card mb-8 animate-fade-in" style="animation-delay: 0.1s">
          <form @submit.prevent="submitReport">
            <!-- Titolo -->
            <div class="mb-6">
              <label class="block text-gray-700 font-medium mb-2">Titolo*</label>
              <input 
                v-model="report.title"
                type="text" 
                required
                class="input-field"
                placeholder="Breve descrizione del problema"
              />
            </div>

            <!-- Descrizione -->
            <div class="mb-6">
              <label class="block text-gray-700 font-medium mb-2">Descrizione*</label>
              <textarea 
                v-model="report.description"
                required
                rows="4"
                class="input-field"
                placeholder="Descrivi in dettaglio il problema..."
              ></textarea>
            </div>

            <!-- Categoria -->
            <div class="mb-6">
              <label class="block text-gray-700 font-medium mb-2">Categoria</label>
              <select 
                v-model="report.category"
                required
                class="input-field"
              >
                <option value="" disabled selected>Seleziona una categoria</option>
                <option value="Sicurezza">Sicurezza</option>
                <option value="Infrastrutture">Infrastrutture</option>
                <option value="Ambiente">Ambiente</option>
                <option value="Traffico">Traffico</option>
                <option value="Altro">Altro</option>
              </select>
            </div>

            <!-- Immagine -->
            <div class="mb-6">
              <label class="block text-gray-700 font-medium mb-2">Carica un'immagine (opzionale)</label>
              <div class="flex items-center justify-center w-full">
                <label for="file-upload" class="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Clicca per caricare</span> o trascina qui</p>
                    <p class="text-xs text-gray-500">PNG, JPG (MAX. 5MB)</p>
                  </div>
                  <input id="file-upload" type="file" class="hidden" @change="handleFileUpload" accept="image/*" />
                </label>
              </div>
            </div>

            <!-- Posizione -->
            <div class="mb-8">
              <label class="block text-gray-700 font-medium mb-2">Posizione*</label>
              <div class="mt-2">
                <button type="button" @click="openMapPopup" class="btn btn-primary w-full mb-2 ">Scegli Posizione sulla Mappa</button>
                <p class="text-sm text-gray-500">Oppure <a href="#" class="text-blue-600 font-medium hover:underline" @click.prevent="getCurrentLocation">usa la mia posizione attuale</a></p>
                <div v-if="report.lat && report.lng" class="mt-2 text-sm text-green-600">Posizione selezionata: Lat {{ report.lat }}, Lng {{ report.lng }}</div>
                <div v-else class="mt-2 text-sm text-red-600">Nessuna posizione selezionata</div>
              </div>
            </div>

            <!-- Pop-up Mappa -->
            <div v-if="showMapPopup" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div class="bg-white rounded-xl p-6 w-full max-w-3xl mx-4">
                <div class="flex justify-between items-center mb-4">
                  <h2 class="text-xl font-bold text-gray-800">Scegli Posizione sulla Mappa</h2>
                  <button @click="closeMapPopup" class="text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div id="map-popup" class="h-96 w-full rounded-lg border border-gray-300 mb-4"></div>
                <div class="flex justify-end">
                  <button @click="confirmLocation" class="btn btn-primary">Conferma Posizione</button>
                </div>
              </div>
            </div>

            <!-- Bottone Invia -->
            <button 
              type="submit"
              class="btn btn-primary w-full"
            >
              Invia Segnalazione
            </button>
          </form>
        </div>
      </div>

      <!-- Dettaglio Segnalazione come Pop-up -->
      <div v-if="showReportDetails" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
        <div class="card animate-fade-in max-w-3xl w-full max-h-[80vh] overflow-y-auto mb-8 relative">
          <div class="flex justify-between items-center mb-6 sticky top-0 bg-white z-10 p-4">
            <h2 class="text-2xl font-bold text-gray-800">Dettaglio Segnalazione</h2>
            <button @click="showReportDetails = false" class="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div v-if="currentReport" class="space-y-6 p-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Titolo -->
              <div class="col-span-2">
                <label class="block text-gray-700 font-medium mb-2">Titolo</label>
                <div class="input-field bg-gray-50">{{ currentReport.title }}</div>
              </div>

              <!-- Categoria -->
              <div>
                <label class="block text-gray-700 font-medium mb-2">Categoria</label>
                <div class="input-field bg-gray-50">{{ currentReport.category }}</div>
              </div>

              <!-- Data -->
              <div>
                <label class="block text-gray-700 font-medium mb-2">Data</label>
                <div class="input-field bg-gray-50">{{ formatDate(currentReport.date) }}</div>
              </div>

              <!-- Stato -->
              <div>
                <label class="block text-gray-700 font-medium mb-2">Stato</label>
                <div class="input-field bg-gray-50">{{ currentReport.status }}</div>
              </div>

              <!-- Utente -->
              <div>
                <label class="block text-gray-700 font-medium mb-2">Segnalato da</label>
                <div class="input-field bg-gray-50">{{ currentReport.user }}</div>
              </div>
            </div>

            <!-- Descrizione -->
            <div>
              <label class="block text-gray-700 font-medium mb-2">Descrizione</label>
              <div class="input-field bg-gray-50 min-h-[100px]">{{ currentReport.description }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Ultime Segnalazioni (visibile a tutti) -->
      <div class="card animate-fade-in" style="animation-delay: 0.2s">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Ultime segnalazioni degli utenti</h2>
        
        <div v-if="loading" class="text-center py-8">
          <p>Caricamento segnalazioni...</p>
        </div>
        
        <div v-else-if="reports.length === 0" class="text-center py-8">
          <p>Nessuna segnalazione recente</p>
        </div>
        
        <div v-else class="space-y-4">
          <div 
            v-for="(report, index) in reports" 
            :key="report.id"
            class="border border-gray-200 rounded-xl p-5 hover:shadow-md transition animate-fade-in cursor-pointer"
            :style="{ animationDelay: `${0.1 * index}s` }"
            @click="fetchReportDetails(report.id)"
          >
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-lg font-bold text-gray-800">{{ report.title }}</h3>
                <div class="flex items-center mt-1">
                  <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">{{ report.category }}</span>
                  <span class="text-xs text-gray-500">{{ formatDate(report.date) }}</span>
                </div>
              </div>
              <span :class="statusClasses(report.status)" class="text-xs px-2 py-1 rounded">
                {{ report.status }}
              </span>
            </div>
            <p class="mt-3 text-gray-600">{{ report.description }}</p>
            <div class="mt-4 flex items-center">
              <div class="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
              <span class="text-sm text-gray-700">{{ report.user }}</span>
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
import { isAuthenticated } from '@/utils/auth'; // Importa isAuthenticated da auth.js
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'SegnalazioniView',
  setup() {
    const route = useRoute();
    // Rimuovi questa riga:
    // const isAuthenticated = ref(false);
    
    const successMessage = ref('');
    const report = ref({
      title: '',
      description: '',
      category: '',
      image: null,
      lat: '',
      lng: ''
    });
    
    // Rimuovi questo onMounted che causa il problema:
    // onMounted(() => {
    //   isAuthenticated.value = !!localStorage.getItem('authToken');
    // });
    
    const reports = ref([]);
    const currentReport = ref(null);
    const showReportDetails = ref(false);
    
    const loading = ref(true);

    async function fetchReports() {
      try {
        const response = await api.get('/reports');
        reports.value = response.data.map(report => ({
          id: report._id,
          title: report.title,
          description: report.description,
          category: report.tags,
          status: report.status || 'pending',
          date: report.createdAt,
          // Logica per mostrare username solo se ha telefono
          user: response.data.organization?.name || 
                (response.data.user && response.data.userPhone ? response.data.user : 'Utente')
        }));
      } catch (error) {
        console.error('Error fetching reports:', error);
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
          // Stessa logica per i dettagli
          user: (response.data.user && response.data.phone ? response.data.user : 'Utente')
        };
        showReportDetails.value = true;
      } catch (error) {
        console.error('Error fetching report details:', error);
      } finally {
        loading.value = false;
      }
    }

    onMounted(async () => {
      if (route.params.id) {
        await fetchReportDetails(route.params.id);
      } else {
        await fetchReports();
      }
      
      // Listen for report updates
      window.addEventListener('report-updated', handleReportUpdated);
    });

    onBeforeUnmount(() => {
      // Clean up event listener
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
    
    async function submitReport() {
      // Cambia anche qui da localStorage a sessionStorage
      const token = sessionStorage.getItem('authToken');
      
      // Prepare payload
      // Nel metodo submitReport
      const payload = {
        reportData: {
          title: report.value.title,
          description: report.value.description,
          tags: report.value.category, // ← Ora corretto: invia nel campo tags
          location: {
            lat: parseFloat(report.value.lat),
            lng: parseFloat(report.value.lng)
          }
        }
      };

      try {
        // Make API call
        const response = await api.post('/reports', payload, {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Handle success
        successMessage.value = "Segnalazione inviata con successo!";
        
        // Reset form
        report.value = {
          title: '',
          description: '',
          category: '',
          image: null,
          lat: '',
          lng: ''
        };
      } catch (error) {
        console.error('Error creating report:', error);
        successMessage.value = "Errore durante l'invio della segnalazione. Riprova.";
      }
      
      // Clear message after 4 seconds
      setTimeout(() => successMessage.value = '', 4000);
    }
    
    function handleFileUpload(event) {
      const file = event.target.files[0];
      if (file && file.size <= 5 * 1024 * 1024) {
        report.value.image = file;
      } else {
        alert('File troppo grande o non valido (max 5MB)');
      }
    }
    
    async function geocodeAddress() {
      if (!report.value.address) return;
      
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(report.value.address)}`
        );
        const data = await response.json();
        
        if (data.length > 0) {
          report.value.lat = data[0].lat;
          report.value.lng = data[0].lon;
        } else {
          alert('Indirizzo non trovato. Inserisci un indirizzo più specifico.');
        }
      } catch (error) {
        console.error('Errore durante la geocodifica:', error);
        alert('Errore durante la ricerca dell\'indirizzo');
      }
    }

    function getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          report.value.lat = pos.coords.latitude.toFixed(6);
          report.value.lng = pos.coords.longitude.toFixed(6);
          
          // Reverse geocode to get address
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${report.value.lat}&lon=${report.value.lng}`)
            .then(res => res.json())
            .then(data => {
              if (data.display_name) {
                report.value.address = data.display_name;
              }
            });
        }, err => {
          alert('Impossibile ottenere la posizione');
        });
      } else {
        alert('Geolocalizzazione non supportata dal browser');
      }
    }
    
    function formatDate(dateString) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
    
    function statusClasses(status) {
      switch (status.toLowerCase()) {
        case 'pending':
          return 'bg-yellow-100 text-yellow-700';
        case 'in_progress':
          return 'bg-blue-100 text-blue-700';
        case 'resolved':
          return 'bg-green-100 text-green-700';
        // Mantieni compatibilità con i vecchi stati
        case 'ricevuta':
          return 'bg-yellow-100 text-yellow-700';
        case 'in lavorazione':
          return 'bg-blue-100 text-blue-700';
        case 'risolta':
          return 'bg-green-100 text-green-700';
        default:
          return 'bg-gray-100 text-gray-700';
      }
    }

    let map;
    let selectedMarker = null;

    let showMapPopup = ref(false);
    let tempLat = ref('');
    let tempLng = ref('');

    function openMapPopup() {
      showMapPopup.value = true;
      setTimeout(() => {
        initMapPopup();
      }, 100); // Piccolo ritardo per garantire che il DOM sia pronto
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

      // Tenta di ottenere la posizione attuale dell'utente
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
          map.setView([46.0667, 11.1167], 13); // Fallback su Trento
        });
      } else {
        map.setView([46.0667, 11.1167], 13); // Fallback su Trento
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

    function handleReportUpdated(event) {
      const { reportId } = event.detail;
      console.log('Report updated, refreshing data:', reportId);
      fetchReports();
    }

    return {
      isAuthenticated, // Usa quello importato da auth.js
      successMessage,
      report,
      submitReport,
      handleFileUpload,
      getCurrentLocation,
      reports,
      currentReport,
      showReportDetails,
      loading,
      formatDate,
      statusClasses,
      fetchReportDetails,
      handleReportUpdated,
      showMapPopup,
      openMapPopup,
      closeMapPopup,
      confirmLocation
    };
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

* {
  font-family: 'Inter', sans-serif;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
  margin-bottom: 2rem;
}

.btn-primary {
  background: linear-gradient(90deg, #4f46e5, #6366f1);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: background-color 0.3s ease;
  border: none;
  cursor: pointer;
}
.btn-primary:hover {
  background: linear-gradient(90deg, #4338ca, #4f46e5);
}

.input-field {
  width: 100%;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: 1.5px solid #d1d5db;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}
.input-field:focus {
  border-color: #4f46e5;
  outline: none;
  box-shadow: 0 0 8px rgba(79, 70, 229, 0.4);
}

label[for="file-upload"] {
  transition: background-color 0.3s ease;
}
label[for="file-upload"]:hover {
  background-color: #e0e7ff;
}

svg {
  width: 48px;
  height: 48px;
  color: #4f46e5;
}

.success-message {
  background-color: #d1fae5;
  color: #065f46;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  animation: fadeOut 4s forwards;
  font-weight: 600;
}

@keyframes fadeOut {
  0%, 80% { opacity: 1; }
  100% { opacity: 0; }
}

/* Animazioni fade in */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fadeIn 0.5s ease forwards;
}
</style>