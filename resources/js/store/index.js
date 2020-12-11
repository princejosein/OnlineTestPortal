import Vue from 'vue'
import Vuex from 'vuex'

import {auth} from './auth.module'
import {alert} from './alert.module'
import {category} from './category.module'
import {quiz} from './quiz.module'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules:{
        auth,
        alert,
        category,
        quiz
    }
})
