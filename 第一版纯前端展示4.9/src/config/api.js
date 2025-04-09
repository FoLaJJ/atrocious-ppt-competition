import mockData from '../../mock/data.json'

// 模拟API请求延迟
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// 用户相关API
export const userApi = {
  login: async (username, password) => {
    await delay(500)
    const user = mockData.users.find(u => u.username === username && u.password === password)
    if (user) {
      const { password, ...userInfo } = user
      return userInfo
    }
    throw new Error('用户名或密码错误')
  },

  getUsers: async () => {
    await delay(500)
    return mockData.users.map(({ password, ...user }) => user)
  },

  addUser: async (userData) => {
    await delay(500)
    const newUser = {
      id: mockData.users.length + 1,
      ...userData
    }
    mockData.users.push(newUser)
    return newUser
  },

  updateUser: async (id, userData) => {
    await delay(500)
    const index = mockData.users.findIndex(u => u.id === id)
    if (index !== -1) {
      mockData.users[index] = { ...mockData.users[index], ...userData }
      return mockData.users[index]
    }
    throw new Error('用户不存在')
  },

  deleteUser: async (id) => {
    await delay(500)
    const index = mockData.users.findIndex(u => u.id === id)
    if (index !== -1) {
      mockData.users.splice(index, 1)
      return true
    }
    throw new Error('用户不存在')
  }
}

// 医疗数据查询相关API
export const hospitalDataApi = {
  queryHospitalData: async (patientName, queryData, startTime, endTime, userInfo) => {
    await delay(500)
    const newQuery = {
      id: mockData.hospitalQueries.length + 1,
      patientName,
      queryData,
      startTime,
      endTime,
      queryTime: new Date().toISOString().replace('T', ' ').split('.')[0],
      keywordSearchTime: (Math.random() * 1 + 1.5).toFixed(1) + '秒',
      privacyComputeTime: (Math.random() * 1 + 1.5).toFixed(1) + '秒',
      communicationVolume: Math.floor(Math.random() * 300 + 200) + 'MB',
      queryDepartment: userInfo.department || '未知科室',
      departmentPhone: '010-' + Math.floor(Math.random() * 100000000).toString().padStart(8, '0'),
      status: '处理中'
    }
    mockData.hospitalQueries.push(newQuery)
    return newQuery
  },

  getQueries: async (keyword = '', startTime = '', endTime = '') => {
    await delay(500)
    let results = [...mockData.hospitalQueries]

    // 关键字搜索
    if (keyword) {
      const keywordLower = keyword.toLowerCase()
      results = results.filter(query =>
        query.patientName.toLowerCase().includes(keywordLower) ||
        query.queryData.toLowerCase().includes(keywordLower) ||
        query.queryDepartment.toLowerCase().includes(keywordLower)
      )
    }

    // 时间范围筛选
    if (startTime || endTime) {
      const start = startTime ? new Date(startTime) : null
      const end = endTime ? new Date(endTime) : null
      results = results.filter(query => {
        const queryDate = new Date(query.queryTime)
        return (!start || queryDate >= start) && (!end || queryDate <= end)
      })
    }

    return results
  }
}

// IP查询相关API
export const ipQueryApi = {
  getQueries: async (keyword = '') => {
    await delay(500)
    if (!keyword) return mockData.ipQueries
    return mockData.ipQueries.filter(query =>
      query.ip.includes(keyword) ||
      query.name.includes(keyword) ||
      query.department.includes(keyword)
    )
  }
}
