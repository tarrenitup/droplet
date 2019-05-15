import * as types from './actionTypes'

export function updateLocation(location){
    return{type: types.UPDATE_LOCATION, location}
}

export function updateTime(){
    return{type: types.UPDATE_TIME}
}

export function homePage(){
    return{type: types.HOME_PAGE}
}

export function mapPage(){
    return{type:types.MAP_PAGE}
}

export function likePage(){
    return{type:types.LIKE_PAGE}
}

export function profilePage(){
    return{type:types.PROFILE_PAGE}
}
