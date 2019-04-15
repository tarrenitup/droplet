import React, { useEffect } from 'react'
import './SplashSlider.css'
import { changeSplashRange } from '../../actions/postActions.js'
import Hammer from 'hammerjs'

const incrementSplash = ({dispatch, currentSplash}) => {
    const newSplash = currentSplash + 1
    dispatch(changeSplashRange(newSplash))
}

const decremementSplash = ({dispatch, currentSplash}) => {
    if(currentSplash > 1) {
        const newSplash = currentSplash - 1
        dispatch(changeSplashRange(newSplash))
    }
}

const getLeftPixelsFromSplashIndex = ({ splashIndex, outerEl, listEl, itemEls }) => {

    const itemArray = [].slice.call(itemEls)
    const outerWidth = outerEl.offsetWidth
    const itemWidth = itemArray[splashIndex].offsetWidth
    const itemRightMargin = parseFloat(window.getComputedStyle(itemArray[splashIndex])["margin-right"])

    const pixelsToMyLeft = ({ itemArray, splashIndex, itemRightMargin }) => {
        return itemArray.reduce((acc, cur, idx) => idx < splashIndex ? cur.offsetWidth + itemRightMargin + acc : acc, 0)
    }

    const numberToPixelStyle = number => number+"px"
    const pixelsToLeft = pixelsToMyLeft({ itemArray: itemArray, splashIndex: splashIndex, itemRightMargin: itemRightMargin, })
    const marginLeftPixels = (outerWidth / 2.0) - (itemWidth / 2.0) - pixelsToLeft

    return numberToPixelStyle(marginLeftPixels)
}

const updateSplashDOM = ({ listEl, inputEl, splashIndex, itemEls, pixelsOnLeft }) => {
    const itemArray = [].slice.call(itemEls)

    listEl.style.marginLeft = pixelsOnLeft
    itemArray.map((item) => item.classList.remove('selected'))
    itemArray[splashIndex].classList.add('selected')
    inputEl.value = splashIndex
}

const SplashSlider = (props) => {
    
    useEffect(
        () => {
            updateSplashDOM({
                listEl: document.querySelector('div.splash-slider div.slide-outer ol'),
                inputEl: document.querySelector('div.splash-slider input.splashSelection'),
                splashIndex: props.splashRangeIndex,
                itemEls: document.querySelectorAll('div.splash-slider div.slide-outer ol li'),
                pixelsOnLeft: getLeftPixelsFromSplashIndex({
                    splashIndex: props.splashRangeIndex,
                    outerEl: document.querySelector('div.splash-slider div.slide-outer'),
                    listEl: document.querySelector('div.splash-slider div.slide-outer ol'),
                    itemEls: document.querySelectorAll('div.splash-slider div.slide-outer ol li'),
                })
            })

            // const swipeEl = document.querySelector('div.splash-slider div.slide-outer')
            // const swiper = new Hammer(swipeEl)
            // swiper.on('swipeleft', () => incrementSplash({dispatch: props.dispatch, currentSplash: props.splashRangeIndex}))
            // swiper.on('swiperight', () => decremementSplash({dispatch: props.dispatch, currentSplash: props.splashRangeIndex}))
        }
    )

    return (
        <div className='splash-slider'>
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
            <input name='splashSelection' className='splashSelection' type='hidden' value='10' />
        </div>
    )
}

export default SplashSlider
