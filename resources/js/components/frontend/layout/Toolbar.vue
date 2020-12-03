<template>
  <v-toolbar dense color="indigo" dark max-height="64px">
    <v-toolbar-title>
      <router-link class="white--text" to="/">LearnApp</router-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <router-link v-for="item in filterItems" :key="item.title" :to="item.to">
      <v-btn text>{{ item.title }}</v-btn>
    </router-link>
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: "forum",
          to: "/forum",
          show: true,
        },
        {
          title: "Ask Question",
          to: "/ask",
          show: true,
        },
        {
          title: "Login",
          to: "/login",
          show: true,
        },
        {
          title: "Logout",
          to: "/logout",
          show: true,
        },
      ],
    };
  },
  computed: {
    filterItems() {
      return this.items.filter((item) => item.show);
    },
  },
};
</script>

<style></style>
