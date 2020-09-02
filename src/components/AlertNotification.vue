<template>
    <div class="alert-container">
        <v-alert transition="fade-transition" v-if="getNotification.status === 'success'" dense text type="success">
            {{getNotification.message}}
        </v-alert>
        <v-alert transition="fade-transition" v-else-if="getNotification.status === 'error'" dense text type="error">
            {{getNotification.message}}
        </v-alert>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '../store';
import NotificationModel from '../interfaces/NotificationModel.interface';

export default Vue.extend({

    computed: {
        getNotification(): NotificationModel {
            return store.getters.getNotification;
        },
    },

});
</script>

<style scoped>
    .alert-container {
        display: flex;
        width: 100%;
        justify-content: center;
    }

    .v-alert {
        margin-top: 5px;
    }

</style>