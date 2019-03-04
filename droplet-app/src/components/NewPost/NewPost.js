import React, { Component } from 'react'

class NewPost extends Component{
    constructor(){
        super();
        this.state = {
            content:''
        }
        this.onChange = this.onChange.bind(this);
        this.onPost = this.onPost.bind(this);
    }

    onPost(event){
        event.preventDefault();
        console.log(this.state.content);
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position)=>{
                console.log(position.coords.latitude);
                console.log(position.coords.longitude);
                //Change this to take either take user id from jwt, or query for it from database
                fetch('http://localhost:3001/createpost/5c6f3ddf0bdffa32ac73664c',{
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        content: "bababa",
                        location: {
                            coordinates: [position.coords.latitude, position.coords.longitude]
                        }
                    })
                })
                .then(function(res){
                    return res.json();
                })
                .then(function(json){
                    console.log(JSON.stringify(json));
                });
            })
        }
    }

    onChange(event){
        //event.target.name returns name from <input>
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        return(
            <form>
                <input
                    className="form-text"
                    placeholder="PostContent"
                    name="content"
                    type="text"
                    onChange={this.onChange}
                    />
                <input
                    className="newPost"
                    value="Post"
                    type="submit"
                    onClick={this.onPost}
                />
            </form>
        )
    }
}

export default NewPost
