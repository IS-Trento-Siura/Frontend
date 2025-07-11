<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-400 via-indigo-600 to-purple-700">
    <div class="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      <!-- Header with icon -->
      <div class="text-center mb-10">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800">Modifica Profilo</h1>
        <p class="text-white mt-2">{{ isOrganization ? 'Aggiorna le informazioni della tua organizzazione' : 'Aggiorna le tue informazioni personali' }}</p>
      </div>

      <!-- Profile Form -->
      <div class="bg-white rounded-2xl shadow-xl p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl">
        <form @submit.prevent="saveProfile">
          <div class="space-y-6">
            <!-- Username Field -->
            <div class="relative">
              <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input 
                  v-model="profile.username"
                  class="pl-10 input-field"
                  type="text"
                  placeholder="Il tuo username"
                  required
                />
              </div>
            </div>

            <!-- Email Field -->
            <div class="relative">
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input 
                  v-model="profile.email"
                  class="pl-10 input-field"
                  type="email"
                  placeholder="tua@email.com"
                  required
                />
              </div>
            </div>

            <!-- Phone Field (for both users and organizations) -->
            <div class="relative">
              <label class="block text-sm font-medium text-gray-700 mb-1">Telefono {{ isOrganization ? '(obbligatorio)' : '(opzionale)' }}</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <input 
                  v-model="profile.phone"
                  class="pl-10 input-field"
                  type="tel"
                  placeholder="+39 123 456 7890"
                  :required="isOrganization"
                />
              </div>
            </div>

            <!-- Organization-specific fields -->
            <div v-if="isOrganization" class="space-y-6">
              <!-- Address Field -->
              <div class="relative">
                <label class="block text-sm font-medium text-gray-700 mb-1">Indirizzo (obbligatorio)</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <input 
                    v-model="profile.indirizzo"
                    class="pl-10 input-field"
                    type="text"
                    placeholder="Via Roma 123, 38122 Trento TN"
                    required
                  />
                </div>
              </div>

              <!-- Description Field -->
              <div class="relative">
                <label class="block text-sm font-medium text-gray-700 mb-1">Descrizione (obbligatorio)</label>
                <div class="relative">
                  <div class="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <textarea 
                    v-model="profile.descrizione"
                    class="pl-10 input-field textarea-field"
                    placeholder="Descrivi di cosa si occupa la tua organizzazione..."
                    required
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- User-specific fields -->
            <div v-if="!isOrganization" class="space-y-6">
              <!-- Position Checkbox -->
              <div class="relative">
                <div class="flex items-center">
                  <input 
                    v-model="profile.posizione"
                    type="checkbox"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>

            <!-- Password Field -->
            <div class="relative">
              <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input 
                  v-model="profile.password"
                  class="pl-10 input-field"
                  type="password"
                  placeholder="Nuova password (opzionale)"
                />
              </div>
              <p class="mt-1 text-sm text-gray-500">Lascia vuoto per mantenere la password attuale</p>
            </div>
          </div>
          
          <div class="mt-10 flex justify-end space-x-4">
            <router-link to="/profilo" class="btn btn-secondary transition-transform hover:-translate-y-0.5">
              Annulla
            </router-link>
            <button type="submit" class="btn btn-primary transition-transform hover:-translate-y-0.5 flex items-center">
              <svg v-if="isSaving" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span v-if="isSaving">Salvataggio...</span>
              <span v-else">Salva Modifiche</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Toast Container -->
    <transition name="slide-fade">
      <div class="fixed top-6 right-6 z-50 space-y-4">
        <!-- Success Toast -->
        <div v-if="showSuccess" class="animate-pulse-once">
          <div class="bg-green-500 text-white rounded-xl shadow-lg p-4 flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Profilo aggiornato con successo!</span>
          </div>
        </div>
        
        <!-- Error Toast -->
        <div v-if="showError" class="animate-pulse-once">
          <div class="bg-red-500 text-white rounded-xl shadow-lg p-4 flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ errorMessage }}</span>
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
.input-field {
  width: 100%;
  padding: 12px 16px 12px 40px;
  border-radius: 12px;
  border: 1px solid #E2E8F0;
  background-color: #F8FAFC;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 16px;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.03);
}

.input-field:focus {
  outline: none;
  border-color: #818CF8;
  box-shadow: 0 0 0 4px rgba(129, 140, 248, 0.2), inset 0 2px 4px rgba(0,0,0,0.03);
}

.btn {
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-primary {
  background: linear-gradient(to right, #4F46E5, #7C3AED);
  color: white;
  border: none;
  box-shadow: 0 4px 6px rgba(79, 70, 229, 0.3);
}

.btn-primary:hover {
  background: linear-gradient(to right, #4338CA, #6D28D9);
  box-shadow: 0 6px 8px rgba(79, 70, 229, 0.4);
  transform: translateY(-2px);
}

.btn-secondary {
  background: white;
  color: #4F46E5;
  border: 2px solid #E0E7FF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.btn-secondary:hover {
  background: #F1F5F9;
  border-color: #C7D2FE;
  transform: translateY(-2px);
}

/* Success toast animation */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

/* Pulse animation for success toast */
@keyframes pulse-once {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
.animate-pulse-once {
  animation: pulse-once 0.5s ease-in-out;
}
.textarea-field {
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  line-height: 1.5;
  padding-top: 12px;
}
</style>
