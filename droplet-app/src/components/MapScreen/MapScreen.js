import React from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import './MapScreen.css'
import Logo from './logo.png'
import { loadMapPosts, loadAllMapPosts } from '../../actions/postActions'
import { mapPage } from '../../actions/miscActions'
import {arrayEquals} from '../../actions/utility.js'

mapboxgl.accessToken = 'pk.eyJ1IjoibGlkZW5uIiwiYSI6ImNqcmg2NDU5czA4b3A0M25udmUxcWpjcmEifQ.J9ThJ9sMDK7ANhYkSpVnyg';

class Map extends React.Component {

  constructor(props) {
    super(props);
    console.log(props.mapPosts)
    this.state = {
      zoom: 10,
      map: 0
    };

  }
  onFindLocation(map){
    if(navigator.geolocation){
        navigator.geolocation.watchPosition((position)=>{
            this.updatePosts(map)
        })
    }
  }

  componentDidMount() {
    this.props.dispatch(mapPage())

    let lng = -123.262
    let lat = 44.5646
    if(Array.isArray(this.props.location) && this.props.location.length === 2){
       lng = this.props.location[0]
       lat = this.props.location[1]
    }
    const zoom = this.state.zoom


    //Init Map
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      center: [lng, lat],
      zoom
    });
    if(this.props.themeId == 0){
      map.setStyle('mapbox://styles/mapbox/streets-v9');
    }
    else{
      map.setStyle('mapbox://styles/mapbox/dark-v10');
    }

    //Find Posts
    //this.updatePosts(map);

    //User Location
    const geolocation = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
    });
    geolocation.className = "mapboxgl-ctrl-top-right"
    map.addControl(geolocation)



    map.on('touchend', () => {
  //    this.updatePosts(map)
    })
    map.on('zoom', ()=>{
  //    this.updatePosts(map)
    })
    map.on('move', () => {
      // this.setState({
      //   lng: lng.toFixed(4),
      //   lat: lat.toFixed(4),
      //   zoom: map.getZoom().toFixed(2)
      // });
    });

    console.log(map)
    this.setState({map:map})
  }

  componentDidUpdate(prevProps, prevState){
    if(!arrayEquals(this.props.location, prevProps.location)){
      console.log("LOC: "+ prevProps.location)
        console.log("LOC: "+ this.props.location)
        this.updatePosts(this.state.map)
    }
    if(this.props.themeId !== prevProps.themeId){
      const tempMap = this.state.map
      if(this.props.themeId == 0){
        tempMap.setStyle('mapbox://styles/mapbox/streets-v9');
      }
      else{
        tempMap.setStyle('mapbox://styles/mapbox/dark-v10');
      }
      this.setState({map:tempMap})
    }
  }

  render() {
    const { lng, lat, zoom } = this.state;
    return (
        <main ref={el => this.mapContainer = el} className="map-screen" ></main>
    );
  }

  updatePosts(map){
    const { lng, lat } = map.getCenter();
  //  const bounds = map.getBounds();
  //  const dist = distance(lat,lng,bounds.getNorthWest().lat,bounds.getNorthWest().lng, "K");
  //  const meterRadius = dist *1000

    this.props.dispatch(loadAllMapPosts(lng, lat, 5000))
    this.props.dispatch(loadMapPosts(this.props.location[0], this.props.location[1], 1000))

    for(var i = 0; i < this.props.allMapPosts.length; i++){
      const longitude = this.props.allMapPosts[i].location.coordinates[0]
      const latitude = this.props.allMapPosts[i].location.coordinates[1]
      const username = this.props.allMapPosts[i].username
      const data = this.props.allMapPosts[i].content
      this.createMarker(longitude, latitude, false, username, data);
    }
    for(var i = 0; i < this.props.mapPosts.length; i++){
      const longitude = this.props.mapPosts[i].location.coordinates[0]
      const latitude = this.props.mapPosts[i].location.coordinates[1]
      const username = this.props.mapPosts[i].username
      const data = this.props.mapPosts[i].content
      this.createMarker(longitude, latitude, true, username, data);
    }
  }



  createMarker(lng, lat, inbound, popupName, popupData, popupImage){
    let tempMap = this.state.map
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
      .addTo(tempMap)
      .setPopup(popup);

    this.setState({map:tempMap})
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
      location: state.location,
      themeId: state.themeId
    }
}

export default connect(mapStateToProps)(Map);
