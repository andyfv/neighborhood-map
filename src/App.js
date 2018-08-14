import React, { Component } from 'react';
import MapContainer from './MapContainer'
import SearchBar from './SearchBar'
import List from './List'
import * as FoursquareAPI from './utils/FoursquareAPI'
import './App.css';

class App extends Component {
  state = {
    query: '',
    venues: [],
    listItem: '',
    center: {
      lat: 42.696430,
      lng: 23.321032
    }
  }

  componentDidMount() {
    if(!this.state.venues.length){
      this.loadVenues();
    }
  }

  componentDidUpdate(prevProps,prevState) {
    if(prevState.query !== this.state.query) {
      this.requestVenues();
    }
  }
  
  loadVenues() {
    if (!this.state.venues.length) {
      this.requestVenues()
    }
  }

  requestVenues() {
    FoursquareAPI.fetchVenues(this.state.center, this.state.query)
      .then(venues => {this.setState({venues: venues})})
  }

  // Venues for the List Component
  listVenues() {
    console.log(this.state.venues.map(venue => ({id: venue.id, name: venue.name})))
    return this.state.venues.map(venue => ({
      id: venue.id,
      name: venue.name
    }))
  }

  updateQuery = (query) => {
    this.setState({query: query})
  }

  getVenueID = (venueID) => {
    this.setState({listItem: venueID})
  }

  render() {
    return (
      <div className="App">
        <SearchBar
          updateQuery={this.updateQuery}
        />
        <List
          venues={this.state.venues}
          getVenueID={this.getVenueID}
        />
        <MapContainer 
          venues={this.state.venues}
          center={this.state.center}
          listItem={this.state.listItem}/>
      </div>
    );
  }
}

export default App