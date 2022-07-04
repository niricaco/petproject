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

describe("POST requests to api/company/create", () => {
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

    // when
    const response = await client
      .post("/api/company/create")
      .set({ authorization: token })
      .send({});

    // then
    expect(response.status).toBe(400);
  });

  test("should return 400 without userId", async () => {
    // given
    const token = jwt.sign({}, process.env.JWT_SECRET_KEY);
    const name = "companyname";
    const body = {
      name,
    };

    // when
    const response = await client
      .post("/api/company/create")
      .set({ authorization: token })
      .send(body);

    // then
    const compay = await CompanyEntity.find();
    expect(compay).toHaveLength(0);
    expect(response.status).toBe(400);
  });

  test("should create user with correct body and return 200", async () => {
    // given
    const token = jwt.sign({}, process.env.JWT_SECRET_KEY);
    const name = "companyname";
    const mockObjectId = new mongoose.Types.ObjectId();
    const body = {
      name,
      userId: mockObjectId,
    };

    // when
    const response = await client
      .post("/api/company/create")
      .set({ authorization: token })
      .send(body);

    // then
    const compay = await CompanyEntity.find();
    expect(compay).toHaveLength(1);
    expect(compay[0].name).toBe(name);
    expect(compay[0].roles.owners).toEqual([mockObjectId]);
    expect(response.status).toBe(200);
  });
});

describe("GET requests to api/company/names", () => {
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

  test("should return 401 without auth header", async () => {
    // given

    // when
    const response = await client.get("/api/company/names").set({}).send({});

    // then
    expect(response.status).toBe(401);
  });

  test("should find existing names and return 200", async () => {
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
    const name2 = "Energo2";
    const mockObjectId2 = new mongoose.Types.ObjectId();
    const dummyCompany2 = new CompanyEntity({
      name: name2,
      roles: {
        owners: mockObjectId2,
      },
    });
    await dummyCompany2.save();

    // when
    const response = await client
      .get("/api/company/names")
      .set({ authorization: token })
      .send();

    // then
    const companies = response.body.companies;
    expect(companies).toHaveLength(2);
    expect(companies[0].name).toBe(name1);
    expect(companies[1].name).toBe(name2);
    expect(response.status).toBe(200);
  });
});

describe("GET requests to api/company/byuserid", () => {
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

  test("should return 401 without auth header", async () => {
    // given

    // when
    const response = await client.get("/api/company/byuserid").set({}).send({});

    // then
    expect(response.status).toBe(401);
  });

  test("should find company name by userId within owners and return 200", async () => {
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
    const name2 = "Energo2";
    const mockObjectId2 = new mongoose.Types.ObjectId();
    const dummyCompany2 = new CompanyEntity({
      name: name2,
      roles: {
        owners: mockObjectId2,
      },
    });
    await dummyCompany2.save();
    const body = {
      userId: mockObjectId1,
    };

    console.log(body.userId);

    // when
    const response = await client
      .get("/api/company/byuserid")
      .set({ authorization: token })
      .send(body);

    // then
    const companies = response.body;
    console.log(companies);
    console.log(companies[0].roles);
    // expect(companies).toHaveLength(2);
    // expect(companies[0].name).toBe(name1);
    // expect(companies[1].name).toBe(name2);
    expect(response.status).toBe(200);
  });
});
