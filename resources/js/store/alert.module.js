import { v4 as uuidv4 } from 'uuid';
export const alert = {
    namespaced: true,
    state:{
        list:[]
    },
    actions: {
        setAlert({ commit },payload) {
            const id = uuidv4();
            //call mutation
            commit('SET_ALERT', {...payload,id:id});
            setTimeout(() => {
              commit('REMOVE_ALERT', id);
            }, 3000);
          },
    },
    mutations: {
        SET_ALERT(state, payload) {
            state.list = [...state.list,payload ];
        },
        REMOVE_ALERT(state, payload) {
            state.list = state.list.filter(item  => item.id !== payload)
        }
    }
}
