import React from 'react'
import { useEffect } from 'react'
import './PostTypeSelector.css'
import { changeNewPostType } from '../../actions/postActions'


const selectPostType = (dispatch, els, event) => {

    const clickedLi = event.target.closest('li')
    const itemsArray = [].slice.call(els)
    const clickedLiIndex = itemsArray.indexOf(clickedLi)

    dispatch(changeNewPostType(clickedLiIndex))
}

const PostTypeSelector = (props) => {

    const itemStyleClassName = (index, els, input) => {
        const itemsArray = [].slice.call(els)
        itemsArray.map((el) => el.classList.remove('selected'))
        itemsArray[index].classList.add('selected')
        input.value = index
    }

    useEffect(
        () => itemStyleClassName(
                props.postTypeIndex,
                document.querySelectorAll('div.post-type-selector ul li'),
                document.querySelector('div.post-type-selector input.post-type'),
            )
    )

    return (
        <div className='post-type-selector'>
            <ul onClick={(event) => selectPostType(
                props.dispatch,
                document.querySelectorAll('div.post-type-selector ul li'),
                event
            )}>
                <li><span className='text-icon' /></li>
                <li><span className='photo-icon' /></li>
                <li><span className='video-icon' /></li>
            </ul>
            <input className='post-type' type='hidden' name='postTypeSelector' value='' />
        </div>
    )
}

export default PostTypeSelector
