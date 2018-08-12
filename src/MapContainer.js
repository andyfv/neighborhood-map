import React, { Component } from 'react'
import scriptLoader from 'react-async-script-loader'
import { G_MAPS_KEY } from './data/credentials'
import * as FoursquareAPI from './utils/FoursquareAPI' 
import memoize from 'memoize-one'
import InfoWindow from './InfoWindow'

class MapContainer extends Component {

    state = {
        zoom: 14,
        isMapLoaded: false,
        venues: [],
        map: '',
        infoWindow: '',
        markers: []
    }

    componentDidUpdate(prevProps) {
        console.log('update');
        
        this.didMapLoaded();
        this.didVenuesUpdate(prevProps);
    }

    didMapLoaded() {
        if (this.props.isScriptLoaded && !this.state.isMapLoaded) {
            let map = new window.google.maps.Map(document.getElementById('map'), {
                zoom: this.state.zoom,
                center: this.props.center
            })
            this.setState({
                isMapLoaded: true,
                map: map,
                infoWindow: new window.google.maps.InfoWindow()
            });
        }
    }

    didVenuesUpdate(prevProps) {
        if(JSON.stringify(this.props.venues) !== JSON.stringify(prevProps.venues)){
            if(this.state.isMapLoaded) {
                let markersArr = [];
                let venuesMap = new Map();
                this.props.venues.forEach(venue => {
                    markersArr.push([venue.id,this.createMarker(venue)])
                    venuesMap.set(venue.id, venue)})
                this.setState({
                    markers: new Map(markersArr),
                    venues: venuesMap
                })
            }
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
        console.log(id);
        console.log(this.state.venues);
        console.log(this.state.infoWindow);
        this.state.markers.get(id).setAnimation(window.google.maps.Animation.BOUNCE)
        if( this.state.infoWindow !== '') {
            
        } else {
            console.log('bounce');
            
            <InfoWindow venue={this.state.venues}/>
            this.state.markers.get(id).setAnimation(window.google.maps.Animation.BOUNCE);
        }
    }
    
    render () {
        
        console.log(this.state.venues);
        
        return (
            <div id="map"></div>
        )
    }
}

export default scriptLoader(
    [`https://maps.googleapis.com/maps/api/js?key=${G_MAPS_KEY}`]
)(MapContainer)