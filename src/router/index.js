import Vue from 'vue'
import Router from 'vue-router'
import firebase from './../firebase/init.js'

import Home from './../components/views/home/Home.vue'
import Banner from './../components/views/home/Banner.vue'
import IndexMain from './../components/views/main/IndexMain.vue'
import Login from './../components/views/auth/Login.vue'
import Register from './../components/views/auth/Register.vue'
import Accounts from './../components/views/main/AccountData.vue'
import Dashboard from './../components/views/main/Dashboard.vue'
import Videos from './../components/views/main/Videos.vue'
import Message from './../components/views/main/Message.vue'
import Web from './../components/views/main/WebComponents.vue'
import videosTable from './../components/views/main/subComponents/VideosTable.vue'

Vue.use(Router)

const routes = [{
    path: '/',
    component: Home,
    children: [{
        path: '/',
        name: 'Home',
        component: Banner
    }
    ]},
    {
        path: '/index',
        name: 'index',
        component: IndexMain,
        meta: { requiresAuth: true },
        children: [{
                path: '/dashboard',
                name: 'Dashboard',
                meta: { requiresAuth: true },
                components: {
                    default: IndexMain,
                    MainView: Dashboard
                }
            },
            {
                path: '/web',
                name: 'Web',
                meta: { requiresAuth: true },
                components: {
                    default: IndexMain,
                    MainView: Web
                }
            },
            {
                path: '/videos',
                name: 'Videos',
                meta: { requiresAuth: true },
                components: {
                    default: IndexMain,
                    MainView: Videos,  
                },
                children:[{
                    path:'/videos',
                    component:videosTable}]
            },
            {
                path: '/message',
                name: 'Message',
                meta: { requiresAuth: true },
                components: {
                    default: IndexMain,
                    MainView: Message
                }
            },
            {
                path: '/account',
                name: 'Account',
                meta: { requiresAuth: true },
                components: {
                    default: IndexMain,
                    MainView: Accounts
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        meta: { guest: true },
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    }
]

const router = new Router({
    mode: 'history',
    routes

})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        var user = firebase.auth().currentUser;
        if (!user) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                next({
                    path: '/dashboard',
                    query: { redirect: to.fullPath }
                })
            } else {
                next()
            }
        });
    } else {
        next()
    }
})

export default router;
