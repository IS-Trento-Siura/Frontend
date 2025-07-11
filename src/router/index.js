import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '@/utils/auth'

const routes = [
  {
    path: '/mappa',
    name: 'mappa',
    component: () => import('@/components/mappa/Mappa.vue'),
    meta: { title: 'Mappa' }
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/components/home/Home.vue'),
    meta: { title: 'Home' }
  },
  {
    path: '/segnalazioni',
    name: 'segnalazioni',
    component: () => import('@/components/segnalazione/Segnalazioni.vue'),
    meta: { title: 'Segnalazioni' }
  },
  {
    path: '/segnalazioni/:id',
    name: 'segnalazione-details',
    component: () => import('@/components/segnalazione/Segnalazioni.vue'),
    meta: { title: 'Dettaglio Segnalazione' }
  },
  {
    path: '/segnalazioni/edit/:id',
    name: 'edit-report',
    component: () => import('@/components/segnalazione/EditReport.vue'),
    meta: { title: 'Modifica Segnalazione' }
  },
  {
    path: '/mappa/edit/:id',
    name: 'edit-map-marker',
    component: () => import('@/components/segnalazione/EditReport.vue'),
    meta: { title: 'Modifica Marker' }
  },
  {
    path: '/profilo',
    name: 'profilo',
    component: () => import('@/components/profilo/Profilo.vue'),
    meta: { title: 'Profilo Utente' }
  },
  {
    path: '/profilo/edit',
    name: 'edit-profile',
    component: () => import('@/components/profilo/EditProfile.vue'),
    meta: { title: 'Modifica Profilo' }
  },
  {
    path: '/pannello-controllo',
    name: 'pannello-controllo',
    component: () => import('@/components/panelloControllo/PanelloControllo.vue'),
    meta: { title: 'Pannello di Controllo' }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/login/Login.vue'),
    meta: { title: 'Login' }
  },
  {
    path: '/registrazione',
    name: 'registrazione',
    component: () => import('@/components/login/Registrazione.vue'),
    meta: { title: 'Registrazione' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} | TrentoSicura` : 'TrentoSicura'

  // Prevent authenticated users from accessing login/registration pages
  if ((to.name === 'login' || to.name === 'registrazione') && isAuthenticated.value) {
    next({ name: 'home' })
    return
  }

  next()
})

export default router
