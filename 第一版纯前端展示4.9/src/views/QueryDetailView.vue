<template>
  <div class="query-detail">
    <el-card class="detail-card">
      <template #header>
        <div class="card-header">
          <h2>查询详情</h2>
          <el-button @click="$router.back()">返回</el-button>
        </div>
      </template>

      <!-- IP查询详情 -->
      <template v-if="detail.type === 'ip' && detail.ip">
        <el-table :data="[detail]" :show-header="true" style="width: 100%" border>
          <el-table-column prop="ip" label="查询的IP" align="center" />
          <el-table-column label="查询的时间范围" align="center">
            <template #default="scope">
              {{ scope.row.startTime }} 至 {{ scope.row.endTime }}
            </template>
          </el-table-column>
          <el-table-column prop="queryTime" label="任务发起时间" align="center" />
          <el-table-column prop="keywordSearchTime" label="关键词匹配时间" align="center" />
          <el-table-column prop="privacyComputeTime" label="PIR总时间" align="center" />
          <el-table-column prop="communicationVolume" label="通信量" align="center" />
          <el-table-column prop="name" label="姓名" align="center" />
          <el-table-column prop="department" label="所属部门" align="center" />
          <el-table-column prop="phone" label="联系电话" align="center" />
          <el-table-column label="查询状态" align="center">
            <template #default="scope">
              <el-tag :type="scope.row.status === '已完成' ? 'success' : 'warning'">
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <!-- 患者隐私查询详情 -->
      <template v-else-if="detail.type === 'hospital' && detail.patientName">
        <el-table :data="[detail]" :show-header="true" style="width: 100%" border>
          <el-table-column prop="patientName" label="患者姓名" align="center" />
          <el-table-column prop="disease" label="患有疾病" align="center" />
          <el-table-column label="查询时间范围" align="center">
            <template #default="scope">
              {{ scope.row.startTime }} 至 {{ scope.row.endTime }}
            </template>
          </el-table-column>
          <el-table-column prop="queryTime" label="任务发起时间" align="center" />
          <el-table-column prop="keywordSearchTime" label="关键词匹配时间" align="center" />
          <el-table-column prop="privacyComputeTime" label="PIR总时间" align="center" />
          <el-table-column prop="communicationVolume" label="通信量" align="center" />
          <el-table-column prop="queryDepartment" label="诊断科室" align="center" />
          <el-table-column prop="departmentPhone" label="科室联系电话" align="center" />
          <el-table-column label="查询状态" align="center">
            <template #default="scope">
              <el-tag :type="scope.row.status === '已完成' ? 'success' : 'warning'">
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <!-- 无数据提示 -->
      <template v-else>
        <div class="no-data">
          <el-empty description="暂无数据" />
        </div>
      </template>

      <div v-if="detail.id" class="privacy-compute-details">
        <h3>隐私计算详情</h3>
        <div class="data-section">
          <div class="data-box">
            <div class="data-title">请求数据</div>
            <div class="data-content">
              <template v-if="encryptedData.encrypt_ip">
                <div class="data-item">
                  <span class="data-label">加密IP:</span>
                  <span class="data-value">{{ encryptedData.encrypt_ip }}</span>
                </div>
                <div class="data-item">
                  <span class="data-label">服务器开始时间:</span>
                  <span class="data-value">{{ encryptedData.server_start_time }}</span>
                </div>
                <div class="data-item">
                  <span class="data-label">服务器结束时间:</span>
                  <span class="data-value">{{ encryptedData.server_end_time }}</span>
                </div>
                <div class="data-item">
                  <span class="data-label">MOD:</span>
                  <span class="data-value">{{ encryptedData.MOD }}</span>
                </div>
                <div class="data-item">
                  <span class="data-label">Hash IP:</span>
                  <span class="data-value">{{ encryptedData.hash_ip }}</span>
                </div>
              </template>
              <template v-else>
                <el-empty description="暂无请求数据" />
              </template>
            </div>
          </div>

          <div class="data-box">
            <div class="data-title">RSA公钥</div>
            <div class="data-content">
              <template v-if="encryptedData.rsa_public_key">
                <div class="data-item">
                  <span class="data-label">n:</span>
                  <span class="data-value">{{ encryptedData.rsa_public_key.n }}</span>
                </div>
                <div class="data-item">
                  <span class="data-label">e:</span>
                  <span class="data-value">{{ encryptedData.rsa_public_key.e }}</span>
                </div>
              </template>
              <template v-else>
                <el-empty description="暂无RSA公钥数据" />
              </template>
            </div>
          </div>
        </div>
      </div>

      <div v-if="detail.id" class="protocol-details">
        <h3>协议数据</h3>
        <div class="data-section">
          <div class="data-box">
            <div class="data-title">混淆索引集合</div>
            <div class="data-content">
              <template v-if="encryptedData.trueIndex !== undefined">
                <div class="data-item">
                  <span class="data-label">真实索引:</span>
                  <span class="data-value">{{ encryptedData.trueIndex }}</span>
                </div>
                <div class="data-item">
                  <span class="data-label">混淆列表:</span>
                  <div class="obfuscated-list">
                    <span v-for="(item, index) in encryptedData.obfuscatedList" :key="index">
                      {{ item[0] }}<span v-if="index < encryptedData.obfuscatedList.length - 1">, </span>
                    </span>
                  </div>
                </div>
              </template>
              <template v-else>
                <el-empty description="暂无混淆索引数据" />
              </template>
            </div>
          </div>

          <div class="data-box">
            <div class="data-title">OT协议数据</div>
            <div class="data-content">
              <template v-if="encryptedData.encrypt_OT_dataSource_want">
                <div class="data-item">
                  <span class="data-label">加密数据:</span>
                  <span class="data-value">{{ encryptedData.encrypt_OT_dataSource_want }}</span>
                </div>
              </template>
              <template v-else>
                <el-empty description="暂无OT协议数据" />
              </template>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getQueryDetail } from '@/config/api'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const detail = ref({})
const encryptedData = ref({})
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  try {
    const id = route.params.id
    console.log('Route state:', route.state)
    console.log('Route query:', route.query)

    // 直接从 API 获取数据，使用 query 参数中的 type
    const type = route.query.type || 'ip'
    console.log('Fetching data with type:', type)
    const data = await getQueryDetail(id, type)

    console.log('Final data:', data)
    detail.value = data

    // 获取加密数据
    try {
      const response = await fetch('/mock/encrypted_data.json')
      if (!response.ok) {
        throw new Error('Failed to fetch encrypted data')
      }
      const encryptedDataJson = await response.json()
      encryptedData.value = encryptedDataJson[`query_${id}`] || {}
    } catch (error) {
      console.error('Error fetching encrypted data:', error)
      ElMessage.warning('加密数据获取失败，部分数据可能无法显示')
    }
  } catch (error) {
    console.error('Error fetching query detail:', error)
    ElMessage.error('查询详情获取失败')
    router.back()
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.query-detail {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.detail-card {
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h2 {
  margin: 0;
  color: #303133;
  font-size: 24px;
}

.privacy-compute-details,
.protocol-details {
  margin-top: 30px;
}

h3 {
  margin-bottom: 20px;
  color: #409EFF;
  font-size: 20px;
  border-bottom: 2px solid #409EFF;
  padding-bottom: 10px;
}

.data-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.data-box {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border: 1px solid #ebeef5;
}

.data-title {
  color: #409EFF;
  font-weight: bold;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid #ebeef5;
}

.data-content {
  color: #606266;
  word-break: break-all;
  line-height: 1.6;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  max-height: 200px;
  overflow-y: auto;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 4px;
}

.data-item {
  margin-bottom: 10px;
  line-height: 1.5;
}

.data-label {
  color: #606266;
  font-weight: bold;
  margin-right: 8px;
}

.data-value {
  color: #303133;
  word-break: break-all;
}

.obfuscated-list {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 8px;
}

.obfuscated-list span {
  background-color: #f0f2f5;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
}

.no-data {
  padding: 40px;
  text-align: center;
}

:deep(.el-table) {
  margin-bottom: 20px;
}

:deep(.el-table__header) {
  background-color: #f5f7fa;
}

:deep(.el-table__header-wrapper th) {
  background-color: #f5f7fa;
  color: #606266;
  font-weight: bold;
  height: 50px;
}

:deep(.el-table__row td) {
  padding: 12px 0;
}

:deep(.el-table--border) {
  border-radius: 4px;
}

:deep(.el-empty__description) {
  margin-top: 10px;
  color: #909399;
}
</style>