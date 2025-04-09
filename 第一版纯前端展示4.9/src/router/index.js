import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from "../views/DashboardView.vue";
import PrincipleView from "../views/PrincipleView.vue";
import IpQueryView from "@/views/IpQueryView.vue";
import IpHistoryView from "@/views/IpHistoryView.vue";
import ResearchDataView from "@/views/ResearchDataView.vue";
import ResearchHistoryView from "@/views/ResearchHistoryView.vue";
import UserManagementView from "@/views/UserManagementView.vue";
import PrincipleSectionView from "@/views/PrincipleSectionView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      children: [
        {
          path: 'principle',
          name: 'principle',
          component: PrincipleView
        },
        {
          path: 'principle-section',
          name: 'principleSection',
          component: PrincipleSectionView
        },
        {
          path: 'ip-query',
          name: 'ipQuery',
          component: IpQueryView
        },
        {
          path: 'ip-history',
          name: 'ipHistory',
          component: IpHistoryView
        },
        {
          path: 'research-data',
          name: 'researchData',
          component: ResearchDataView
        },
        {
          path: 'research-history',
          name: 'researchHistory',
          component: ResearchHistoryView
        },
        {
          path: 'user-management',
          name: 'userManagement',
          component: UserManagementView
        }
      ]
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user')
  if (to.path !== '/login' && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
