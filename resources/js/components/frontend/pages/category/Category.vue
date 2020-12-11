<template>
   <v-container id="category" fluid tag="section">
        <v-row>
            <v-col cols="12">
                <h2>{{categoryName}}</h2>
            </v-col>
<v-col cols="12">
                <CategorySearch />
            </v-col>
                <v-col cols="12" lg="3" sm="4">
                    <CategorySidebar />
                </v-col>
                <v-col cols="12" lg="9" sm="8">
                    <CategoryQuiz />
                </v-col>
        </v-row>
   </v-container>
</template>

<script>
import CategorySidebar from './Sidebar'
import CategorySearch from './Search'
import CategoryQuiz from './Content'
export default {
    name:"CategoryComponent",
    components:{
        CategorySidebar,
        CategorySearch,
        CategoryQuiz
    },
    data() {
        return {
            CategoryTitle:"",
            cat_id: this.$route.params.cat_id
        }
    },
    computed:{
        categoryName(){
            return this.$store.state.category.selectedCategory.category.name;
        }
    },
    created(){
        this.$store.dispatch('category/getCategoryById',{cat_id:this.cat_id})
    }

}
</script>

<style>

</style>
