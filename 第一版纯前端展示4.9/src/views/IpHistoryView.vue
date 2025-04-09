<template>
  <div class="ip-history">
    <h2>IP历史查询记录</h2>

    <div class="search-form">
      <div class="form-group">
        <label>关键字搜索</label>
        <input
          type="text"
          v-model="searchKeyword"
          placeholder="请输入IP地址、姓名或部门"
        >
      </div>
      <div class="form-group">
        <label>时间范围</label>
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
      <div class="form-group search-button-group">
        <button @click="handleSearch" class="search-button">
          搜索
        </button>
      </div>
    </div>

    <div class="table-container">
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
          <tr v-for="query in filteredQueries" :key="query.id">
            <td>{{ query.ip }}</td>
            <td>{{ query.startTime }} - {{ query.endTime }}</td>
            <td>{{ query.queryTime }}</td>
            <td>{{ query.keywordSearchTime }}</td>
            <td>{{ query.privacyComputeTime }}</td>
            <td>{{ query.communicationVolume }}</td>
            <td>{{ query.name }}</td>
            <td>{{ query.department }}</td>
            <td>{{ query.phone }}</td>
            <td>
              <span :class="['status', query.status === '已完成' ? 'completed' : 'processing']">
                {{ query.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const ipQueries = ref([])
const searchKeyword = ref('')
const startTime = ref('')
const endTime = ref('')
const searchResults = ref([])

const filteredQueries = computed(() => {
  return searchResults.value.length > 0 ? searchResults.value : ipQueries.value
})

const handleSearch = () => {
  let result = [...ipQueries.value]

  // 关键字搜索
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(query =>
      query.ip.toLowerCase().includes(keyword) ||
      query.name.toLowerCase().includes(keyword) ||
      query.department.toLowerCase().includes(keyword)
    )
  }

  // 时间范围筛选
  if (startTime.value && endTime.value) {
    const start = new Date(startTime.value)
    const end = new Date(endTime.value)
    result = result.filter(query => {
      const queryDate = new Date(query.queryTime)
      return queryDate >= start && queryDate <= end
    })
  }

  searchResults.value = result
}

onMounted(async () => {
  try {
    const response = await fetch('/mock/data.json')
    const data = await response.json()
    ipQueries.value = data.ipQueries
  } catch (error) {
    console.error('Error fetching IP queries:', error)
  }
})
</script>

<style scoped>
.ip-history {
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

.search-button-group {
  flex: 0 0 auto;
  margin-bottom: 0;
}

.search-button {
  background: #3498db;
  color: white;
  border: none;
  padding: 8px 24px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
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
  min-width: 1200px;
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
</style> 