<template>
  <div class="research-history">
    <h2>患者隐私数据查询历史</h2>

    <div class="search-form">
      <div class="form-group">
        <label>患者姓名</label>
        <input
          type="text"
          v-model="searchPatientName"
          placeholder="请输入患者姓名"
        >
      </div>
      <div class="form-group">
        <label>查询疾病</label>
        <input
          type="text"
          v-model="searchDisease"
          placeholder="请输入疾病名称，如：HIV、乙肝、HPV等"
        >
      </div>
      <div class="form-group">
        <label>查询发起时间</label>
        <div class="date-range">
          <input
            type="datetime-local"
            v-model="startTime"
          >
          <span>至</span>
          <input
            type="datetime-local"
            v-model="endTime"
          >
        </div>
      </div>
      <div class="form-actions">
        <button @click="handleReset" class="reset-button">
          重置
        </button>
        <button @click="handleSearch" class="search-button">
          查询
        </button>
      </div>
    </div>

    <div class="table-container">
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
          <tr
            v-for="query in searchResults"
            :key="query.id"
            @click="handleRowClick(query.id)"
            class="clickable-row"
          >
            <td>{{ query.patientName }}</td>
            <td>{{ query.disease }}</td>
            <td>{{ query.startTime }} - {{ query.endTime }}</td>
            <td>{{ query.queryTime }}</td>
            <td>{{ query.keywordSearchTime }}</td>
            <td>{{ query.privacyComputeTime }}</td>
            <td>{{ query.communicationVolume }}</td>
            <td>{{ query.queryDepartment }}</td>
            <td>{{ query.departmentPhone }}</td>
            <td>
              <span :class="['status', query.status === '已完成' ? 'completed' : 'processing']">
                {{ query.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="searchResults.length === 0" class="no-results">
      <p>未找到匹配的查询记录</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import mockData from '../../mock/data.json'

const router = useRouter()
const hospitalQueries = ref([])
const searchResults = ref([])
const searchPatientName = ref('')
const searchDisease = ref('')
const startTime = ref('')
const endTime = ref('')

const handleReset = () => {
  searchPatientName.value = ''
  searchDisease.value = ''
  startTime.value = ''
  endTime.value = ''
  searchResults.value = [...hospitalQueries.value]
}

const handleSearch = () => {
  let results = [...hospitalQueries.value]

  // 患者姓名搜索
  if (searchPatientName.value) {
    const patientName = searchPatientName.value.toLowerCase()
    results = results.filter(query =>
      query.patientName.toLowerCase().includes(patientName)
    )
  }

  // 疾病搜索
  if (searchDisease.value) {
    const disease = searchDisease.value.toLowerCase()
    results = results.filter(query =>
      query.disease.toLowerCase().includes(disease)
    )
  }

  // 时间范围筛选
  if (startTime.value || endTime.value) {
    const start = startTime.value ? new Date(startTime.value) : null
    const end = endTime.value ? new Date(endTime.value) : null
    results = results.filter(query => {
      const queryDate = new Date(query.queryTime)
      return (!start || queryDate >= start) && (!end || queryDate <= end)
    })
  }

  searchResults.value = results
}

const handleRowClick = (id) => {
  router.push({
    path: `/dashboard/query-detail/${id}`,
    query: { type: 'hospital' }
  })
}

onMounted(() => {
  // 从 mock 数据中获取医疗查询记录
  hospitalQueries.value = [...mockData.hospitalQueries]
  searchResults.value = [...hospitalQueries.value]
})
</script>

<style scoped>
.research-history {
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.search-form {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  display: flex;
  gap: 20px;
  align-items: flex-end;
}

.form-group {
  flex: 1;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #2c3e50;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-group input:focus {
  outline: none;
  border-color: #3498db;
}

.date-range {
  display: flex;
  align-items: center;
  gap: 10px;
}

.date-range span {
  color: #666;
}

.form-actions {
  flex: 0 0 auto;
  margin-bottom: 0;
  display: flex;
  gap: 10px;
}

.reset-button,
.search-button {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.reset-button {
  background: #f8f9fa;
  border: 1px solid #ddd;
  color: #666;
}

.reset-button:hover {
  background: #e9ecef;
}

.search-button {
  background: #3498db;
  color: white;
  border: none;
}

.search-button:hover {
  background: #2980b9;
}

.table-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #2c3e50;
}

tr:hover {
  background-color: #f8f9fa;
}

.clickable-row {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.clickable-row:hover {
  background-color: #f0f7ff;
}

.status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
}

.status.completed {
  background-color: #e3fcef;
  color: #00a854;
}

.status.processing {
  background-color: #fff7e6;
  color: #fa8c16;
}

.no-results {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #666;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .search-form {
    flex-direction: column;
    padding: 15px;
  }

  .form-group {
    width: 100%;
  }

  .form-actions {
    width: 100%;
    margin-top: 10px;
    justify-content: flex-end;
  }

  .search-button, .reset-button {
    width: auto;
  }
}
</style> 