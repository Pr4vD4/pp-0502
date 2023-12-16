<script>
import {defineComponent} from 'vue'
import {api} from "@/api/instanceAxios.js";
import router from "@/router/index.js";
import {handleUnauthorizedError} from "@/api/errors.js";
import Loader from "@/components/Loader.vue";
import {useUserStore} from "@/stores/userStore.js";

export default defineComponent({
    name: "Sidebar",
    components: {Loader},
    data() {
        return {
            allEvents: null,
        }
    },
    props: {
        userStore: null,
    },
    setup() {
        const userStore = useUserStore()
        return {userStore}
    },
    beforeMount() {
        this.getAppointments()
        this.getUserEvents()
        this.getAllEvents()
    },
    mounted() {
        this.fetchAllEvents = setInterval(this.getAllEvents, 1000 * 30)

    },
    unmounted() {
        clearInterval(this.fetchAllEvents)
    },
    methods: {
        async getAllEvents() {
            try {
                const {data} = await api.get('/events')
                this.allEvents = data.result
            } catch (e) {
                await handleUnauthorizedError(e)
            }
        },
        async getAppointments() {
            await this.userStore.getAppointments()
        },
        async getUserEvents() {
            await this.userStore.getUserEvents()
        }
    },
    watch: {
        'userStore.user.userEvents'() {
            this.getAllEvents()
        }
    }
})
</script>

<template>
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <!-- Brand Logo -->
        <router-link to="/" class="brand-link">
            <span class="brand-text font-weight-light">AdminLTE 3</span>
        </router-link>

        <!-- Sidebar -->
        <div class="sidebar">
            <!-- Sidebar user panel (optional) -->
            <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                <div class="image">
                    <img src="/dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
                </div>
                <div class="info">
                    <router-link to="/" class="d-block">{{ userStore.fullName }}</router-link>
                </div>
            </div>

            <!-- Sidebar Menu -->
            <nav class="mt-2">
                <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                    data-accordion="false">
                    <li class="nav-item">
                        <a href="#" class="nav-link">
                            <i class="nav-icon fas fa-bullhorn"></i>
                            <p>
                                All events
                                <i class="fas fa-angle-left right"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview" style="display: none;">
                            <li class="d-flex justify-content-center mt-3" v-if="!allEvents">
                                <Loader/>
                            </li>
                            <li class="nav-item" v-for="event in allEvents">
                                <router-link :to="{
                                    name: 'event',
                                    params: {
                                        id: event.id
                                    }
                                }" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>{{ event.title }}</p>
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item menu-open">
                        <a href="#" class="nav-link">
                            <i class="nav-icon far fa-handshake"></i>
                            <p>
                                Event appointments
                                <i class="fas fa-angle-left right"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview" style="display: block;">
                            <li class="d-flex justify-content-center mt-3" v-if="!userStore.user.events">
                                <Loader/>
                            </li>
                            <li class="nav-item" v-for="event in userStore.user.events">
                                <router-link :to="{
                                    name: 'event',
                                    params: {
                                        id: event.id
                                    }
                                }" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>{{ event.title }}</p>
                                </router-link>
                            </li>

                        </ul>
                    </li>
                    <li class="nav-item menu-open">
                        <a href="#" class="nav-link">
                            <i class="nav-icon far fa-handshake"></i>
                            <p>
                                My events
                                <i class="fas fa-angle-left right"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview" style="display: block;">
                            <li class="d-flex justify-content-center mt-3" v-if="!userStore.user.userEvents">
                                <Loader/>
                            </li>
                            <li class="nav-item" v-for="event in userStore.user.userEvents">
                                <router-link :to="{
                                    name: 'event',
                                    params: {
                                        id: event.id
                                    }
                                }" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>{{ event.title }}</p>
                                </router-link>
                            </li>

                        </ul>
                    </li>
                </ul>
            </nav>
            <!-- /.sidebar-menu -->
        </div>
        <!-- /.sidebar -->
    </aside>
</template>

<style scoped>

</style>