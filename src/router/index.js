import { createRouter, createWebHistory } from 'vue-router'
import AudioTest from '../views/AudioTest.vue'

const routes = [
  {
    path: '/AudioTest',
    component: AudioTest
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
