<script>
import {defineComponent} from 'vue'
import {useUserStore} from "@/stores/userStore.js";

export default defineComponent({
    name: "RegisterView",
    data() {
        return {
            formData: {
                login: '',
                password: '',
                password_confirmation: '',
                name: '',
                surname: '',
                birthdate: null,
            }
        }
    },
    setup() {
        const userStore = useUserStore()
        return {userStore}
    },
    methods: {
        register() {
            this.userStore.register(this.formData)
        }
    }
})
</script>

<template>
    <div class="login-page">
        <div class="register-box">
            <div class="register-logo">
                <a href="#"><b>Admin</b>LTE</a>
            </div>

            <div class="card">
                <div class="card-body register-card-body">
                    <p class="login-box-msg">Register a new membership</p>

                    <form @submit.prevent="register" class="mb-3">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Name" v-model="formData.name">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-user"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Surname" v-model="formData.surname">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-user"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Login" v-model="formData.login">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-address-card"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input type="password" class="form-control" placeholder="Password" v-model="formData.password">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input type="password" class="form-control" placeholder="Confirm password" v-model="formData.password_confirmation">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input type="date" class="form-control" placeholder="Birthdate" v-model="formData.birthdate">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-calendar"></span>
                                </div>
                            </div>
                        </div>
                        <span id="exampleInputPassword1-error" class="error invalid-feedback" v-if="userStore.errors">Register data is incorrect</span>
                        <div class="row">
                            <div class="col-12">
                                <button type="submit" class="btn btn-primary btn-block">Register</button>
                            </div>
                            <!-- /.col -->
                        </div>
                    </form>

                    <router-link :to="{name: 'login'}" class="text-center">I already have a membership</router-link>
                </div>
                <!-- /.form-box -->
            </div><!-- /.card -->
        </div>
    </div>

</template>

<style scoped>
.invalid-feedback {
    display: block;
}
</style>