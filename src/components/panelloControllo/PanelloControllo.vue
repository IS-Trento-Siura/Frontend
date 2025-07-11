<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-400 via-indigo-600 to-purple-700 py-12">
    <!-- Header -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-10">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h1 class="text-4xl font-bold text-white mb-2">Pannello di Controllo</h1>
        <p class="text-xl text-indigo-100">Gestione Organizzazione</p>
      </div>

      <!-- Notification -->
      <div v-if="notification.show" class="fixed top-4 right-4 z-50 animate-slide-in">
        <div :class="[
          'p-4 rounded-lg shadow-lg flex items-center space-x-3',
          notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        ]">
          <svg v-if="notification.type === 'success'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          <span>{{ notification.message }}</span>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100 text-blue-600">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Utenti Registrati</p>
              <p class="text-2xl font-bold text-gray-900">{{ users.length }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Segnalazioni Totali</p>
              <p class="text-2xl font-bold text-gray-900">{{ reports.length }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-red-100 text-red-600">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">In Attesa</p>
              <p class="text-2xl font-bold text-gray-900">{{ pendingReports }}</p>
            </div>
          </div>
        </div>
        
        <!-- Nuova card per segnalazioni in corso -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-orange-100 text-orange-600">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">In Corso</p>
              <p class="text-2xl font-bold text-gray-900">{{ inProgressReports }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <!-- Tabs -->
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8 px-6">
            <button 
              @click="activeTab = 'reports'"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm',
                activeTab === 'reports' 
                  ? 'border-indigo-500 text-indigo-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Gestione Segnalazioni
            </button>
            <button 
              @click="activeTab = 'users'"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm',
                activeTab === 'users' 
                  ? 'border-indigo-500 text-indigo-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Gestione Utenti
            </button>
          </nav>
        </div>

        <!-- Gestione Segnalazioni -->
        <div v-if="activeTab === 'reports'" class="p-6">
          <div class="mb-4 flex justify-between items-center">
            <h3 class="text-lg font-semibold text-gray-900">Gestione Segnalazioni</h3>
            <div class="flex items-center space-x-4">
              <!-- Filtro per stato -->
              <div class="flex items-center space-x-2">
                <label class="text-sm font-medium text-gray-700">Stato:</label>
                <select v-model="reportFilter" class="border border-gray-300 rounded px-3 py-1 text-sm">
                  <option value="all">Tutte</option>
                  <option value="pending">In Attesa</option>
                  <option value="in_progress">In Corso</option>
                  <option value="resolved">Risolte</option>
                </select>
              </div>
              
              <!-- Filtro per categoria -->
              <div class="flex items-center space-x-2">
                <label class="text-sm font-medium text-gray-700">Categoria:</label>
                <select v-model="categoryFilter" class="border border-gray-300 rounded px-3 py-1 text-sm">
                  <option value="all">Tutte</option>
                  <option value="Sicurezza">Sicurezza</option>
                  <option value="Infrastrutture">Infrastrutture</option>
                  <option value="Ambiente">Ambiente</option>
                  <option value="Traffico">Traffico</option>
                  <option value="Altro">Altro</option>
                </select>
              </div>
              
              <!-- Filtro per data -->
              <div class="flex items-center space-x-2">
                <label class="text-sm font-medium text-gray-700">Data:</label>
                <input 
                  v-model="dateFilter" 
                  type="date" 
                  class="border border-gray-300 rounded px-3 py-1 text-sm"
                />
                <button 
                  @click="clearDateFilter" 
                  class="text-sm text-gray-500 hover:text-gray-700"
                >
                  Cancella
                </button>
              </div>
            </div>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titolo</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utente</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stato</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrizione</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Azioni</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="report in filteredReports" :key="report._id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ report.title }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ report.username || 'Utente sconosciuto' }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {{ report.category }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <select 
                      v-model="report.status" 
                      @change="updateReportStatus(report)"
                      :class="[
                        'text-sm border border-gray-300 rounded px-2 py-1 font-semibold',
                        getStatusColor(report.status)
                      ]"
                    >
                      <option value="pending">In Attesa</option>
                      <option value="in_progress">In Corso</option>
                      <option value="resolved">Risolto</option>
                    </select>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button 
                      @click="showDescriptionModal(report)"
                      class="text-indigo-600 hover:text-indigo-900 underline cursor-pointer"
                    >
                      Visualizza descrizione
                    </button>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      @click="deleteReport(report._id)"
                      class="text-red-600 hover:text-red-900 ml-2"
                    >
                      Elimina
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Gestione Utenti -->
        <div v-if="activeTab === 'users'" class="p-6">
          <div class="mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Gestione Utenti</h3>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stato</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Segnalazioni</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Azioni</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="user in users" :key="user._id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ user.username }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.email }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                      user.status === 'sospeso' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    ]">
                      {{ user.status === 'sospeso' ? 'Sospeso' : 'Attivo' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ getUserReportsCount(user._id) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button 
                      v-if="user.status !== 'sospeso'"
                      @click="suspendUser(user._id)"
                      class="text-yellow-600 hover:text-yellow-900"
                    >
                      Sospendi
                    </button>
                    <button 
                      v-else
                      @click="reactivateUser(user._id)"
                      class="text-green-600 hover:text-green-900"
                    >
                      Riattiva
                    </button>
                    <button 
                      @click="deleteUser(user._id)"
                      class="text-red-600 hover:text-red-900"
                    >
                      Elimina
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal per la descrizione -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click="closeModal">
      <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 shadow-lg rounded-md bg-white" @click.stop>
        <div class="mt-3">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-900">Descrizione Segnalazione</h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div class="mb-4">
            <h4 class="font-semibold text-gray-800 mb-2">{{ selectedReport?.title }}</h4>
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="text-gray-700 leading-relaxed">{{ selectedReport?.description }}</p>
            </div>
          </div>
          <div class="flex justify-between items-center text-sm text-gray-500">
            <span>Categoria: <strong>{{ selectedReport?.category }}</strong></span>
            <span>Data: <strong>{{ formatDate(selectedReport?.date) }}</strong></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PanelloControllo',
  data() {
    return {
      activeTab: 'reports',
      reportFilter: 'all',
      categoryFilter: 'all',  // ← Aggiungi questa riga
      dateFilter: '',         // ← Aggiungi questa riga
      users: [],
      reports: [],
      showModal: false,
      selectedReport: null,
      notification: {
        show: false,
        type: 'success',
        message: ''
      }
    }
  },
  computed: {
    filteredReports() {
      let filtered = this.reports
      
      // Filtro per stato
      if (this.reportFilter !== 'all') {
        filtered = filtered.filter(report => report.status === this.reportFilter)
      }
      
      // Filtro per categoria
      // Nel computed filteredReports (circa linea 330)
      if (this.categoryFilter !== 'all') {
      filtered = filtered.filter(report => report.category === this.categoryFilter)  // ✅ Questo rimarrà category perché ora mappiamo correttamente
      }
      
      // Filtro per data
      if (this.dateFilter) {
        filtered = filtered.filter(report => {
          const reportDate = new Date(report.date).toISOString().split('T')[0]
          return reportDate === this.dateFilter
        })
      }
      
      return filtered
    },
    pendingReports() {
      return this.reports.filter(report => report.status === 'pending').length
    },
    inProgressReports() {
      return this.reports.filter(report => report.status === 'in_progress').length
    }
  },
  async mounted() {
    await this.loadData()
  },
  methods: {
    async loadData() {
      try {
        await Promise.all([
          this.fetchUsers(),
          this.fetchReports()
        ])
      } catch (error) {
        this.showNotification('Errore nel caricamento dei dati', 'error')
      }
    },
    
    async fetchUsers() {
      try {
        const token = sessionStorage.getItem('authToken')
        const response = await fetch('/api/orgs', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        
        if (response.ok) {
          const data = await response.json()
          this.users = data.users  
        }
      } catch (error) {
        console.error('Errore nel recupero utenti:', error)
      }
    },
    
    async fetchReports() {
      try {
        const token = sessionStorage.getItem('authToken')
        // Usa la nuova API che mostra solo segnalazioni degli utenti
        const response = await fetch('/api/reports/users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        
        if (response.ok) {
          const data = await response.json()
          // Nel metodo fetchReports (circa linea 410)
          this.reports = data.map(report => ({
            _id: report._id,
            title: report.title,
            description: report.description,
            category: report.tags,  // ✅ Cambia da report.category a report.tags
            status: report.status,
            date: report.createdAt,
            user: report.user._id,
            username: report.user.username
          }))
        } else {
          this.showNotification('Errore nel caricamento delle segnalazioni', 'error')
        }
      } catch (error) {
        console.error('Errore nel recupero segnalazioni:', error)
        this.showNotification('Errore nel recupero delle segnalazioni', 'error')
      }
    },
    
    async updateReportStatus(report) {
      try {
        const token = sessionStorage.getItem('authToken')
        
        // Trova il report completo per ottenere tutti i campi necessari
        const fullReport = this.reports.find(r => r._id === report._id)
        
        const response = await fetch(`/api/orgs/reports/${report._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            reportData: { 
              status: report.status,
              tags: fullReport.category, // Include il campo tags obbligatorio
              title: fullReport.title,
              description: fullReport.description
            }
          })
        })
        
        if (response.ok) {
          this.showNotification('Stato segnalazione aggiornato', 'success')
        } else {
          const errorData = await response.json()
          console.error('Errore aggiornamento:', errorData)
          this.showNotification('Errore nell\'aggiornamento', 'error')
        }
      } catch (error) {
        console.error('Errore aggiornamento:', error)
        this.showNotification('Errore nell\'aggiornamento', 'error')
      }
    },
    
    async deleteReport(reportId) {
      if (!confirm('Sei sicuro di voler eliminare questa segnalazione?')) return
      
      try {
        const token = sessionStorage.getItem('authToken')
        const response = await fetch(`/api/orgs/reports/${reportId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        
        if (response.ok) {
          this.reports = this.reports.filter(r => r._id !== reportId)
          this.showNotification('Segnalazione eliminata', 'success')
        } else {
          this.showNotification('Errore nell\'eliminazione', 'error')
        }
      } catch (error) {
        this.showNotification('Errore nell\'eliminazione', 'error')
      }
    },
    
    async suspendUser(userId) {
      if (!confirm('Sei sicuro di voler sospendere questo utente?')) return
      
      try {
        const token = sessionStorage.getItem('authToken')
        const response = await fetch(`/api/orgs/users/${userId}/suspend`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        
        if (response.ok) {
          const user = this.users.find(u => u._id === userId)
          if (user) user.status = 'suspended'
          this.showNotification('Utente sospeso', 'success')
        } else {
          this.showNotification('Errore nella sospensione', 'error')
        }
      } catch (error) {
        this.showNotification('Errore nella sospensione', 'error')
      }
    },
    
    async reactivateUser(userId) {
      try {
        const token = sessionStorage.getItem('authToken')
        const response = await fetch(`/api/orgs/users/${userId}/reactivate`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        
        if (response.ok) {
          const user = this.users.find(u => u._id === userId)
          if (user) user.status = 'active'
          this.showNotification('Utente riattivato', 'success')
        } else {
          this.showNotification('Errore nella riattivazione', 'error')
        }
      } catch (error) {
        this.showNotification('Errore nella riattivazione', 'error')
      }
    },
    
    async deleteUser(userId) {
      if (!confirm('Sei sicuro di voler eliminare questo utente? Questa azione è irreversibile.')) return
      
      try {
        const token = sessionStorage.getItem('authToken')
        const response = await fetch(`/api/orgs/users/${userId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        
        if (response.ok) {
          this.users = this.users.filter(u => u._id !== userId)
          this.showNotification('Utente eliminato', 'success')
        } else {
          this.showNotification('Errore nell\'eliminazione', 'error')
        }
      } catch (error) {
        this.showNotification('Errore nell\'eliminazione', 'error')
      }
    },
    
    getUserName(userId) {
      // Se il report ha già il nome utente popolato, usalo
      const report = this.reports.find(r => r.user === userId)
      if (report && report.username) {
        return report.username
      }
      
      // Altrimenti cerca nell'array users
      const user = this.users.find(u => u._id === userId)
      return user ? user.username : 'Utente sconosciuto'
    },
    
    getUserReportsCount(userId) {
      return this.reports.filter(r => r.user === userId).length
    },
    
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('it-IT')
    },
    
    getStatusColor(status) {
      switch(status) {
        case 'pending':
          return 'bg-red-100 text-red-800 border-red-300'
        case 'in_progress':
          return 'bg-yellow-100 text-yellow-800 border-yellow-300'
        case 'resolved':
          return 'bg-green-100 text-green-800 border-green-300'
        default:
          return 'bg-gray-100 text-gray-800 border-gray-300'
      }
    },
    
    showDescriptionModal(report) {
      this.selectedReport = report
      this.showModal = true
    },
    
    clearDateFilter() {
      this.dateFilter = ''
    },
    
    closeModal() {
      this.showModal = false
      this.selectedReport = null
    },
    
    showNotification(message, type = 'success') {
      this.notification = {
        show: true,
        type,
        message
      }
      
      setTimeout(() => {
        this.notification.show = false
      }, 3000)
    }
  }
}
</script>

<style scoped>
.animate-slide-in {
  animation: slideIn 0.3s ease-out;
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