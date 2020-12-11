import axioshelper from '../helper/AxiosHelper';
import {CategoryService} from '../service/index'
import {QuizService} from '../service/index'

const initialState = {
    status:{
        loading:true
    },
    categories:[],
    active:0,
    total:0,
    message:'',
    //Category page
    selectedCategory:{
        status:{
            loading:true
        },
        category:{},
        search:'',
        level:0,
        quizes:[],
        quizesMeta:{
            current_page:1,
            last_page:1
        }
    }
}

export const category = {
    namespaced:true,
    state:initialState,
    actions:{
        async getCategories({dispatch, commit}){
            commit('CATEGORY_LOADING')
            const response = await CategoryService.getAll();
            if(response.success){
                commit('CATEGORY_LOADED',response.result)
            } else {
                commit('CATEGORY_LOADING_ERROR', response.message)
            }
        },
        async getCategoryById({commit, dispatch}, data){
            const response = await CategoryService.getById(data.cat_id);
            if(response.success){
                commit('CATEGORY_ITEM_LOADED',response.result)
                console.log('here inside')
                dispatch('updateSelectedLevel',0)
            } else {
                commit('CATEGORY_ITEM_LOADED_ERROR', response.message)
            }
        },
        updateSelectedLevel({commit, dispatch, state}, level_id) {
            commit('CATEGORY_LEVEL_UPDATE', level_id)
            const searchParams = {
                category_id: state.selectedCategory.category.id,
                level:state.selectedCategory.level,
                search:state.selectedCategory.search,
                page:state.selectedCategory.quizesMeta.current_page
              }
              console.log(searchParams)
              dispatch('quizSearch',searchParams)
        },
        updateSearchStr({commit, dispatch, state}, searchStr) {
            commit('CATEGORY_SEARCH_UPDATE', searchStr)
            const searchParams = {
                category_id: state.selectedCategory.category.id,
                level:state.selectedCategory.level,
                search:state.selectedCategory.search,
                page:state.selectedCategory.quizesMeta.current_page
              }
              dispatch('quizSearch',searchParams)
              console.log(searchParams)
        },
        updatePage({commit, dispatch, state}, page) {
            commit('CATEGORY_PAGE_UPDATE', page)
            const searchParams = {
                category_id: state.selectedCategory.category.id,
                level:state.selectedCategory.level,
                search:state.selectedCategory.search,
                page:state.selectedCategory.quizesMeta.current_page
              }
              dispatch('quizSearch',searchParams)
              console.log(searchParams)
        },
        async quizSearch({commit}, searchParams) {
            const response = await QuizService.searchQuiz(searchParams);
            if(response.success){
                commit('QUIZ_LOADED',response.result)
            } else {
                commit('QUIZ_LOADED_ERROR', response.message)
            }

        }
    },
    mutations:{
        CATEGORY_LOADING(state){

        },
        CATEGORY_LOADED(state, result) {
            state.status.loading = false
            state.categories = result.data;
            state.active = result.active;
            state.total = result.total;

        },
        CATEGORY_LOADING_ERROR(state, message) {
            state.status.loading = false;
            state.message = message
        },
        CATEGORY_ITEM_LOADED(state, result){
            state.selectedCategory.category = result.data;
            state.selectedCategory.status.loading = false;
        },
        CATEGORY_ITEM_LOADED_ERROR(state, message) {
            state.selectedCategory.status.loading = false;
        },
        CATEGORY_LEVEL_UPDATE(state, level_id) {
            state.selectedCategory.level = level_id;
        },
        CATEGORY_SEARCH_UPDATE(state, searchStr) {
            state.selectedCategory.search = searchStr;
        },
        CATEGORY_PAGE_UPDATE(state, page) {
            state.selectedCategory.quizesMeta.current_page = page;
        },

        QUIZ_LOADED(state, result) {
            console.log('quiz loaded', result.data)
            state.selectedCategory.status.loading = false
            state.selectedCategory.quizes = result.data;
            state.selectedCategory.quizesMeta.last_page = result.meta.last_page;

        },
        QUIZ_LOADED_ERROR(state, message) {
            state.selectedCategory.status.loading = false;
        },

    },
    getters:{
        isPaginate: state => {
            return state.selectedCategory.quizesMeta.last_page > 1? true : false;
        }
    }

}
