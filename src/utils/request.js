// 实现axios二次封装
import axios from 'axios'
// 通过axios创造axios实列
const service = axios.create({
  baseURL: process.ent.VUE_APP_BASE_API, // 基准地址
  timeout: 5000
})

export default service
