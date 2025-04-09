<template>
  <div class="dashboard">
    <aside class="sidebar" :class="{ 'collapsed': isCollapsed }">
      <div class="logo">
<!--         <h1>CloakGuard-Tripartite Private Keyword Retrieval</h1>-->
        <h1>基于关键词匹配的三方隐私信息检索系统</h1>
      </div>

      <nav class="nav-menu">
        <router-link to="/dashboard/principle" class="nav-item">
          <i class="fas fa-lightbulb"></i>
          <span>隐私计算流程</span>
        </router-link>

        <router-link to="/dashboard/principle-section" class="nav-item">
          <i class="fas fa-circle-info"></i>
          <span>核心技术支撑</span>
        </router-link>
        
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
            <span>医疗数据查询</span>
          </div>
          <div class="sub-items" :class="{ 'collapsed': isResearchGroupCollapsed }">
            <router-link to="/dashboard/research-data" class="nav-item sub-item">
              <i class="fas fa-database"></i>
              <span>医疗数据信息查询</span>
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
      </header>

      <div class="content">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isCollapsed = ref(false)
const isIpGroupCollapsed = ref(true)
const isResearchGroupCollapsed = ref(true)
const currentUser = ref({})

onMounted(() => {
  const userStr = localStorage.getItem('user')
  if (userStr) {
    currentUser.value = JSON.parse(userStr)
  }
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
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  position: fixed;
  height: 100vh;
  z-index: 1000;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.sidebar.collapsed {
  width: 0;
  transform: translateX(-100%);
  overflow: hidden;
  pointer-events: none;
}

.logo {
  padding: 1.5rem;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  white-space: normal;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.1);
}

.logo h1 {
  margin: 0;
  font-size: 1rem;
  line-height: 1.4;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  letter-spacing: 0.3px;
  padding: 0 0.5rem;
  word-break: break-word;
}

.logo p {
  margin: 0.5rem 0 0;
  font-size: 0.85rem;
  opacity: 0.85;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
  padding: 0 0.5rem;
  word-break: break-word;
}

.sidebar.collapsed .logo h1,
.sidebar.collapsed .logo p,
.sidebar.collapsed .nav-item span,
.sidebar.collapsed .nav-group-title span,
.sidebar.collapsed .user-details span,
.sidebar.collapsed .logout-button span {
  display: none;
}

.sidebar.collapsed .nav-item,
.sidebar.collapsed .nav-group-title,
.sidebar.collapsed .user-details,
.sidebar.collapsed .logout-button {
  padding: 0.8rem;
  justify-content: center;
}

.sidebar.collapsed .nav-item i,
.sidebar.collapsed .nav-group-title i,
.sidebar.collapsed .user-details i,
.sidebar.collapsed .logout-button i {
  margin-right: 0;
}

.nav-menu {
  flex: 1;
  padding: 1rem 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.8rem 1.5rem;
  color: white;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav-item.router-link-active {
  background: rgba(255, 255, 255, 0.2);
}

.nav-item i {
  width: 20px;
  margin-right: 10px;
}

.nav-group {
  margin-bottom: 0.5rem;
}

.nav-group-title {
  display: flex;
  align-items: center;
  padding: 0.8rem 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 0.2rem;
}

.nav-group-title:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav-group-title i {
  width: 20px;
  margin-right: 10px;
  transition: transform 0.3s ease;
}

.nav-group-title i.rotated {
  transform: rotate(180deg);
}

.sub-items {
  transition: max-height 0.3s ease-in-out;
  max-height: 200px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 0 0 4px 4px;
}

.sub-items.collapsed {
  max-height: 0;
}

.sub-item {
  padding-left: 3rem;
  margin: 0.1rem 0;
  opacity: 0.9;
}

.sub-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.sub-item.router-link-active {
  background: rgba(255, 255, 255, 0.08);
}

.user-info {
  padding: 1.2rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: left;
}

.user-details {
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
  padding-left: 0.5rem;
}

.user-details i {
  margin-right: 0.8rem;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
}

.user-details span {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

.logout-button {
  width: 90%;
  margin-left: 0.5rem;
  padding: 0.6rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.logout-button:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
}

.logout-button i {
  margin-right: 0.6rem;
  font-size: 0.9rem;
}

.main-content {
  flex: 1;
  background: #f5f6fa;
  margin-left: 250px;
  transition: margin-left 0.3s ease;
}

.sidebar.collapsed + .main-content {
  margin-left: 0;
}

.header {
  background: white;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.toggle-button {
  background: transparent;
  border: none;
  font-size: 1.0rem;
  cursor: pointer;
  color: #2c3e50;
}


.content {
  padding: 2rem;
}


.sidebar.collapsed .nav-menu,
.sidebar.collapsed .user-info {
  opacity: 0;
  visibility: hidden;
}

.sidebar.collapsed .logo {
  opacity: 0;
  visibility: hidden;
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(0);
  }

  .sidebar.collapsed {
    transform: translateX(-190px);
  }

  .main-content {
    margin-left: 0;
  }

  .sidebar.collapsed + .main-content {
    margin-left: 0;
  }
}
</style>