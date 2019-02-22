export default class Auth{
    constructor(){
        this.login = this.login.bind(this);
    }

    login(username,password){
        fetch('localhost:3000/users/signin',{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: {
                username,
                password
            })
        })
        .then(function(res){
            return res.json();
        })
        .then(function(json){
            console.log(JSON.stringify(json));
        });
    }
}
