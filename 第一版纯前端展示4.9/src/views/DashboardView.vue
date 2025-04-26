<template>
  <div class="dashboard">
    <div class="sidebar-overlay" v-if="!isCollapsed && !isHidden"></div>
    <aside class="sidebar" :class="{ 'collapsed': isCollapsed, 'hidden': isHidden }">
      <div class="logo">
        <h1>基于关键词匹配的</h1>
        <h1>三方隐私计算系统</h1>
      </div>

      <nav class="nav-menu">
        <div class="nav-group">
          <div class="nav-group-title" @click="toggleGroup('ip')">
            <i class="fas fa-chevron-down" :class="{ 'rotated': !isIpGroupCollapsed }"></i>
            <span>IP归属查询</span>
          </div>
          <div class="sub-items" :class="{ 'collapsed': isIpGroupCollapsed }">
            <router-link to="/dashboard/ip-query" class="nav-item sub-item">
              <i class="fas fa-search"></i>
              <span>IP归属查询</span>
            </router-link>
            <router-link to="/dashboard/ip-history" class="nav-item sub-item">
              <i class="fas fa-history"></i>
              <span>历史查询记录</span>
            </router-link>
          </div>
        </div>

        <div class="nav-group">
          <div class="nav-group-title" @click="toggleGroup('research')">
            <i class="fas fa-chevron-down" :class="{ 'rotated': !isResearchGroupCollapsed }"></i>
            <span>患者隐私查询</span>
          </div>
          <div class="sub-items" :class="{ 'collapsed': isResearchGroupCollapsed }">
            <router-link to="/dashboard/research-data" class="nav-item sub-item">
              <i class="fas fa-database"></i>
              <span>患者隐私信息查询</span>
            </router-link>
            <router-link to="/dashboard/research-history" class="nav-item sub-item">
              <i class="fas fa-history"></i>
              <span>历史查询记录</span>
            </router-link>
          </div>
        </div>

        <router-link to="/dashboard/user-management" class="nav-item">
          <i class="fas fa-users"></i>
          <span>用户管理</span>
        </router-link>
      </nav>

      <div class="user-info">
        <div class="user-details">
          <i class="fas fa-user-circle"></i>
          <span>{{ currentUser.name }}</span>
        </div>
        <button @click="handleLogout" class="logout-button">
          <i class="fas fa-sign-out-alt"></i>
          <span>退出登录</span>
        </button>
      </div>
    </aside>

    <main class="main-content" :class="{ 'expanded': isHidden }">
      <header class="header">
        <button @click="toggleSidebar" class="toggle-button">
          <i :class="isHidden ? 'fas fa-bars' : 'fas fa-times'"></i>
        </button>
        <div class="header-title">
          <h2>{{ currentRouteTitle }}</h2>
        </div>
      </header>

      <div class="content">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isCollapsed = ref(false)
const isHidden = ref(false)
const isIpGroupCollapsed = ref(true)
const isResearchGroupCollapsed = ref(true)
const currentUser = ref({})

const currentRouteTitle = computed(() => {
  const routeMap = {
    'ipQuery': 'IP归属查询',
    'ipHistory': 'IP查询历史',
    'researchData': '患者隐私信息查询',
    'researchHistory': '患者查询历史',
    'userManagement': '用户管理'
  }
  return routeMap[route.name] || '隐私计算系统'
})

const toggleSidebar = () => {
  isHidden.value = !isHidden.value
  isCollapsed.value = isHidden.value
}

const toggleGroup = (group) => {
  if (group === 'ip') {
    isIpGroupCollapsed.value = !isIpGroupCollapsed.value
  } else if (group === 'research') {
    isResearchGroupCollapsed.value = !isResearchGroupCollapsed.value
  }
}

const handleLogout = () => {
  localStorage.removeItem('user')
  router.push('/login')
}

onMounted(() => {
  const userStr = localStorage.getItem('user')
  if (userStr) {
    currentUser.value = JSON.parse(userStr)
  }
})
</script>

<style scoped>
.dashboard {
  display: flex;
  min-height: 100vh;
  background: #f8f9fa;
  position: relative;
  overflow-x: hidden;
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 280px;
  right: 0;
  bottom: 0;
  background: transparent;
  z-index: 999;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.sidebar.collapsed + .main-content .sidebar-overlay {
  left: 80px;
}

.sidebar {
  width: 280px;
  background: linear-gradient(180deg, #1a2634 0%, #2c3e50 100%);
  color: white;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.15);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1000;
  overflow-y: auto;
  transform: translateX(0);
  backdrop-filter: blur(10px);
}

.sidebar.collapsed {
  width: 80px;
}

.sidebar.hidden {
  transform: translateX(-100%);
  pointer-events: none;
}

.logo {
  padding: 1.2rem 1.5rem;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
  position: relative;
  overflow: hidden;
}

.logo::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(0, 102, 204, 0.1), rgba(0, 102, 204, 0));
  z-index: 0;
}

.logo h1 {
  font-size: 1.3rem;
  margin: 0.2rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: linear-gradient(45deg, #ffffff, #a8c7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.logo h1:first-child {
  font-size: 1.3rem;
  opacity: 0.95;
  margin-bottom: 0.1rem;
}

.nav-menu {
  flex: 1;
  padding: 1.5rem 0;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  font-weight: 500;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.08);
  color: white;
  transform: translateX(5px);
}

.nav-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 3px;
  background: linear-gradient(to bottom, #0066cc, #0099ff);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.nav-item:hover::before {
  transform: scaleY(1);
}

.nav-item i {
  margin-right: 1rem;
  width: 20px;
  text-align: center;
  font-size: 1.1rem;
  color: #0066cc;
}

.nav-group-title {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.nav-group-title:hover {
  background: rgba(255, 255, 255, 0.05);
  color: white;
}

.nav-group-title i {
  margin-right: 1rem;
  transition: transform 0.3s ease;
  color: #0066cc;
}

.nav-group-title i.rotated {
  transform: rotate(180deg);
}

.sub-items {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.3s ease;
  background: rgba(0, 0, 0, 0.1);
}

.sub-items:not(.collapsed) {
  max-height: 500px;
}

.sub-item {
  padding-left: 3rem;
  font-size: 0.95rem;
}

.user-info {
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2));
  backdrop-filter: blur(5px);
}

.user-details {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.user-details:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
}

.user-details i {
  margin-right: 1rem;
  font-size: 1.8rem;
  color: #0066cc;
}

.logout-button {
  width: 100%;
  padding: 0.8rem;
  background: rgba(255, 71, 87, 0.1);
  border: 1px solid rgba(255, 71, 87, 0.2);
  color: white;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-weight: 500;
}

.logout-button:hover {
  background: rgba(255, 71, 87, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 71, 87, 0.2);
}

.logout-button i {
  margin-right: 0.5rem;
  color: #ff4757;
}

.main-content {
  position: absolute;
  left: 280px;
  right: 0;
  top: 0;
  bottom: 0;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.main-content.expanded {
  left: 0;
}

.header {
  background: white;
  padding: 1.2rem;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  box-sizing: border-box;
}

.toggle-button {
  background: none;
  border: none;
  color: #2c3e50;
  font-size: 1.3rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.3s ease;
}

.toggle-button:hover {
  color: #0066cc;
  transform: scale(1.1);
}

.header-title {
  margin-left: 1.5rem;
}

.header-title h2 {
  margin: 0;
  font-size: 1.4rem;
  color: #2c3e50;
  font-weight: 600;
}

.content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  position: relative;
  width: 100%;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(0);
    transition: transform 0.3s ease;
  }

  .sidebar.collapsed {
    transform: translateX(-100%);
  }

  .main-content {
    margin-left: 0;
  }
}
</style>