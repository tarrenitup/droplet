import React, {Component} from 'react'
import './LikeScreen.css'
import Card from '../Card/Card.js'
import Auth from '../Auth/Auth.js'


class LikeScreen extends Component{
    constructor(){
        super();
        this.state = {
            messages: [],
        }
        this.createPosts = this.createPosts.bind(this);
        this.createPosts();
    }

    //DEFINE NUMPOSTS
    createPosts(){
        const userID = Auth.parseJwt(Auth.getCookie('token')).sub;
        const fetchURL = 'http://localhost:5000/posts/getUserPosts/' + userID;
        const token = Auth.getCookie('token');
        const header = 'Bearer ' + token
        fetch(fetchURL,{
            method:'GET',
            headers:{
                'Accept': 'application/json',
                'content-type': 'application/json',
                'Authorization': header
            }
        })
            .then(results => {
                return results.json()
            }).then(data =>{
                this.setState({
                    messages: data.messages
                });
            })
            .catch((error) => {
                return error
            })

    }


    render(){
        const items = this.state.messages.map((message, key)=>
            <Card
                key={message._id}
                name={message.username}
                text={message.content}
                likes={message.likes.length}
            />
        );
        //Example...
        //let PostItems = Posts.map((p) => <Card key = p.name>{p.name}</Card>);
        return(
            <main className='like-screen screen'>
                {items}
            </main>
        )
    }
}

export default LikeScreen;
