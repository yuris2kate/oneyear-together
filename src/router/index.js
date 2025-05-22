import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/warning',
      name: 'warning',
      component: () => import('../views/ScreenWarning.vue'),
    },
    {
      path: "/",
      redirect: () => {
        return localStorage.getItem("screenWarning") ? "/home" : "/warning";
      }
    },
    {
      path: '/momentos',
      name: 'momentos',
      component: () => import('../views/Momentos.vue'),
    },
    {
      path: '/whatsapp',
      name: 'whatsapp',
      component: () => import('../views/Whatsapp.vue'),
    },
    {
      path: '/analytics',
      name: 'analytics',
      component: () => import('../views/AnalyticsPage.vue'),
    },
    {
      path: '/enigma',
      name: 'enigma',
      component: () => import('../views/EnigmaPage.vue'),
    }
  ],
})

export default router
