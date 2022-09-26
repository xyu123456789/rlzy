// 实现axios二次封装
import axios from 'axios'
import Message from 'element-ui'
// 通过axios创造axios实列
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基准地址
  timeout: 5000
})

service.interceptors.response.use(response => {
  //  要根据success的成功与否决定下面的操作
  const { message, data, success } = response.data
  if (success) {
    return data
  }
  // 业务已经错误了 还能进then ? 不能 ！ 应该进catch
  Message.error(message)
  return Promise.reject(new Error(message))
}, error => {
  Message.error(error.message) // 提示错误信息
  return Promise.reject(error) // 返回执行错误 让当前的执行链跳出成功 直接进入 catch
})
export default service
