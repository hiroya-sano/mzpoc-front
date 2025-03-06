import { createRouter, createWebHistory } from 'vue-router'
import CarsView from '../views/CarsView.vue'
import Submit from '../views/Submit.vue'

const routes = [
  {
    path: '/',
    name: 'view',
    component: CarsView
  },
  {
    path: '/submit',
    name: 'submit',
    component: Submit
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
