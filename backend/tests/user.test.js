require("dotenv").config();
const app = require("../app");
const jwt = require("jsonwebtoken");
const mockServer = require("supertest");

//models
const UserEntity = require("../models/user");
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

describe("POST requests to api/dashboards/", () => {
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
    await deleteAll(UserEntity);
    await deleteAll(CompanyEntity);
  });

  test("should return 401 without auth header", async () => {
    // given
    const token = jwt.sign({}, process.env.JWT_SECRET_KEY);
    const dummyUser1 = new UserEntity({
      firstname: "John",
      lastname: "Doe",
      username: "johndoe",
      email: "jd@email.com",
    });
    const dummyUser2 = new UserEntity({
      firstname: "Jane",
      lastname: "Doe",
      username: "janedoe",
      email: "janedoe@email.com",
    });
    const name1 = "Energo";
    const mockObjectId1 = new mongoose.Types.ObjectId();
    const dummyCompany1 = new CompanyEntity({
      name: name1,
      roles: {
        role: "owner",
        userId: mockObjectId1,
        email: "email1",
      },
    });

    dummyCompany1.roles.push({
      userId: dummyUser1._id,
      email: dummyUser1.email,
    });
    dummyCompany1.roles.push({
      userId: dummyUser2._id,
      email: dummyUser2.email,
    });
    await dummyCompany1.save();
    const companyId = dummyCompany1._id;
    const body = {
      companyId,
      userId: dummyUser1._id,
      email: dummyUser1.email,
    };

    // when
    const response = await client
      .post("/api/dashboards/users")
      .set({})
      .send({ body });

    // then
    expect(response.status).toBe(401);
  });

  test("should return 400 without body", async () => {
    // given
    const token = jwt.sign({}, process.env.JWT_SECRET_KEY);
    const dummyUser1 = new UserEntity({
      firstname: "John",
      lastname: "Doe",
      username: "johndoe",
      email: "jd@email.com",
    });
    const dummyUser2 = new UserEntity({
      firstname: "Jane",
      lastname: "Doe",
      username: "janedoe",
      email: "janedoe@email.com",
    });
    const name1 = "Energo";
    const mockObjectId1 = new mongoose.Types.ObjectId();
    const dummyCompany1 = new CompanyEntity({
      name: name1,
      roles: {
        role: "owner",
        userId: mockObjectId1,
        email: "email1",
      },
    });

    dummyCompany1.roles.push({
      userId: dummyUser1._id,
      email: dummyUser1.email,
    });
    dummyCompany1.roles.push({
      userId: dummyUser2._id,
      email: dummyUser2.email,
    });
    await dummyCompany1.save();
    const companyId = dummyCompany1._id;
    const body = {
      companyId,
      userId: dummyUser1._id,
    };

    // when
    const response = await client
      .post("/api/dashboards/users")
      .set({ authorization: token })
      .send({});

    // then
    expect(response.status).toBe(400);
  });

  test("should create work with correct body and return 200", async () => {
    // given
    const token = jwt.sign({}, process.env.JWT_SECRET_KEY);
    const dummyUser1 = new UserEntity({
      firstname: "John",
      lastname: "Doe",
      username: "johndoe",
      email: "jd@email.com",
    });
    await dummyUser1.save();
    const dummyUser2 = new UserEntity({
      firstname: "Jane",
      lastname: "Doe",
      username: "janedoe",
      email: "janedoe@email.com",
    });
    await dummyUser2.save();
    const name1 = "Energo";
    const mockObjectId1 = new mongoose.Types.ObjectId();
    const dummyCompany1 = new CompanyEntity({
      name: name1,
      roles: {
        role: "owner",
        userId: mockObjectId1,
        email: "email1",
      },
    });

    dummyCompany1.roles.push({
      userId: dummyUser1._id,
      email: dummyUser1.email,
    });
    dummyCompany1.roles.push({
      userId: dummyUser2._id,
      email: dummyUser2.email,
    });
    await dummyCompany1.save();
    const companyId = dummyCompany1._id;
    const body = {
      userId: dummyUser1._id,
      email: dummyUser1.email,
      companyId,
    };

    // when
    const response = await client
      .post("/api/dashboards/users")
      .set({ authorization: token })
      .send(body);

    // then
    expect(response.status).toBe(200);
    const userDetials = response.body.userDetials;
    console.log(userDetials);
    // expect(userDetials.companyId).toStrictEqual(companyId);
    // expect(userDetials.userId).toEqual(dummyUser1._id);
    // expect(userDetials.username).toEqual(dummyUser1.username);
  });
});
