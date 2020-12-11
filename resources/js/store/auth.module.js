import {AuthService} from '../service/index'
import router from '../plugins/router'

const loggedIn = AuthService.isLoggedIn();
console.log('auth loggedIn', loggedIn)
const initialState =  loggedIn ?
                        { status:{loggedIn:true}, user:AuthService.getUser() } :
                        { status:{loggedIn:false}, user:null }

export const auth = {
    namespaced:true,
    state:initialState,
    actions: {
        async login({dispatch, commit}, data){
            commit('loggingStart');
            const response = await AuthService.login(data);
            if(response.success)
            {
                router.push('../admin')
                commit('loginSuccess', response.result);
            } else {
                commit('loginError');
                const payload = {type:'error',message:response.message}
                dispatch('alert/setAlert', payload, { root: true });
            }
        },
        async register({dispatch, commit}, data){
            const response = await AuthService.register(data);
            if(response.success)
            {
                router.push('../admin')
                commit('loginSuccess', response.result);
            } else {
                commit('loginError');
                const payload = {type:'error',message:response.message}
                dispatch('alert/setAlert', payload, { root: true });
                return response;
            }
        },
        // me for checking the token validity in local not server and update user in localstorage
        me({commit}) {
            const response = AuthService.isLoggedIn();
            if(!response) {
                commit('logout');
            }
            console.log('status of token', response)
        },
        // Button click
        logoutAction({commit}) {
            commit('logout')
            router.push('home')
        },
        // Other situations
        logout({commit}){
            commit("logout")
        }
    },
    mutations: {
        loggingStart(state) {
            state.status = { loggingIn: true };
        },
        loginSuccess(state, result) {
            state.status = {loggedIn:true}
            state.user = result.user;
        },
        loginError(state) {
            state.status = {loggedIn:false}
            state.user = null;
        },
        logout(state) {
            state.status = {loggedIn:false}
            state.user = null;
            AuthService.logout();
        }
    },
    getters:{
        isAdmin: state => {
            return state.user ? state.user.is_admin : false
        },
        isLoggedIn: state => {
            return state.status.loggedIn
        }
    }
}
