import React, { Component } from 'react'
import './Card.css'
import likesIcon from './likes.svg'


class Card extends Component {

    constructor() {
        super()

        this.state = {
            postText: '',
            profilePic: '',
            userName: '',
        }
    }

    componentDidMount() {
        fetch("https://randomuser.me/api/?dataType=json")
            .then(results => {
                return results.json()
            }).then(data => {
                this.setState({
                    postText: data.results[0].email,
                    profilePic: data.results[0].picture.thumbnail,
                    userName: data.results[0].login.username,
                })
            })
    }

    render() {
        return (
            <div className='card'>
                <div className='card-top'>
                    <img className='profile-pic' src={this.state.profilePic} alt='profile' />
                    <p className='username'>{this.state.userName}</p>
                </div>
                
                <p className='card-text'>{this.state.postText}</p>
            
                <div className='card-bottom'>
                    <div className='likes'>
                        <img src={likesIcon} alt='The likes icon'/>
                        <p>{this.props.likes}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Card;
