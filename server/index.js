const express = require("express");
const axios = require("axios");
require('dotenv').config()

const api = process.env.PRODUCTION_API_KEY
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", function (req, res, next){
  res.send("Home Page")
})

app.get("/api/lookup", async (req, res, next) => {
  console.log("Received POST request for /data");
  try {
    const regPlate = req.query.registrationNumber;
    const axiosConfig = {
      method: "post",
      url: "https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles",
      headers: {
        "x-api-key": api,
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
  if(err.response.status === 400){
    res.status(400).send(err.response.data)
  }
  else if (err.response.status === 404){
    res.status(404).send(err.response.data)
  }
  else res.status(500).send(err.response.data);
});

module.exports = app;
