const app = require("../index");
const request = require("supertest");

let server;

beforeAll(() => {
  server = app.listen(9090);
});

afterAll((done) => {
  server.close(done);
});

describe("POST /data", () => {
  test("GET : 200 sends an object of vehicle details to client", async () => {
    const regPlate = "AA19AAA";
    const response = await request(app).get(
      `/api/lookup?registrationNumber=${regPlate}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        registrationNumber: "AA19AAA",
        artEndDate: "2025-03-30",
        co2Emissions: 300,
        engineCapacity: 2000,
        euroStatus: "EURO1",
        markedForExport: false,
        fuelType: "PETROL",
        motStatus: "No details held by DVLA",
        revenueWeight: 0,
        colour: "RED",
        make: "FORD",
        typeApproval: "M1",
        yearOfManufacture: 2019,
        taxStatus: "Taxed",
        dateOfLastV5CIssued: "2019-05-20",
        wheelplan: "2 AXLE RIGID BODY",
        monthOfFirstDvlaRegistration: "2019-03",
        monthOfFirstRegistration: "2019-03",
        realDrivingEmissions: "1",
      })
    );
  });
  test("GET : 400 sends appropriate status and error message when invalid request made", async () => {
    const regPlate = "ER19BAD";
    const response = await request(app).get(
      `/api/lookup?registrationNumber=${regPlate}`
    );
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      errors: [
        {
          status: "400",
          code: "400",
          title: "Bad Request",
          detail: "Invalid format for field - vehicle registration number",
        },
      ],
    });
  });
  test("POST : 404 sends appropriate status and error message when vehicle not found", async () => {
    const regPlate = "ER19NFD";
    const response = await request(app).get(
      `/api/lookup?registrationNumber=${regPlate}`
    );
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      errors: [
        {
          status: "404",
          code: "404",
          title: "Vehicle Not Found",
          detail: "Record for vehicle not found",
        },
      ],
    });
  });
});
