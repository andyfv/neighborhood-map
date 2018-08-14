import React, { Component } from 'react'

class SearchBar extends Component {

    handleQueryChange = (value) => {
        this.props.updateQuery(value)
    }

    clearInput = () => {
        let input = document.getElementsByClassName('search-input')[0];
        input.value = '';
        this.handleQueryChange(input.value);
    }

    render () {
        return (
            <div className="search-bar">
                <svg id="search-icon" />
                <div className="search-input-wrapper">
                    <input className="search-input" type="text" 
                        onChange={(e) => this.handleQueryChange(e.target.value)}/>
                    <button id="delete-button" onClick={this.clearInput}></button>
                </div>
            </div>
        )
    }
}

export default SearchBar