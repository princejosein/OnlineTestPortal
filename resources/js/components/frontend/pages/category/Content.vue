<template>
  <div>
<v-row>
    <v-card
        class="mx-auto my-12"
        max-width="374"
        min-width="300"
        v-for="exam in quizLists"
        :key="exam.id"
    >
        <template slot="progress">
            <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
            ></v-progress-linear>
        </template>

        <v-card-title>{{ exam.name }}</v-card-title>

        <v-card-text>
            <v-row align="center" class="mx-0">
                <div class="grey--text">
                    {{ exam.category_name }}
                </div>
            </v-row>

            <div class="my-4 subtitle-1">
                {{ exam.question_level }}
            </div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-title>{{ exam.created_at }}</v-card-title>

        <v-card-actions>
            <router-link
                :to="{
                    name: 'Exam',
                    params: { quiz_id: exam.id }
                }"
            >
                <v-btn color="deep-purple" text>
                    Take Exam
                </v-btn>
            </router-link>
        </v-card-actions>
    </v-card>
    <v-col cols="12" v-if="isPaginate">
<div class="text-center">
    <v-pagination
      v-model="page"
      :length="length"
    ></v-pagination>
  </div>
  </v-col>
</v-row>
  </div>
</template>

<script>
export default {
    name:"CategoryQuiz",
    data(){
        return {
            page:this.$store.state.category.selectedCategory.quizesMeta.current_page
        }
    },
    computed:{
        quizLists(){
            return this.$store.state.category.selectedCategory.quizes;
        },
        isPaginate(){
            return this.$store.getters['category/isPaginate']
        },
        // page(){
        //     return this.$store.state.category.selectedCategory.quizesMeta.current_page;
        // },
        length(){
            return this.$store.state.category.selectedCategory.quizesMeta.last_page;
        }
    },
    watch:{
        page(newVal){
            this.$store.dispatch('category/updatePage', newVal)
        }
    }
}
</script>

<style>

</style>
