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
            fetch(`http://195.133.147.101:3000/remove?id=${to.params.id}`);window.close('','_parent','')
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
