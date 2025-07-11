<template>
  <div class="flex flex-col p-4 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 rounded-xl shadow-lg max-w-7xl mx-auto">
    
    <!-- Filtri Orizzontali in Cima -->
    <div class="mb-6 p-4 bg-white rounded-2xl shadow-lg border border-gray-100">
      <h3 class="text-lg font-bold text-gray-800 mb-3 flex items-center">
        <svg class="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"></path>
        </svg>
        Filtri di Ricerca
      </h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        
        <!-- Filtro per Tipologia -->
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <label class="block text-sm font-semibold text-gray-700 flex items-center">
              <svg class="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
              </svg>
              Tipologia
            </label>
            <button 
              v-if="selectedTypes.length > 0"
              @click="selectedTypes = []"
              class="text-xs text-red-500 hover:text-red-700 font-semibold px-2 py-1 rounded-md hover:bg-red-50 transition-colors"
            >
              Pulisci
            </button>
          </div>
          <div class="flex flex-wrap gap-1">
            <button 
              v-for="type in reportTypes" 
              :key="type"
              @click="toggleReportType(type)"
              :class="[
                'px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 transform hover:scale-105',
                selectedTypes.includes(type) 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
              ]"
            >
              {{ type }}
            </button>
          </div>
        </div>
    
        <!-- Filtro per Periodo -->
        <div class="space-y-2">
          <label for="time-filter" class="block text-sm font-semibold text-gray-700 flex items-center">
            <svg class="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Periodo
          </label>
          <select 
            id="time-filter" 
            v-model="timeFilter"
            class="w-full p-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all duration-200 text-sm"
          >
            <option value="all">🕐 Tutto</option>
            <option value="day">📅 Ultime 24 ore</option>
            <option value="week">📊 Ultima settimana</option>
            <option value="month">📈 Ultimo mese</option>
          </select>
        </div>

        <!-- Controllo Raggio d'Azione -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label class="flex items-center text-sm font-semibold text-gray-700">
              <svg class="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              Raggio d'azione
            </label>
            <span class="bg-indigo-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md">
              {{ currentRadius }}m
            </span>
          </div>
          
          <input 
            type="range" 
            min="100" 
            max="5000" 
            step="100"
            v-model.number="currentRadius"
            @change="updateRadius"
            class="w-full h-2 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full appearance-none cursor-pointer slider"
          />
          
          <div class="flex justify-between text-xs text-gray-600 font-medium">
            <span class="bg-white px-1 py-0.5 rounded shadow-sm">100m</span>
            <span class="bg-white px-1 py-0.5 rounded shadow-sm">2.5km</span>
            <span class="bg-white px-1 py-0.5 rounded shadow-sm">5km</span>
          </div>
        </div>
    
      </div>
    </div>

    <!-- Contenuto Principale: Mappa e Lista -->
    <div class="flex flex-col md:flex-row gap-6">
      
      <!-- Mappa a sinistra -->
      <div class="lg:w-2/3 space-y-4">
        <div class="relative">
          <div id="map" class="map-container h-[28rem] rounded-2xl shadow-xl border-2 border-indigo-200 overflow-hidden"></div>
          
          <!-- Badge di stato geolocalizzazione -->
          <div v-if="isLocating" class="absolute top-4 left-4 bg-blue-500 text-white px-3 py-2 rounded-full text-sm font-medium shadow-lg flex items-center">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Localizzazione...
          </div>
        </div>
      </div>
      
      <!-- Lista segnalazioni a destra -->
      <div class="lg:w-1/3">
        <div class="bg-white rounded-2xl shadow-xl border border-gray-100 h-full flex flex-col overflow-hidden">
          
          <!-- Header della lista -->
          <div class="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
            <h2 class="text-lg font-bold flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
              Segnalazioni Recenti
            </h2>
            <p class="text-indigo-100 text-sm mt-1">
              {{ filteredReports.length }} segnalazioni trovate
            </p>
          </div>
          
          <!-- Contenuto lista -->
          <div class="flex-1">
            <div class="space-y-1 p-4">
              <div v-if="loadingReports" class="text-center py-8">
                <svg class="animate-spin mx-auto h-8 w-8 text-indigo-600 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p class="text-indigo-600 font-semibold text-sm">Caricamento segnalazioni...</p>
              </div>
              
              <div v-else-if="filteredReports.length === 0" class="text-center py-8">
                <svg class="mx-auto h-12 w-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0120 12a8 8 0 00-16 0 7.962 7.962 0 002 5.291z"></path>
                </svg>
                <p class="text-gray-500 font-medium text-sm">Nessuna segnalazione trovata</p>
                <p class="text-gray-400 text-xs mt-1">Prova a modificare i filtri</p>
              </div>
              
              <div v-else class="space-y-3 max-h-[24rem] overflow-y-auto pr-2 custom-scrollbar">
                <div 
                  v-for="report in filteredReports" 
                  :key="report._id || report.id"
                  class="group border border-gray-200 rounded-xl p-3 hover:shadow-lg cursor-pointer transition-all duration-300 hover:border-indigo-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50"
                  @click.stop="showReportDetailsModal(report)"
                >
                  <div class="flex justify-between items-start mb-2">
                    <h3 class="font-bold text-gray-900 truncate max-w-[70%] group-hover:text-indigo-700 transition-colors text-sm">
                      {{ report.title }}
                    </h3>
                    <span class="text-xs bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-2 py-1 rounded-full font-semibold border border-indigo-200">
                      {{ formatTimeAgo(report.createdAt) }}
                    </span>
                  </div>
                  
                  <p class="text-xs text-gray-600 mb-2 line-clamp-2 leading-relaxed">
                    {{ report.description }}
                  </p>
                  
                  <div class="flex items-center justify-between">
                    <span class="text-xs text-gray-500 font-medium">
                      📅 {{ formatDate(report.createdAt) }}
                    </span>
                    <span v-if="report.tags" class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-medium">
                      🏷️ {{ report.tags }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

    </div>

    <!-- Dettaglio Segnalazione Modal -->
    <div v-if="showReportDetails" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
      <div class="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 z-[1001]">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">Dettaglio Segnalazione</h2>
          <button @click="showReportDetails = false" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div v-if="currentReport" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Titolo -->
            <div class="col-span-2">
              <label class="block text-gray-700 font-medium mb-2">Titolo</label>
              <div class="input-field bg-gray-50">{{ currentReport.title }}</div>
            </div>

            <!-- Categoria -->
            <div>
              <label class="block text-gray-700 font-medium mb-2">Tipologia</label>
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
</template>


<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import api from '@/utils/api'; // Importa l'API per le richieste HTTP
import { formatDistance, formatDistanceToNow } from 'date-fns';
import { it } from 'date-fns/locale'; // Importa la localizzazione italiana

export default {
  name: 'MappaView',
  data() {
    return {
      map: null,
      userLocation: null,
      currentRadius: 1000,
      allReports: [],
      reports: [],
      reportTypes: ['Sicurezza', 'Infrastruttura', 'Ambiente', 'Traffico', 'Altro'],
      selectedTypes: [],
      timeFilter: 'all',
      loadingReports: false,
      circleLayer: null,
      isLocating: false,
      reportMarkers: [],
      currentReport: null,
      showReportDetails: false
    };
  },
  computed: {
    filteredReports() {
      let reports = this.allReports;

      // Filtro per tipologia (tags)
      if (this.selectedTypes.length > 0) {
        reports = reports.filter(report => {
          if (!report.tags) return false;
          const reportTags = report.tags.toLowerCase().split(',').map(t => t.trim());
          return this.selectedTypes.some(selectedType => 
            reportTags.includes(selectedType.toLowerCase())
          );
        });
      }

      // Filtro per periodo
      if (this.timeFilter !== 'all') {
        const now = new Date();
        const filterDate = new Date();
        if (this.timeFilter === 'day') {
          filterDate.setDate(now.getDate() - 1);
        } else if (this.timeFilter === 'week') {
          filterDate.setDate(now.getDate() - 7);
        } else if (this.timeFilter === 'month') {
          filterDate.setMonth(now.getMonth() - 1);
        }
        reports = reports.filter(report => new Date(report.createdAt) >= filterDate);
      }

      // Filtro per raggio d'azione (usa currentRadius)
      if (this.userLocation) {
        reports = reports.filter(report => {
          if (!report.location || !report.location.lat || !report.location.lng) {
            return false;
          }
          
          const distance = this.calculateDistance(
            this.userLocation[0], 
            this.userLocation[1],
            report.location.lat, 
            report.location.lng
          );
          
          return distance <= this.currentRadius; // USA currentRadius invece di maxDistance
        });
      }

      return reports;
    }
  },
  watch: {
    filteredReports: {
      handler(newReports) {
        this.updateReportMarkers(newReports);
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    // Get user data from session storage
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      this.user = JSON.parse(userData);
      console.log('User data loaded:', this.user);
    }

    // Carica il raggio salvato dalla sessione
    const savedRadius = sessionStorage.getItem('mapRadius');
    if (savedRadius) {
      this.currentRadius = parseInt(savedRadius, 10);
    }

    this.initMap();

    // Listen for report updates
    window.addEventListener('report-updated', this.handleReportUpdated);
  },

  beforeUnmount() {
    // Clean up event listener
    window.removeEventListener('report-updated', this.handleReportUpdated);
  },
  methods: {
    updateReportMarkers(reports) {
      // Rimuovi i marker esistenti
      this.reportMarkers.forEach(marker => this.map.removeLayer(marker));
      this.reportMarkers = [];

      // Crea un'icona rossa personalizzata
      const redIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      // Aggiungi nuovi marker per le segnalazioni filtrate
      reports.forEach(report => {
        if (report.location && report.location.lat && report.location.lng) {
          const lat = report.location.lat;
          const lng = report.location.lng;
          
          // Verifica che le coordinate siano valide
          if (!isNaN(lat) && !isNaN(lng)) {
            const marker = L.marker([lat, lng], { icon: redIcon })
              .addTo(this.map)
              .bindPopup(`<b>${report.title}</b><br>${report.description}<br><small>Categoria: ${report.tags}</small>`);
            this.reportMarkers.push(marker);
          }
        }
      });
    },
    toggleReportType(type) {
      const index = this.selectedTypes.indexOf(type);
      if (index > -1) {
        this.selectedTypes.splice(index, 1);
      } else {
        this.selectedTypes.push(type);
      }
      // Rimuovi questa chiamata manuale - il watcher si occuperà dell'aggiornamento
    },
    initMap() {
      // Attendi che il DOM sia completamente pronto
      this.$nextTick(() => {
        this.map = L.map('map', {
          zoomControl: true,
          attributionControl: true
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(this.map);

        // Usa l'API di geolocalizzazione del browser direttamente
        this.getUserLocation();
        
        // Aggiungi un listener per l'evento di zoom per aggiornare la visualizzazione e chiudere i popup
        this.map.on('zoomend', () => {
          this.map.invalidateSize();
          // Chiudi tutti i popup aperti per evitare interferenze con l'aggiornamento della mappa
          this.map.closePopup();
        });
      });
    },
    
    getUserLocation() {
      if (!navigator.geolocation) {
        alert('Il tuo browser non supporta la geolocalizzazione');
        this.setFallbackLocation();
        return;
      }
      
      this.isLocating = true;
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.isLocating = false;
          const userLatLng = [position.coords.latitude, position.coords.longitude];
          console.log('Posizione trovata:', userLatLng);
          this.userLocation = userLatLng;
          
          // Centra la mappa sulla posizione dell'utente
          this.map.setView(userLatLng, 16);
          this.updateCircle();
          this.fetchReports();

          L.marker(userLatLng).addTo(this.map)
            .bindPopup(`Sei qui`).openPopup();
            
          setTimeout(() => {
            this.map.invalidateSize();
          }, 100);
        },
        (error) => {
          this.isLocating = false;
          console.error('Errore geolocalizzazione:', error);
          
          let errorMessage;
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Permesso di geolocalizzazione negato. Abilitalo nelle impostazioni del browser.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Informazioni sulla posizione non disponibili.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Richiesta di geolocalizzazione scaduta.';
              break;
            default:
              errorMessage = 'Errore sconosciuto durante la geolocalizzazione.';
          }
          
          alert(`Errore: ${errorMessage}`);
          this.setFallbackLocation();
        },
        {
          enableHighAccuracy: true,
          timeout: 15000, // 15 secondi timeout
          maximumAge: 0
        }
      );
    },
    
    setFallbackLocation() {
      const fallback = [41.9028, 12.4964]; // Roma
      this.map.setView(fallback, 6);
      L.marker(fallback).addTo(this.map).bindPopup('Posizione di default: Italia');
      
      setTimeout(() => {
        this.map.invalidateSize();
      }, 500);
    },
    
    updateCircle() {
      if (this.circleLayer) {
        this.map.removeLayer(this.circleLayer);
      }
      
      if (this.userLocation) {
        this.circleLayer = L.circle(this.userLocation, {
          radius: this.currentRadius,
          color: '#3b82f6',
          fillColor: '#60a5fa',
          fillOpacity: 0.2
        }).addTo(this.map);
      }
    },
    
    updateRadius() {
      this.updateCircle();
      this.fetchReports(); // Questo aggiornerà anche i marker in base al nuovo raggio
      // Salva il raggio nella sessione
      sessionStorage.setItem('mapRadius', this.currentRadius);
    },
    
    async fetchReports() {
      this.loadingReports = true;
      
      try {
        // Semplifica: prendi tutti i report e salvali in allReports
        const response = await api.get('/reports');
        this.allReports = response.data;
        this.reports = this.allReports; // Per compatibilità
        
        // Il watcher di filteredReports aggiornerà automaticamente i marker
      } catch (error) {
        console.error('Errore nel recupero delle segnalazioni:', error);
      } finally {
        this.loadingReports = false;
      }
    },
    
    calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371e3; // Raggio della Terra in metri
      const φ1 = lat1 * Math.PI/180;
      const φ2 = lat2 * Math.PI/180;
      const Δφ = (lat2-lat1) * Math.PI/180;
      const Δλ = (lon2-lon1) * Math.PI/180;

      const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

      return R * c; // Distanza in metri
    },
    
    formatDistance(distance) {
      if (distance < 1000) {
        return `${Math.round(distance)}m`;
      } else {
        return `${(distance / 1000).toFixed(1)}km`;
      }
    },
    
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    
    formatTimeAgo(dateString) {
      return formatDistanceToNow(new Date(dateString), { locale: it, includeSeconds: true });
    },
    
    clearReportMarkers() {
      this.reportMarkers.forEach(marker => {
        this.map.removeLayer(marker);
      });
      this.reportMarkers = [];
    },

    showReportDetailsModal(report) {
      this.currentReport = {
        id: report._id,
        title: report.title,
        description: report.description,
        category: report.tags,
        status: report.status || 'Ricevuta',
        date: report.createdAt,
        user: report.user?.username || 'Utente'
      };
      this.showReportDetails = true;
      
      // Also focus on the report location if available
      if (report.location && report.location.lat && report.location.lng) {
        const lat = report.location.lat;
        const lng = report.location.lng;
        if (!isNaN(lat) && !isNaN(lng)) {
          this.map.setView([lat, lng], 16);
          const marker = this.reportMarkers.find(m => {
            const markerLatLng = m.getLatLng();
            return markerLatLng && 
               markerLatLng.lat === lat && 
               markerLatLng.lng === lng;
          });
          if (marker) {
            marker.openPopup();
          }
        }
      }
    },

    focusReport(report) {
      if (!report.location || !report.location.lat || !report.location.lng) return;
      
      const lat = report.location.lat;
      const lng = report.location.lng;
      if (isNaN(lat) || isNaN(lng)) return;
      
      this.map.setView([lat, lng], 16);
      
      // Find and open the marker's popup
      const marker = this.reportMarkers.find(m => {
        const markerLatLng = m.getLatLng();
        return markerLatLng && 
               markerLatLng.lat === lat && 
               markerLatLng.lng === lng;
      });
      if (marker) {
        marker.openPopup();
      }
    },

    handleReportUpdated(event) {
      const { reportId } = event.detail;
      console.log('Report updated, refreshing data:', reportId);
      this.fetchReports();
    }
  }
};
</script>


<style scoped>
.map-container {
  position: relative;
  z-index: 0;
}

.slider::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(99, 102, 241, 0.3);
  border: 2px solid white;
}

.slider::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(99, 102, 241, 0.3);
  border: 2px solid white;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #4f46e5, #7c3aed);
}

.input-field {
  @apply p-3 border border-gray-300 rounded-lg;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>