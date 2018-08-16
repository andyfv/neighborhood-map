import {
    CLIENT_ID,
    CLIENT_SECRET
} from '../data/credentials'

// Foursqare API Parameters
const API = 'https://api.foursquare.com/v2/venues/';
const RADIUS = 3000;
const LIMIT = 50;
const VERSION = 20180708;
const CATEGORIES = {
    'Food': '4d4b7105d754a06374d81259',
}

// Return only the ID's from @CATEGORIES and asign them to @CATEGORY_ARR
const CATEGORY_ARR = Object.keys(CATEGORIES).map((category) => CATEGORIES[category]);

// Fetch venues based on @center and @query parameters and the predefined Foursquare API paramaters
export const fetchVenues = (center, query) => {
    let url = `${API}search?
                ll=${center.lat},${center.lng}&
                client_id=${CLIENT_ID}&
                client_secret=${CLIENT_SECRET}&
                categoryId=${CATEGORY_ARR}&
                v=${VERSION}&
                radius=${RADIUS}&
                query=${query}&
                limit=${LIMIT}`;


    return fetch(formatURL(url))
        .then(response => {
            if (!response.ok) {
                throw Error('Unable to fetch Venues')
            } else {
                return response.json()
            }
        })
        .then(data => Promise.resolve(data.response.venues))
}


// Fetch place information based on @venueID
export const fetchDetails = (venueID) => {
    let url = `${API}
                ${venueID}?
                client_id=${CLIENT_ID}&
                client_secret=${CLIENT_SECRET}&
                v=${VERSION}`;


    return fetch(formatURL(url))
        .then(response => {
            if (!response.ok) {
                throw Error('Unable to fetch Venue Details')
            } else {
                return response.json()
            }
        })
        .then(data => Promise.resolve(data.response.venue))
}

// Correctly format the URL by removing white spaces, indentation, etc.
function formatURL(URL) {
    return URL.replace(/\s+/g, '');
}