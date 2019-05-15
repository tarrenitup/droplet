import * as types from './actionTypes'
import ProfileApi from '../api/ProfileApi'
import {isEmpty} from './utility'

export function loadBio(userID){
    return function(dispatch) {
        return ProfileApi.getBio(userID).then(bio => {
            if(!isEmpty(bio)){
                dispatch(loadBioSuccess(bio))
            }
        }).catch(error => {
            throw(error)
        })
    }
}

export function loadBioSuccess(bio){
    return{type: types.LOAD_BIO, bio}
}
