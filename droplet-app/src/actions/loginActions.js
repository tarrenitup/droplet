import * as types from './actionTypes'

export function loadLoginData(name,id,pic){
    return{type: types.LOGIN_DATA, name,id,pic}
}
