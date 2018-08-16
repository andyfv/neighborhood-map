import React, { Component } from 'react'

const elements = {
    list: '',
    showListButton: ''
}

class List extends Component {

    state = {
        venues: []
    }

    componentDidMount() {
        elements.list = document.getElementsByClassName('list-wrapper')[0];
        elements.showListButton = document.getElementsByClassName('toggle-list-open')[0]
    }

    componentWillReceiveProps(nextProps) {
        this.updateVenues(nextProps.venues)
    }

    updateVenues(venues) {
        this.setState({
            venues: venues
        })
    }

    // Toggle the view if the List 
    toggleList = () => {
        elements.list.classList.toggle('list-close');
    }

    // Toggle the view of the ShowButton
    toggleShowButton = () => {
        elements.showListButton.classList.toggle('list-close');
    }

    hideList = () => {
        this.toggleList();
        this.toggleShowButton();
        elements.list.tabIndex = -1;
        elements.showListButton.tabIndex = 0;
    }

    showList = () => {
        this.toggleShowButton();
        this.toggleList();
        elements.showListButton.tabIndex = -1;
        elements.list.tabIndex = 0;
    }

    // Get the venue ID and send it to App.js for handling
    getVenueID(e) {
        this.props.getVenueID(e.target.getAttribute('dataid'));
        this.hideList();
    }

    render() {
        return (
            <React.Fragment>
                <button 
                    className="toggle-list-open list-close" 
                    tabIndex="-1"
                    aria-label="show List"
                    onClick={this.showList}>
                    <p>Show List</p>
                    <svg className="show-icon" alt="Chevron Icon"></svg>
                </button>
                <aside className="list-wrapper">
                    <button 
                        id="toggle-list-close"
                        aria-label="hide list" 
                        onClick={this.hideList}>
                        <svg className="collapse-icon" alt="Chevron Icon"></svg>
                        <p>Hide List</p>
                    </button>
                    <div className="list-border">
                        <ul className="list" onClick={(e) => this.getVenueID(e)}>
                        {this.state.venues.map(venue => 
                            (<li className="list-item" 
                                dataid={venue.id}
                                key={venue.id}
                                tabIndex="0"
                                >{venue.name}
                            </li>)   
                        )}
                        </ul>
                    </div>
                </aside>
                <svg id="fsq-icon" src="./icons/foursquare_logo.svg" alt="Foursquare"/>
            </React.Fragment>
        )

    }
}

export default List