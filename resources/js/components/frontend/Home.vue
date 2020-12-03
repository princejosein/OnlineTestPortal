<template>
  <v-container
    id="home"
    fluid
    tag="section"
  >
    <v-row>
        <v-col
         v-if="featuredExamLists.length"
        cols="12"
      >
      <h2>Featured Exams</h2>
<v-row>
<v-card
    class="mx-auto my-12"
    max-width="374"
    min-width="300"
    v-for="exam in featuredExamLists"
    :key="exam.id"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>



    <v-card-title>{{exam.name}}</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >


        <div class="grey--text">
          {{exam.category_name}}
        </div>
      </v-row>

      <div class="my-4 subtitle-1">
        {{exam.question_level}}
      </div>
      </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>{{exam.created_at}}</v-card-title>

    <v-card-actions>
      <v-btn
        color="deep-purple"
        text
      >
        Take Exam
      </v-btn>
    </v-card-actions>
  </v-card>
</v-row>

         </v-col>
         <v-col
         v-if="categoriesList.length"
        cols="12"
      >
      <h2>Topics recommended for you</h2>
        <v-btn
            class="ma-2"
            outlined
            color="indigo"
            v-for = "category in categoriesList"
            :key="category.id"
            >
            {{category.name}}
            </v-btn>
         </v-col>
      <v-col
        cols="12"
        lg="4"
      >





      </v-col>


    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Home',

    data () {
      return {
          categoriesList:[],
          featuredExamLists : [],
          topExamLists : []
      }
    },

    mounted() {
        // load categories
        this.loadCategories();
        this.loadFeaturedExams();
        this.loadExamLists();
        // load top 4 tests
        // random tests
    },

    methods: {
        async loadCategories() {
            try {
                const response =  await axios.get('/api/category');
                this.categoriesList = response.data.data
            } catch (error) {
                console.error(error)
            }
        },
        async loadFeaturedExams() {
            try {
                const response =  await axios.get('/api/quiz');
                this.featuredExamLists = response.data.data.slice(0,4)
            } catch (error) {
                console.error(error)
            }
        },
        async loadExamLists() {
            try {
                const response =  await axios.get('/api/quiz');
                this.topExamLists = response.data.data.slice(0,8)
            } catch (error) {
                console.error(error)
            }
        }
    },
  }
</script>
