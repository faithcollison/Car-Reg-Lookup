const express = require('express')
const axios = require('axios')
const api = process.env.DVLA_API_KEY

const app = express()
app.use(express.json());


app.post('/data', async(req, res, next) => {
    try {
        const regPlate = req.body.registrationNumber
        const axiosConfig = {
            method: 'post',
            url:'https://uat.driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles',
            headers: {
                'x-api-key': 'PDCbz4vEyS72fn3iI5LmQ7mOuKVgUEBjUnFLayyh',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({registrationNumber: regPlate})
        }

        const response = await axios(axiosConfig);
        res.send(response.data)
    }
    catch (error) {
        if (error.response) {
            console.log("ERROR RESPONSE")
           
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log("ERROR REQUEST")
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        console.log(error.config);
        res.status(500).send('An error occurred');
    }
})

app.listen(9090, () => console.log('Server started on port 9090'));

module.exports = app;