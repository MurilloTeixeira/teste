import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AprendizForm from '@/views/Aprendiz/AprendizForm.vue';
import EmpresaForm from '@/views/Empresa/EmpresaForm.vue';
import ListaEmpresas from '@/views/Empresa/ListaEmpresas.vue';

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
    path: '/empresa/novo',
    name: 'NovoEmpresa',
    component: EmpresaForm
  },
  {
    path: '/aprendiz/:id',
    name: 'EditarAprendiz',
    component: AprendizForm
  },
    {
    path: '/empresas',
    name: 'ListarEmpresas',
    component: ListaEmpresas
  },
  {
    path: '/empresa/:id',
    name: 'EditarEmpresa',
    component: EmpresaForm
  },

]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
