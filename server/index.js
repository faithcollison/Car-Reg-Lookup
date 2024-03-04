const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");


const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `${__dirname}/../.env`,
});


app.use(cors());
app.use(express.json());

app.get("/", function (req, res, next) {
  res.send("Home Page");
});

app.get("/api/lookup", async (req, res, next) => {
  try {
    const regPlate = req.query.registrationNumber;
    const apiKey = process.env.NODE_ENV === 'development' ? process.env.DEVELOPMENT_API_KEY : process.env.TEST_API_KEY;
    const apiUrl = process.env.NODE_ENV === 'development' ? process.env.DEVELOPMENT_URL : process.env.TEST_URL;
    const axiosConfig = {
      method: "post",
      url: apiUrl,
      // url: "https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles",
      headers: {
        "x-api-key": apiKey,
        // "x-api-key": "nfZYUwMs1R8KOPBMB6cFG2zNRzVNFrowa0Az7L4L",
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ registrationNumber: regPlate }),
    };
    
    const response = await axios(axiosConfig);
    res.send(response.data);
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  if (err.response.status === 400) {
    res.status(400).send(err.response.data);
  } else if (err.response.status === 404) {
    res.status(404).send(err.response.data);
  } else res.status(500).send(err.response.data);
});

module.exports = app;
