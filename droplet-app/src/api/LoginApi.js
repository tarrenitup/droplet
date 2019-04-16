import Auth from '../components/Auth/Auth.js'

class LoginApi{
    static login(username,password){
        fetch('http://localhost:5000/users/signin',{
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(function(res){
        if(res.status == 200){
            return res.json();
        }
        else{
            return Promise.reject(res.status);
        }
    })
    .then(function(json){
        //console.log(JSON.stringify(json.token));
        Auth.setCookie('token', json.token, 1);
        //console.log(Auth.parseJwt(Auth.getCookie('token')).sub);
        window.location.assign('/');
        //console.log(Auth.isAuthenticated());
        return true;
    }).catch((error)=>{
        //console.log(error);
        window.location.reload();
        return false;
    });
    }
}

export default LoginApi
