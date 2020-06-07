const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const request = require("request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// Define Paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup handlebars (hbs) engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//Using the hbs
app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Iqbal Shafiq Rozaan",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Iqbal Shafiq Rozaan",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help Page",
        name: "Iqbal Shafiq Rozaan",
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        message: "Help article not found!",
        title: "404",
        name: "Iqbal Shafiq Rozaan",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You have to provide your address!",
        });
    }

    geocode(req.query.address, (error, { lat, long, location } = {}) => {
        if (error) {
            return res.send({
                error,
            });
        }

        forecast(lat, long, (error, forecastData) => {
            if (error) {
                return res.send({
                    error,
                });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            });
        });
    });
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You have to provide the search form",
        });
    }

    res.send({
        products: [],
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        message: "Page Not Found!",
        title: "404",
        name: "Iqbal Shafiq Rozaan",
    });
});

// Starting the server
app.listen(3000, () => {
    console.log("Server is running on port:3000");
});
