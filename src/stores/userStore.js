import {defineStore} from 'pinia'
import {api} from "@/api/instanceAxios.js";
import {parseJwt} from "@/assets/parseJwt.js";
import router from "@/router/index.js";
import {handleUnauthorizedError} from "@/api/errors.js";

export const useUserStore = defineStore('user', {
    state: () => ({
        errors: null,
        token: localStorage.getItem('token'),
        user: null,
    }),
    actions: {
        async makeAppointment(id) {
            try {
                const {data} = await api.post('/add/event/' + id)
                this.user.events = data.result.events
            } catch (e) {

            }
        },
        async removeAppointment(id) {
            try {
                const {data} = await api.post('/detach/event/' + id)
                this.user.events = data.result.events
            } catch (e) {

            }
        },
        async getAppointments() {
            try {
                const {data} = await api.get('/profile/events/appointments')
                this.user.events = data.result
            } catch (e) {
                await handleUnauthorizedError(e)
            }
        },
        async getUserEvents() {
            try {
                const {data} = await api.get('/profile/events/created')
                this.user.userEvents = data.result
            } catch (e) {
                await handleUnauthorizedError(e)
            }
        },
        async register(formData) {
            try {

                if (!formData.birthdate) {
                    delete formData.birthdate
                }

                const {data} = await api.post('/auth/register', formData)
                this.token = data.result.token
                localStorage.token = this.token
                this.user = parseJwt(this.token).user
                this.errors = null
                await router.push({name: 'home'})
            } catch (e) {
                this.errors = e.response.data
                console.log(this.errors)
            }
        },
        async login(formData) {
            try {
                const {data} = await api.post('/auth/login', formData)
                this.token = data.result.token
                localStorage.token = this.token
                this.user = parseJwt(this.token).user
                this.errors = null
                await router.push({name: 'home'})
            } catch (e) {
                this.errors = e.response.data
                console.log(this.errors)
            }
        },
        async logout() {
            try {
                const {data} = await api.get('/auth/logout')
                localStorage.removeItem('token')
                await router.push({name: 'login'})

            } catch (e) {
                this.errors = e.response.data

            }
        },
        parseJwtToUser() {
            this.user = parseJwt(localStorage.getItem('token')).user
        },
    },
    getters: {
        fullName() {
            return `${this.user.surname} ${this.user.name}`
        }
    }
})