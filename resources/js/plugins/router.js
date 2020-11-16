import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('../components/dashboard/Index'),
      children: [
        // Dashboard
        {
            name: 'Dashboard',
            path: '',
            component: () => import('../components/dashboard/Dashboard'),
          },

          // Category
        {
            name: 'Category',
            path: 'pages/category',
            component: () => import('../components/dashboard/pages/category/List'),
          },

           // Pages
        {
            name: 'User Profile',
            path: 'pages/user',
            component: () => import('../components/dashboard/pages/UserProfile'),
          },
          {
            name: 'Notifications',
            path: 'components/notifications',
            component: () => import('../components/component/Notifications'),
          },
          {
            name: 'Icons',
            path: 'components/icons',
            component: () => import('../components/component/Icons'),
          },
          {
            name: 'Typography',
            path: 'components/typography',
            component: () => import('../components/component/Typography'),
          },
          {
            name: 'Regular Tables',
            path: 'tables/regular-tables',
            component: () => import('../components/component/RegularTables'),
          },
          {
            name: 'Google Maps',
            path: 'maps/google-maps',
            component: () => import('../components/component/GoogleMaps'),
          },
      ],
    },
  ],
})
