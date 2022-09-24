import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
// require.context 方法 可以实现批量导入文件
// require.context(directory, useSubdirectories, regExp)
// directory: 要查找的文件路径
// useSubdirectories: 是否查找子目录
// regExp: 要匹配文件的正则
// req函数==》(根据路径,对应的模块,正则)
// 函数keys属性==》方法==》数组
// console.log(req.keys())

const requireAll = requireContext => requireContext.keys().map(requireContext)
// map返回一个新数组 长度和原来一样
// 映射  -[.dashboard.svg].map(requirecontext)||[]
requireAll(req)
console.log(requireAll(req))
