import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from "../views/DashboardView.vue";
import IpQueryView from "@/views/IpQueryView.vue";
import IpHistoryView from "@/views/IpHistoryView.vue";
import ResearchDataView from "@/views/ResearchDataView.vue";
import ResearchHistoryView from "@/views/ResearchHistoryView.vue";
import UserManagementView from "@/views/UserManagementView.vue";
import LandingPage from "@/views/LandingPage.vue";
import QueryDetailView from "@/views/QueryDetailView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPage
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
      meta: { requiresAuth: true },
      children: [
        // {
        //   path: 'principle',
        //   name: 'principle',
        //   component: PrincipleView
        // },
        // {
        //   path: 'principle-section',
        //   name: 'principleSection',
        //   component: PrincipleSectionView
        // },
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
        },
        {
          path: 'query-detail/:id',
          name: 'queryDetail',
          component: QueryDetailView
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user')
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
