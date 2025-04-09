<template>
  <div class="research-data">
    <h2 class="page-title">患者隐私数据查询监控</h2>

    <div class="query-form">
      <div class="form-group">
        <label>患者姓名</label>
        <input
          v-model="form.patientName"
          type="text"
          placeholder="请输入患者姓名"
          class="form-input"
        >
      </div>

      <div class="form-group">
        <label>查询疾病</label>
        <input
          v-model="form.disease"
          type="text"
          placeholder="请输入疾病名称，如：HIV、乙肝、HPV等"
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

    <div v-if="queryResults.length > 0" class="query-result">
      <h3>查询结果</h3>
      <div class="result-table">
        <table>
          <thead>
            <tr>
              <th>患者姓名</th>
              <th>患有疾病</th>
              <th>查询时间范围</th>
              <th>任务发起时间</th>
              <th>关键词匹配时间</th>
              <th>PIR总时间</th>
              <th>通信量</th>
              <th>诊断科室</th>
              <th>科室联系电话</th>
              <th>查询状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="result in queryResults" :key="result.id">
              <td>{{ result.patientName }}</td>
              <td>{{ result.disease }}</td>
              <td>{{ formatTimeRange(result.startTime, result.endTime) }}</td>
              <td>{{ result.queryTime }}</td>
              <td>{{ result.keywordSearchTime }}</td>
              <td>{{ result.privacyComputeTime }}</td>
              <td>{{ result.communicationVolume }}</td>
              <td>{{ result.queryDepartment }}</td>
              <td>{{ result.departmentPhone }}</td>
              <td>
                <span :class="['status-badge', result.status === '已完成' ? 'success' : 'pending']">
                  {{ result.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else-if="hasSearched" class="no-results">
      <p>未找到匹配的查询记录</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import mockData from '../../mock/data.json'

const form = ref({
  patientName: '',
  disease: '',
  startTime: '',
  endTime: ''
})

const loading = ref(false)
const queryResults = ref([])
const hasSearched = ref(false)

const handleReset = () => {
  form.value = {
    patientName: '',
    disease: '',
    startTime: '',
    endTime: ''
  }
  queryResults.value = []
  hasSearched.value = false
}

const handleQuery = async () => {
  try {
    loading.value = true
    hasSearched.value = true

    // 从 mock 数据中查找匹配的记录
    let results = [...mockData.hospitalQueries]

    // 患者姓名搜索
    if (form.value.patientName) {
      const patientName = form.value.patientName.toLowerCase()
      results = results.filter(item =>
        item.patientName.toLowerCase().includes(patientName)
      )
    }

    // 疾病搜索
    if (form.value.disease) {
      const disease = form.value.disease.toLowerCase()
      results = results.filter(item =>
        item.disease.toLowerCase().includes(disease)
      )
    }

    // 时间范围筛选
    if (form.value.startTime || form.value.endTime) {
      const startTime = form.value.startTime ? new Date(form.value.startTime) : null
      const endTime = form.value.endTime ? new Date(form.value.endTime) : null

      results = results.filter(item => {
        const queryTime = new Date(item.queryTime)
        return (!startTime || queryTime >= startTime) &&
               (!endTime || queryTime <= endTime)
      })
    }

    queryResults.value = results
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
.research-data {
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

tbody tr:hover {
  background-color: #f8f9fa;
}

.no-results {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #666;
}

@media (max-width: 768px) {
  .research-data {
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