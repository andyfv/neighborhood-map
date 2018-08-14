
export const content = (venue) => {
    console.log(venue);

    try {
        const unsafeOptions = {
            name: venue.name,
            category: venue.categories[0].name,
            address: venue.location.address,
            hours: venue.hours.status !== undefined ? venue.hours.status: '',
            contacts: venue.contact.formattedPhone,
            url: venue.shortUrl
        };
    
        const defaultOptions = {
            name: '',
            category: '',
            address: '',
            hours: '',
            contacts: '',
            url: ''
        };
    
        const options = {
            ...unsafeOptions,
            ...defaultOptions
        };

        return `<div class="info-window">
                    <h2 class="info-heading">${options.name}</h2>
                    <h3 class="info-category">${options.category}</h3>
                    <p class="info-address">${options.address}</p>
                    <p class="info-hours">${options.hours}</p>
                    <p class="info-contacts">${options.contacts}</p>
                    <p class="info-url">${options.url}</p>
                </div>`
                
    } catch (error) {
        console.log(error);
        
    }
}
