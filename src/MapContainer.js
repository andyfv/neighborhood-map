import React, { Component } from 'react'
import scriptLoader from 'react-async-script-loader'
import { G_MAPS_KEY } from './data/credentials'
import * as FoursquareAPI from './utils/FoursquareAPI' 
import memoize from 'memoize-one'
import * as CreateInfoContent from './utils/InfoWindow'

class MapContainer extends Component {

    state = {
        zoom: 14,
        isMapLoaded: false,
        venues: '',
        map: '',
        infoWindow: '',
        markers: '',
        listItem: ''
    }

    componentDidUpdate(prevProps) {
        this.didMapLoaded();
        this.didVenuesUpdate(prevProps);
        this.didChooseFromList(prevProps);
    }

    didChooseFromList(prevProps) {
        if(this.props.listItem !== prevProps.listItem) {
            this.openInfoWindow(this.props.listItem);
        }
    }

    didMapLoaded() {
        if (this.props.isScriptLoaded && !this.state.isMapLoaded) {
            this.initMap();
        }
    }

    initMap() {
        let map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: this.state.zoom,
            center: this.props.center
        })
        window.google.maps.InfoWindow.prototype.opened = false;
        this.setState({
            isMapLoaded: true,
            map: map,
            infoWindow: new window.google.maps.InfoWindow()
        });
    }

    didVenuesUpdate(prevProps) {
        if(JSON.stringify(this.props.venues) !== JSON.stringify(prevProps.venues)){
            if(this.state.isMapLoaded) {
                this.cleanMarkers();
                let markersMap = new Map(),
                    venuesMap = new Map();
                this.props.venues.forEach(venue => {
                    markersMap.set(venue.id, this.createMarker(venue))
                    venuesMap.set(venue.id, venue)})
                this.setState({
                    venues: venuesMap,
                    markers: markersMap
                })
            }
        }
    }

    cleanMarkers(){
        if(this.state.markers instanceof Map) {
            this.state.markers.forEach(marker => marker.setMap(null))
        }
    }

    createMarker(venue) {
        let venuePosition = {lat: venue.location.lat, lng: venue.location.lng};
        let marker = new window.google.maps.Marker({
            position: venuePosition,
            map: this.state.map,
            id: venue.id});
        marker.addListener('click', () => this.openInfoWindow(venue.id, venue));
        return marker;
    }

    toggleBounce(id) {
        let marker = this.state.markers.get('4c1b93ce8b3aa593fc61975f');
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(window.google.maps.Animation.BOUNCE);
        }
    }


    // Add try ...catch around the markers.get()
    openInfoWindow(id, venue) {
        console.log('click');
        
        if(this.state.infoWindow.opened === true) {
            console.log('opened');
            
            this.state.infoWindow.close();
            FoursquareAPI.fetchDetails(id).then(data => CreateInfoContent.content(data))
                .then(content => { 
                    console.log(content);
                    
                    this.state.infoWindow.setContent(content);
                    this.state.infoWindow.open(this.state.map, this.state.markers.get(id), content);
                })
        } else if(this.state.infoWindow.opened === false){
            console.log('closed');
            
            FoursquareAPI.fetchDetails(id).then(data => 
                CreateInfoContent.content(data))
                .then(content => {
                    console.log(content);
                    
                    this.state.infoWindow.setContent(content);
                    this.state.infoWindow.open(this.state.map, this.state.markers.get(id), content);
                    console.log(this.state.infoWindow);
                    
                }).then(() => this.state.infoWindow.opened = true)
        }
    }

    createInfoWindow(id) {
        FoursquareAPI.fetchDetails(id).then(data => CreateInfoContent(data))
            .then(content => {
                this.state.infoWindow({content: content})
                this.state.infoWindow.open();
            })
    }
    
    render () {
        return (
            <div id="map"></div>
        )
    }
}

export default scriptLoader(
    [`https://maps.googleapis.com/maps/api/js?key=${G_MAPS_KEY}`]
)(MapContainer)