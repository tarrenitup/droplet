import React, {Component} from 'react'
import './LikeScreen.css'
import Card from '../Card/Card.js'

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
        console.log("Testing Post list");
        fetch('http://localhost:5000/posts')
            .then(results => {
                return results.json()
            }).then(data =>{
                this.setState({
                    messages: data,
                })
            })
            .catch((error) => {
                return error
            })
    }


    render(){
        console.log(this.state.messages);
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
