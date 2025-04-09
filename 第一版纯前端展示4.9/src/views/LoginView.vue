<template>
  <div class="login-container">
    <div class="login-box" :class="{ 'show': showAnimation }">
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

onMounted(() => {
  setTimeout(() => {
    showAnimation.value = true
  }, 100)
})

const handleLogin = async () => {
  try {
    loading.value = true
    error.value = ''
    const user = await userApi.login(username.value, password.value)
    localStorage.setItem('user', JSON.stringify(user))
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
}

.login-box {
  background: rgba(255, 255, 255, 0.98);
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 480px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
}

.login-box.show {
  opacity: 1;
  transform: translateY(0);
}

.title {
  text-align: center;
  color: #2d3748;
  font-size: 1.6rem;
  margin-bottom: 0.8rem;
  line-height: 1.4;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.subtitle {
  text-align: center;
  color: #4a5568;
  font-size: 0.95rem;
  margin-bottom: 2.5rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 0 1rem;
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
  background-color: #f8fafc;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  background-color: #fff;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
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
}

.login-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
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
  background-color: #fff5f5;
  border-radius: 6px;
}
</style>
