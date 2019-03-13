    import React, {Component} from 'react'
import './LikeScreen.css'
import Card from '../TempCards/Card.js'

class LikeScreen extends Component{
    constructor(){
        super();
        this.state = {
            messages: [],
        }
        this.createPosts();
    }

    //DEFINE NUMPOSTS
    createPosts(){
        console.log("Testing Post list");
        fetch('http://localhost:3001/users/getallposts')
            .then(results => {
                return results.json()
            }).then(data =>{
                this.setState({
                    messages: data.message,
                })
            })
    }


    render(){
        console.log(this.state.messages);
        const items = this.state.messages.map((message, key)=>
            <Card
                key = {message._id}
                userName = {message.username}
                postText = {message.content}
                likes = {message.likes.length}
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