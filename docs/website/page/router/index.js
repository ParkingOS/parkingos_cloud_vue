import Index from '../components/Index/Index.vue'
import UsageSidebar from '../components/App/UsageSidebar.vue'

import QuickStart from '../components/Basics/QuickStart.vue'

export default {
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/basics',
      name: 'Basics',
      component: UsageSidebar,
      children: [
        {
          path: 'quickstart',
          name: 'QuickStart',
          component: QuickStart
        }
      ]
    },
    {
      path: '/desc/:article',
      name: 'desc',
      component: UsageSidebar
    },
    {
      path: '/quick/:article',
      name: 'quick',
      component: UsageSidebar
    },
  ]
}
