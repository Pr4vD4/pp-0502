<template>
    <div class="login-page">
        <div class="login-box">
            <div class="login-logo">
                <a href="#"><b>Admin</b>LTE</a>
            </div>
            <!-- /.login-logo -->
            <div class="card">
                <div class="card-body login-card-body">
                    <p class="login-box-msg">Sign in to start your session</p>

                    <form ref="form" @submit.prevent="login" class="mb-3">
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
                        <span id="exampleInputPassword1-error" class="error invalid-feedback" v-if="userStore.errors">Login data is incorrect</span>
                        <div class="row">

                            <!-- /.col -->
                            <div class="col-12">
                                <button type="submit" class="btn btn-primary btn-block">Sign In</button>
                            </div>
                            <!-- /.col -->
                        </div>
                    </form>
                    <p class="mb-0">
                        <router-link :to="{name: 'register'}" class="text-center">Register a new membership</router-link>
                    </p>
                </div>
                <!-- /.login-card-body -->
            </div>
        </div>
    </div>

</template>

<script>
import {defineComponent} from 'vue'
import {useUserStore} from "@/stores/userStore.js";

export default defineComponent({
    name: "LoginView",
    data() {
        return {
            formData: {
                login: '',
                password: ''
            }
        }
    },
    setup() {
        const userStore = useUserStore()
        return {userStore}
    },
    methods: {
        login() {
            this.userStore.login(this.formData)
        }
    }

})
</script>


<style scoped>
.invalid-feedback {
    display: block;
}
</style>