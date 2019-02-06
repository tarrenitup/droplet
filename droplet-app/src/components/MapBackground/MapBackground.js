import { React, Component } from 'react'
import mapboxgl from 'mapbox-gl'
import './MapBackground'

class MapBackground extends Component {

    constructor() {

    }

    componentDidMount() {
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v9'
        });
    }

    componentWillUnmount() {
        this.map.remove();
    }

    render() {

        const style = {
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '100%'
        }

        return (
            <div style = {style} className='map-background' ref={el => this.mapContainer = el}>map here</div>
        )
    }
}

export default MapBackground
