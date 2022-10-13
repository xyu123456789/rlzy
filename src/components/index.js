// import PageTools from './PageTools/index'
// import * as directives from '@/directives'
import * as filters from '@/filters'
// const components = [PageTools]

// 引入要注册的组件
// 把组件用数组收集起来
// Vue.use(pligin)
// pligin对象 install属性-->会被执行 install方法-->第一个参数 Vue
// 函数 被install--> 会被执行 函数 第一个参数Vue
// Vue.use({})

// export default {
//   install: function(Vue) {
//     components.forEach(ele => {
//       Vue.component(ele.name, ele)
//     })
//   }
// }

// 实现组件的自动注册
// require.context()
const fn = require.context('./', true, /\.vue$/)
// console.log(fn.keys())// 路径
// console.log(fn('./PageTools/index.vue'))// 根据路径查找模块
// 一次性导入所有的模块
// fn.keys()-->返回所有的模块['./PageTools/index.vue']
const components = fn.keys().map(ele => {
  return fn(ele)
})

export default (Vue) => {
  components.forEach(ele => {
    Vue.component(ele.default.name, ele.default)
  })
  // 注册全局的过滤器
  Object.keys(filters).forEach(key => {
  // 注册过滤器
    // Vue.filter('过滤器名称',过滤器的方法)
    // console.log(key)
    Vue.filter(key, filters[key])
  })
}
