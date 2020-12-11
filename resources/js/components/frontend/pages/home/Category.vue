<template>
    <div>
        <!-- Loading start -->
        <LinearProgressBar
            :loading="categoryLoading"
            :loadingText="loadingText"
        />
        <!-- Loading end -->
        <v-btn
            class="ma-2"
            outlined
            color="indigo"
            v-for="category in categoriesList"
            :key="category.id"
            @click="LoadCategoryPage(category.id)"
        >
            {{ category.name }}
        </v-btn>
    </div>
</template>

<script>
import LinearProgressBar from "../../layout/progress/Linear";
export default {
    name: "CategoryComponent",
    components: {
        LinearProgressBar
    },
    data() {
        return {
            loadingText: "Loading Categories...."
        };
    },
    created() {
        this.$store.dispatch("category/getCategories");
        console.log("category state", this.$store.state);
    },
    computed: {
        categoriesList() {
            return this.$store.state.category.categories;
        },
        categoryLoading() {
            return this.$store.state.category.status.loading;
        }
    },
    methods:{
        LoadCategoryPage(cat_id){
            this.$router.push(`/category/${cat_id}`)
        }
    }
};
</script>

<style></style>
