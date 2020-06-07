const request = require("request");

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
    )}.json?access_token=pk.eyJ1IjoiaXFiYWxzeWFmaXEyNCIsImEiOiJja2FmaHY5bXgwY3p0MnFub2JxOW42eHFzIn0.qlmoLFjx1ne0o_ZJtvmysg&limit=1`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Please check your internet connection!", undefined);
        } else if (body.features.length === 0) {
            callback("Unknown place!", undefined);
        } else {
            const data = {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name,
            };
            callback(undefined, data);
        }
    });
};

module.exports = geocode;
