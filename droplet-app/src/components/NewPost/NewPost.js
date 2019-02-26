import React from 'react'
import './NewPost.css'

import submitIcon from './import-icon.svg'

const PostTypeSelector = (props) => (
    <div className='post-type-selector'>
        <ul onClick={props.postTypeSelect}>
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

const SplashSlider = (props) => (
    <div className='splash-slider'>
        <p>Splash Range</p>
        <span className='left-arrow' onClick={props.slideLeft} />
        <ul>{/* eventually, this list should come from app config. Also, use hammer.js for touch slide */}
            <li>3 feet</li>
            <li>10 feet</li>
            <li>100 feet</li>
            <li>300 feet</li>
            <li>1 mile</li>
        </ul>
        <span className='right-arrow'  onClick={props.slideRight}/>
        <input name='splashSelection' type='hidden' value='' />
    </div>
)

const Buttons = (props) => (
    <div className='new-post-buttons'>
        <div onClick={props.cancelNewPost} className='cancel'>
            <span class='cancel new post'/>
            <p>Nvm</p>
        </div>
        <input name='submit' type='submit' onClick={props.submitNewPost} className='submit'>
            <img src={submitIcon} alt='submit new post'/>
            <p>Drop</p>
        </input>
    </div>
) 

const NewPost = (props) => (
    <div className='new-post'>
        <form name='newPostForm' method='post'>
            <input type='hidden' name='location' value={props.getLocation} />
            <PostTypeSelector postTypeSelect={props.postTypeSelect} />
            <UserInfo name={props.name} picture={props.picture} />
            <input type="file" name="mediaFileToUpload" />
            <UserInfo />
            <textarea className='post-text'/>
            <SplashSlider />
            <Buttons />
        </form>
    </div>
)

export default NewPost;
