import React, { Component } from 'react'
import scriptLoader from 'react-async-script-loader'
import {G_MAPS_KEY} from './data/credentials'

// const AnyReactComponent = ({text}) => <div>{text}</div>;

class MapContainer extends Component {

    state = {
        'center': {lat: 42.696430,lng: 23.321032},
        'zoom': 12.5,
        isMapLoaded: false
    }

    componentDidUpdate() {
        if(this.props.isScriptLoaded === true && (this.state.isMapLoaded !== true)) {
            let map = new window.google.maps.Map(document.getElementById('map'),{
                zoom: this.state.zoom,
                center: this.state.center
            })
                this.setState({isMapLoaded: true});
                this.props.hasMapLoaded(true);
        }
    }


    
    render () {
        console.log(this.props);
        console.log(this.state)
        return (
            <div id="map"></div>
        )
    }
}

export default scriptLoader(
    [`https://maps.googleapis.com/maps/api/js?key=${G_MAPS_KEY}`]
)(MapContainer)