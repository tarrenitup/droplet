import Auth from '../components/Auth/Auth.js'

class ProfileApi{
    static getBio(userID) {
        const fetchURL = 'http://localhost:5000/users/getBio/' + userID;
        const token = Auth.getCookie('token');
        const header = 'Bearer ' + token
        return fetch(fetchURL,{
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'content-type': 'application/json',
                'Authorization': header
            }
        }).then(response => {
            return response.json()
        }).then(data =>{
            return data.bio
        }).catch(error => {
            return error
        });
    }
}

export default ProfileApi
