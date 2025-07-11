<template>
  <div class="min-h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 relative overflow-hidden">
    <!-- Palline decorative animate -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-30 rounded-full animate-float"></div>
      <div class="absolute top-32 right-16 w-16 h-16 bg-white bg-opacity-15 rounded-full animate-float-delayed"></div>
      <div class="absolute bottom-20 left-20 w-24 h-24 bg-white bg-opacity-30 rounded-full animate-float-slow"></div>
      <div class="absolute bottom-40 right-10 w-12 h-12 bg-white bg-opacity-20 rounded-full animate-float-fast"></div>
     
      <div class="absolute top-1/3 right-1/3 w-18 h-18 bg-white bg-opacity-30 rounded-full animate-float-delayed"></div>
      <div class="absolute bottom-1/3 left-1/2 w-10 h-10 bg-white bg-opacity-30 rounded-full animate-float-slow"></div>
      <div class="absolute top-3/4 right-1/4 w-22 h-22 bg-white bg-opacity-35 rounded-full animate-float-fast"></div>
    </div>

    <div class="flex min-h-screen relative z-10">
      <!-- Sezione sinistra - Informazioni TrentoSicura -->
      <div class="hidden lg:flex flex-1 items-center justify-center p-12 relative">
        <div class="text-center space-y-6 relative z-10 max-w-md mx-auto text-white">
          <h1 class="text-5xl font-light tracking-wide drop-shadow-lg leading-tight">
            TrentoSicura
          </h1>
          
          <div class="w-20 h-0.5 bg-white bg-opacity-60 mx-auto my-6"></div>
          
          <div class="space-y-3">
            <p class="text-xl font-light italic text-opacity-90 leading-relaxed">
              Gruppo T05:
            </p>
            <p class="text-lg text-opacity-85 font-medium tracking-wide">
              HaoJie Z. - Giacomo P. - Luca B.
            </p>
          </div>

          <div class="mt-10 mb-8">
            <img src="@/assets/logoUnitn.png" alt="Logo Unitn" class="h-24 mx-auto" />
          </div>
        </div>
      </div>

      <!-- Sezione destra - Form di login -->
      <div class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
        <div class="mx-auto w-full max-w-sm lg:w-96">
          <!-- Notification -->
          <div 
            v-if="notification.message"
            :class="[
              'notification fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 font-semibold max-w-md w-full z-50',
              notification.type === 'success' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-red-100 text-red-800 border border-red-200'
            ]"
          >
            <span class="icon">
              <svg v-if="notification.type === 'success'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
            <span>{{ notification.message }}</span>
          </div>

          <!-- Card container con sfondo semi-trasparente -->
          <div class="bg-white bg-opacity-95 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white border-opacity-30">
            <div class="space-y-8">
              <form @submit.prevent="handleLogin" class="space-y-6">
                <div>
                  <label for="email" class="block text-sm font-medium text-slate-700 mb-2">
                    E-mail utente
                  </label>
                  <input
                    id="email"
                    v-model="email"
                    type="email"
                    required
                    @input="clearError"
                    class="w-full px-3 py-3 border-b-2 border-slate-300 bg-transparent focus:border-blue-500 focus:outline-none transition-all duration-300 text-slate-800"
                    placeholder=""
                  />
                </div>

                <div>
                  <label for="password" class="block text-sm font-medium text-slate-700 mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    v-model="password"
                    type="password"
                    required
                    @input="clearError"
                    class="w-full px-3 py-3 border-b-2 border-slate-300 bg-transparent focus:border-blue-500 focus:outline-none transition-all duration-300 text-slate-800"
                    placeholder=""
                  />
                </div>

                <div v-if="errorMessage" class="text-red-600 text-center bg-red-50 py-3 px-4 rounded-lg mb-4 border border-red-200">
                  {{ errorMessage }}
                </div>

                <div class="space-y-4 pt-4">
                  <button 
                    type="submit" 
                    class="w-full py-3 px-4 bg-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-300 hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Accedi
                  </button>
                  
                  <button 
                    type="button" 
                    @click="navigateToSignUp"
                    class="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Registra
                  </button>
                </div>
              </form>

              <!-- Social Login -->
              <div class="flex justify-center pt-4">
                <button class="p-3 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 hover:from-blue-200 hover:to-indigo-200 transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg">
                  <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/utils/api';
import { login } from '@/utils/auth';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      notification: {
        message: '',
        type: '',
      },
    };
  },
  methods: {
    clearError() {
      this.errorMessage = '';
    },
    showNotification(type, message) {
      this.notification.type = type;
      this.notification.message = message;

      setTimeout(() => {
        this.notification.message = '';
        this.notification.type = '';
      }, 2000);
    },
    async handleLogin() {
      this.clearError();
      
      try {
        // Prima prova con l'endpoint degli utenti privati
        let response;
        let accountType = 'user';
        
        try {
          response = await api.post('/users/session', {
            email: this.email,
            password: this.password,
          });
        } catch (userError) {
          // Se il login utente fallisce, prova con l'endpoint delle organizzazioni
          if (userError.response && userError.response.status === 400) {
            try {
              response = await api.post('/orgs/session', {
                email: this.email,
                password: this.password,
              });
              accountType = 'org';
            } catch (orgError) {
              // Se entrambi falliscono, mostra errore
              throw new Error('Credenziali non valide');
            }
          } else {
            throw userError;
          }
        }

        if (response.status === 200) {
          const accountTypeText = accountType === 'user' ? 'cittadino' : 'ente pubblico';
          this.showNotification('success', `Login come ${accountTypeText} effettuato con successo!`);
          
          // Salva i dati utente/organizzazione in sessionStorage
          const userData = accountType === 'user' ? response.data.user : response.data.org;
          userData.accountType = accountType; // Aggiungi il tipo di account
          sessionStorage.setItem('userData', JSON.stringify(userData));
          
          // Salva il token in sessionStorage per l'autenticazione e aggiorna isAuthenticated
          login(response.data.token);
          
          // Aspetta 1 secondo e poi fai redirect a mappa.vue
          setTimeout(() => {
            window.location.href = '/mappa';
          }, 1000);

        } else {
          this.errorMessage = 'Credenziali non valide';
        }
      } catch (error) {
        if (error.message === 'Credenziali non valide') {
          this.errorMessage = 'Email o password non corretti';
        } else if (error.response && error.response.data) {
          this.errorMessage = error.response.data.message || 'Errore nel login';
        } else {
          this.errorMessage = 'Errore di rete: ' + error.message;
        }
        console.error('Login error:', error);
      }
    },
    navigateToSignUp() {
      this.$router.push({ name: 'registrazione' });
    },
  },
};
</script>

<style>
.notification {
  opacity: 0;
  animation: fadeInOut 3s forwards;
  z-index: 1000;
  box-sizing: border-box;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
    transform: translate(-50%, -20px);
  }
  10%, 90% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -20px);
  }
}

/* Animazioni per le palline decorative */
@keyframes float {
  0%, 100% {
    transform: translateY(0px) translateX(0px);
  }
  33% {
    transform: translateY(-15px) translateX(10px);
  }
  66% {
    transform: translateY(5px) translateX(-5px);
  }
}

@keyframes float-delayed {
  0%, 100% {
    transform: translateY(0px) translateX(0px);
  }
  33% {
    transform: translateY(10px) translateX(-8px);
  }
  66% {
    transform: translateY(-12px) translateX(12px);
  }
}

@keyframes float-slow {
  0%, 100% {
    transform: translateY(0px) translateX(0px);
  }
  50% {
    transform: translateY(-20px) translateX(15px);
  }
}

@keyframes float-fast {
  0%, 100% {
    transform: translateY(0px) translateX(0px);
  }
  25% {
    transform: translateY(-8px) translateX(8px);
  }
  50% {
    transform: translateY(8px) translateX(-8px);
  }
  75% {
    transform: translateY(-5px) translateX(5px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
  animation-delay: 2s;
}

.animate-float-slow {
  animation: float-slow 10s ease-in-out infinite;
  animation-delay: 1s;
}

.animate-float-fast {
  animation: float-fast 4s ease-in-out infinite;
  animation-delay: 3s;
}
</style>
