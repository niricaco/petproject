require("dotenv").config();
const app = require("../app");
const jwt = require("jsonwebtoken");
const mockServer = require("supertest");

//models
const CompanyEntity = require("../models/company");

//utils
const { startDb, stopDb, deleteAll } = require("./utils/inMemoryDb");
const {
  setupGoogleSuccessResponse,
  setupGoogleErrorResponse,
  setupOidSuccessResponse,
  setupOidErrorResponse,
} = require("./utils/httpMock");
const { default: mongoose } = require("mongoose");

describe("POST requests to api/dashboard/item", () => {
  let connection;
  let server;
  let client;

  beforeAll(async () => {
    const result = await startDb();
    connection = result[0];
    server = result[1];
    client = mockServer.agent(app);
  });

  afterAll(async () => {
    await stopDb(connection, server);
  });

  afterEach(async () => {
    await deleteAll(CompanyEntity);
  });

  test("should return 400 without body", async () => {
    // given
    const token = jwt.sign({}, process.env.JWT_SECRET_KEY);
    const name1 = "Energo";
    const mockObjectId1 = new mongoose.Types.ObjectId();
    const dummyCompany1 = new CompanyEntity({
      name: name1,
      roles: {
        owners: mockObjectId1,
      },
    });
    await dummyCompany1.save();

    // when
    const response = await client
      .post("/api/dashboards/item")
      .set({ authorization: token })
      .send({});

    // then
    const company = await CompanyEntity.findOne({ name: name1 });
    expect(company.items).toHaveLength(0);
    expect(response.status).toBe(400);
  });

  test("should return 400 without companyId", async () => {
    // given
    const token = jwt.sign({}, process.env.JWT_SECRET_KEY);
    const name1 = "Energo";
    const mockObjectId1 = new mongoose.Types.ObjectId();
    const dummyCompany1 = new CompanyEntity({
      name: name1,
      roles: {
        owners: mockObjectId1,
      },
    });
    await dummyCompany1.save();

    const item = {
      name: "itemname",
    };
    const body = {
      item,
    };

    // when
    const response = await client
      .post("/api/dashboards/item")
      .set({ authorization: token })
      .send(body);

    // then
    const company = await CompanyEntity.findOne({ name: name1 });
    expect(company.items).toHaveLength(0);
    expect(response.status).toBe(400);
  });

  test("should add item with correct body and return 200", async () => {
    // given
    const token = jwt.sign({}, process.env.JWT_SECRET_KEY);
    const name1 = "Energo";
    const mockObjectId1 = new mongoose.Types.ObjectId();
    const dummyCompany1 = new CompanyEntity({
      name: name1,
      roles: {
        owners: mockObjectId1,
      },
    });
    await dummyCompany1.save();
    console.log(dummyCompany1._id);
    const mockObjectId = new mongoose.Types.ObjectId();
    const item = {
      name: "itemname",
    };
    console.log(item);
    const body = {
      item,
      companyId: dummyCompany1._id,
    };

    // when
    const response = await client
      .post("/api/dashboards/item")
      .set({ authorization: token })
      .send(body);

    // then
    console.log(response.body);
    const company = await CompanyEntity.findOne({ name: name1 });
    expect(company.items).toHaveLength(1);
    expect(company.items[0].name).toBe(item.name);
    expect(response.status).toBe(200);
  });
});
