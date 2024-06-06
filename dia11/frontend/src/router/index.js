import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AprendizForm from '@/views/Aprendiz/AprendizForm.vue';
import EmpresaForm from '@/views/Empresa/EmpresaForm.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/sobre',
    name: 'sobre',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/aprendizes',
    name: 'aprendizes',
    component: () => import(/* webpackChunkName: "about" */ '../views/Aprendiz/ListaAprendizes.vue')
  },
  {
    path: '/aprendiz/novo',
    name: 'NovoAprendiz',
    component: AprendizForm
  },
  {
    path: '/aprendiz/:id',
    name: 'EditarAprendiz',
    component: AprendizForm
  },
  {
    path: '/empresas',
    name: 'empresas',
    component: () => import(/* webpackChunkName: "about" */ '../views/Empresa/ListaEmpresas.vue')
  },
  {
    path: '/empresa/novo',
    name: 'NovoEmpresa',
    component: EmpresaForm
  }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
