<template>
<v-container
id="exam"
fluid
tag="section">

 <v-row>
        <v-col
        cols="12"
        >

  <div v-if=viewQuestions>
      <div
    v-for="(question,index) in questions"
    :key="index"
    >
      <v-card
    class="mx-auto"
    outlined
    v-if="index === currentIndex"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">
          {{index+1}} of {{total_questions_count}}
        </div>
        <v-list-item-title class="headline mb-1">
          {{question.question}}
        </v-list-item-title>
        <!-- <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle> -->
      </v-list-item-content>
    </v-list-item>
<v-card-text>

<div v-for="option in question.options"
        :key="option.id">
    <v-radio-group v-model="userResponses[currentIndex].optionGroup">
      <v-radio
        :label="option.option"
        :value="option.id"
      ></v-radio>
    </v-radio-group>
</div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        outlined
        rounded
        text
        @click="prev"
        v-if="currentIndex != 0"
      >
        Prev
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        outlined
        rounded
        text
        @click="next"
        v-if="currentIndex != total_questions_count-1"
      >
        Next
      </v-btn>
      <v-btn
        outlined
        rounded
        text
        @click="finishExam"
        v-if="currentIndex == total_questions_count-1"
      >
        Finish
      </v-btn>
    </v-card-actions>
  </v-card>
      </div>
  </div>
  <div v-if="!quiz_started">
      <v-card
    class="mx-auto"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          {{quiz.name}}
        </v-list-item-title>
        <v-list-item-subtitle>{{quiz.question_level}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-btn
        outlined
        rounded
        text
        @click="startQuizClick"
      >
        Start Quiz
      </v-btn>
    </v-card-actions>
  </v-card>
    </div>

    <div v-if="finished">
      <v-card
    class="mx-auto"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          Result
        </v-list-item-title>
        <v-list-item-subtitle></v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-text>
{{right_count}}/{{total_questions_count}}
    </v-card-text>
    <v-card-actions>

    </v-card-actions>
  </v-card>
    </div>
        </v-col>

 </v-row>

</v-container>



</template>

<script>
export default {
    'name':'StartQuiz',
    props:['quiz_id'],
    data() {
        return {
            id:this.quiz_id,
            quiz_started:false,
            quiz:{},
            questions:[],
            total_questions_count:0,
            right_count:0,
            currentIndex:0,
            userResponses:[],
            finished:false
        }
    },

    mounted(){
        this.loadQuizDetails()
    },
    computed:{
        viewQuestions: function(){
            return this.quiz_started && this.questions.length && !this.finished;
        }
        // quiz_started AND questions.length AND finished
    },
    methods:{
        async loadQuizDetails()
        {
            try {
                const res = await axios.get(`api/quiz/${this.id}`);
                this.quiz = res.data.data
            } catch (error) {
                console.log(error)
            }
        },
        async startQuizClick()
        {
            this.quiz_started = true
            try {
                const res = await axios.get(`api/quiz/questions/${this.id}`);
                this.questions = res.data.data
                this.total_questions_count = res.data.data.length
                res.data.data.forEach(element => {
                  this.userResponses.push({
                    qid:element.id,
                    optionGroup:'optionGroup_'+element.id
                  })
                });
            } catch (error) {
                console.log(error)
            }
        },
        next()
        {
          this.currentIndex += 1
        },
        prev()
        {
          this.currentIndex -= 1;
        },
        async finishExam(){
          console.log(this.userResponses)
          try {
              const response = await axios.post("/api/exam", {exam :this.userResponses, quiz_id:this.id});
              console.log(response.data)
            this.right_count = response.data.right_count;
            this.finished = true;
          } catch (error) {
              console.log(error)
          }
        }
    }
}
</script>

<style>

</style>
