export const imgerror = {
  // 什么时候去换图片  onerror
  inserted(el, binding, vnode) {
    // el dom
    console.log(el)
    // binding 当前指令的相关信息
    console.log(binding)
    // vnode虚拟节点
    console.log(vnode)
    el.onerror = function() {
      // 当图片出现异常的时候 会将指令配置的默认图片设置为该图片的内容
      // dom可以注册error事件
      el.src = binding.value // 这里不能写死
    }
  }
}
