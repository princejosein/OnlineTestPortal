<template>
    <v-container id="home" fluid tag="section">
        <v-row>
            <!-- Category Start -->

            <v-col cols="12">
                <h2>Topics recommended for you</h2>
                <CategoryComponent />
            </v-col>
            <!-- Category End -->

            <v-col cols="12">
                <h2>Featured Exams</h2>
                <QuizComponent />
            </v-col>

            <v-col cols="12" lg="4"> </v-col>
        </v-row>
    </v-container>
</template>

<script>
import CategoryComponent from "./pages/home/Category";
import QuizComponent from "./pages/home/Quiz";

export default {
    name: "Home",
    components: {
        CategoryComponent,
        QuizComponent
    },
    data() {
        return {
            // categoriesList: [],
            // featuredExamLists: [],
            // topExamLists: []
        };
    },

    mounted() {
        // this.loadFeaturedExams();
        // this.loadExamLists();
        // load top 4 tests
        // random tests
    },

    methods: {
        // async loadFeaturedExams() {
        //     try {
        //         const response = await axios.get("/api/quiz");
        //         this.featuredExamLists = response.data.data.slice(0, 4);
        //     } catch (error) {
        //         console.error(error);
        //     }
        // }
        // async loadExamLists() {
        //     try {
        //         const response = await axios.get("/api/quiz");
        //         this.topExamLists = response.data.data.slice(0, 8);
        //     } catch (error) {
        //         console.error(error);
        //     }
        // }
    }
};
</script>
