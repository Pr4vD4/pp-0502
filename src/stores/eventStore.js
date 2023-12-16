import {defineStore} from "pinia";
import {api} from "@/api/instanceAxios.js";
import router from "@/router/index.js";

export const useEventStore = defineStore('event', {
    state: () => ({
        event: null
    }),
    actions: {
        async getEvent(id) {
            try {
                this.event = null
                this.id = null
                const {data} = await api.get(`/events/${id}`)
                this.id = id
                this.event = data.result
            } catch (e) {

            }
        },
        async updateEvent() {
            try {
                const {data} = await api.get(`/events/${this.id}`)
                this.event = data.result
            } catch (e) {

            }
        },
        async deleteEvent() {
            try {
                const {data} = await api.delete(`/delete/event/${this.id}`)
                this.event = null
                this.id = null
                await router.push({
                    name: 'home'
                })
            } catch (e) {

            }
        },
        async createNewEvent(formData) {
            try {
                const {data} = await api.post('/events', formData)
            } catch (e) {

            }
        }
    }
})