import React, { useEffect } from 'react'
import './SplashSlider.css'
import { changeSplashRange } from '../../actions/postActions.js'

const incrementSplash = ({dispatch, currentSplash}) => {
    const newSplash = currentSplash + 1
    dispatch(changeSplashRange(newSplash))
}

const decremementSplash = ({dispatch, currentSplash}) => {
    const newSplash = currentSplash - 1
    dispatch(changeSplashRange(newSplash))
}

const getMarginLeftPixelsFromSplashIndex = ({ splashIndex, outerEl, listEl, itemEls }) => {

    const itemArray = [].slice.call(itemEls)

    const outerWidth = outerEl.offsetWidth
    const listWidth = listEl.offsetWidth
    const itemWidth = itemArray[splashIndex].offsetWidth
    const itemRightMargin = parseFloat(window.getComputedStyle(itemArray[splashIndex])["margin-right"])

    const pixelsToMyLeft = ({ itemArray, splashIndex }) => {
        return itemArray.reduce((acc, cur, idx) => idx < splashIndex ? cur.offsetWidth + acc : acc, 0)
    }
    
    const numberToPixelStyle = number => number+"px"

    const pixelsToLeft = pixelsToMyLeft({ itemArray: itemArray, splashIndex: splashIndex })

    const marginLeftPixels = (pixelsToLeft - (outerWidth / 2.0)) - (itemWidth / 2)

    return numberToPixelStyle(marginLeftPixels)

}

const setSplashMarginLeft = ({ listEl, pixelsOnLeft }) => {
    listEl.style.marginLeft = pixelsOnLeft
}

const SplashSlider = (props) => { 
    
    useEffect(
        () => setSplashMarginLeft({
            listEl: document.querySelector('div.splash-slider div.slide-outer ol'),
            pixelsOnLeft: getMarginLeftPixelsFromSplashIndex({
                splashIndex: props.splashRangeIndex,
                outerEl: document.querySelector('div.splash-slider div.slide-outer'),
                listEl: document.querySelector('div.splash-slider div.slide-outer ol'),
                itemEls: document.querySelectorAll('div.splash-slider div.slide-outer ol li'),
            })
        })
    )

    return (
        <div className='splash-slider'>
            {/* {console.log(props.splashRangeIndex)} */}
            <p>Splash Range</p>
            <span className='arrow left' onClick={() => decremementSplash({dispatch: props.dispatch, currentSplash: props.splashRangeIndex})}>
                <span />
            </span>
            <div className='slide-outer'>
                <ol>
                    <li>3 feet</li>
                    <li>10 feet</li>
                    <li>100 feet</li>
                    <li>300 feet</li>
                    <li>1 blah</li>
                    <li>2 blah</li>
                    <li>3 blah</li>
                    <li>4 blah</li>
                    <li>5 blah</li>
                    <li>6 blah</li>
                    <li>7 blah</li>
                </ol>
            </div>
            <span className='arrow right' onClick={() => incrementSplash({dispatch: props.dispatch, currentSplash: props.splashRangeIndex})}>
                <span />
            </span>
            <input name='splashSelection' type='hidden' value='10' />
        </div>
    )
}

export default SplashSlider
