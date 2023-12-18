<script>
import {defineComponent} from 'vue'
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import {api} from "@/api/instanceAxios.js";

export default defineComponent({
    name: "UserView",
    components: {DefaultLayout},
    props: {
        id: String
    },
    data() {
        return {
            user: {}
        }
    },
    beforeMount() {
        this.getUser(this.id)
    },
    methods: {
        async getUser(id) {
            try {
                const {data} = await api.get('/users/' + id)
                this.user = data.result
            } catch (e) {

            }
        }
    }
})
</script>

<template>
    <DefaultLayout>
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1>User</h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item">
                                <router-link to="/">Home</router-link>
                            </li>
                            <li class="breadcrumb-item active">{{ user.surname }} {{ user.name }}</li>
                        </ol>
                    </div>
                </div>
            </div><!-- /.container-fluid -->
        </section>

        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">

                        <!-- Profile Image -->
                        <div class="card card-primary card-outline">
                            <div class="card-body box-profile">
                                <div class="text-center">
                                    <img class="profile-user-img img-fluid img-circle"
                                         src="/dist/img/user1-128x128.jpg" alt="User profile picture">
                                </div>

                                <h3 class="profile-username text-center">{{ user.surname }} {{ user.name }}</h3>

                                <p class="text-muted text-center">{{ user.login }}</p>

                                <ul class="list-group list-group-unbordered mb-3">
                                    <li class="list-group-item" v-if="user.events">
                                        <b>Appointments</b> <a class="float-right">{{ user.events.length }}</a>
                                    </li>
                                    <li class="list-group-item" v-if="user.userEvents">
                                        <b>My events</b> <a class="float-right">{{ user.userEvents.length }}</a>
                                    </li>
                                </ul>
                            </div>
                            <!-- /.card-body -->
                        </div>
                        <!-- /.card -->

                    </div>
                    <!-- /.col -->
                    <div class="col-md-9">
                        <div class="card">
                            <div class="card-header p-2">
                                <ul class="nav nav-pills">
                                    <li class="nav-item"><a class="nav-link active" href="#activity" data-toggle="tab">Appointments</a>
                                    </li>
                                    <li class="nav-item"><a class="nav-link" href="#settings"
                                                            data-toggle="tab">User's events</a></li>
                                </ul>
                            </div><!-- /.card-header -->
                            <div class="card-body">
                                <div class="tab-content">
                                    <div class="tab-pane active" id="activity">
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
                                                    <tr v-for="event in user.events">
                                                        <td>{{ event.id }}</td>
                                                        <td>
                                                            <router-link :to="{
                                                                name: 'event',
                                                                params: {
                                                                    id: event.id
                                                                }
                                                            }">{{ event.title }}
                                                            </router-link>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <!-- /.col -->
                                        </div>
                                    </div>
                                    <!-- /.tab-pane -->


                                    <div class="tab-pane" id="settings">

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
                                                    <tr v-for="event in user.user_events">
                                                        <td>{{ event.id }}</td>
                                                        <td>
                                                            <router-link :to="{
                                                                name: 'event',
                                                                params: {
                                                                    id: event.id
                                                                }
                                                            }">{{ event.title }}
                                                            </router-link>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <!-- /.col -->
                                        </div>

                                    </div>
                                    <!-- /.tab-pane -->
                                </div>
                                <!-- /.tab-content -->
                            </div><!-- /.card-body -->
                        </div>
                        <!-- /.card -->
                    </div>
                    <!-- /.col -->
                </div>
                <!-- /.row -->
            </div><!-- /.container-fluid -->
        </section>


    </DefaultLayout>
</template>

<style scoped>

</style>