import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../components/LoginForm.vue';
import Home from '../view/Home.vue';
import Planning from '../view/PlanningPage.vue';
import Notes from '../view/NotesPages.vue';
import Actualites from '../view/ActualitesPage.vue';
import AdminPanel from '../view/Admin-panel.vue';
import { useAuthStore } from '../stores/uthStore';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: LoginForm },
  { path: '/planning', name: 'planning', component: Planning },
  { path: '/notes', name: 'notes', component: Notes },
  { path: '/actualites', name: 'actualites', component: Actualites },
  { path: '/home', name: 'home', component: Home },
  {
    path: '/admin-panel',
    name: 'admin-panel',
    component: AdminPanel,
    meta: { requiresAuth: true, role: 'admin' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isLoggedIn = !!authStore.userRole;
  const userRole = authStore.userRole;

  if (to.meta.requiresAuth && !isLoggedIn) {
    return next({ name: 'login' });
  }

  if (to.meta.role && to.meta.role !== userRole) {
    return next({ name: 'home' });
  }

  if (to.name === 'login' && isLoggedIn) {
    return next({ name: 'home' });
  }

  next();
});

export default router;
