<template>
  <div class="flex flex-col p-6 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 rounded-xl shadow-lg max-w-7xl mx-auto">
    <div class="flex flex-col md:flex-row gap-8">
      
      <!-- Mappa a sinistra -->
      <div class="md:w-2/3 relative z-0">
        <div id="map" class="map-container h-[33rem] rounded-xl shadow-md border border-indigo-300 relative z-0"></div>
        
        <!-- Controllo raggio -->
        <div class="mt-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <label class="block text-sm font-semibold text-gray-800 mb-3 select-none">
            Raggio d'azione: <span class="text-indigo-600">{{ currentRadius }} metri</span>
          </label>
          <input 
            type="range" 
            min="100" 
            max="5000" 
            step="100"
            v-model.number="currentRadius"
            @change="updateRadius"
            class="w-full h-3 bg-indigo-200 rounded-lg appearance-none cursor-pointer transition duration-300 ease-in-out hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <div class="flex justify-between text-xs text-gray-500 mt-1 select-none font-mono">
            <span>100m</span>
            <span>2500m</span>
            <span>5000m</span>
          </div>
        </div>
      </div>
      
      <!-- Lista segnalazioni a destra -->
      <div class="md:w-1/3">
        <div class="bg-white p-5 rounded-xl shadow-md h-full flex flex-col">
          <h2 class="text-2xl font-extrabold mb-5 text-gray-900 tracking-wide select-none">Segnalazioni recenti</h2>
          
          <div v-if="loadingReports" class="text-center py-8 text-indigo-600 font-semibold">
            <p>Caricamento segnalazioni...</p>
          </div>
          
          <div v-else-if="reports.length === 0" class="text-center py-8 text-gray-400 italic">
            <p>Nessuna segnalazione trovata</p>
          </div>
          
          <ul v-else class="space-y-4 overflow-y-auto max-h-[30rem] pr-2">
            <li 
              v-for="report in reports" 
              :key="report.id"
              class="border border-gray-300 rounded-xl p-4 hover:bg-indigo-50 cursor-pointer transition-shadow shadow-sm hover:shadow-md"
              @click.stop="showReportDetailsModal(report)"
            >
              <div class="flex justify-between items-start">
                <h3 class="font-semibold text-gray-900 truncate max-w-[70%]">{{ report.title }}</h3>
                <span class="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-mono select-none">
                  {{ formatDistance(report.distance) }}
                </span>
              </div>
              <p class="text-sm text-gray-600 mt-2 line-clamp-3">{{ report.description }}</p>
              <div class="flex items-center mt-3">
                <span class="text-xs text-gray-400 italic select-none">{{ formatDate(report.createdAt) }}</span>
              </div>
            </li>
          </ul>
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
  </div>
</template>


<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import api from '@/utils/api'; // Importa l'API per le richieste HTTP
import { formatDistance } from 'date-fns';
import { it } from 'date-fns/locale'; // Importa la localizzazione italiana

export default {
  name: 'MappaView',
  data() {
    return {
      map: null,
      userLocation: null,
      currentRadius: 1000, // Raggio predefinito di 1000 metri
      reports: [],
      loadingReports: false,
      circleLayer: null,
      isLocating: false, // Aggiunto stato per tracciare la geolocalizzazione
      reportMarkers: [], // Per memorizzare i marker delle segnalazioni
      currentReport: null,
      showReportDetails: false
    };
  },
  mounted() {
    // Get user data from session storage
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      this.user = JSON.parse(userData);
      console.log('User data loaded:', this.user);
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
    },
    
    async fetchReports() {
      this.loadingReports = true;
      
      try {
        // First fetch all reports for the list
        const allReportsResponse = await api.get('/reports');
        
        // Then fetch radius-filtered reports for the map if we have user location
        let radiusFilteredReports = [];
        if (this.userLocation) {
          const params = {
            lat: this.userLocation.lat,
            lng: this.userLocation.lng,
            radius: this.currentRadius
          };
          const radiusResponse = await api.get('/reports', { params });
          radiusFilteredReports = radiusResponse.data;
        }
        
        // Show only reports within radius in the list, calculate distance only for those with valid locations
        this.reports = radiusFilteredReports.map(report => {
          if (report.location && report.location.lat && report.location.lng) {
            return {
              ...report,
              distance: this.userLocation 
                ? this.calculateDistance(
                    this.userLocation.lat,
                    this.userLocation.lng,
                    report.location.lat,
                    report.location.lng
                  )
                : null
            };
          }
          return {
            ...report,
            distance: null
          };
        });

        // Clear existing markers
        this.clearReportMarkers();

        // Add markers only for reports within the radius
        radiusFilteredReports.forEach(report => {
          if (!report.location || !report.location.lat || !report.location.lng) return;
          
          const lat = report.location.lat;
          const lng = report.location.lng;
          if (isNaN(lat) || isNaN(lng)) return;
          
          // Debug report data
          console.log('Processing report within radius:', report);
          
          // Check if this is the user's report
          const isUserReport = report.user && 
                             (report.user._id === this.user?._id || 
                              report.user === this.user?._id);
          console.log('Is user report:', isUserReport, 'User ID:', this.user?._id, 'Report user:', report.user);
          
          // Create custom icon
          const customIcon = L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
          });

          const marker = L.marker([lat, lng], { icon: customIcon }).addTo(this.map);
          
          const popupContent = `
            <div class="p-2">
              <h3 class="font-bold text-lg">${report.title}</h3>
              <p class="text-gray-700">${report.description}</p>
            </div>
          `;
          
          marker.bindPopup(popupContent, {
            maxWidth: 300,
            minWidth: 200,
            className: 'custom-popup'
          });
          
          // Non aprire automaticamente i popup dei marker
          this.reportMarkers.push(marker);
        });
      } catch (error) {
        console.error('Errore nel caricamento delle segnalazioni:', error);
        this.reports = [];
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
