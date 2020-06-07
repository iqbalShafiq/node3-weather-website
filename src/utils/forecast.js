const request = require("request");

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=15a7f439f89513b02a29e3c8eedda04f&query=${lat},${long}&units=f`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Please check your internet connection!", undefined);
        } else if (body.error) {
            callback("Unknown coordinate", undefined);
        } else {
            const data = {
                temperature: body.current.temperature,
                feelsLike: body.current.feelslike,
                cast: body.current.weather_descriptions[0],
            };
            const { temperature, feelsLike, cast } = data;
            callback(
                undefined,
                `${cast}. It is currently ${temperature} degress out. It feels like ${feelsLike} degress out`
            );
        }
    });
};

module.exports = forecast;
