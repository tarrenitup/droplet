import React, { Component } from 'react'
import './NewPostModal.css'
import { connect } from 'react-redux'
import { toggleNewPostModal, newPostAddInitiate, sendNewPost } from '../../actions/postActions'

import PostTypeSelector from './PostTypeSelector'
import SplashSlider from './SplashSlider'
import submitIcon from './submit-icon.svg'

const UserInfo = (props) => (
    <div className='user-info'>
        <img className='profile-picture' src={props.picture} alt='profile' />
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
            <p>Nvm</p>
        </div>
        <input name='submit' type='submit'  className='submit button'>
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

    handleSubmit = (e, dispatch) => {
        e.preventDefault()
       
        const postContent = this.getPostContent.value
        const currentLocation = [123,321] // later to get from ui..
        const splashRangeId = 5 // later to get from ui..
        const postTypeId = 3 // later to get from ui..

        const newPost = {
            postContent,
            splashRangeId,
            postTypeId,
            currentLocation,
            newPostTime: new Date()
        }

        console.log(newPost)
        // dispatch(newPostAddInitiate()) 
        // dispatch(sendNewPost(newPost))
    }

    render() {
        return (
            <div className={ this.getModalStyleClasses() }>
                <form className='new-post-form' name='newPostForm' onSubmit={(e) => this.handleSubmit(e, this.props.dispatch)}>
                    <div className='top'>
                        <input type='hidden' name='location' ref={(input) => this.getCurrentLocation = input} />
                        <PostTypeSelector dispatch={this.props.dispatch} postTypeIndex={this.props.postTypeIndex} />
                        <UserInfo name={'Bill'} picture={'https://m.media-amazon.com/images/M/MV5BMTQ2MjMwNDA3Nl5BMl5BanBnXkFtZTcwMTA2NDY3NQ@@._V1_.jpg'} />
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
        postTypeIndex: state.newPostModal.postTypeIndex
    }
}

export default connect(mapStateToProps)(NewPostModal);
