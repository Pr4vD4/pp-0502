<script>
import {useUserStore} from "@/stores/userStore.js";
import {defineComponent} from 'vue'
import {api} from "@/api/instanceAxios.js";
import {useEventStore} from "@/stores/eventStore.js";
import {storeToRefs} from "pinia";

export default defineComponent({
    name: "Event",
    data() {
        return {
            appointed: false,
            belongsToUser: false
        }
    },
    // props: {
    //     event: Object,
    //     id: String
    // },
    setup() {
        const userStore = useUserStore()
        const eventStore = useEventStore()
        return {userStore, eventStore}
    },
    beforeMount() {
        this.checkIfUserAlreadyAppointed()
        this.checkIfUserEvent()
        this.getEventInterval = setInterval(this.eventStore.getEvent, 1000 * 30, this.eventStore.id, true)
    },
    unmounted() {
        clearInterval(this.getEventInterval)
    },
    methods: {
        checkIfUserAlreadyAppointed() {
            this.appointed = false
            for (let i = 0; i < this.eventStore.event.users.length; i++) {
                if (this.eventStore.event.users[i].id === this.userStore.user.id) {
                    this.appointed = true
                    break
                }
            }
        },
        checkIfUserEvent() {
            this.belongsToUser = this.eventStore.event.author === this.userStore.user.id;
        },
        async makeAppointment() {
            await this.userStore.makeAppointment(this.eventStore.id)
            await this.eventStore.updateEvent()
            this.appointed = true
        },
        async removeAppointment() {
            await this.userStore.removeAppointment(this.eventStore.id)
            await this.eventStore.updateEvent()
            this.appointed = false
        },
    },
    watch: {
        'eventStore.event'() {
            this.checkIfUserAlreadyAppointed()
            this.checkIfUserEvent()
        }
    }
})
</script>

<template>
    <!-- Main content -->
    <div class="invoice p-3 mb-3">
        <!-- title row -->
        <div class="row">
            <div class="col-12">
                <h4>
                    <i class="fas fa-globe"></i> Some event data
                    <small class="float-right">{{
                            new Date(eventStore.event.created_at).toLocaleDateString('ru', {
                                year: 'numeric',
                                month: 'short',
                                day: '2-digit',
                                hour: 'numeric',
                                minute: 'numeric'
                            })
                        }}</small>
                </h4>
            </div>
            <!-- /.col -->
        </div>
        <!-- info row -->
        <div class="row invoice-info">
            <div class="col-12">
                {{ eventStore.event.text }}
            </div>
        </div>
        <!-- /.row -->

        <!-- Table row -->
        <div class="row">
            <div class="col-12 table-responsive">
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>User</th>

                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="user in eventStore.event.users">
                        <td>{{ user.id }}</td>
                        <td><router-link :to="{
                            name: 'user',
                            params: {
                                id: user.id
                            }
                        }">{{ `${user.surname} ${user.name}` }}</router-link></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- /.col -->
        </div>
        <!-- /.row -->

        <!-- this row will not appear when printing -->
        <div class="row no-print">
            <div class="col-12">
                <button type="button" class="btn btn-danger float-right" v-if="belongsToUser" @click="this.eventStore.deleteEvent()"><i
                        class="icon fa fa-handshake-slash"></i>
                    Delete event
                </button>
            </div>
            <div class="col-12">
                <button type="button" class="btn btn-success float-right" v-if="!appointed&&!belongsToUser" @click="makeAppointment"><i
                        class="fa fa-handshake"></i>
                    Make appointment
                </button>
                <button type="button" class="btn btn-danger float-right" v-if="appointed&&!belongsToUser" @click="removeAppointment"><i
                        class="icon fa fa-handshake-slash"></i>
                    Remove appointment
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>