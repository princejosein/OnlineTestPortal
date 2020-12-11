import Vue from 'vue'
import Router from 'vue-router'
// import store from '../store'

Vue.use(Router)

let router =  new Router({
  mode: 'hash',
  base: process.env.MIX_VUE_APP_BASE_URL,
  routes: [
    {
      path: '/admin',
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
          // quiz
        {
            name: 'Quiz',
            path: 'pages/quiz',
            component: () => import('../components/dashboard/pages/quiz/List'),
          },
          {
            name: 'Create Quiz',
            path: 'pages/quiz/upsert',
            component: () => import('../components/dashboard/pages/quiz/Upsert'),
          },
          {
            name: 'Edit Quiz',
            path: 'pages/quiz/upsert/:id',
            component: () => import('../components/dashboard/pages/quiz/Upsert'),
          },
        // Questions
        // {
        //     name: 'Questions',
        //     path: 'pages/questions',
        //     component: () => import('../components/dashboard/pages/questions/List'),
        // },
        {
            name: 'Questions',
            path: 'pages/quiz/questions/:quiz_id',
            component: () => import('../components/dashboard/pages/questions/QuizList'),
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
    // frontend
    {
        path: '/',
        component: () => import('../components/frontend/Index'),
        children: [
          // Home
          {
              name: 'Home',
              path: '',
              component: () => import('../components/frontend/Home'),
            },

            {
                name: 'Exam',
                path: 'exam/:quiz_id',
                component: () => import('../components/frontend/pages/exam/Exam'),
              },

              {
                name: 'Create User',
                path: 'user/create',
                component: () => import('../components/frontend/pages/user/CreateUser'),
                meta: {
                    // requiresAuth: true,
                    // requireAdmin: true
                  }
              },

              {
                name: 'Login User',
                path: 'user/login',
                component: () => import('../components/frontend/pages/user/Login'),

              },

              {
                name: 'Category',
                path: 'category/:cat_id',
                component: () => import('../components/frontend/pages/category/Category'),
              },

        ],
      },
  ],
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
      if (this.$store.getters['auth/isLoggedIn']) {

        //Needs admin access
          if(record.meta.requireAdmin) {
            if (this.$store.getters['auth/isAdmin']) {
                next()
                return
            } else {
                next('/')
            }
          }
        next()
        return
      }
      next('/user/login')
    } else {
      next()
    }
  })

export default router;
