const app = require('../index')
const request = require('supertest')
process.env.DVLA_API_KEY='PDCbz4vEyS72fn3iI5LmQ7mOuKVgUEBjUnFLayyh'

describe('POST /data', () => {
    test('POST : 200 sends an object of vehicle details to client', async () => {
        const regPlate = {
            "registrationNumber": "AA19AAA"
        }
        const response = await request(app)
        .post("/data")
        .send(regPlate)

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(
            expect.objectContaining({
                "registrationNumber": "AA19AAA",
                "artEndDate": "2025-03-30",
                "co2Emissions": 300,
                "engineCapacity": 2000,
                "euroStatus": "EURO1",
                "markedForExport": false,
                "fuelType": "PETROL",
                "motStatus": "No details held by DVLA",
                "revenueWeight": 0,
                "colour": "RED",
                "make": "FORD",
                "typeApproval": "M1",
                "yearOfManufacture": 2019,
                "taxDueDate": "2025-01-31",
                "taxStatus": "Taxed",
                "dateOfLastV5CIssued": "2019-05-20",
                "wheelplan": "2 AXLE RIGID BODY",
                "monthOfFirstDvlaRegistration": "2019-03",
                "monthOfFirstRegistration": "2019-03",
                "realDrivingEmissions": "1"
              }
              )
        )
    });
});