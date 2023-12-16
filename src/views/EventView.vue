<template>
    <DefaultLayout>
        <div class="d-flex justify-content-center"  v-if="!eventStore.event">
            <Loader/>
        </div>
        <section class="content-header" v-if="eventStore.event">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1>{{ eventStore.event.title }}</h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
                            <li class="breadcrumb-item active">{{ eventStore.event.title }}</li>
                        </ol>
                    </div>
                </div>
            </div><!-- /.container-fluid -->
        </section>
        <section class="content" v-if="eventStore.event">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <Event />
                    </div><!-- /.col -->
                </div><!-- /.row -->
            </div><!-- /.container-fluid -->
        </section>

    </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import Event from "@/components/Event.vue";
import Loader from "@/components/Loader.vue";
import {api} from "@/api/instanceAxios.js";
import {useEventStore} from "@/stores/eventStore.js";
import event from "@/components/Event.vue";

export default {
    name: 'EventView',
    components: {Loader, Event, DefaultLayout},
    props: {
        id: String
    },
    data() {
        return {
            // event: null
        }
    },
    setup() {
        const eventStore = useEventStore()
        return {eventStore}
    },
    mounted() {
        this.eventStore.getEvent(this.id)
    },
    watch: {
        id(newId) {
            this.eventStore.getEvent(newId)
        }
    }
}
</script>

<style scoped>
.loader {
    width: 50px;
    height: 50px;
    border-top: 3px solid black;

}
</style>