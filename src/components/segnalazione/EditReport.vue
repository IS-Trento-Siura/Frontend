<template>
  <div class="min-h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500">
    <div class="max-w-4xl mx-auto py-8 px-4">
      <!-- Header -->
      <div class="text-center mb-10">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800">Modifica Segnalazione</h1>
        <p class="text-gray-600 mt-2">Aggiorna i dettagli della tua segnalazione</p>
      </div>

      <!-- Report Form -->
      <div class="card mb-8">
        <form @submit.prevent="saveReport">
          <div class="grid grid-cols-1 gap-6">
            <div>
              <label class="block text-gray-700 font-bold mb-2">Titolo</label>
              <input 
                v-model="report.title"
                class="input-field"
                type="text"
                placeholder="Titolo segnalazione"
                required
              />
            </div>
            <div>
              <label class="block text-gray-700 font-bold mb-2">Descrizione</label>
              <textarea 
                v-model="report.description"
                class="input-field"
                rows="4"
                placeholder="Descrizione dettagliata"
                required
              ></textarea>
            </div>
            <div>
              <label class="block text-gray-700 font-bold mb-2">Posizione</label>
              <div class="space-y-2">
                <div class="flex gap-2">
                  <button 
                    type="button"
                    @click="openMapModal"
                    class="btn btn-primary flex-1"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    {{ selectedLocation ? 'Modifica Posizione' : 'Seleziona Posizione sulla Mappa' }}
                  </button>
                  <button 
                    type="button"
                    @click="clearLocation"
                    class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    v-if="selectedLocation"
                  >
                    Rimuovi
                  </button>
                </div>
                <div v-if="selectedLocation" class="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p class="text-sm text-green-700">
                    <strong>Posizione selezionata:</strong><br>
                    Latitudine: {{ selectedLocation.lat.toFixed(6) }}<br>
                    Longitudine: {{ selectedLocation.lng.toFixed(6) }}<br>
                    <span v-if="report.address">Indirizzo: {{ report.address }}</span>
                  </p>
                </div>
              </div>
            </div>
            <div>
              <label class="block text-gray-700 font-bold mb-2">Categoria</label>
              <select 
                v-model="report.tags"
                class="input-field"
                required
              >
                <option value="" disabled>Seleziona una categoria</option>
                <option value="Sicurezza">Sicurezza</option>
                <option value="Infrastrutture">Infrastrutture</option>
                <option value="Ambiente">Ambiente</option>
                <option value="Traffico">Traffico</option>
                <option value="Altro">Altro</option>
              </select>
            </div>
          </div>
          
          <div v-if="error" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-red-700 text-sm">{{ error }}</p>
          </div>
          
          <div class="mt-8 flex justify-end space-x-4">
            <router-link to="/profilo" class="btn btn-secondary">Annulla</router-link>
            <button type="submit" class="btn btn-primary" :disabled="loading">
              {{ loading ? 'Salvataggio...' : 'Salva Modifiche' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Notifica di successo -->
    <div v-if="showSuccessNotification" class="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        {{ successMessage }}
      </div>
    </div>

    <!-- Map Modal -->
    <div v-if="showMapModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold text-gray-800">Seleziona Posizione</h3>
          <button @click="closeMapModal" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="mb-4">
          <p class="text-sm text-gray-600">Clicca sulla mappa per selezionare la posizione della segnalazione</p>
        </div>
        
        <div id="editMap" class="h-96 rounded-lg border border-gray-300 mb-4"></div>
        
        <div v-if="tempLocation" class="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p class="text-sm text-blue-700">
            <strong>Posizione temporanea:</strong><br>
            Lat: {{ tempLocation.lat.toFixed(6) }}, Lng: {{ tempLocation.lng.toFixed(6) }}
          </p>
        </div>
        
        <div class="flex justify-end space-x-4">
          <button @click="closeMapModal" class="btn btn-secondary">Annulla</button>
          <button @click="confirmLocation" class="btn btn-primary" :disabled="!tempLocation">
            Conferma Posizione
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/utils/api';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'EditReport',
  data() {
    return {
      report: {
        title: '',
        description: '',
        tags: '',
        location: {
          lat: null,
          lng: null
        }
      },
      loading: false,
      error: null,
      map: null,
      selectedLocation: null,
      tempLocation: null,
      currentMarker: null,
      showMapModal: false,
      address: '',
      // Aggiungi questi per le notifiche
      showSuccessNotification: false,
      successMessage: ''
    }
  },
  async mounted() {
    await this.loadReport();
  },
  beforeUnmount() {
    if (this.map) {
      this.map.remove();
    }
  },
  methods: {
    async loadReport() {
      try {
        this.loading = true;
        const reportId = this.$route.params.id;
        const token = sessionStorage.getItem('authToken');
        
        const response = await api.get(`/reports/${reportId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const reportData = response.data;
        console.log('Loaded report data:', reportData);
        
        // Mappa i dati del report secondo lo schema del backend
        this.report = {
          title: reportData.title || '',
          description: reportData.description || '',
          tags: reportData.tags || '',
          location: {
            lat: reportData.location?.lat || null,
            lng: reportData.location?.lng || null
          }
        };
        
        // Se il report ha coordinate, impostale come posizione selezionata
        if (this.report.location.lat && this.report.location.lng) {
          this.selectedLocation = {
            lat: parseFloat(this.report.location.lat),
            lng: parseFloat(this.report.location.lng)
          };
        }
        
      } catch (error) {
        this.error = 'Errore nel caricamento della segnalazione';
        console.error('Error loading report:', error);
      } finally {
        this.loading = false;
      }
    },
    
    openMapModal() {
      this.showMapModal = true;
      this.tempLocation = this.selectedLocation ? { ...this.selectedLocation } : null;
      
      this.$nextTick(() => {
        this.initMap();
      });
    },
    
    closeMapModal() {
      this.showMapModal = false;
      this.tempLocation = null;
      if (this.map) {
        this.map.remove();
        this.map = null;
      }
    },
    
    confirmLocation() {
      if (this.tempLocation) {
        this.selectedLocation = { ...this.tempLocation };
        this.report.location = {
          lat: this.tempLocation.lat,
          lng: this.tempLocation.lng
        };
        
        // Ottieni l'indirizzo
        this.reverseGeocode(this.tempLocation.lat, this.tempLocation.lng);
      }
      this.closeMapModal();
    },
    
    initMap() {
      if (this.map) {
        this.map.remove();
      }
      
      // Inizializza la mappa
      this.map = L.map('editMap').setView([46.0748, 11.1217], 13); // Trento come centro
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);
      
      // Se c'è una posizione temporanea, mostra il marker
      if (this.tempLocation) {
        this.addMarker(this.tempLocation.lat, this.tempLocation.lng);
        this.map.setView([this.tempLocation.lat, this.tempLocation.lng], 16);
      }
      
      // Aggiungi listener per il click sulla mappa
      this.map.on('click', (e) => {
        const { lat, lng } = e.latlng;
        this.selectTempLocation(lat, lng);
      });
    },
    
    selectTempLocation(lat, lng) {
      this.tempLocation = { lat, lng };
      
      // Rimuovi il marker precedente se esiste
      if (this.currentMarker) {
        this.map.removeLayer(this.currentMarker);
      }
      
      // Aggiungi nuovo marker
      this.addMarker(lat, lng);
    },
    
    addMarker(lat, lng) {
      this.currentMarker = L.marker([lat, lng]).addTo(this.map)
        .bindPopup('Posizione selezionata')
        .openPopup();
    },
    
    async reverseGeocode(lat, lng) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
        );
        const data = await response.json();
        
        if (data && data.display_name) {
          this.address = data.display_name;
        }
      } catch (error) {
        console.error('Errore nel reverse geocoding:', error);
      }
    },
    
    clearLocation() {
      this.selectedLocation = null;
      this.report.location = {
        lat: null,
        lng: null
      };
      this.address = '';
    },
    
    async saveReport() {
      try {
        this.loading = true;
        this.error = null;
        
        const reportId = this.$route.params.id;
        const token = sessionStorage.getItem('authToken');
        
        // Prepara i dati secondo il formato che si aspetta il backend
        const reportData = {
          title: this.report.title,
          description: this.report.description,
          tags: this.report.tags,
          location: this.report.location
        };
        
        // Rimuovi location se non ci sono coordinate
        if (!reportData.location.lat || !reportData.location.lng) {
          delete reportData.location;
        }
        
        console.log('Sending report data:', { reportData });
        
        // Il backend si aspetta i dati dentro un oggetto "reportData"
        await api.patch(`/reports/${reportId}`, { reportData }, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        // Mostra notifica di successo
        this.successMessage = 'Segnalazione modificata con successo!';
        this.showSuccessNotification = true;
        
        // Nascondi la notifica dopo 3 secondi
        setTimeout(() => {
          this.showSuccessNotification = false;
        }, 3000);
        
        // Emit global event that report was updated
        window.dispatchEvent(new CustomEvent('report-updated', {
          detail: { reportId }
        }));
        
        // Reindirizza dopo un breve ritardo per mostrare la notifica
        setTimeout(() => {
          this.$router.push('/profilo');
        }, 1500);
      } catch (error) {
        this.error = error.response?.data?.message || 'Errore durante il salvataggio';
        console.error('Error saving report:', error);
        console.error('Error response:', error.response?.data);
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  text-decoration: none;
}

.btn-primary {
  background-color: #3B82F6;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #2563EB;
}

.btn-primary:disabled {
  background-color: #9CA3AF;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: white;
  color: #3B82F6;
  border: 1px solid #3B82F6;
}

.btn-secondary:hover {
  background-color: #EFF6FF;
}

/* Animation classes */
.animate-slide-in {
  animation: slideIn 0.3s ease-out forwards;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
