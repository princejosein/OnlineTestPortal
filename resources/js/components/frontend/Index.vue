<template>
  <v-app>
    <toolbar></toolbar>
    <router-view></router-view>
  </v-app>
</template>

<script>
import toolbar from './layout/Toolbar.vue'
  export default {
    name: 'FrontendIndex',

    components: {
      toolbar
    },

    data: () => ({
      expandOnHover: false,
    }),
  }
</script>
