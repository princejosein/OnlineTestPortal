<template>
  <router-view></router-view>
</template>

<script>
export default {
    name:'App',
    created(){
        //check token valid (locally and server) else refreshtoken or logout
        this.$store.dispatch('auth/me');
        console.log('Started in App.vue')
    }
}

</script>

<style>

</style>
