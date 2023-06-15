import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/IndexView.vue')
  },
  {
    path: '/about',
    component: () => import('@/views/AboutUsView.vue'),
    children: [
      {
        path: '/about',   // 企业文化(动态子组件)
        component: () => import('@/components/aboutus/Aboutus.vue')
      },
      {
        path: '/culture',   // 企业文化(动态子组件)
        component: () => import('@/components/aboutus/Culture.vue')
      },
      {
        path: '/honor',   // 荣誉资质(动态子组件)
        component: () => import('@/components/aboutus/Honor.vue')
      },
    ]
  },
  {
    path: '/news', //新闻中心
    component: () => import('@/views/NewsView.vue')
  },
  {
    path: '/news/show/:id',
    name: 'NewsDetailView',    // 新闻详情
    component: () => import('@/views/NewsDetailView.vue')
  },
  {
    path: '/enterpriseservice',//企业服务
    component: () => import('@/views/EnterpriseServiceView.vue')
  },
  {
    path: '/employeeservice',//员工服务
    component: () => import('@/views/EmployeeServiceView.vue')
  },
  {
    path: '/employeeservice/show/:id',
    name: 'EmployeeServiceDetailView',    // 员工详情
    component: () => import('@/views/EmployeeServiceDetailView.vue')
  },
  {
    path: '/jobs', //求职招聘
    component: () => import('@/views/Jobs.vue'),
    redirect: "/jobs",
    children: [
      {
        path: '/jobs',    // 求职招聘子路由
        component: () => import('@/components/jobs/Jobs.vue'),
      },
      {
        path: '/jobs/show/:id',
        name: 'JobsDetail',   // 求职招聘详情子路由
        component: () => import('@/components/jobs/JobsDetail.vue'),
      },
      {
        path: '/message',    // 在线求职子路由
        component: () => import('@/components/jobs/Message.vue'),
      },
      {
        path: '/recruit',    // 职场快讯子路由
        component: () => import('@/components/jobs/Recruit.vue'),
      },
      {
        path: '/recruit/show/:id',
        name: 'RecruitDetail',    // 职场快讯详情子路由
        component: () => import('@/components/jobs/RecruitDetail.vue'),
      },
    ]
  },
  {
    path: '/contactus', //联系我们
    component: () => import('@/views/ContactusView.vue')
  },
  {
    path: '/online', //在线留言
    component: () => import('@/views/OnlineMessageView.vue')
  },
  {
    path: '/download', //下载中心
    component: () => import('@/views/DownloadView.vue')
  },
  {
    path: '/admin/news',
    component: () => import('../views/NewsAdmin.vue')
  },
  {
    path: '/admin/enterpriseservice', //企业服务
    component: () => import('@/views/EnterpriseServiceAdmin.vue')
  },
  {
    path: '/admin/employeeservice', //员工服务
    component: () => import('@/views/EmployeeServiceAdmin.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
