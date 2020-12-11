<template>
  <v-card
    class="mx-auto"
    max-width="300"
    tile
  >
    <v-list shaped>
      <v-subheader>LEVELS</v-subheader>
      <v-list-item-group
        v-model="selectedItem"
        color="indigo"
      >
        <v-list-item
          v-for="(item, i) in quizLevels"
          :key="i"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
    name:"CategorySidebar",
    data() {
        return {
            quizLevels : [
                {id:0,  title: "All", icon: 'mdi-help-box'},
                {id:1,  title: "Beginner", icon: 'mdi-image'},
                {id:2,  title: "Intermediate", icon: 'mdi-view-dashboard' },
                {id:3,  title: "Expert", icon: 'mdi-help-box'},
            ],
            selectedItem:0,

        }
    },
    watch:{
        selectedItem(){
            this.$store.dispatch('category/updateSelectedLevel', this.selectedItem)
        }
    }
}
</script>

<style>

</style>
