// 实现axios二次封装
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
const timeOut = 3600
function IsCheckTimeOut() {
  const currentTime = Date.now()
  const timeStamp = (currentTime - store.getters.hrsaasTime) / 1000
  return timeStamp > timeOut
}
// 通过axios创造axios实列
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基准地址
  timeout: 5000
})
// 拦截器
service.interceptors.request.use(config => {
  // 在这个位置需要统一的去注入token
  if (store.getters.token) {
    // 时间2-时间1>token超时时间--》token登录失败
    if (IsCheckTimeOut()) {
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('token超时了'))
    }
    // 如果token存在 注入token
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config // 必须返回配置
}, error => {
  return Promise.reject(error)
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
  if (error.response && error.response.status === 401) {
    store.dispatch('user/logout')
    router.push('/login')
    Message.error('token超时了')
  } else {
    Message.error(error.message) // 提示错误信 息
  }
  return Promise.reject(error) // 返回执行错误 让当前的执行链跳出成功 直接进入 catch
})
export default service
