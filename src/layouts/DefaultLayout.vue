<script>
import router from "@/router/index.js";
import {defineComponent} from 'vue'
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import {useUserStore} from "@/stores/userStore.js";


export default defineComponent({
    name: "DefaultLayout",
    components: {Sidebar, Navbar},
    setup() {
        const userStore = useUserStore()
        if (!userStore.user) {
            userStore.parseJwtToUser()
        }
        return {userStore}
    },
})
</script>

<template>
    <div class="wrapper">
        <Navbar :user-store="userStore"/>
        <sidebar :user-store="userStore"/>
        <div class="content-wrapper">
            <slot />
        </div>
    </div>
</template>

<style scoped>

</style>