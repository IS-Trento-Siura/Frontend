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
        <h1 class="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-white drop-shadow-lg leading-tight">Benvenuti in TrentoSicura</h1>
        <p class="text-xl md:text-2xl max-w-3xl mx-auto mb-10 font-light text-gray-100 drop-shadow-md leading-relaxed">La vostra piattaforma di riferimento per la sicurezza urbana e le segnalazioni in tempo reale.</p>
        <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
          <RouterLink to="/mappa" class="btn-primary transform hover:scale-105 transition-transform duration-300">
            <i class="fas fa-map-marked-alt mr-2"></i> Esplora la Mappa
          </RouterLink>
          <RouterLink to="/segnalazioni" class="btn-secondary transform hover:scale-105 transition-transform duration-300">
            <i class="fas fa-bullhorn mr-2"></i> Invia una Segnalazione
          </RouterLink>
        </div>
      </div>
    </header>

    <!-- Features Section -->
    <section class="relative z-10 py-20 px-6">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-4xl font-bold text-center mb-16 text-white drop-shadow-lg">Come Funziona</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div class="feature-card animate-fade-in" style="animation-delay: 0.1s;">
            <div class="feature-icon bg-blue-100 text-blue-600">
              <i class="fas fa-map-signs text-3xl"></i>
            </div>
            <h3 class="text-2xl font-semibold mb-4 text-gray-900 leading-tight">Mappa Interattiva</h3>
            <p class="text-gray-700 leading-relaxed text-base">Visualizzate le segnalazioni in tempo reale sulla nostra mappa dinamica e intuitiva.</p>
          </div>
          <div class="feature-card animate-fade-in" style="animation-delay: 0.2s;">
            <div class="feature-icon bg-green-100 text-green-600">
              <i class="fas fa-paper-plane text-3xl"></i>
            </div>
            <h3 class="text-2xl font-semibold mb-4 text-gray-900 leading-tight">Segnalazioni Rapide</h3>
            <p class="text-gray-700 leading-relaxed text-base">Inviate segnalazioni dettagliate con foto e geolocalizzazione in pochi semplici passaggi.</p>
          </div>
          <div class="feature-card animate-fade-in" style="animation-delay: 0.3s;">
            <div class="feature-icon bg-purple-100 text-purple-600">
              <i class="fas fa-users text-3xl"></i>
            </div>
            <h3 class="text-2xl font-semibold mb-4 text-gray-900 leading-tight">Comunità Attiva</h3>
            <p class="text-gray-700 leading-relaxed text-base">Unitevi a una comunità di cittadini e autorità per rendere Trento un posto più sicuro.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="relative z-10 py-20 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          <div class="stat-item animate-fade-in" style="animation-delay: 0.1s;">
            <div class="text-5xl font-bold text-white animate-counter drop-shadow-lg">1.2k+</div>
            <div class="opacity-90 mt-3 text-lg text-gray-100 leading-relaxed">Segnalazioni Ricevute</div>
          </div>
          <div class="stat-item animate-fade-in" style="animation-delay: 0.2s;">
            <div class="text-5xl font-bold text-white animate-counter drop-shadow-lg">98%</div>
            <div class="opacity-90 mt-3 text-lg text-gray-100 leading-relaxed">Tasso di Risoluzione</div>
          </div>
          <div class="stat-item animate-fade-in" style="animation-delay: 0.3s;">
            <div class="text-5xl font-bold text-white animate-counter drop-shadow-lg">5.4k+</div>
            <div class="opacity-90 mt-3 text-lg text-gray-100 leading-relaxed">Utenti Attivi</div>
          </div>
          <div class="stat-item animate-fade-in" style="animation-delay: 0.4s;">
            <div class="text-5xl font-bold text-white animate-counter drop-shadow-lg">24h</div>
            <div class="opacity-90 mt-3 text-lg text-gray-100 leading-relaxed">Tempo Medio di Risposta</div>
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
  padding: 14px 28px;
  border-radius: 50px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.btn-primary {
  background-color: #ffffff;
  color: #3b82f6; /* blue-500 */
}

.btn-primary:hover {
  background-color: #eff6ff; /* blue-50 */
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.btn-secondary {
  background-color: transparent;
  color: #d1d5db; /* gray-300 */
  border: 2px solid #d1d5db; /* gray-300 */
}

.btn-secondary:hover {
  background-color: rgba(209, 213, 219, 0.1);
  color: #f9fafb; /* gray-50 */
}

/* Feature Card Styles */
.feature-card {
  padding: 40px;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
}

.feature-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  margin-left: auto;
  margin-right: auto;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.feature-card h3 {
    color: #111827; /* gray-900 */
    font-weight: 600;
    line-height: 1.3;
}

.feature-card p {
    color: #374151; /* gray-700 */
    font-size: 1rem;
    line-height: 1.6;
}

/* Stats Section Styles */
.stat-item .animate-counter {
  transition: all 0.5s ease;
}

/* Keyframe Animations */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-in-out forwards;
  opacity: 0; /* Start hidden */
}

@keyframes float {
  0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.8; }
  50% { transform: translateY(-20px) translateX(15px) rotate(180deg); opacity: 0.5; }
  100% { transform: translateY(0) translateX(0) rotate(360deg); opacity: 0.8; }
}

.animate-float {
  animation: float 10s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float 12s ease-in-out infinite 2s;
}

.animate-float-slow {
  animation: float 15s ease-in-out infinite;
}

.animate-float-fast {
  animation: float 8s ease-in-out infinite;
}

/* Additional Typography Improvements */
.text-shadow {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.drop-shadow-lg {
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
}

.drop-shadow-md {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}
</style>
