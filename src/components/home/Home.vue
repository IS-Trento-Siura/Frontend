<template>
  <div class="min-h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500">
      <!-- Hero Section with animation -->
      <div class="py-16 px-6 text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white animate-fade-in rounded-lg">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">TrentoSicura</h1>
        <p class="text-xl max-w-2xl mx-auto mb-8">Piattaforma per la sicurezza cittadina e segnalazioni in tempo reale</p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <RouterLink to="/mappa" class="btn btn-primary">
            Esplora la mappa
          </RouterLink>
          <RouterLink to="/segnalazioni" class="btn btn-primary">
            Fai una segnalazione
          </RouterLink>
        </div>
      </div>

      <!-- Features Section with staggered animations -->
      <div class="max-w-6xl mx-auto py-16 px-6">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-800 animate-fade-in">Come funziona TrentoSicura</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="card animate-fade-in" style="animation-delay: 0.1s">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span class="text-2xl">📍</span>
            </div>
            <h3 class="text-xl font-bold mb-3 text-gray-800">Mappa Interattiva</h3>
            <p class="text-gray-600">Visualizza le segnalazioni attive nella tua zona sulla nostra mappa in tempo reale.</p>
          </div>
          
          <div class="card animate-fade-in" style="animation-delay: 0.2s">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span class="text-2xl">📱</span>
            </div>
            <h3 class="text-xl font-bold mb-3 text-gray-800">Segnalazioni Rapide</h3>
            <p class="text-gray-600">Invia segnalazioni con foto e posizione per problemi di sicurezza o infrastrutture.</p>
          </div>
          
          <div class="card animate-fade-in" style="animation-delay: 0.3s">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span class="text-2xl">👥</span>
            </div>
            <h3 class="text-xl font-bold mb-3 text-gray-800">Comunità Attiva</h3>
            <p class="text-gray-600">Collabora con altri cittadini e autorità per rendere Trento più sicura.</p>
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="py-16 rounded-lg">
        <div class="max-w-6xl mx-auto px-6">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div class="animate-fade-in" style="animation-delay: 0.1s">
              <div class="text-4xl font-bold  animate-scale">1.2k+</div>
              <div class="text-gray-600 mt-2">Segnalazioni</div>
            </div>
            <div class="animate-fade-in" style="animation-delay: 0.2s">
              <div class="text-4xl font-bold  animate-scale">98%</div>
              <div class="text-gray-600 mt-2">Risolte</div>
            </div>
            <div class="animate-fade-in" style="animation-delay: 0.3s">
              <div class="text-4xl font-bold  animate-scale">5.4k</div>
              <div class="text-gray-600 mt-2">Utenti</div>
            </div>
            <div class="animate-fade-in" style="animation-delay: 0.4s">
              <div class="text-4xl font-bold  animate-scale">24h</div>
              <div class="text-gray-600 mt-2">Tempo medio risposta</div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Sidebar from '@/components/layout/Sidebar.vue';

export default {
  name: 'HomeView',
  components: {
    Sidebar
  }
}
</script>
