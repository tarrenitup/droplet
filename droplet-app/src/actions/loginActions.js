import LoginApi from '../api/LoginApi'
import * as types from './actionTypes'

export function attemptLogin(user,pass){
    return function(dispatch){
        return LoginApi.login(user,pass).then(successStatus =>{
            if(successStatus){
                dispatch(loginSucess)
            }
            else{
                //?
            }
        }).catch(error=>{
            throw(error)
        })
    }
}

export function loginSucess(){
    return{type: types.LOGIN_SUCCESS}
}
