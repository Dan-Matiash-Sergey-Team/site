import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Vue from 'vue'
import dtpInfo from "../views/dtpInfo";

Vue.use(VueRouter)

const routes = [
    {
        path: '/map',
        name: 'Main',
        component: Main
    },
    {
        path: '/dtp_info/:id',
        name: 'dtpInfo',
        component: dtpInfo,
        props: true
    }
]

const router = new VueRouter({
    routes
})

export default router
