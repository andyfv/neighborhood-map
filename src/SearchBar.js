import React, { Component } from 'react'

class SearchBar extends Component {

    render () {
        return (
            <div className="search-bar">
                <svg id="search-icon" />
                <div className="search-input-wrapper">
                    <input className="search-input" type="text"/>
                    <button id="delete-icon">
                    </button>
                </div>
            </div>
        )
    }
}

export default SearchBar