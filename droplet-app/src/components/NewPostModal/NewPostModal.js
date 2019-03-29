import React, { Component } from 'react'
import './NewPostModal.css'
import { connect } from 'react-redux'
import { toggleNewPostModal } from '../../actions/postActions.js'

import SplashSlider from './SplashSlider.js'
import submitIcon from './submit-icon.svg'

const PostTypeSelector = () => (
    <div className='post-type-selector'>
        <ul onClick={() => {console.log("hi!")}}>
            <li><span className='text-icon' /></li>
            <li><span className='photo-icon' /></li>
            <li><span className='video-icon' /></li>
        </ul>
        <input type='hidden' name='postTypeSelector' value='' />
    </div>
)

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

const TextArea = () => (
    <div className='textarea-outer'>
        <textarea required className='post-text' placeholder='write a post ...'/>
    </div>
)

const Buttons = ({ dispatch }) => {
    
    return (
    <div className='new-post-buttons'>
        <div onClick={() => dispatch(toggleNewPostModal())} className='cancel button'>
            <span className='cancel new post'/>
            <p>Nvm</p>
        </div>
        <input name='submit' type='submit' onClick={/*props.submitNewPost*/ () => {console.log("submit!")}} className='submit button'>
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

    render() {
        return (
            <div className={ this.getModalStyleClasses() }>
                <form className='new-post-form' name='newPostForm' method='post' action="http://localhost:5000/posts">
                    <div className='top'>
                        <input type='hidden' name='location' value={/*props.getLocation*/ [123.312, 534.213]} />
                        <PostTypeSelector />
                        <UserInfo name={'Bill'} picture={'https://m.media-amazon.com/images/M/MV5BMTQ2MjMwNDA3Nl5BMl5BanBnXkFtZTcwMTA2NDY3NQ@@._V1_.jpg'} />
                        <FileUpload />
                        <TextArea />
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
    }
}

export default connect(mapStateToProps)(NewPostModal);
