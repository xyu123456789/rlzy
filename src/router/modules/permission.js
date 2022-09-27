import Layout from '@/layout'
export default {
  path: '/permission',
  component: Layout,
  children: [
    {
      path: '',
      name: 'permission',
      component: () => import('@/views/permission/index.vue'),
      meta: { title: '权限管理', icon: 'lock' }
    }

  ]
}
