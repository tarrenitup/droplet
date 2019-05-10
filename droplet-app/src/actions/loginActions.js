import * as types from './actionTypes'

export function loginSuccess(name){
    return{type: types.LOGIN_SUCCESS, name}
}
