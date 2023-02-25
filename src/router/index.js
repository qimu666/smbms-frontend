import Vue from 'vue'
import VueRouter from 'vue-router'
import login from "@/views/user/Login";

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "home",
        component: login
    },
    {
        path: '/home-view',
        component: () => import('@/components/home/HomeView'),
        redirect: 'v1/u_list',
        children: [
            {
                path: '/frame',
                name: 'frame',
                component: () => import('../views/Frame.vue')
            },
            {
                path: '/u_View',
                name: 'userView',
                props: true,
                component: () => import('../views/user/UserView.vue')
            },
            {
                path: '/u_update',
                name: 'userUpdate',
                props: true,
                component: () => import('../views/user/UserUpdate')
            },
            {
                path: '/u_list',
                name: 'userList',
                component: () => import('../views/user/UserList.vue')
            },
            {
                path: '/u_add',
                name: 'userAad',
                component: () => import('../views/user/UserAdd.vue')
            },
            {
                path: '/b_list',
                name: 'billList',
                component: () => import('../views/bill/BillList.vue')
            },
            {
                path: '/b_add',
                name: 'billAdd',
                component: () => import('../views/bill/BillAdd.vue')
            },
            {
                path: '/b_view',
                name: 'billView',
                props: true,
                component: () => import('../views/bill/BillView.vue')
            },
            {
                path: '/b_update',
                name: 'billUpdate',
                props: true,
                component: () => import('../views/bill/BillUpdate.vue')
            },
            {
                path: '/p_list',
                name: 'providerList',
                component: () => import('../views/provider/ProviderList.vue')
            },
            {
                path: '/p_add',
                name: 'providerAdd',
                component: () => import('../views/provider/ProviderAdd.vue')
            },
            {
                path: '/p_view',
                name: 'providerView',
                props: true,
                component: () => import('../views/provider/ProviderView.vue')
            },
            {
                path: '/p_update',
                name: 'providerUpdate',
                props: true,
                component: () => import('../views/provider/ProviderUpdate.vue')
            },
            {
                path: '/pin_update',
                name: 'PasswordUpdate',
                component: () => import('../views/password/PasswordUpdate.vue')
            }
        ]
    }, {
        path: '*',
        redirect: "/frame"
    },
]

const router = new VueRouter({
    routes
})

export default router
