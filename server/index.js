const express = require("express");
const axios = require("axios");
require('dotenv').config()

const api = process.env.TEST_API_KEY || process.env.PRODUCTION_API_KEY

const app = express();
app.use(express.json());

app.post("/data", async (req, res, next) => {
  try {
    const regPlate = req.body.registrationNumber;
    const axiosConfig = {
      method: "post",
      url: "https://uat.driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles",
      headers: {
        "x-api-key": api,
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
  if(err.response.status === 400){
    res.status(400).send(err.response.data)
  }
  else if (err.response.status === 404){
    res.status(404).send(err.response.data)
  }
  else res.status(500).send(err.response.data);
});


// app.listen(9090, () => console.log("Server started on port 9090"));

module.exports = app;
