import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Inicio from './views/Inicio.vue'
import Clientes from './views/Clientes.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },

    {
      path: '/inicio',
      name: 'inicio',
      component: Inicio
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: Clientes
    },
    
    //{
    //  path: '/about',
    //  name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    //  component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    //}
    
  ]
})
