<template>
  <div class="flex flex-row min-h-screen group">
    <AppSidebar class="w-64"
      :routes="routes"
      :current-route="$route.name"
      :isAuthenticated="isAuthenticated"
      :userAccountType="userAccountType"
      @navigate="navigateTo"
    />

    <!-- Main Content Area -->
    <div class="flex-1">
      <main class="transition-all duration-300 min-h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import AppSidebar from '@/components/layout/Sidebar.vue'
import { isAuthenticated, getUserAccountType } from '@/utils/auth'

export default {
  components: {
    AppSidebar
  },
  computed: {
    isAuthenticated() {
      return isAuthenticated.value
    },
    userAccountType() {
      return getUserAccountType()
    }
  },
  data() {
    return {
      routes: [
        { name: 'home', label: '🏠 Home' },
        { name: 'mappa', label: '🗺️ Mappa' },
        { name: 'segnalazioni', label: '⚠️ Segnalazioni' },
        { name: 'profilo', label: '👤 Profilo' },
        { name: 'pannello-controllo', label: '⚙️ Pannello di Controllo', requiresOrg: true },
        { name: 'login', label: '🔑 Login' }
      ]
    }
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed
    },
    navigateTo(route) {
      if (this.$route.name !== route.name) {
        this.$router.push({ name: route.name })
      }
    }
  }
}
</script>

<style scoped>
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
