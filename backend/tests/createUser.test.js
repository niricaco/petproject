require("dotenv").config();
const app = require("../app");
const jwt = require("jsonwebtoken");
const mockServer = require("supertest");

//models
const UserEntity = require("../models/user");

//utils
const { startDb, stopDb, deleteAll } = require("./utils/inMemoryDb");
const {
  setupGoogleSuccessResponse,
  setupGoogleErrorResponse,
  setupOidSuccessResponse,
  setupOidErrorResponse,
} = require("./utils/httpMock");

describe("POST requests to api/user/create", () => {
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
  });

  test("should return 400 without body", async () => {
    // given
    const token = jwt.sign({}, process.env.JWT_SECRET_KEY);

    // when
    const response = await client
      .post("/api/user/create")
      .set({ authorization: token })
      .send({});

    // then
    expect(response.status).toBe(400);
  });

  test("should create user with correct body and return 200", async () => {
    // given
    const token = jwt.sign({}, process.env.JWT_SECRET_KEY);
    const username = "username";
    const firstname = "firstname";
    const lastname = "lastname";
    const provider = "google";
    const email = "testemail@email.com";
    const body = {
      username,
      firstname,
      lastname,
      provider,
      email,
    };

    // when
    const response = await client
      .post("/api/user/create")
      .set({ authorization: token })
      .send(body);

    // then
    const user = await UserEntity.find();
    console.log(user);
    expect(response.status).toBe(200);
  });
});
