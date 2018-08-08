import React, { Component } from 'react';
import MapContainer from './MapContainer'
import SearchBar from './SearchBar'
import * as FoursquareAPI from './utils/FoursquareAPI'
import './App.css';

class App extends Component {
  state = {
    isMapLoaded: false,
    venues: [],
    center: {
      lat: 42.696430,
      lng: 23.321032
    }
  }

hasMapLoaded = (boolean) => {
  this.setState({
    isMapLoaded: true
  })
}

componentDidMount() {
  if(!this.state.venues.length) {
    FoursquareAPI.fetchVenues(this.state.center)
    .then(venues => this.setState({venues: venues}));
  }
}

listVenues() {
  console.log(this.state.venues.map(venue => venue.name))
}


  render() {
    return (
      <div className="App">
        <SearchBar/>
        <MapContainer hasMapLoaded={this.hasMapLoaded}/>
      </div>
    );
  }
}

export default App