import React, { Component } from 'react'

class List extends Component {

    state = {
        venues: []
    }

    componentWillReceiveProps(nextProps){
        this.updateVenues(nextProps.venues)
    }

    updateVenues(venues) {
        this.setState({venues: venues})
    }

    hideList() {
        document.getElementsByClassName('list-wrapper')[0].classList.add('list-close')
        document.getElementsByClassName('toggle-list-open')[0].classList.remove('list-close')
    }

    showList() {
        document.getElementsByClassName('toggle-list-open')[0].classList.add('list-close')
        document.getElementsByClassName('list-wrapper')[0].classList.remove('list-close')
    }

    getVenueID (e) {
        console.log(e.target.getAttribute('dataid'));
        this.hideList();
    }

    render() {
        return (
            <React.Fragment>
                <button className="toggle-list-open list-close" onClick={this.showList}>
                    <p>Show List</p>
                    <svg className="show-icon"></svg>
                </button>
                <aside className="list-wrapper">
                    <button id="toggle-list-close" onClick={this.hideList}>
                        <svg className="collapse-icon"></svg>
                        <p>Hide List</p>
                    </button>
                    <div className="list-border">
                        <ul className="list" onClick={(e) => this.getVenueID(e)}>
                        {this.state.venues.map((venue) => {
                            return (<li className="list-item" 
                                        dataid={venue.id}
                                        key={venue.id}
                                        >{venue.name}
                                    </li>
                                    )   
                        })}
                        </ul>
                    </div>
                </aside>
            </React.Fragment>
        )

    }
}

export default List