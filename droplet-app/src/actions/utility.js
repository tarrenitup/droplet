export function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}

export function arrayEquals(arr1, arr2){
    if(!arr1 || !arr2){
        return false;
    }
    if(!Array.isArray(arr1) || !Array.isArray(arr2)){
        return false;
    }
    if(arr1.length != arr2.length){
        return false;
    }
    let i = 0;
    for(i = 0; i < arr1.length; i++){
        if(arr1[i] !== arr2[i]){
            return false;
        }
    }
    return true;
}
