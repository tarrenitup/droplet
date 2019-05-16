import React from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import './MapScreen.css'
import Logo from './logo.png'
import { loadMapPosts, loadAllMapPosts } from '../../actions/postActions'
import { mapPage } from '../../actions/miscActions'

mapboxgl.accessToken = 'pk.eyJ1IjoibGlkZW5uIiwiYSI6ImNqcmg2NDU5czA4b3A0M25udmUxcWpjcmEifQ.J9ThJ9sMDK7ANhYkSpVnyg';

class Map extends React.Component {

  constructor(props) {
    super(props);
    console.log(props.mapPosts)
    this.state = {
      lng: -123.2620,
      lat: 44.5646,
      zoom: 10,
      userLng: 0,
      userLat: 0
    };
    this.props.dispatch(mapPage())
  }
  onFindLocation(map){
    if(navigator.geolocation){
        navigator.geolocation.watchPosition((position)=>{
            //console.log(position);
            console.log("LOCATION CHANGE" + position.coords.latitude + " " +position.coords.longitude);

            this.userLng = position.coords.longitude
            this.userLat = position.coords.latitude
            this.updatePosts(map)
            //console.log("Updatings");
        })
    }
  }

  componentDidMount() {
    console.log("MOUNTED")
    console.log(this.props)

    const { lng, lat, zoom } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    });
    //map.setStyle('mapbox://styles/mapbox/' + "dark-v10");
    this.onFindLocation(map);

    const geolocation = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
    });
    geolocation.className = "mapboxgl-ctrl-top-right"
    map.addControl(geolocation)


    map.on('touchend', () => {
      this.updatePosts(map)
    })
    map.on('zoom', ()=>{
      this.updatePosts(map)
    })
    map.on('move', () => {
      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
  }

  render() {
    const { lng, lat, zoom } = this.state;
    return (
        <main ref={el => this.mapContainer = el} className="map-screen" ></main>
    );
  }

  updatePosts(map){
    const { lng, lat } = map.getCenter();
    const bounds = map.getBounds();
    const dist = distance(lat,lng,bounds.getNorthWest().lat,bounds.getNorthWest().lng, "K");
    const meterRadius = dist *1000
    this.props.dispatch(loadAllMapPosts(lng, lat, meterRadius))
    this.props.dispatch(loadMapPosts(this.props.location[0], this.props.location[1], 1000))
    for(var i = 0; i < this.props.allMapPosts.length; i++){
      const longitude = this.props.allMapPosts[i].location.coordinates[0]
      const latitude = this.props.allMapPosts[i].location.coordinates[1]
      const username = this.props.allMapPosts[i].username
      const data = this.props.allMapPosts[i].content
      this.createMarker(longitude, latitude, map, false, username, data);
    }
    for(var i = 0; i < this.props.mapPosts.length; i++){
      const longitude = this.props.mapPosts[i].location.coordinates[0]
      const latitude = this.props.mapPosts[i].location.coordinates[1]
      const username = this.props.mapPosts[i].username
      const data = this.props.mapPosts[i].content
      this.createMarker(longitude, latitude, map, true, username, data);
    }
  }



  createMarker(lng, lat, map, inbound, popupName, popupData, popupImage){
    var m = document.createElement('div');
    //m.style.backgroundImage = "url('./assets/red_text.svg')";
    if(inbound == true){
      m.className = "marker-blue";

      const p = document.createElement('div');
      p.className = "popup"
      //Create Popup
      var popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML('<h3>' + popupName + '</h3><p>' + popupData + '</p>' )
    }
    else{
        m.className = "marker-red";
    }

    //Add popup to marker
    let marker = new mapboxgl.Marker(m)
      .setLngLat([lng, lat])
      .addTo(map)
      .setPopup(popup);
  }
}




//GeoDataSource.com
function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}

function mapStateToProps(state) {
    return {
      allMapPosts: state.allMapPosts,
      mapPosts: state.mapPosts,
      location: state.location
    }
}

export default connect(mapStateToProps)(Map);
