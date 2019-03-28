import React from 'react'
import { connect } from 'react-redux'
import './Overlay.css'

const overlayStyleClass = (visibility) => visibility ? 'overlay' : 'overlay off'

const Overlay = (props) => (
    <div className={overlayStyleClass(props.visible)}></div>
)

const mapStateToProps = (state) => {
    return { visible: state.overlay }
}

export default connect(mapStateToProps)(Overlay);
