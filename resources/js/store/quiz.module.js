import {QuizService} from '../service/quiz.service'

const initialState = {
    loading:true,
    quizes:[],
}
export const quiz = {
   namespaced:true,
   state:initialState,
   actions:{
       async getFeaturedQuizes({dispatch, commit}) {
                commit('QUIZ_LOADING')
           const response = await QuizService.featuredQuiz();
           if(response.success) {
                commit('QUIZ_SUCCESS', response.result);
           } else {
                commit('QUIZ_ERROR', response.message)
           }
       },
    //    async searchQuiz({commit}, searchParams) {
    //     const response = await QuizService.searchQuiz(searchParams);
    //     if(response.success) {
    //          commit('QUIZ_SUCCESS', response.result);
    //     } else {
    //          commit('QUIZ_ERROR', response.message)
    //     }
    //    }
   },
   mutations:{
        QUIZ_LOADING(state){
            state.loading = true
        },
        QUIZ_SUCCESS(state, response){
            state.loading = false
            state.quizes = response.data
        },
        QUIZ_LOADING(state){
            state.loading = false
        }
   }
}
