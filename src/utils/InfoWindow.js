export const content = (venue) => {
    console.log(venue);

    const unsafeOptions = {
        name: venue.name,
        category: venue.categories[0].name,
        address: venue.location.address,
        contacts: venue.contact ? venue.contact.formattedPhone : '',
        url: venue.shortUrl ? venue.shortUrl : ''
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
        ...defaultOptions,
        ...unsafeOptions
    };

    return `<div class="info-window" tab-index="0">
                <h2 class="info-heading">${options.name}</h2>
                <h3 class="info-category">${options.category}</h3>
                <p class="info-address">${options.address}</p>
                <p class="info-contacts">${options.contacts}</p>
                <a  href="${options.url}" class="info-url">${options.url}</a>
            </div>`

}