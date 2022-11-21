import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlayView from '../views/PlayView.vue'
import LeaderboardView from '../views/LeaderboardView.vue'

const routes = [
    {
        path: '/',
        name: "Home",
        component: HomeView,
        meta: {
            enterClass: "animate__animated animate__fadeInUp animate__delay-1s",
            leaveClass: "animate__animated animate__fadeOutLeft"
        }
    },
    {
        path: '/play',
        name: "Play",
        component: PlayView,
        meta: {
            enterClass: "animate__animated animate__fadeInRight",
            leaveClass: "animate__animated animate__fadeOutLeft"
        }
    },
    {
        path: '/leaderboard',
        name: "Leaderboard",
        component: LeaderboardView,
        meta: {
            enterClass: "animate__animated animate__fadeInUp animate__delay-1s",
            leaveClass: "animate__animated animate__fadeOutLeft"
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router;