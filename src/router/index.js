import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Vue from 'vue'
import dtpInfo from "../views/dtpInfo";
import infgr from '../views/infgr'

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
    },
    {
        path: '/delete/:id',
        name: 'delete',
        beforeEnter(to, from, next) {
            fetch(`http://194.87.99.72:3000/remove?id=${to.params.id}`);
        },
        props: true
    },
    {
        path: '/infgr',
        name: 'infgr',
        component: infgr
    }

]

const router = new VueRouter({
    routes
})

export default router
