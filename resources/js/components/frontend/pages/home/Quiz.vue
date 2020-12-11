<template>
    <div>
        <!-- <v-row> -->
        <!-- Loading start -->
        <LinearProgressBar :loading="quizLoading" :loadingText="loadingText" />
        <!-- Loading end -->
        <v-row>
            <v-card
                class="mx-auto my-12"
                max-width="374"
                min-width="300"
                v-for="exam in featuredQuizLists"
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
        </v-row>

        <!-- </v-row> -->
    </div>
</template>

<script>
import LinearProgressBar from "../../layout/progress/Linear";
export default {
    name: "QuizComponent",
    components: {
        LinearProgressBar
    },
    data() {
        return {
            loadingText: "Loading Quizez..."
        };
    },
    mounted() {
        console.log("quiz state", this.$store.state);
        this.$store.dispatch("quiz/getFeaturedQuizes");
    },
    computed: {
        quizLoading() {
            return this.$store.state.quiz.loading;
        },
        featuredQuizLists() {
            return this.$store.state.quiz.quizes;
        }
    }
};
</script>

<style></style>
