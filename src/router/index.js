import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import App from "../App";
import Vue from 'vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'App',
        component: App
    },
    {
        path: '/map',
        name: 'Main',
        component: Main
    },
]

const router = new VueRouter({
    routes
})

export default router
