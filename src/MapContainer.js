import React, { Component } from 'react'
import scriptLoader from 'react-async-script-loader'
import { G_MAPS_KEY } from './data/credentials'
import * as FoursquareAPI from './utils/FoursquareAPI'
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
        this.didMapLoad();
        this.didVenuesUpdate(prevProps);
        this.didChooseFromList(prevProps);
    }

    didMapLoad() {
        if (this.props.isScriptLoaded && !this.state.isMapLoaded) {
            this.initMap();
        }
    }

    componentDidMount() {
        this.handleGMapsAuthError();
    }

    // If there is auth error prompt the user with error message
    handleGMapsAuthError () {
        window.gm_authFailure = () => {
            this.props.errorCaught(
                new Error(`Google Maps didn't load correctly. 
                Authentication Error: Check console for technical details`))
        }
    }

    // Initialize the Map object and the InfoWindow
    initMap() {
        let map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: this.state.zoom,
            center: this.props.center,
            fullscreenControl: false,
        })
        window.google.maps.event.addListener(map, "click", () => {
            if (this.state.infoWindow !== undefined)
                this.closeInfoWindow();
        })
        window.google.maps.InfoWindow.prototype.opened = false;
        this.setState({
            isMapLoaded: true,
            map: map,
            infoWindow: new window.google.maps.InfoWindow({
                maxWidth: 300
            })
        });
    }

    // Handle the opening of the InfoWindow if the click was initiated from the 
    // List Component
    didChooseFromList(prevProps) {
        if (this.props.listItem !== prevProps.listItem) {
            if (this.state.infoWindow.id !== undefined &&
                this.state.markers.get(this.state.infoWindow.id) !== undefined) {
                this.state.markers.get(this.state.infoWindow.id).setAnimation(null)
            }
            this.openInfoWindow(this.props.listItem);
        }
    }

    // Check of the Venues have been updated and updates the @this.state.markers
    // and the @this.state.venues
    didVenuesUpdate(prevProps) {
        if (JSON.stringify(this.props.venues) !== JSON.stringify(prevProps.venues)) {
            if (this.state.isMapLoaded) {
                this.cleanMarkers();
                let markersMap = new Map(),
                    venuesMap = new Map();
                this.props.venues.forEach(venue => {
                    markersMap.set(venue.id, this.createMarker(venue))
                    venuesMap.set(venue.id, venue)
                })
                this.setState({
                    venues: venuesMap,
                    markers: markersMap
                })
            }
        }
    }

    // Clean the old markers on the map
    cleanMarkers() {
        if (this.state.markers instanceof Map) {
            this.state.markers.forEach(marker => marker.setMap(null))
        }
    }

    createMarker(venue) {
        let venuePosition = {
            lat: venue.location.lat,
            lng: venue.location.lng
        };
        let marker = new window.google.maps.Marker({
            position: venuePosition,
            map: this.state.map,
            id: venue.id
        });
        marker.addListener('click', () => this.openInfoWindow(venue.id));
        return marker;
    }

    openInfoWindow = (id) => {
        if (this.state.infoWindow.opened) {
            this.closeInfoWindow();
            this.createInfoWindow(id)
                .then(() => {
                    let infoWindow = this.state.infoWindow;
                    infoWindow.id = id;
                    this.setState({
                        infoWindow: infoWindow
                    })
                })
        } else if (!this.state.infoWindow.opened) {
            this.createInfoWindow(id)
                .then(() => {
                    let infoWindow = this.state.infoWindow;
                    infoWindow.opened = true;
                    infoWindow.id = id;
                    this.setState({
                        infoWindow: infoWindow
                    })
                })
        }
    }

    // Create and set the InfoWindow content by fetching the details.
    // Then set the marker Animation
    createInfoWindow(id) {
        let marker = this.state.markers.get(id);
        return FoursquareAPI.fetchDetails(id).then(data => CreateInfoContent.content(data))
            .then(content => {
                this.state.infoWindow.setContent(content);
                this.state.infoWindow.open(this.state.map, marker, content);
            })
            .catch(e => this.props.errorCaught(e))
            .then(marker.setAnimation(window.google.maps.Animation.BOUNCE))
    }

    // Close the InfoWindow and reset the Animation on the marker
    closeInfoWindow = () => {
        if (this.state.infoWindow.id !== undefined &&
            this.state.markers.get(this.state.infoWindow.id) !== undefined) {
            this.state.infoWindow.close();
            this.state.markers.get(this.state.infoWindow.id).setAnimation(null);
        }
    }

    render () {
        return (
            <div id="map" role="application" aria-label="location"></div>
        )
    }
}

// Async loading of the Google API
export default scriptLoader(
    [`https://maps.googleapis.com/maps/api/js?key=${G_MAPS_KEY}`]
)(MapContainer)