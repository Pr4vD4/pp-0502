import {defineStore} from "pinia";
import {api} from "@/api/instanceAxios.js";
import router from "@/router/index.js";

export const useEventStore = defineStore('event', {
    state: () => ({
        event: null,
        errors: null
    }),
    actions: {
        async getEvent(id, isUpdate) {
            try {
                if (!isUpdate) {
                    this.event = null
                    this.id = null
                }
                const {data} = await api.get(`/events/${id}`)
                this.id = id
                this.event = data.result
                this.errors = null
            } catch (e) {
                this.errors = e.response.data
            }
        },
        async updateEvent() {
            try {
                const {data} = await api.get(`/events/${this.id}`)
                this.event = data.result
                this.errors = null
            } catch (e) {
                this.errors = e.response.data
            }
        },
        async deleteEvent() {
            try {
                const {data} = await api.delete(`/delete/event/${this.id}`)
                this.event = null
                this.id = null
                this.errors = null
                await router.push({
                    name: 'home'
                })
            } catch (e) {
                this.errors = e.response.data
            }
        },
        async createNewEvent(formData) {
            try {
                const {data} = await api.post('/events', formData)
                this.errors = null
            } catch (e) {
                this.errors = e.response.data

            }
        }
    }
})