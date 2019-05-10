import React from 'react'
import './Card.css'
import likesIcon from './likes.svg'
import Auth from '../Auth/Auth.js'
import {connect} from 'react-redux'
import {likePost} from '../../actions/postActions'

const PostMedia = (props) => {

    switch(props.mediaType) {
        case 'photo':
            return (<div className='post-media'><img src={props.mediaSource} /></div>)
        case 'video':
            return (<div className='post-media'><video src={props.mediaSource} /></div>)
        default:
            return (<div></div>)
    }
}
/*
const DisplayLikes = (props) => {
    if(liked === true){
        return (<p>{props.numlikes + 1} </p>)
    }
    else {
        return <p>{props.numlikes}</p>
    }
}
*/

function modifyLikes(props){
    const uid = Auth.parseJwt(Auth.getCookie('token')).sub;

    props.dispatch(likePost(props.postID,props.selectedPageIndex))
}

//Pass card dispatch somehow.
const Card = (props) => (
    <div className='card'>
        <div className='card-top'>
            <img className='profile-pic' src={props.picture} alt='' />
            <p className='username'>{props.name}</p>
        </div>

        <PostMedia mediaType={props.mediaType} mediaSource={props.mediaSource} />

        <p className='card-text'>{props.text}{props.edited ? ' edited' : ''}</p>

        <div className='card-bottom'>
            <div className='likes'>
                <img src={likesIcon} alt='like' onClick={() => modifyLikes(props)}/>
                <p>{props.likes}</p>
                <p> &nbsp;&nbsp; {props.timeSinceLike}</p>
            </div>
        </div>
    </div>
)

function mapStateToProps(state){
    switch(state.seletedPageIndex){
        case 0:
            return{
                selectedPageIndex: state.selectedPageIndex
            }
        case 1:
            return{
                selectedPageIndex: state.selectedPageIndex
            }
        case 3:
            return{
                selectedPageIndex: state.selectedPageIndex
            }
        default
            return{
                selectedPageIndex: state.selectedPageIndex
            }
    }
}

export default connect(mapStateToProps)(Card);
