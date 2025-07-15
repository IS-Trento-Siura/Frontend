<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 relative overflow-hidden">
    <!-- Decorative Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-10 w-32 h-32 bg-white bg-opacity-10 rounded-full animate-float"></div>
      <div class="absolute top-40 right-20 w-24 h-24 bg-purple-300 bg-opacity-20 rounded-full animate-float-delayed"></div>
      <div class="absolute bottom-32 left-1/4 w-40 h-40 bg-indigo-300 bg-opacity-15 rounded-full animate-float-slow"></div>
      <div class="absolute bottom-20 right-10 w-28 h-28 bg-blue-300 bg-opacity-20 rounded-full animate-float-fast"></div>
      <div class="absolute top-1/2 right-1/3 w-20 h-20 bg-pink-300 bg-opacity-25 rounded-full animate-float"></div>
    </div>

    <div class="max-w-4xl mx-auto py-16 px-4 sm:px-6 relative z-10">
      <!-- Enhanced Header -->
      <div class="text-center mb-12 animate-fadeInFromTop">
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 mb-6 shadow-2xl animate-float">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h1 class="text-4xl md:text-5xl font-extrabold text-white mb-4 bg-gradient-to-r from-white to-indigo-100 bg-clip-text text-transparent">✏️ Modifica Profilo</h1>
        <p class="text-indigo-100 text-xl leading-relaxed max-w-2xl mx-auto">{{ isOrganization ? '🏢 Aggiorna le informazioni della tua organizzazione' : '👤 Aggiorna le tue informazioni personali' }}</p>
      </div>

      <!-- Enhanced Profile Form -->
      <div class="bg-white bg-opacity-95 backdrop-blur-md rounded-3xl shadow-2xl p-8 sm:p-10 transition-all duration-500 hover:shadow-3xl border border-white border-opacity-30 animate-slideInFromTop">
        <form @submit.prevent="saveProfile" class="space-y-8">
          
          <!-- Enhanced Form Fields -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <!-- Enhanced Username Field -->
            <div class="relative group">
              <label class="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                <span class="mr-2">👤</span> Username
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <div class="w-5 h-5 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <input 
                  v-model="profile.username"
                  class="enhanced-input pl-12"
                  type="text"
                  placeholder="Il tuo username"
                  required
                />
              </div>
            </div>

            <!-- Enhanced Email Field -->
            <div class="relative group">
              <label class="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                <span class="mr-2">📧</span> Email
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <div class="w-5 h-5 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <input 
                  v-model="profile.email"
                  class="enhanced-input pl-12"
                  type="email"
                  placeholder="tua@email.com"
                  required
                />
              </div>
            </div>

            <!-- Enhanced Phone Field -->
            <div class="relative group">
              <label class="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                <span class="mr-2">📱</span> Telefono {{ isOrganization ? '(obbligatorio)' : '(opzionale)' }}
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <div class="w-5 h-5 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                </div>
                <input 
                  v-model="profile.phone"
                  class="enhanced-input pl-12"
                  type="tel"
                  placeholder="+39 123 456 7890"
                  :required="isOrganization"
                />
              </div>
            </div>

            <!-- Enhanced Password Field -->
            <div class="relative group">
              <label class="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                <span class="mr-2">🔒</span> Password
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <div class="w-5 h-5 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
                <input 
                  v-model="profile.password"
                  class="enhanced-input pl-12"
                  type="password"
                  placeholder="Nuova password (opzionale)"
                />
              </div>
              <p class="mt-2 text-sm text-gray-500 flex items-center">
                <svg class="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Lascia vuoto per mantenere la password attuale
              </p>
            </div>
          </div>

          <!-- Enhanced Organization-specific fields -->
          <div v-if="isOrganization" class="space-y-8">
            <div class="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-100">
              <h3 class="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <span class="mr-2">🏢</span> Informazioni Organizzazione
              </h3>
              
              <div class="space-y-6">
                <!-- Enhanced Address Field -->
                <div class="relative group">
                  <label class="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                    <span class="mr-2">📍</span> Indirizzo (obbligatorio)
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <div class="w-5 h-5 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    </div>
                    <input 
                      v-model="profile.indirizzo"
                      class="enhanced-input pl-12"
                      type="text"
                      placeholder="Via Roma 123, 38122 Trento TN"
                      required
                    />
                  </div>
                </div>

                <!-- Enhanced Description Field -->
                <div class="relative group">
                  <label class="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                    <span class="mr-2">📝</span> Descrizione (obbligatorio)
                  </label>
                  <div class="relative">
                    <div class="absolute top-4 left-0 pl-4 flex items-start pointer-events-none">
                      <div class="w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    </div>
                    <textarea 
                      v-model="profile.descrizione"
                      class="enhanced-textarea pl-12"
                      placeholder="Descrivi di cosa si occupa la tua organizzazione..."
                      required
                      rows="4"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Enhanced User-specific fields -->
          <div v-if="!isOrganization" class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
            <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <span class="mr-2">👤</span> Preferenze Utente
            </h3>
            <div class="flex items-center space-x-3">
              <input 
                v-model="profile.posizione"
                type="checkbox"
                class="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-all duration-200"
              />
              <label class="text-sm font-medium text-gray-700 flex items-center">
                <span class="mr-2">📍</span> Condividi la mia posizione per segnalazioni più precise
              </label>
            </div>
          </div>
          
          <!-- Enhanced Action Buttons -->
          <div class="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 pt-8">
            <router-link 
              to="/profilo" 
              class="enhanced-btn-secondary flex items-center justify-center"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              ❌ Annulla
            </router-link>
            <button 
              type="submit" 
              class="enhanced-btn-primary flex items-center justify-center"
              :disabled="isSaving"
            >
              <svg v-if="isSaving" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span v-if="isSaving">🔄 Salvataggio...</span>
              <span v-else>💾 Salva Modifiche</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Enhanced Toast Container -->
    <transition name="slide-fade">
      <div class="fixed top-6 right-6 z-50 space-y-4">
        <!-- Enhanced Success Toast -->
        <div v-if="showSuccess" class="animate-bounce-in">
          <div class="bg-gradient-to-r from-emerald-400 via-green-500 to-teal-600 text-white rounded-2xl shadow-2xl p-6 flex items-center space-x-4 backdrop-blur-sm border border-green-300">
            <div class="w-10 h-10 bg-white bg-opacity-25 rounded-full flex items-center justify-center animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span class="font-semibold">✅ Profilo aggiornato con successo!</span>
          </div>
        </div>
        
        <!-- Enhanced Error Toast -->
        <div v-if="showError" class="animate-bounce-in">
          <div class="bg-gradient-to-r from-red-400 via-rose-500 to-pink-600 text-white rounded-2xl shadow-2xl p-6 flex items-center space-x-4 backdrop-blur-sm border border-red-300">
            <div class="w-10 h-10 bg-white bg-opacity-25 rounded-full flex items-center justify-center animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span class="font-semibold">❌ {{ errorMessage }}</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import api from '@/utils/api';

export default {
  name: 'EditProfile',
  data() {
    return {
      profile: {
        username: '',
        email: '',
        password: '',
        phone: '',
        indirizzo: '', // for organizations
        descrizione: '', // for organizations
        posizione: false // for users
      },
      userId: null,
      isOrganization: false,
      isSaving: false,
      showSuccess: false,
      showError: false,
      errorMessage: ''
    }
  },
  mounted() {
    const userData = sessionStorage.getItem('userData');
    
    if (userData) {
      const user = JSON.parse(userData);
      this.userId = user._id;
      this.isOrganization = user.accountType === 'organization' || user.accountType === 'org';
      
      // Set common fields
      this.profile.username = user.username;
      this.profile.email = user.email;
      this.profile.phone = user.phone || '';
      
      // Set organization-specific fields
      if (this.isOrganization) {
        this.profile.indirizzo = user.indirizzo || '';
        this.profile.descrizione = user.descrizione || '';
      } else {
        // Set user-specific fields
        this.profile.posizione = user.posizione || false;
      }
    }
  },
  methods: {
    async saveProfile() {
      this.isSaving = true;
      try {
        const updateData = {
          username: this.profile.username,
          email: this.profile.email,
          phone: this.profile.phone
        };
        
        // Add organization-specific fields
        if (this.isOrganization) {
          updateData.indirizzo = this.profile.indirizzo;
          updateData.descrizione = this.profile.descrizione;
        } else {
          // Add user-specific fields
          updateData.posizione = this.profile.posizione;
        }
        
        // Only include password if it's not empty
        if (this.profile.password) {
          updateData.password = this.profile.password;
        }

        // Use the correct endpoint based on account type
        const endpoint = this.isOrganization ? `/orgs/${this.userId}` : `/users/${this.userId}`;
        const response = await api.put(endpoint, updateData);
        
        if (response.status === 200) {
          // Update sessionStorage with the updated user/organization
          const updatedData = this.isOrganization ? response.data.organization : response.data.user;
          const originalUserData = JSON.parse(sessionStorage.getItem('userData'));
          updatedData.accountType = originalUserData.accountType;
          sessionStorage.setItem('userData', JSON.stringify(updatedData));
          
          // Show success animation
          this.showSuccess = true;
          
          // Redirect after 3 seconds
          setTimeout(() => {
            this.$router.push('/profilo');
          }, 3000);
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        
        // Show error message
        const errorMsg = error.response?.data?.message || error.message;
        this.errorMessage = `Errore: ${errorMsg}`;
        this.showError = true;
        
        // Auto-hide error after 5 seconds
        setTimeout(() => {
          this.showError = false;
        }, 5000);
      } finally {
        this.isSaving = false;
      }
    }
  }
}
</script>

<style scoped>
/* Enhanced Input Styles */
.enhanced-input {
  @apply w-full px-4 py-4 text-gray-900 bg-white border-2 border-gray-200 rounded-2xl shadow-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-20;
}
</style>
