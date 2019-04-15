import React from 'react'
import { connect } from 'react-redux'
import './Overlay.css'

const overlayStyleClass = visibility => visibility ? 'overlay' : 'overlay off'
const spinnerStyleClass = spinner => spinner ? 'spinner' : 'spinner off'

const Overlay = (props) => (
    <div className={overlayStyleClass(props.visible)}>
        <div className={spinnerStyleClass(props.spinner)}>
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
        </div>
    </div>
)

const mapStateToProps = (state) => {
    return { 
        visible: state.overlay,
        spinner: state.loadingSpinner
    }
}

export default connect(mapStateToProps)(Overlay);
