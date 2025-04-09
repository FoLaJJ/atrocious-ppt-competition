<template>
  <div class="ip-query">
    <h2 class="page-title">IP归属查询</h2>

    <div class="query-form">
      <div class="form-group">
        <label>IP地址</label>
        <input
          v-model="form.ip"
          type="text"
          placeholder="请输入IP地址"
          class="form-input"
        >
      </div>

      <div class="form-group">
        <label>查询开始时间</label>
        <input
          v-model="form.startTime"
          type="datetime-local"
          class="form-input"
        >
      </div>

      <div class="form-group">
        <label>查询结束时间</label>
        <input
          v-model="form.endTime"
          type="datetime-local"
          class="form-input"
        >
      </div>

      <div class="form-actions">
        <button @click="handleReset" class="reset-button">
          重置
        </button>
        <button @click="handleQuery" class="query-button" :disabled="loading">
          {{ loading ? '查询中...' : '开始查询' }}
        </button>
      </div>
    </div>

    <div v-if="queryResult" class="query-result">
      <h3>查询结果</h3>
      <div class="result-table">
        <table>
          <thead>
            <tr>
              <th>查询的IP</th>
              <th>查询的时间范围</th>
              <th>任务发起时间</th>
              <th>关键词匹配时间</th>
              <th>PIR总时间</th>
              <th>通信量</th>
              <th>姓名</th>
              <th>所属部门</th>
              <th>联系电话</th>
              <th>查询状态</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ queryResult.ip }}</td>
              <td>{{ formatTimeRange(queryResult.startTime, queryResult.endTime) }}</td>
              <td>{{ queryResult.queryTime }}</td>
              <td>{{ queryResult.keywordSearchTime }}</td>
              <td>{{ queryResult.privacyComputeTime }}</td>
              <td>{{ queryResult.communicationVolume }}</td>
              <td>{{ queryResult.name }}</td>
              <td>{{ queryResult.department }}</td>
              <td>{{ queryResult.phone }}</td>
              <td>
                <span :class="['status-badge', queryResult.status === '已完成' ? 'success' : 'pending']">
                  {{ queryResult.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ipQueryApi } from '../config/api'

const form = ref({
  ip: '',
  startTime: '',
  endTime: ''
})

const loading = ref(false)
const queryResult = ref(null)

const handleReset = () => {
  form.value = {
    ip: '',
    startTime: '',
    endTime: ''
  }
  queryResult.value = null
}

const handleQuery = async () => {
  try {
    loading.value = true
    const userStr = localStorage.getItem('user')
    const user = JSON.parse(userStr)

    const result = await ipQueryApi.queryIp(
      form.value.ip,
      form.value.startTime,
      form.value.endTime,
      {
        name: user.name,
        department: user.department,
        phone: user.phone
      }
    )

    queryResult.value = result
  } catch (error) {
    console.error('查询失败:', error)
  } finally {
    loading.value = false
  }
}

const formatTimeRange = (start, end) => {
  return `${start} 至 ${end}`
}
</script>

<style scoped>
.ip-query {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 1rem;
}

.page-title {
  margin-bottom: 2rem;
  color: #2c3e50;
}

.query-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.form-input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.reset-button,
.query-button {
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.reset-button {
  background: #f8f9fa;
  border: 1px solid #ddd;
  color: #666;
}

.reset-button:hover {
  background: #e9ecef;
}

.query-button {
  background: #667eea;
  border: none;
  color: white;
}

.query-button:hover {
  background: #764ba2;
}

.query-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.query-result {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  overflow-x: auto;
}

.query-result h3 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

.result-table {
  width: 100%;
  min-width: 1400px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 0.8rem;
  text-align: left;
  border-bottom: 1px solid #eee;
  min-width: 120px;
}

/* 设置特定列的宽度 */
th:nth-child(1), td:nth-child(1) { min-width: 150px; } /* IP地址 */
th:nth-child(2), td:nth-child(2) { min-width: 200px; } /* 时间范围 */
th:nth-child(3), td:nth-child(3) { min-width: 150px; } /* 发起时间 */
th:nth-child(4), td:nth-child(4) { min-width: 120px; } /* 查询时间 */
th:nth-child(5), td:nth-child(5) { min-width: 120px; } /* 计算时间 */
th:nth-child(6), td:nth-child(6) { min-width: 100px; } /* 通信量 */
th:nth-child(7), td:nth-child(7) { min-width: 100px; } /* 姓名 */
th:nth-child(8), td:nth-child(8) { min-width: 120px; } /* 部门 */
th:nth-child(9), td:nth-child(9) { min-width: 120px; } /* 电话 */
th:nth-child(10), td:nth-child(10) { min-width: 80px; } /* 状态 */

th {
  background: #f8f9fa;
  font-weight: 600;
  color: #2c3e50;
  position: sticky;
  top: 0;
  z-index: 1;
}

td {
  color: #666;
}

.status-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  display: inline-block;
  min-width: 60px;
  text-align: center;
}

.status-badge.success {
  background: #d4edda;
  color: #155724;
}

.status-badge.pending {
  background: #fff3cd;
  color: #856404;
}

/* 添加表格行的悬停效果 */
tbody tr:hover {
  background-color: #f8f9fa;
}

@media (max-width: 768px) {
  .ip-query {
    padding: 0 0.5rem;
  }

  .query-result {
    padding: 1rem;
  }

  .result-table {
    min-width: 1200px;
  }

  th, td {
    padding: 0.6rem;
    font-size: 0.9rem;
  }
}
</style>