<template>

    <DefaultLayout>

        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1>Profile</h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item">
                                <router-link to="/">Home</router-link>
                            </li>
                            <li class="breadcrumb-item active">User Profile</li>
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

                                <h3 class="profile-username text-center">{{ userStore.fullName }}</h3>

                                <p class="text-muted text-center">{{ userStore.user.login }}</p>

                                <ul class="list-group list-group-unbordered mb-3">
                                    <li class="list-group-item" v-if="userStore.user.events">
                                        <b>Appointments</b> <a class="float-right">{{ userStore.user.events.length }}</a>
                                    </li>
                                    <li class="list-group-item" v-if="userStore.user.userEvents">
                                        <b>My events</b> <a class="float-right">{{ userStore.user.userEvents.length }}</a>
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
                                    <li class="nav-item"><a class="nav-link active" href="#activity" data-toggle="tab">Create new event</a>
                                    </li>
                                    <li class="nav-item"><a class="nav-link" href="#settings"
                                                            data-toggle="tab">Settings</a></li>
                                </ul>
                            </div><!-- /.card-header -->
                            <div class="card-body">
                                <div class="tab-content">
                                    <div class="tab-pane active" id="activity">
                                        <form @submit.prevent="createNewEvent">
                                            <div class="card-body">
                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Title</label>
                                                    <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Title" v-model="newEventFormData.title">
                                                </div>
                                                <div class="form-group">
                                                    <label for="exampleInputPassword1">Text</label>
                                                    <textarea type="password" class="form-control" id="exampleInputPassword1" placeholder="Some text" v-model="newEventFormData.text"></textarea>
                                                </div>
                                                <button type="submit" class="btn btn-primary">Create</button>
                                            </div>
                                            <!-- /.card-body -->
                                        </form>
                                    </div>
                                    <!-- /.tab-pane -->


                                    <div class="tab-pane" id="settings">

                                        <form class="form-horizontal">
                                            <div class="form-group row">
                                                <label for="inputName" class="col-sm-2 col-form-label">Name</label>
                                                <div class="col-sm-10">
                                                    <input type="email" class="form-control" id="inputName"
                                                           placeholder="Name">
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
                                                <div class="col-sm-10">
                                                    <input type="email" class="form-control" id="inputEmail"
                                                           placeholder="Email">
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="inputName2" class="col-sm-2 col-form-label">Name</label>
                                                <div class="col-sm-10">
                                                    <input type="text" class="form-control" id="inputName2"
                                                           placeholder="Name">
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="inputExperience"
                                                       class="col-sm-2 col-form-label">Experience</label>
                                                <div class="col-sm-10">
                                                    <textarea class="form-control" id="inputExperience"
                                                              placeholder="Experience"></textarea>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="inputSkills" class="col-sm-2 col-form-label">Skills</label>
                                                <div class="col-sm-10">
                                                    <input type="text" class="form-control" id="inputSkills"
                                                           placeholder="Skills">
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <div class="offset-sm-2 col-sm-10">
                                                    <div class="checkbox">
                                                        <label>
                                                            <input type="checkbox"> I agree to the <a href="#">terms and
                                                            conditions</a>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <div class="offset-sm-2 col-sm-10">
                                                    <button type="submit" class="btn btn-danger">Submit</button>
                                                </div>
                                            </div>
                                        </form>
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

<script>

import {useUserStore} from "@/stores/userStore.js";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import {useEventStore} from "@/stores/eventStore.js";

export default {
    name: 'IndexView',
    components: {DefaultLayout},
    beforeMount() {
        this.userStore.getUserEvents()
        this.userStore.getAppointments()
    },
    data() {
        return {
            initialFormData: {
                title: '',
                text: ''
            },
            newEventFormData: {
                title: '',
                text: ''
            }
        }
    },
    setup() {
        const userStore = useUserStore()
        const eventStore = useEventStore()
        if (!userStore.user) {
            userStore.parseJwtToUser()
        }
        return {userStore, eventStore}
    },
    methods: {
        async createNewEvent() {
            await this.eventStore.createNewEvent(this.newEventFormData)
            await this.userStore.getUserEvents()
            this.newEventFormData = this.initialFormData
        }
    }

}
</script>