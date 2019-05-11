import * as types from './actionTypes'

export function loadLoginData(name,id){
    return{type: types.LOGIN_DATA, name,id}
}
