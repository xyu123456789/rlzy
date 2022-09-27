import Layout from '@/layout'
export default {
  path: '/attendances',
  component: Layout,
  children: [
    {
      path: '',
      name: 'attendances',
      component: () => import('@/views/attendances/index.vue'),
      meta: { title: '考勤', icon: 'skill' }
    }

  ]
}
