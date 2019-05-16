import React, { Component } from 'react'
import './NewPostModal.scss'
import { connect } from 'react-redux'
import { toggleNewPostModal, newPostAddInitiate, sendNewPost, loadMapPosts, loadProfilePosts, loadHomePosts, newPostAddSuccess, reloadAllPosts, newPostAddFailure } from '../../actions/postActions'
import {updateTime} from '../../actions/miscActions'
import PostTypeSelector from './PostTypeSelector'
import SplashSlider from './SplashSlider'
import submitIcon from './submit-icon.svg'
import Auth from '../Auth/Auth.js'

const UserInfo = (props) => (
    <div className='user-info'>
        <img className='profile-picture' src={props.picture} alt='' />
        <p className='username'>{props.name}</p>
    </div>
)

const FileUpload = () => (
    <div className='file-upload-outer'>
        <input type="file" accept="image/*" name="mediaFileToUpload" className="media-file-upload" />
        <label htmlFor="file">This the label</label>
    </div>
)

const Buttons = ({ dispatch }) => {

    return (
    <div className='new-post-buttons'>
        <div onClick={() => dispatch(toggleNewPostModal())} className='cancel button'>
            <span className='cancel new post'/>
            <p>nvm</p>
        </div>
        <input name='submit' type='submit'  className='submit button' value="Drop" >
            {/* <img src={submitIcon} alt='submit new post'/>
            <p>Drop</p> */}
        </input>
    </div>
)}


class NewPostModal extends Component {
    constructor(props) {
        super(props)
    }

    getModalStyleClasses = () => this.props.visiblity ? 'new-post-modal' : 'new-post-modal off'

    handleSubmit = (e, pageIndex, loc, dispatch) => {
        e.preventDefault()
        if(Array.isArray(loc) && loc.length === 2){
            let lat = loc[1];
            let long = loc[0];
            const postContent = this.getPostContent.value
            const currentLocation = [long,lat] // later to get from ui..
            const splashRangeId = 5 // later to get from ui..
            const postTypeId = 3 // later to get from ui..
            //console.log(currentLocation);
            const newPost = {
                postContent,
                splashRangeId,
                postTypeId,
                currentLocation,
                newPostTime: new Date()
            }
            dispatch(newPostAddInitiate())
            dispatch(sendNewPost(newPost,pageIndex,this.props.userid, this.props.location))
            dispatch(updateTime());
        }
        else{   //No location access.
            dispatch(newPostAddFailure());
        }
    }

    render() {
        return (
            <div className={ this.getModalStyleClasses() }>
                <form className='new-post-form' name='newPostForm' onSubmit={(e) => this.handleSubmit(e, this.props.selectedPageIndex, this.props.location, this.props.dispatch)}>
                    <div className='top'>
                        <input type='hidden' name='location' ref={(input) => this.getCurrentLocation = input} />
                        <PostTypeSelector dispatch={this.props.dispatch} postTypeIndex={this.props.postTypeIndex} />
                        <UserInfo name={this.props.username} picture={''} />
                        <FileUpload />
                        <div className='textarea-outer'>
                            <textarea required className='post-text' placeholder='write a post ...' ref={(input) => this.getPostContent = input} />
                        </div>
                    </div>
                    <SplashSlider splashRangeIndex={this.props.splashRangeIndex} dispatch={this.props.dispatch} />
                    <Buttons dispatch={this.props.dispatch} />
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        visiblity: state.newPostModal.visible,
        splashRangeIndex: state.newPostModal.splashRangeIndex,
        postTypeIndex: state.newPostModal.postTypeIndex,
        username: state.newPostModal.username,
        userid: state.profile.userid,
        selectedPageIndex: state.selectedPageIndex,
        location: state.location
    }
}

export default connect(mapStateToProps)(NewPostModal);
