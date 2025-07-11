<template>
  <div>
    <aside class="w-64 fixed h-full">
      <nav class="p-4 space-y-2">
        <router-link
          v-for="route in visibleRoutes"
          :key="route.name"
          :to="{ name: route.name }"
          class="w-full block text-left p-2 rounded-lg transform-none"
          :class="{ 'bg-blue-100': $route.name === route.name }"
        >
          {{ route.label }}
        </router-link>
      </nav>
    </aside>
  </div>
</template>

<script>
export default {
  props: {
    routes: Array,
    isAuthenticated: Boolean,
    userAccountType: String
  },
  data() {
    return {
      visibleRoutes: []
    };
  },
  watch: {
    isAuthenticated: {
      immediate: true,
      handler() {
        this.updateVisibleRoutes();
      }
    },
    userAccountType: {
      immediate: true,
      handler() {
        this.updateVisibleRoutes();
      }
    }
  },
  methods: {
    updateVisibleRoutes() {
      this.visibleRoutes = this.routes.filter(route => {
        // Show login only when not authenticated
        if (route.name === 'login') {
          return !this.isAuthenticated;
        }
        
        // Show pannello-controllo only for org users
        if (route.requiresOrg) {
          return this.isAuthenticated && this.userAccountType === 'org';
        }
        
        return true;
      });
    }
  }
};
</script>
