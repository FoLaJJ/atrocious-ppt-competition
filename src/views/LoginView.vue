<template>
  <div class="login-container">
    <!-- 返回按钮 -->
    <button class="back-button" @click="handleBack">
      <i class="fas" :class="selectedScene ? 'fa-arrow-left' : 'fa-home'"></i>
      <span>{{ selectedScene ? '返回' : '返回首页' }}</span>
    </button>

    <!-- 场景提示 -->
    <div v-if="selectedScene" class="scene-indicator">
      <i :class="selectedScene === 'education' ? 'fas fa-graduation-cap' : 'fas fa-hospital'"></i>
      <span>{{ selectedScene === 'education' ? '教育场景' : '医疗场景' }}</span>
    </div>

    <!-- 场景选择部分 -->
    <div v-if="!selectedScene" class="scene-selection-container">
      <h1 class="title">CloakGuard: Tripartite Private Keyword Retrieval</h1>
      <h2 class="subtitle">基于关键词匹配的三方隐私信息检索系统</h2>
      <div class="scene-buttons">
        <button
          class="scene-button education"
          :class="{ 'disabled': !isEducationEnabled }"
          @click="selectScene('education')"
        >
          <i class="fas fa-graduation-cap"></i>
          <span>教育场景</span>
          <span v-if="!isEducationEnabled" class="coming-soon">即将开放</span>
        </button>
        <button
          class="scene-button medical"
          :class="{ 'disabled': !isMedicalEnabled }"
          @click="selectScene('medical')"
        >
          <i class="fas fa-hospital"></i>
          <span>医疗场景</span>
        </button>
      </div>
    </div>

    <!-- 登录表单部分 -->
    <div v-else class="login-box" :class="{ 'show': showAnimation }">
      <h1 class="title">CloakGuard: Tripartite Private Keyword Retrieval</h1>
      <h2 class="subtitle">基于关键词匹配的三方隐私信息检索系统</h2>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <input
            v-model="username"
            type="text"
            placeholder="用户名"
            required
            class="form-input"
          >
        </div>
        <div class="form-group">
          <input
            v-model="password"
            type="password"
            placeholder="密码"
            required
            class="form-input"
          >
        </div>
        <button type="submit" class="login-button" :disabled="loading">
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { userApi } from '../config/api'

const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const showAnimation = ref(false)
const selectedScene = ref('')
const isEducationEnabled = ref(true) // 暂时禁用教育场景
const isMedicalEnabled = ref(true) // 启用医疗场景

onMounted(() => {
  setTimeout(() => {
    showAnimation.value = true
  }, 100)
})

const handleBack = () => {
  if (selectedScene.value) {
    selectedScene.value = ''
  } else {
    router.push('/')
  }
}

const selectScene = (scene) => {
  if ((scene === 'education' && !isEducationEnabled.value) ||
      (scene === 'medical' && !isMedicalEnabled.value)) {
    return
  }
  selectedScene.value = scene
}

const handleLogin = async () => {
  try {
    loading.value = true
    error.value = ''
    const user = await userApi.login(username.value, password.value)
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('scene', selectedScene.value)
    router.push('/dashboard/ip-query')
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(-45deg, #667eea, #764ba2, #5a67d8, #764ba2);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
  padding: 1rem;
  position: relative;
  overflow: hidden;
}

@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.scene-selection-container {
  text-align: center;
  width: 100%;
  max-width: 800px;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.scene-buttons {
  display: flex;
  gap: 3rem;
  justify-content: center;
  margin-top: 3rem;
}

.scene-button {
  width: 250px;
  height: 250px;
  border-radius: 20px;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  background: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.scene-button i {
  font-size: 4rem;
  margin-bottom: 1.5rem;
}

.scene-button span {
  font-size: 1.5rem;
  font-weight: 600;
}

.scene-button.education {
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
}

.scene-button.medical {
  background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
  color: white;
}

.scene-button:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.scene-button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #e2e8f0;
  color: #718096;
}

.scene-button.disabled:hover {
  transform: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.coming-soon {
  position: absolute;
  bottom: 10px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  background: rgba(0, 0, 0, 0.2);
  padding: 4px 8px;
  border-radius: 4px;
}

.login-box {
  background: rgba(255, 255, 255, 0.98);
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 480px;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 1s ease forwards;
  animation-delay: 0.5s;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  position: relative;
  text-align: center;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.back-button {
  position: fixed;
  top: 2rem;
  left: 2rem;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: 100;
  opacity: 0;
  transform: translateX(-20px);
  animation: slideIn 0.5s ease forwards;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.25);
  color: white;
  transform: translateX(-5px);
  border-color: rgba(255, 255, 255, 0.3);
}

.back-button i {
  font-size: 1.1rem;
  transition: transform 0.3s ease;
}

.back-button:hover i {
  transform: translateX(-3px);
}

.back-button span {
  font-size: 1rem;
  font-weight: 500;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.login-box .title {
  color: #2d3748;
  font-size: 1.6rem;
  margin-bottom: 0.8rem;
  text-shadow: none;
  text-align: center;
}

.login-box .subtitle {
  color: #4a5568;
  font-size: 0.95rem;
  margin-bottom: 2.5rem;
  text-shadow: none;
  text-align: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  position: relative;
}

.form-input {
  width: 100%;
  padding: 0.9rem 1.2rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: rgba(248, 250, 252, 0.9);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  transform: translateY(-1px);
}

.login-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.9rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
  position: relative;
  overflow: hidden;
}

.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.login-button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s ease, height 0.6s ease;
}

.login-button:hover::after {
  width: 300px;
  height: 300px;
}

.login-button:disabled {
  background: #cbd5e0;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.error-message {
  color: #e53e3e;
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
  padding: 0.5rem;
  background-color: rgba(255, 245, 245, 0.9);
  border-radius: 6px;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.scene-indicator {
  position: fixed;
  top: 2rem;
  right: 2rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: 100;
  opacity: 0;
  transform: translateX(20px);
  animation: slideIn 0.5s ease forwards;
}

.scene-indicator i {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
}

.scene-indicator span {
  font-size: 1rem;
  font-weight: 500;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.scene-selection-container .title {
  color: white;
  font-size: 2rem;
  margin-bottom: 1rem;
  line-height: 1.4;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.scene-selection-container .subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  margin-bottom: 2rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 0 1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}
</style>
