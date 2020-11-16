<template>
  <v-app>
      <dashboard-core-app-bar />
      <dashboard-core-drawer />
      <dashboard-core-view />
      <dashboard-core-settings />
  </v-app>
</template>

<script>
import Drawer from '../core/Drawer.vue'
  export default {
    name: 'DashboardIndex',

    components: {
      DashboardCoreAppBar: () => import('../core/AppBar'),
      DashboardCoreDrawer: () => import('../core/Drawer'),
      DashboardCoreSettings: () => import('../core/Settings'),
      DashboardCoreView: () => import('../core/View'),
    },

    data: () => ({
      expandOnHover: false,
    }),
  }
</script>
