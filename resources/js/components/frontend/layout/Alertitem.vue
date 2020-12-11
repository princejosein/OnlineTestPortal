<template>
<div>
<span v-for="alert in alerts" :key="alert.id">
    <v-alert
    :type=alert.type
    :id=alert.id
    >
    {{alert.message}}
    </v-alert>
</span>
</div>

</template>

<script>
export default {
  computed:{
      alerts(){
          return this.$store.state.alert.list;
      }
  }
}
</script>

<style>

</style>
