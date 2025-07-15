<template>
  <div class="min-h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 font-sans relative overflow-hidden">
    <!-- Decorative Bubbles -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-float"></div>
      <div class="absolute top-32 right-16 w-16 h-16 bg-white bg-opacity-15 rounded-full animate-float-delayed"></div>
      <div class="absolute bottom-20 left-20 w-24 h-24 bg-white bg-opacity-8 rounded-full animate-float-slow"></div>
      <div class="absolute bottom-40 right-10 w-12 h-12 bg-white bg-opacity-20 rounded-full animate-float-fast"></div>
      <div class="absolute top-1/2 left-1/4 w-14 h-14 bg-white bg-opacity-12 rounded-full animate-float"></div>
      <div class="absolute top-1/3 right-1/3 w-18 h-18 bg-white bg-opacity-10 rounded-full animate-float-delayed"></div>
      <div class="absolute bottom-1/3 left-1/2 w-10 h-10 bg-white bg-opacity-15 rounded-full animate-float-slow"></div>
      <div class="absolute top-3/4 right-1/4 w-22 h-22 bg-white bg-opacity-8 rounded-full animate-float-fast"></div>
    </div>

    <!-- Hero Section -->
    <header class="relative text-white text-center py-24 px-6">
      <div class="relative z-10 animate-fade-in-up">
        <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-white drop-shadow-2xl leading-tight bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">TrentoSicura</h1>
        <p class="text-xl md:text-3xl max-w-4xl mx-auto mb-12 font-medium text-white drop-shadow-lg leading-relaxed">La piattaforma digitale che rivoluziona la sicurezza urbana attraverso la partecipazione attiva dei cittadini</p>
        <div class="flex flex-col sm:flex-row justify-center items-center gap-6">
          <RouterLink to="/mappa" class="btn-primary transform hover:scale-110 transition-all duration-300 shadow-2xl">
            <i class="fas fa-map-marked-alt mr-3"></i> Esplora la Mappa
          </RouterLink>
          <RouterLink to="/segnalazioni" class="btn-secondary transform hover:scale-110 transition-all duration-300 shadow-2xl">
            <i class="fas fa-bullhorn mr-3"></i> Invia una Segnalazione
          </RouterLink>
        </div>
      </div>
    </header>

    <!-- Problem Description Section -->
    <section class="relative z-10 py-20 px-6 bg-white bg-opacity-10 backdrop-blur-sm">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6 shadow-lg">
            <i class="fas fa-exclamation-triangle text-3xl text-red-600"></i>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold mb-8 text-white drop-shadow-lg">Il Problema che Risolviamo</h2>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="problem-card animate-fade-in" style="animation-delay: 0.1s;">
            <div class="bg-white bg-opacity-95 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white border-opacity-30">
              <h3 class="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <i class="fas fa-city text-blue-600 mr-3"></i>
                Sfide della Sicurezza Urbana
              </h3>
              <ul class="space-y-4 text-gray-700">
                <li class="flex items-start">
                  <i class="fas fa-times-circle text-red-500 mr-3 mt-1 flex-shrink-0"></i>
                  <span class="font-medium">Comunicazione inefficace tra cittadini e autorità locali</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-times-circle text-red-500 mr-3 mt-1 flex-shrink-0"></i>
                  <span class="font-medium">Tempi di risposta lunghi per le segnalazioni di sicurezza</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-times-circle text-red-500 mr-3 mt-1 flex-shrink-0"></i>
                  <span class="font-medium">Mancanza di trasparenza sui problemi del territorio</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-times-circle text-red-500 mr-3 mt-1 flex-shrink-0"></i>
                  <span class="font-medium">Difficoltà nel monitorare lo stato delle problematiche segnalate</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div class="solution-card animate-fade-in" style="animation-delay: 0.3s;">
            <div class="bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl p-8 shadow-2xl text-white">
              <h3 class="text-2xl font-bold mb-6 flex items-center">
                <i class="fas fa-lightbulb text-yellow-300 mr-3"></i>
                La Nostra Soluzione
              </h3>
              <ul class="space-y-4">
                <li class="flex items-start">
                  <i class="fas fa-check-circle text-green-300 mr-3 mt-1 flex-shrink-0"></i>
                  <span class="font-medium">Piattaforma digitale unificata per segnalazioni in tempo reale</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check-circle text-green-300 mr-3 mt-1 flex-shrink-0"></i>
                  <span class="font-medium">Geolocalizzazione precisa e documentazione fotografica</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check-circle text-green-300 mr-3 mt-1 flex-shrink-0"></i>
                  <span class="font-medium">Tracciamento trasparente dello stato delle segnalazioni</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check-circle text-green-300 mr-3 mt-1 flex-shrink-0"></i>
                  <span class="font-medium">Coinvolgimento attivo della comunità per una città più sicura</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="relative z-10 py-20 px-6">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-4xl md:text-5xl font-bold text-center mb-16 text-white drop-shadow-lg">Come Funziona</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div class="feature-card animate-fade-in" style="animation-delay: 0.1s;">
            <div class="feature-icon bg-blue-100 text-blue-600">
              <i class="fas fa-map-signs text-4xl"></i>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-gray-900 leading-tight">Mappa Interattiva</h3>
            <p class="text-gray-700 leading-relaxed text-lg font-medium">Visualizzate le segnalazioni in tempo reale sulla nostra mappa dinamica e intuitiva con filtri avanzati.</p>
          </div>
          <div class="feature-card animate-fade-in" style="animation-delay: 0.2s;">
            <div class="feature-icon bg-green-100 text-green-600">
              <i class="fas fa-paper-plane text-4xl"></i>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-gray-900 leading-tight">Segnalazioni Rapide</h3>
            <p class="text-gray-700 leading-relaxed text-lg font-medium">Inviate segnalazioni dettagliate con foto e geolocalizzazione automatica in pochi semplici passaggi.</p>
          </div>
          <div class="feature-card animate-fade-in" style="animation-delay: 0.3s;">
            <div class="feature-icon bg-purple-100 text-purple-600">
              <i class="fas fa-users text-4xl"></i>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-gray-900 leading-tight">Comunità Attiva</h3>
            <p class="text-gray-700 leading-relaxed text-lg font-medium">Unitevi a una rete collaborativa di cittadini e autorità per rendere Trento un posto più sicuro per tutti.</p>
          </div>
        </div>
      </div>
    </section>

    
  </div>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>

<style scoped>
/* General Button Styles */
.btn-primary, .btn-secondary {
  padding: 16px 32px;
  border-radius: 50px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.4s ease;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  font-size: 1.1rem;
}

.btn-primary {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  color: #1e40af;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.btn-primary:hover {
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border: 2px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}

/* Feature Card Styles */
.feature-card {
  padding: 48px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%);
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  transition: all 0.4s ease;
}

.feature-card:hover {
  transform: translateY(-15px) scale(1.02);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
}

.feature-icon {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  margin-left: auto;
  margin-right: auto;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.1) rotate(5deg);
}

.feature-card h3 {
  color: #111827;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 16px;
}

.feature-card p {
  color: #374151;
  font-size: 1.125rem;
  line-height: 1.7;
  font-weight: 500;
}

/* Problem and Solution Cards */
.problem-card, .solution-card {
  transition: all 0.4s ease;
}

.problem-card:hover, .solution-card:hover {
  transform: translateY(-10px) scale(1.02);
}


.stat-item {
  transition: all 0.4s ease;
  padding: 24px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.stat-item:hover {
  transform: translateY(-8px) scale(1.05);
  background: rgba(255, 255, 255, 0.15);
}

.stat-item .animate-counter {
  transition: all 0.5s ease;
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Enhanced Animations */
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

.animate-fade-in-up {
  animation: fade-in-up 1s ease-out forwards;
}

@keyframes fade-in {
  from { 
    opacity: 0; 
    transform: translateY(20px);
  }
  to { 
    opacity: 1; 
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-in-out forwards;
  opacity: 0;
}

@keyframes float {
  0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.8; }
  50% { transform: translateY(-25px) translateX(20px) rotate(180deg); opacity: 0.4; }
  100% { transform: translateY(0) translateX(0) rotate(360deg); opacity: 0.8; }
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

/* Enhanced Typography */
.drop-shadow-2xl {
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4));
}

.drop-shadow-lg {
  filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.3));
}

/* Responsive improvements */
@media (max-width: 768px) {
  .feature-card {
    padding: 32px 24px;
  }
  
  .btn-primary, .btn-secondary {
    padding: 14px 24px;
    font-size: 1rem;
  }
}
</style>
