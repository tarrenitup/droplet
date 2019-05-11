import * as types from './actionTypes'
import ProfileApi from '../api/ProfileApi'

export function loadBio(userID){
    return function(dispatch) {
        return ProfileApi.getBio(userID).then(bio => {
            dispatch(loadBioSuccess(bio))
        }).catch(error => {
            throw(error)
        })
    }
}

export function loadBioSuccess(bio){
    return{type: types.LOAD_BIO, bio}
}
