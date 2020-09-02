<template>
  <v-app>
    <Users></Users>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Users from './components/Users.vue';


export default Vue.extend({
  name: 'App',

  components: {
    Users,
  },

  data: () => ({
    //
  }),
});
</script>
