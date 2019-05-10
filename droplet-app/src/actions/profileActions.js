import * as types from './actionTypes'
import ProfileApi from '../api/ProfileApi'

export function loadBio(){
    return function(dispatch) {
        return ProfileApi.getBio().then(bio => {
            dispatch(loadBioSuccess(bio))
        }).catch(error => {
            throw(error)
        })
    }
}

export function loadBioSuccess(bio){
    return{type: types.LOAD_BIO, bio}
}
