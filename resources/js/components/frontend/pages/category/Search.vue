<template>
  <v-text-field
      v-model="search"
      color="cyan darken"
      label="Search"
      placeholder="Start typing..."
    >
      <!-- <template v-slot:progress>
        <v-progress-linear
          v-if="custom"
          :value="progress"
          :color="color"
          absolute
          height="7"
        ></v-progress-linear>
      </template> -->
    </v-text-field>
</template>

<script>
import _ from 'lodash';
export default {
    name:"CategorySearch",
    data: () => ({
      search: '',
      custom: false,
    }),
    computed: {
      progress () {
        return Math.min(100, this.value.length * 10)
      },
      color () {
        return ['error', 'warning', 'success'][Math.floor(this.progress / 40)]
      },
    },
    watch:{
        search:function() {
            this.debouncedSearch()
        }
    },
    created: function () {
    // _.debounce is a function provided by lodash to limit how
    // often a particularly expensive operation can be run.
    this.debouncedSearch = _.debounce(this.searchQuiz, 500)
  },
    methods:{
        searchQuiz() {
            this.$store.dispatch('category/updateSearchStr', this.search)
        }
    }
}
</script>

<style>

</style>
