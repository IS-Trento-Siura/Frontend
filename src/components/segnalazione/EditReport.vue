<template>
  <div class="min-h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500">
      <div class="max-w-4xl mx-auto">
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
                />
              </div>
              <div>
                <label class="block text-gray-700 font-bold mb-2">Descrizione</label>
                <textarea 
                  v-model="report.description"
                  class="input-field"
                  rows="4"
                  placeholder="Descrizione dettagliata"
                ></textarea>
              </div>
              <div>
                <label class="block text-gray-700 font-bold mb-2">Indirizzo</label>
                <input 
                  v-model="report.address"
                  class="input-field"
                  type="text"
                  placeholder="Indirizzo"
                />
              </div>
              <div>
                <label class="block text-gray-700 font-bold mb-2">Categoria</label>
                <select v-model="report.category" class="input-field">
                  <option value="illuminazione">Illuminazione</option>
                  <option value="strada">Strada</option>
                  <option value="rifiuti">Rifiuti</option>
                  <option value="verde">Verde pubblico</option>
                  <option value="altro">Altro</option>
                </select>
              </div>
              <div>
                <label class="block text-gray-700 font-bold mb-2">Stato</label>
                <select v-model="report.status" class="input-field">
                  <option value="new">Nuova</option>
                  <option value="in-progress">In lavorazione</option>
                  <option value="resolved">Risolto</option>
                </select>
              </div>
            </div>
            
            <div class="mt-8 flex justify-end space-x-4">
              <router-link to="/profilo" class="btn btn-secondary">Annulla</router-link>
              <button type="submit" class="btn btn-primary">Salva Modifiche</button>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
import api from '@/utils/api';

export default {
  name: 'EditReport',
  data() {
    return {
      report: {
        title: '',
        description: '',
        address: '',
        category: '',
        status: ''
      },
      loading: false,
      error: null
    }
  },
  async mounted() {
    try {
      this.loading = true;
      const reportId = this.$route.params.id;
      const token = localStorage.getItem('authToken');
      
      const response = await api.get(`/reports/${reportId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      this.report = response.data;
    } catch (error) {
      this.error = 'Errore nel caricamento della segnalazione';
      console.error('Error loading report:', error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async saveReport() {
      try {
        this.loading = true;
        this.error = null;
        const reportId = this.$route.params.id;
        const token = localStorage.getItem('authToken');
        
        await api.patch(`/reports/${reportId}`, this.report, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Emit global event that report was updated
        window.dispatchEvent(new CustomEvent('report-updated', {
          detail: { reportId }
        }));
        
        this.$router.push('/profilo');
      } catch (error) {
        this.error = error.response?.data?.message || 'Errore durante il salvataggio';
        console.error('Error saving report:', error);
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
}

.btn-primary {
  background-color: #3B82F6;
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #2563EB;
}

.btn-secondary {
  background-color: white;
  color: #3B82F6;
  border: 1px solid #3B82F6;
}

.btn-secondary:hover {
  background-color: #EFF6FF;
}
</style>
