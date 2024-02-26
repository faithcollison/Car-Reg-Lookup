const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");


const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `${__dirname}/../.env.${ENV}`,
});


app.use(cors());
app.use(express.json());

app.get("/", function (req, res, next) {
  res.send("Home Page");
});

app.get("/api/lookup", async (req, res, next) => {
  console.log("Received POST request for /data");
  try {
    const regPlate = req.query.registrationNumber;
    const apiKey = process.env.NODE_ENV === 'development' ? process.env.DEVELOPMENT_API_KEY : process.env.TEST_API_KEY;
    const apiUrl = process.env.NODE_ENV === 'development' ? process.env.DEVELOPMENT_URL : process.env.TEST_URL;
    const axiosConfig = {
      method: "post",
      url: apiUrl,
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ registrationNumber: regPlate }),
    };

    const response = await axios(axiosConfig);
    console.log("Response received from DVLA API", response.data);
    res.send(response.data);
  } catch (error) {
    console.error("Error processing request", error);
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error("Error handling middleware", err);
  if (err.response.status === 400) {
    res.status(400).send(err.response.data);
  } else if (err.response.status === 404) {
    res.status(404).send(err.response.data);
  } else res.status(500).send(err.response.data);
});

module.exports = app;
