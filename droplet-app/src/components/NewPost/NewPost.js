import React from 'react'
import './NewPost.css'

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
        <label for="file">This the label</label>
    </div>
)

const TextArea = () => (
    <div className='textarea-outer'>
        <textarea className='post-text' placeholder='Make a post ...'/>
    </div>
)

const SplashSlider = (props) => (
    <div className='splash-slider'>
        <p>Splash Range</p>
        <span className='arrow left' onClick={() => {console.log("left!")}} />
        <ul>
            <li>3 feet</li>
            <li>10 feet</li>
            <li>100 feet</li>
            <li>300 feet</li>
            <li>1 mile</li>
        </ul>
        <span className='arrow right'  onClick={() => {console.log("right!")}}/>
        <input name='splashSelection' type='hidden' value='' />
    </div>
)

const Buttons = (props) => (
    <div className='new-post-buttons'>
        <div onClick={/*props.cancelNewPost*/ () => {console.log("cancel!")}} className='cancel'>
            <span className='cancel new post'/>
            <p>Nvm</p>
        </div>
        <input name='submit' type='submit' onClick={/*props.submitNewPost*/ () => {console.log("submit!")}} className='submit'>
            {/* <img src={submitIcon} alt='submit new post'/>
            <p>Drop</p> */}
        </input>
    </div>
) 

const NewPost = (props) => (
    <div className='new-post'>
        <form className='new-post-form' name='newPostForm' method='post'>
            <input type='hidden' name='location' value={/*props.getLocation*/ [123.312, 534.213]} />
            <PostTypeSelector />
            <UserInfo name={'Bill'} picture={'https://m.media-amazon.com/images/M/MV5BMTQ2MjMwNDA3Nl5BMl5BanBnXkFtZTcwMTA2NDY3NQ@@._V1_.jpg'} />
            <FileUpload />
            <TextArea />
            <SplashSlider />
            <Buttons />
        </form>
    </div>
)

export default NewPost;
