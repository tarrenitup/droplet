// import React from 'react'
// import MapBackground from '../MapBackground/MapBackground.js'
// import './MapScreen.css'
//
// const MapScreen = () => (
//     <main className='map-screen screen'>
//         map screen here.
//     </main>
// )
//
// export default MapScreen;

import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import './MapScreen.css'
import Logo from './logo.png'

mapboxgl.accessToken = 'pk.eyJ1IjoibGlkZW5uIiwiYSI6ImNqcmg2NDU5czA4b3A0M25udmUxcWpjcmEifQ.J9ThJ9sMDK7ANhYkSpVnyg';

class Map extends React.Component {

  constructor(props: Props) {
    super(props);
    this.state = {
      lng: -122,
      lat: 37,
      zoom: 1.5
    };
  }

  createMarker(lng, lat, map, popupName, popupData, popupImage){
    const m = document.createElement('div');
    m.className = "marker";

    const p = document.createElement('div');
    p.className = "popup";

    //Create Popup
    var popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML('<h3>' + popupName + '</h3><p>' + popupData + '</p>' )

    //Add popup to marker
    let marker = new mapboxgl.Marker(m)
      .setLngLat([lng, lat])
      .addTo(map)
      .setPopup(popup);

  }




  componentDidMount() {

    const { lng, lat, zoom } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    });

    // Add geolocate control to the map.
    map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }), 'top-left');


    map.on('move', () => {
      const { lng, lat } = map.getCenter();
      const bounds = map.getBounds();
      console.log("Center LNG LAT: " + lng + " " + lat);
      console.log("NW boundary: " + bounds.getNorthWest());
      console.log("SW boundary: " + bounds.getNorthWest());


      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });

    this.createMarker(-122.414, 37.776, map, "Name", "Data");
    this.createMarker(-122.6587, 45.5122, map, "Name", "Data");
    this.createMarker(-122.698059, 45.526893, map, "Name", "Data");
    this.createMarker(-122.823782, 45.554519, map, "Name", "Data");
    this.createMarker(-123.279047,44.567077,map, "Name", "Data");
    this.createMarker(-123.270893,44.569584,map, "Name", "Data");

  }


  render() {
    const { lng, lat, zoom } = this.state;
    return (
        <main ref={el => this.mapContainer = el} className="map-screen" ></main>
    );
  }
}
export default Map;
