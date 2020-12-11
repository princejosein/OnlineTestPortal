<template>
  <v-toolbar dense color="indigo" dark max-height="64px">
    <v-toolbar-title>
      <router-link class="white--text" to="/">LearnApp</router-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <router-link v-for="item in filterItems" :key="item.title" :to="item.to">
      <v-btn text>{{ item.title }}</v-btn>
    </router-link>
    <a v-if="loggedIn" @click="logout()" >
      <v-btn text>Logout</v-btn>
    </a>
  </v-toolbar>
</template>

<script>
import User from '../../../helper/User';
export default {
  data() {
    return {
      items: [
        {
          title: "Home",
          to: "/",
          show: true,
        },
        {
          title: "Login",
          to: "/user/login",
          show: !User.loggedIn(),
        },
        {
          title: "Dashboard",
          to: "/admin",
          show: User.loggedIn(),
        },
      ],
      loggedIn:User.loggedIn()
    };
  },
  computed: {
    filterItems() {
      return this.items.filter((item) => item.show);
    },
    isAdmin() {
        return this.$store.getters['auth/isAdmin'];
    },
    isLoggedIn() {
        return this.$store.getters['auth/isLoggedIn'];
    }
  },
  methods:{
      logout() {
          this.$store.dispatch('auth/logout')
        //   this.$router.push('/user/login')
        // this.$forceUpdate();
        location.reload(true);
      }
  }
};
</script>

<style></style>
