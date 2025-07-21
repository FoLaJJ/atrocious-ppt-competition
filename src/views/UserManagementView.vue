<template>
  <div class="user-management">
    <h2 class="page-title">用户管理</h2>

    <div class="actions">
      <button @click="showAddUserModal = true" class="add-button">
        <i class="fas fa-plus"></i>
        添加用户
      </button>
    </div>

    <div class="users-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>用户名</th>
            <th>姓名</th>
            <th>部门</th>
            <th>电话</th>
            <th>角色</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.department }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.role === 'admin' ? '管理员' : '普通用户' }}</td>
            <td>
              <button @click="handleEdit(user)" class="edit-button">
                <i class="fas fa-edit"></i>
              </button>
              <button @click="handleDelete(user)" class="delete-button">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
          <tr v-if="users.length === 0">
            <td colspan="7" class="no-data">
              暂无用户数据
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 添加/编辑用户模态框 -->
    <div v-if="showAddUserModal || showEditUserModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>{{ showEditUserModal ? '编辑用户' : '添加用户' }}</h3>
          <button @click="closeModal" class="close-button">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label>用户名</label>
            <input
              v-model="userForm.username"
              type="text"
              placeholder="请输入用户名"
              :disabled="showEditUserModal"
            >
          </div>

          <div class="form-group">
            <label>密码</label>
            <input
              v-model="userForm.password"
              type="password"
              placeholder="请输入密码"
            >
          </div>

          <div class="form-group">
            <label>姓名</label>
            <input
              v-model="userForm.name"
              type="text"
              placeholder="请输入姓名"
            >
          </div>

          <div class="form-group">
            <label>部门</label>
            <input
              v-model="userForm.department"
              type="text"
              placeholder="请输入部门"
            >
          </div>

          <div class="form-group">
            <label>电话</label>
            <input
              v-model="userForm.phone"
              type="text"
              placeholder="请输入电话"
            >
          </div>

          <div class="form-group">
            <label>角色</label>
            <select v-model="userForm.role">
              <option value="user">普通用户</option>
              <option value="admin">管理员</option>
            </select>
          </div>
        </div>

        <div class="modal-footer">
          <button @click="closeModal" class="cancel-button">取消</button>
          <button @click="handleSubmit" class="submit-button">
            {{ showEditUserModal ? '保存' : '添加' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { userApi } from '../config/api'

const users = ref([])
const showAddUserModal = ref(false)
const showEditUserModal = ref(false)
const userForm = ref({
  username: '',
  password: '',
  name: '',
  department: '',
  phone: '',
  role: 'user'
})

onMounted(async () => {
  await loadUsers()
})

const loadUsers = async () => {
  try {
    users.value = await userApi.getUsers()
  } catch (error) {
    console.error('加载用户列表失败:', error)
  }
}

const handleEdit = (user) => {
  userForm.value = { ...user, password: '' }
  showEditUserModal.value = true
}

const handleDelete = async (user) => {
  if (confirm('确定要删除该用户吗？')) {
    try {
      await userApi.deleteUser(user.id)
      await loadUsers()
    } catch (error) {
      console.error('删除用户失败:', error)
    }
  }
}

const closeModal = () => {
  showAddUserModal.value = false
  showEditUserModal.value = false
  userForm.value = {
    username: '',
    password: '',
    name: '',
    department: '',
    phone: '',
    role: 'user'
  }
}

const handleSubmit = async () => {
  try {
    if (showEditUserModal.value) {
      await userApi.updateUser(userForm.value.id, userForm.value)
    } else {
      await userApi.addUser(userForm.value)
    }
    await loadUsers()
    closeModal()
  } catch (error) {
    console.error('保存用户失败:', error)
  }
}
</script>

<style scoped>
.user-management {
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  margin-bottom: 2rem;
  color: #2c3e50;
}

.actions {
  margin-bottom: 2rem;
}

.add-button {
  background: #667eea;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background: #764ba2;
}

.users-table {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background: #f8f9fa;
  font-weight: 600;
  color: #2c3e50;
}

.edit-button,
.delete-button {
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 0.5rem;
  transition: all 0.3s ease;
}

.edit-button {
  background: #e3f2fd;
  color: #1976d2;
}

.edit-button:hover {
  background: #bbdefb;
}

.delete-button {
  background: #ffebee;
  color: #d32f2f;
}

.delete-button:hover {
  background: #ffcdd2;
}

.no-data {
  text-align: center;
  color: #666;
  padding: 2rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  padding: 1rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  color: #2c3e50;
}

.close-button {
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #666;
}

.modal-body {
  padding: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #667eea;
}

.modal-footer {
  padding: 1rem;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.cancel-button,
.submit-button {
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-button {
  background: #f8f9fa;
  border: 1px solid #ddd;
  color: #666;
}

.cancel-button:hover {
  background: #e9ecef;
}

.submit-button {
  background: #667eea;
  border: none;
  color: white;
}

.submit-button:hover {
  background: #764ba2;
}
</style>
