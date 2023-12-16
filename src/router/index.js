import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EventView from "@/views/EventView.vue";
import loginView from "@/views/LoginView.vue";
import auth from "@/middlewares/auth.js";
import guest from "@/middlewares/guest.js";
import RegisterView from "@/views/RegisterView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            beforeEnter: (to, from, next) => {
                auth(next)
            },
        },
        {
            path: '/event/:id',
            name: 'event',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: EventView,
            props: true,
            beforeEnter: (to, from, next) => {
                auth(next)
            },
        },
        {
            path: '/login',
            name: 'login',
            component: loginView,
            beforeEnter: (to, from, next) => {
                guest(next)
            }
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView,
            beforeEnter: (to, from, next) => {
                guest(next)
            }
        }
    ]
})

export default router
