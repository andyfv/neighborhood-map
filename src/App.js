import React, { Component } from 'react';
import MapContainer from './MapContainer'
import SearchBar from './SearchBar'
import List from './List'
import ErrorModal from './ErrorModal'
import * as FoursquareAPI from './utils/FoursquareAPI'
import './App.css';

const errorModalContent = {
  content: ''
}

class App extends Component {
  state = {
    query: '',
    venues: [],
    listItem: '',
    center: {
      lat: 42.696430,
      lng: 23.321032
    },
    error: false,
    openErrorModal: false
  }

  componentDidMount() {
    this.loadVenues();
  }

  componentDidUpdate(prevProps, prevState) {
    this.didQueryUpdate(prevState);
  }

  didQueryUpdate = (prevState) => {
    if (prevState.query !== this.state.query) {
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
      .then(venues => {
        this.setState({
          venues: venues
        })
      })
      .catch(e => this.errorCaught(e))
  }

  // Update the query state if the user types in the SearchBox
  updateQuery = (query) => {
    this.setState({
      query: query
    })
  }

  // Get the Venue ID from clicking a specific item from the List
  getVenueID = (venueID) => {
    this.setState({
      listItem: venueID
    })
  }

  /* 
   Pass the function to the child Components and store the error
   in global variable @errorModal. After the state updates modal is 
   shown with information provided by the API.
  */
  errorCaught = (e) => {
    errorModalContent.content = e;
    if (!this.state.error && !this.state.openErrorModal) {
      this.setState({
        error: true,
        openErrorModal: true
      })
    }
  }

  // Close the modal by clicking the close symbol
  closeErrorModal = () => {
    this.setState({
      error: false,
      openErrorModal: false
    })
  }

    render() {
      return (
        <div className="App">
          {(this.state.error && this.state.openErrorModal)  && (
            <ErrorModal
            message={errorModalContent.content}
            closeModal={this.closeErrorModal}/>
            )}
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
            errorCaught={this.errorCaught}
            listItem={this.state.listItem}/>
        </div>
      );
    }
  }

  export default App