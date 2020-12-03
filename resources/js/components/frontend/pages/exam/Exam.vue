<template>
<!-- <h1>Hey</h1> -->
<!-- start component -->

<!-- exam component -->
<start-quiz :quiz_id="quiz_id"></start-quiz>
</template>

<script>
export default {
    'name':'Exam',
    components:{
        StartQuiz:() => import('./Start')
    },
    data() {
        return {
            quiz_id: this.$route.params.quiz_id
        }
    }
}
</script>

<style>

</style>
