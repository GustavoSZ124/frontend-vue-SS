import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/new/document',
    name: 'UploadDocument',
    component: () => import('@/views/UploadDocument.vue')
  },
  {
    path: '/documents',
    name: 'Documents',
    component: () => import('@/views/Documents.vue')
  },
  {
    path: '/update/document/:id',
    name: 'UpdateDocument',
    component: () => import('@/views/UpdateDocument.vue')
  },
  {
    path: '/new/translation',
    name: 'UploadTranslation',
    component: () => import('@/views/UploadTranslation.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
