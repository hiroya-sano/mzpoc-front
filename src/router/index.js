import { createRouter, createWebHistory } from 'vue-router'
import CarsView from '../views/CarsView.vue'
import Submit from '../views/Submit.vue'
import Delete from '../views/Delete.vue'
import Test from '../views/Test.vue'

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
  },
  {
    path: '/delete',
    name: 'delete',
    component: Delete
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
