# DVLA Lookup

## Overview

This project is an Express server designed to access and display vehicle details from the DVLA API, using the vehicle registration plate as a search.

## Viewing this repo
Link to hosted version of repo on Render [here](https://dvla-lookup.onrender.com)


## Installation and Setup

1. Clone the repository to your local machine:
    ```
    git clone <repository_url>
    ```

2. Install dependencies:
    ```
    npm install 
    ```

3. Create `.env.test` and `.env.development` files. Each must have the relevant API Key and URL to access the API.

4. Set 'test' script to jest:
    ```
    "scripts": {
        "test": "jest"
        }
    ```

5. Run tests with jest:
    ```
    npm test
    ```

## Request

You can use the `curl` command in your terminal to make a GET request. Replace your_registration_number with the actual registration number you want to look up.
```
curl -X GET 'http://localhost:3000/api/lookup?registrationNumber=your_registration_number'
```


## Documentation
View DVLA API documentation [here](https://developer-portal.driver-vehicle-licensing.api.gov.uk/apis/vehicle-enquiry-service/vehicle-enquiry-service-description.html#vehicle-enquiry-service-ves-api-guide)


