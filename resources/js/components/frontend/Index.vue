<template>
  <v-app>
    <toolbar></toolbar>
    <alertitem></alertitem>
    <router-view></router-view>
  </v-app>
</template>

<script>
import toolbar from './layout/Toolbar.vue'
import alertitem from './layout/Alertitem'
  export default {
    name: 'FrontendIndex',

    components: {
      toolbar,
      alertitem
    },

    data: () => ({
      expandOnHover: false,
    }),
  }
</script>
