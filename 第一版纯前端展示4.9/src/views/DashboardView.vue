<template>
  <div class="dashboard">
    <aside class="sidebar" :class="{ 'collapsed': isCollapsed }">
      <div class="logo">
        <h1>隐私计算系统</h1>
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

    <main class="main-content">
      <header class="header">
        <button @click="toggleSidebar" class="toggle-button">
          <i :class="isCollapsed ? 'fas fa-bars' : 'fas fa-times'"></i>
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
  isCollapsed.value = !isCollapsed.value
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
}

.sidebar {
  width: 250px;
  background: #2c3e50;
  color: white;
  transition: width 0.3s;
  display: flex;
  flex-direction: column;
}

.sidebar.collapsed {
  width: 60px;
}

.logo {
  padding: 1rem;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo h1 {
  font-size: 1.2rem;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-menu {
  flex: 1;
  padding: 1rem 0;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.8rem 1.5rem;
  color: white;
  text-decoration: none;
  transition: background 0.3s;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav-item i {
  margin-right: 1rem;
  width: 20px;
  text-align: center;
}

.nav-group-title {
  display: flex;
  align-items: center;
  padding: 0.8rem 1.5rem;
  cursor: pointer;
}

.nav-group-title i {
  margin-right: 1rem;
  transition: transform 0.3s;
}

.nav-group-title i.rotated {
  transform: rotate(180deg);
}

.sub-items {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.3s;
}

.sub-items:not(.collapsed) {
  max-height: 500px;
}

.sub-item {
  padding-left: 2.5rem;
}

.user-info {
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.user-details {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.user-details i {
  margin-right: 1rem;
  font-size: 1.5rem;
}

.logout-button {
  width: 100%;
  padding: 0.5rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}

.logout-button:hover {
  background: rgba(255, 255, 255, 0.1);
}

.logout-button i {
  margin-right: 0.5rem;
}

.main-content {
  flex: 1;
  background: #f5f6fa;
  display: flex;
  flex-direction: column;
}

.header {
  background: white;
  padding: 1rem;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.toggle-button {
  background: none;
  border: none;
  color: #2c3e50;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
}

.header-title {
  margin-left: 1rem;
}

.header-title h2 {
  margin: 0;
  font-size: 1.2rem;
  color: #2c3e50;
}

.content {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
  }

  .main-content {
    margin-left: 250px;
  }

  .sidebar.collapsed {
    width: 0;
  }

  .sidebar.collapsed + .main-content {
    margin-left: 0;
  }
}
</style>