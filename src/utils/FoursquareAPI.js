import { CLIENT_ID, CLIENT_SECRET } from '../data/credentials'

// Foursqare API Parameters
const API = 'https://api.foursquare.com/v2/venues/';
const RADIUS = 6000;
const LIMIT = 50;
const VERSION = 20180708;
const CATEGORIES = {
    'Food': '4d4b7105d754a06374d81259',
}
 
// Return only the ID's from @CATEGORIES and asign them to @CATEGORY_ARR
const CATEGORY_ARR = Object.keys(CATEGORIES).map((category) => CATEGORIES[category]);

// Fetch venues based on @center parameter and the predefined Foursquare API paramaters
export const fetchVenues = (center) => {
    let url = `${API}search?
                ll=${center.lat},${center.lng}&
                client_id=${CLIENT_ID}&
                client_secret=${CLIENT_SECRET}&
                categoryId=${CATEGORY_ARR}&
                v=${VERSION}&
                radius=${RADIUS}&
                limit=${LIMIT}`;

    
    return fetch(formatURL(url))
        .then(response => {
            if(!response.ok) {
                throw response
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
                &client_id=${CLIENT_ID}&
                client_secret=${CLIENT_SECRET}&
                v=${VERSION}`;

    return fetch(formatURL(url))
        .then(response => {console.log(response.json())})
}

// Correctly format the URL by removing white spaces, indentation, etc.
function formatURL (URL) {
    return URL.replace(/\s+/g, '');
}