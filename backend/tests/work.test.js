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

describe("POST requests to api/dashboards/work", () => {
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
    const token = jwt.sign({}, process.env.JWT_SECRET_KEY);
    const name1 = "Energo";
    const mockObjectId1 = new mongoose.Types.ObjectId();
    const dummyCompany1 = new CompanyEntity({
      name: name1,
      roles: {
        role: "owner",
        userId: mockObjectId1,
        username: "boss",
      },
    });
    await dummyCompany1.save();
    const companyId = dummyCompany1._id;
    const work = "Разработка приложения";
    body = {
      companyId,
      work,
    };

    // when
    const response = await client
      .post("/api/dashboards/work")
      .set({})
      .send({ body });

    // then
    expect(response.status).toBe(401);
  });

  test("should return 400 without body", async () => {
    // given
    const token = jwt.sign({}, process.env.JWT_SECRET_KEY);
    const name1 = "Energo";
    const mockObjectId1 = new mongoose.Types.ObjectId();
    const dummyCompany1 = new CompanyEntity({
      name: name1,
      roles: {
        role: "owner",
        userId: mockObjectId1,
        username: "boss",
      },
    });
    await dummyCompany1.save();
    const companyId = dummyCompany1._id;
    const work = "Разработка приложения";
    body = {
      companyId,
      work,
    };

    // when
    const response = await client
      .post("/api/dashboards/work")
      .set({ authorization: token })
      .send({});

    // then
    expect(response.status).toBe(400);
  });

  test("should create work with correct body and return 200", async () => {
    // given
    const token = jwt.sign({}, process.env.JWT_SECRET_KEY);
    const name1 = "Energo";
    const mockObjectId1 = new mongoose.Types.ObjectId();
    const dummyCompany1 = new CompanyEntity({
      name: name1,
      roles: {
        role: "owner",
        userId: mockObjectId1,
        username: "boss",
      },
    });
    await dummyCompany1.save();
    const companyId = dummyCompany1._id;
    const work = "Разработка приложения";
    body = {
      companyId,
      work,
    };

    // when
    const response = await client
      .post("/api/dashboards/work")
      .set({ authorization: token })
      .send(body);

    // then
    const company = await CompanyEntity.find();
    expect(company[0].works.length).toBe(1);
    expect(company[0].works[0]).toBe(work);
    expect(response.status).toBe(200);
  });
});

describe("DELETE requests to api/dashboards/works/:name", () => {
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
    const token = jwt.sign({}, process.env.JWT_SECRET_KEY);
    const name1 = "Energo";
    const mockObjectId1 = new mongoose.Types.ObjectId();
    const dummyCompany1 = new CompanyEntity({
      name: name1,
      roles: {
        role: "owner",
        userId: mockObjectId1,
        username: "boss",
      },
    });
    const work = "Разработка приложения";
    dummyCompany1.works.push(work);
    await dummyCompany1.save();
    const companyId = dummyCompany1._id;
    body = {
      companyId,
      work,
    };

    // when
    const response = await client
      .delete("/api/dashboards/works/:name")
      .set({})
      .send({ body });

    // then
    expect(response.status).toBe(401);
  });

  test("should return 400 without body", async () => {
    // given
    const token = jwt.sign({}, process.env.JWT_SECRET_KEY);
    const name1 = "Energo";
    const mockObjectId1 = new mongoose.Types.ObjectId();
    const dummyCompany1 = new CompanyEntity({
      name: name1,
      roles: {
        role: "owner",
        userId: mockObjectId1,
        username: "boss",
      },
    });
    const work = "Разработка приложения";

    dummyCompany1.works.push(work);
    await dummyCompany1.save();
    const companyId = dummyCompany1._id;
    body = {
      companyId,
      work,
    };

    // when
    const response = await client
      .delete("/api/dashboards/works/:name")
      .set({ authorization: token })
      .send({});

    // then
    expect(response.status).toBe(400);
  });

  test("should create work with correct body and return 200", async () => {
    // given
    const token = jwt.sign({}, process.env.JWT_SECRET_KEY);
    const name1 = "Energo";
    const mockObjectId1 = new mongoose.Types.ObjectId();
    const dummyCompany1 = new CompanyEntity({
      name: name1,
      roles: {
        role: "owner",
        userId: mockObjectId1,
        username: "boss",
      },
    });
    const work = "Разработка приложения";
    dummyCompany1.works.push(work);
    await dummyCompany1.save();
    const companyId = dummyCompany1._id;
    body = {
      companyId,
      work,
    };

    // when
    const response = await client
      .delete("/api/dashboards/works/:name")
      .set({ authorization: token })
      .send(body);

    // then
    const company = await CompanyEntity.find();

    expect(response.status).toBe(200);
  });
});
