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

describe("GET requests to api/orders/", () => {
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
    const companyName1 = "Energo";
    const mockObjectIdForOwner1 = new mongoose.Types.ObjectId();
    const mockObjectIdForUser1 = new mongoose.Types.ObjectId();
    const itemname1 = "item1";
    const itemname2 = "item2";
    const dummyCompany1 = new CompanyEntity({
      name: companyName1,
      roles: {
        owners: mockObjectIdForOwner1,
      },
    });
    const item1 = {
      name: "itemname1",
      price: 1000,
    };
    const item2 = {
      name: "itemname2",
      price: 999,
    };
    dummyCompany1.items.push(item1);
    dummyCompany1.items.push(item2);
    const itemId1 = dummyCompany1.items[0]._id;
    const itemId2 = dummyCompany1.items[1]._id;
    const order = {
      orderedBy: mockObjectIdForUser1,
      orderList: [
        {
          itemId: itemId1,
          name: itemname1,
          quantity: 90,
        },
        {
          itemId: itemId2,
          name: itemname2,
          quantity: 1,
        },
      ],
    };
    await dummyCompany1.save();
    const companyId = dummyCompany1._id;
    body = {
      companyId,
    };

    // when
    const response = await client.get("/api/orders/").set({}).send({ body });

    // then
    expect(response.status).toBe(401);
  });

  test("should return 400 without body", async () => {
    // given
    const token = jwt.sign({}, process.env.JWT_SECRET_KEY);
    const companyName1 = "Energo";
    const mockObjectIdForOwner1 = new mongoose.Types.ObjectId();
    const mockObjectIdForUser1 = new mongoose.Types.ObjectId();
    const itemname1 = "item1";
    const itemname2 = "item2";
    const dummyCompany1 = new CompanyEntity({
      name: companyName1,
      roles: {
        owners: mockObjectIdForOwner1,
      },
    });
    const item1 = {
      name: "itemname1",
      price: 1000,
    };
    const item2 = {
      name: "itemname2",
      price: 999,
    };
    dummyCompany1.items.push(item1);
    dummyCompany1.items.push(item2);
    const itemId1 = dummyCompany1.items[0]._id;
    const itemId2 = dummyCompany1.items[1]._id;
    const order = {
      orderedBy: mockObjectIdForUser1,
      orderList: [
        {
          itemId: itemId1,
          name: itemname1,
          quantity: 90,
        },
        {
          itemId: itemId2,
          name: itemname2,
          quantity: 1,
        },
      ],
    };
    await dummyCompany1.save();
    const companyId = dummyCompany1._id;
    body = {
      companyId,
    };

    // when
    const response = await client
      .get("/api/orders/")
      .set({ authorization: token })
      .send({});

    // then
    expect(response.status).toBe(400);
  });

  test("should create work with correct body and return 200", async () => {
    // given
    const token = jwt.sign({}, process.env.JWT_SECRET_KEY);
    const companyName1 = "Energo";
    const mockObjectIdForOwner1 = new mongoose.Types.ObjectId();
    const mockObjectIdForUser1 = new mongoose.Types.ObjectId();
    const itemname1 = "item1";
    const itemname2 = "item2";
    const dummyCompany1 = new CompanyEntity({
      name: companyName1,
      roles: {
        owners: mockObjectIdForOwner1,
      },
    });
    const item1 = {
      name: "itemname1",
      price: 1000,
    };
    const item2 = {
      name: "itemname2",
      price: 999,
    };
    dummyCompany1.items.push(item1);
    dummyCompany1.items.push(item2);
    const itemId1 = dummyCompany1.items[0]._id;
    const itemId2 = dummyCompany1.items[1]._id;
    const order1 = {
      orderedBy: mockObjectIdForUser1,
      orderList: [
        {
          itemId: itemId1,
          name: itemname1,
          quantity: 90,
        },
        {
          itemId: itemId2,
          name: itemname2,
          quantity: 1,
        },
      ],
    };
    const order2 = {
      orderedBy: mockObjectIdForUser1,
      orderList: [
        {
          itemId: itemId1,
          name: itemname1,
          quantity: 90,
        },
        {
          itemId: itemId2,
          name: itemname2,
          quantity: 1,
        },
      ],
    };
    dummyCompany1.orders.push(order1);
    dummyCompany1.orders.push(order2);
    await dummyCompany1.save();
    const companyId = dummyCompany1._id;
    body = {
      companyId,
    };

    // when
    const response = await client
      .get("/api/orders/")
      .set({ authorization: token })
      .send(body);

    // then
    const company = await CompanyEntity.find();
    expect(company[0].orders).toHaveLength(2);
    expect(company[0].orders[0].orderList[0].itemId).toStrictEqual(itemId1);
    expect(response.status).toBe(200);
  });
});

describe("POST requests to api/orders/", () => {
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
    const companyName1 = "Energo";
    const mockObjectIdForOwner1 = new mongoose.Types.ObjectId();
    const mockObjectIdForUser1 = new mongoose.Types.ObjectId();
    const itemname1 = "item1";
    const itemname2 = "item2";
    const dummyCompany1 = new CompanyEntity({
      name: companyName1,
      roles: {
        owners: mockObjectIdForOwner1,
      },
    });
    const item1 = {
      name: "itemname1",
      price: 1000,
    };
    const item2 = {
      name: "itemname2",
      price: 999,
    };
    dummyCompany1.items.push(item1);
    dummyCompany1.items.push(item2);
    const itemId1 = dummyCompany1.items[0]._id;
    const itemId2 = dummyCompany1.items[1]._id;
    const order = {
      orderedBy: mockObjectIdForUser1,
      orderList: [
        {
          itemId: itemId1,
          name: itemname1,
          quantity: 90,
        },
        {
          itemId: itemId2,
          name: itemname2,
          quantity: 1,
        },
      ],
    };
    await dummyCompany1.save();
    const companyId = dummyCompany1._id;
    body = {
      companyId,
    };

    // when
    const response = await client.post("/api/orders/").set({}).send({ body });

    // then
    expect(response.status).toBe(401);
  });

  test("should return 400 without body", async () => {
    // given
    const token = jwt.sign({}, process.env.JWT_SECRET_KEY);
    const companyName1 = "Energo";
    const mockObjectIdForOwner1 = new mongoose.Types.ObjectId();
    const mockObjectIdForUser1 = new mongoose.Types.ObjectId();
    const itemname1 = "item1";
    const itemname2 = "item2";
    const dummyCompany1 = new CompanyEntity({
      name: companyName1,
      roles: {
        owners: mockObjectIdForOwner1,
      },
    });
    const item1 = {
      name: "itemname1",
      price: 1000,
    };
    const item2 = {
      name: "itemname2",
      price: 999,
    };
    dummyCompany1.items.push(item1);
    dummyCompany1.items.push(item2);
    const itemId1 = dummyCompany1.items[0]._id;
    const itemId2 = dummyCompany1.items[1]._id;
    const order = {
      orderedBy: mockObjectIdForUser1,
      orderList: [
        {
          itemId: itemId1,
          name: itemname1,
          quantity: 90,
        },
        {
          itemId: itemId2,
          name: itemname2,
          quantity: 1,
        },
      ],
    };
    await dummyCompany1.save();
    const companyId = dummyCompany1._id;
    body = {
      companyId,
    };

    // when
    const response = await client
      .post("/api/orders/")
      .set({ authorization: token })
      .send({});

    // then
    expect(response.status).toBe(400);
  });

  test("should create work with correct body and return 200", async () => {
    // given
    const token = jwt.sign({}, process.env.JWT_SECRET_KEY);
    const companyName1 = "Energo";
    const mockObjectIdForOwner1 = new mongoose.Types.ObjectId();
    const mockObjectIdForUser1 = new mongoose.Types.ObjectId();
    const itemname1 = "item1";
    const itemname2 = "item2";
    const dummyCompany1 = new CompanyEntity({
      name: companyName1,
      roles: {
        owners: mockObjectIdForOwner1,
      },
    });
    const item1 = {
      name: "itemname1",
      price: 1000,
    };
    const item2 = {
      name: "itemname2",
      price: 999,
    };
    dummyCompany1.items.push(item1);
    dummyCompany1.items.push(item2);
    const itemId1 = dummyCompany1.items[0]._id;
    const itemId2 = dummyCompany1.items[1]._id;
    const order = {
      orderedBy: mockObjectIdForUser1,
      orderList: [
        {
          itemId: itemId1,
          name: itemname1,
          quantity: 90,
        },
        {
          itemId: itemId2,
          name: itemname2,
          quantity: 1,
        },
      ],
    };
    const order2 = {
      orderedBy: mockObjectIdForUser1,
      orderList: [
        {
          itemId: itemId1,
          name: itemname1,
          quantity: 90,
        },
        {
          itemId: itemId2,
          name: itemname2,
          quantity: 1,
        },
      ],
    };
    await dummyCompany1.save();
    const companyId = dummyCompany1._id;
    body = {
      companyId,
      order,
    };

    // when
    const response = await client
      .post("/api/orders/")
      .set({ authorization: token })
      .send(body);

    // then
    const company = await CompanyEntity.find();
    expect(company[0].orders).toHaveLength(1);
    expect(company[0].orders[0].orderList[0].itemId).toStrictEqual(itemId1);
    expect(response.status).toBe(200);
  });
});

describe("PUT requests to api/orders/:id", () => {
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
    const companyName1 = "Energo";
    const mockObjectIdForOwner1 = new mongoose.Types.ObjectId();
    const mockObjectIdForUser1 = new mongoose.Types.ObjectId();
    const itemname1 = "item1";
    const itemname2 = "item2";
    const dummyCompany1 = new CompanyEntity({
      name: companyName1,
      roles: {
        owners: mockObjectIdForOwner1,
      },
    });
    const item1 = {
      name: "itemname1",
      price: 1000,
    };
    const item2 = {
      name: "itemname2",
      price: 999,
    };
    dummyCompany1.items.push(item1);
    dummyCompany1.items.push(item2);
    const itemId1 = dummyCompany1.items[0]._id;
    const itemId2 = dummyCompany1.items[1]._id;
    const order = {
      orderedBy: mockObjectIdForUser1,
      orderList: [
        {
          itemId: itemId1,
          name: itemname1,
          quantity: 90,
        },
        {
          itemId: itemId2,
          name: itemname2,
          quantity: 1,
        },
      ],
    };
    dummyCompany1.orders.push(order);
    await dummyCompany1.save();
    updatedOrderDetials = {
      orderId: dummyCompany1.orders[0]._id,
      orderList: [
        {
          itemId: itemId1,
          name: itemname1,
          quantity: 120,
        },
      ],
    };
    const companyId = dummyCompany1._id;
    body = {
      companyId,
      order: updatedOrderDetials,
    };

    // when
    const response = await client.put("/api/orders/:id").set({}).send({ body });

    // then
    expect(response.status).toBe(401);
  });

  test("should return 400 without body", async () => {
    // given
    const token = jwt.sign({}, process.env.JWT_SECRET_KEY);
    const companyName1 = "Energo";
    const mockObjectIdForOwner1 = new mongoose.Types.ObjectId();
    const mockObjectIdForUser1 = new mongoose.Types.ObjectId();
    const itemname1 = "item1";
    const itemname2 = "item2";
    const dummyCompany1 = new CompanyEntity({
      name: companyName1,
      roles: {
        owners: mockObjectIdForOwner1,
      },
    });
    const item1 = {
      name: "itemname1",
      price: 1000,
    };
    const item2 = {
      name: "itemname2",
      price: 999,
    };
    dummyCompany1.items.push(item1);
    dummyCompany1.items.push(item2);
    const itemId1 = dummyCompany1.items[0]._id;
    const itemId2 = dummyCompany1.items[1]._id;
    const order = {
      orderedBy: mockObjectIdForUser1,
      orderList: [
        {
          itemId: itemId1,
          name: itemname1,
          quantity: 90,
        },
        {
          itemId: itemId2,
          name: itemname2,
          quantity: 1,
        },
      ],
    };
    dummyCompany1.orders.push(order);
    await dummyCompany1.save();
    updatedOrderDetials = {
      orderId: dummyCompany1.orders[0]._id,
      orderList: [
        {
          itemId: itemId1,
          name: itemname1,
          quantity: 120,
        },
      ],
    };
    const companyId = dummyCompany1._id;
    body = {
      companyId,
      order: updatedOrderDetials,
    };

    // when
    const response = await client
      .put("/api/orders/:id")
      .set({ authorization: token })
      .send({});

    // then
    expect(response.status).toBe(400);
  });

  test("should create work with correct body and return 200", async () => {
    // given
    const token = jwt.sign({}, process.env.JWT_SECRET_KEY);
    const companyName1 = "Energo";
    const mockObjectIdForOwner1 = new mongoose.Types.ObjectId();
    const mockObjectIdForUser1 = new mongoose.Types.ObjectId();
    const itemname1 = "item1";
    const itemname2 = "item2";
    const dummyCompany1 = new CompanyEntity({
      name: companyName1,
      roles: {
        owners: mockObjectIdForOwner1,
      },
    });
    const item1 = {
      name: "itemname1",
      price: 1000,
    };
    const item2 = {
      name: "itemname2",
      price: 999,
    };
    dummyCompany1.items.push(item1);
    dummyCompany1.items.push(item2);
    const itemId1 = dummyCompany1.items[0]._id;
    const itemId2 = dummyCompany1.items[1]._id;
    const order = {
      orderedBy: mockObjectIdForUser1,
      orderList: [
        {
          itemId: itemId1,
          name: itemname1,
          quantity: 90,
        },
        {
          itemId: itemId2,
          name: itemname2,
          quantity: 1,
        },
      ],
    };
    dummyCompany1.orders.push(order);
    await dummyCompany1.save();
    updatedOrderDetials = {
      orderId: dummyCompany1.orders[0]._id,
      orderList: [
        {
          itemId: itemId1,
          name: itemname1,
          quantity: 120,
        },
      ],
    };
    const companyId = dummyCompany1._id;
    body = {
      companyId,
      order: updatedOrderDetials,
    };

    // when
    const response = await client
      .put("/api/orders/:id")
      .set({ authorization: token })
      .send(body);

    // then
    expect(response.status).toBe(200);
    const company = await CompanyEntity.find();
    expect(company[0].orders).toHaveLength(1);
    expect(company[0].orders[0].orderList[0].itemId).toStrictEqual(itemId1);
    expect(company[0].orders[0].orderList[0].quantity).toStrictEqual(120);
  });
});

describe("DELETE requests to api/orders/:id", () => {
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
    const companyName1 = "Energo";
    const mockObjectIdForOwner1 = new mongoose.Types.ObjectId();
    const mockObjectIdForUser1 = new mongoose.Types.ObjectId();
    const itemname1 = "item1";
    const itemname2 = "item2";
    const dummyCompany1 = new CompanyEntity({
      name: companyName1,
      roles: {
        owners: mockObjectIdForOwner1,
      },
    });
    const item1 = {
      name: "itemname1",
      price: 1000,
    };
    const item2 = {
      name: "itemname2",
      price: 999,
    };
    dummyCompany1.items.push(item1);
    dummyCompany1.items.push(item2);
    const itemId1 = dummyCompany1.items[0]._id;
    const itemId2 = dummyCompany1.items[1]._id;
    const order = {
      orderedBy: mockObjectIdForUser1,
      orderList: [
        {
          itemId: itemId1,
          name: itemname1,
          quantity: 90,
        },
        {
          itemId: itemId2,
          name: itemname2,
          quantity: 1,
        },
      ],
    };
    dummyCompany1.orders.push(order);
    await dummyCompany1.save();
    const companyId = dummyCompany1._id;
    const orderId = dummyCompany1.orders[0]._id;
    body = {
      companyId,
      orderId,
    };

    // when
    const response = await client
      .delete("/api/orders/:id")
      .set({})
      .send({ body });

    // then
    expect(response.status).toBe(401);
  });

  test("should return 400 without body", async () => {
    // given
    const token = jwt.sign({}, process.env.JWT_SECRET_KEY);
    const companyName1 = "Energo";
    const mockObjectIdForOwner1 = new mongoose.Types.ObjectId();
    const mockObjectIdForUser1 = new mongoose.Types.ObjectId();
    const itemname1 = "item1";
    const itemname2 = "item2";
    const dummyCompany1 = new CompanyEntity({
      name: companyName1,
      roles: {
        owners: mockObjectIdForOwner1,
      },
    });
    const item1 = {
      name: "itemname1",
      price: 1000,
    };
    const item2 = {
      name: "itemname2",
      price: 999,
    };
    dummyCompany1.items.push(item1);
    dummyCompany1.items.push(item2);
    const itemId1 = dummyCompany1.items[0]._id;
    const itemId2 = dummyCompany1.items[1]._id;
    const order = {
      orderedBy: mockObjectIdForUser1,
      orderList: [
        {
          itemId: itemId1,
          name: itemname1,
          quantity: 90,
        },
        {
          itemId: itemId2,
          name: itemname2,
          quantity: 1,
        },
      ],
    };
    dummyCompany1.orders.push(order);
    await dummyCompany1.save();
    const companyId = dummyCompany1._id;
    const orderId = dummyCompany1.orders[0]._id;
    body = {
      companyId,
      orderId,
    };

    // when
    const response = await client
      .delete("/api/orders/:id")
      .set({ authorization: token })
      .send({});

    // then
    expect(response.status).toBe(400);
  });

  test("should create work with correct body and return 200", async () => {
    // given
    const token = jwt.sign({}, process.env.JWT_SECRET_KEY);
    const companyName1 = "Energo";
    const mockObjectIdForOwner1 = new mongoose.Types.ObjectId();
    const mockObjectIdForUser1 = new mongoose.Types.ObjectId();
    const itemname1 = "item1";
    const itemname2 = "item2";
    const dummyCompany1 = new CompanyEntity({
      name: companyName1,
      roles: {
        owners: mockObjectIdForOwner1,
      },
    });
    const item1 = {
      name: "itemname1",
      price: 1000,
    };
    const item2 = {
      name: "itemname2",
      price: 999,
    };
    dummyCompany1.items.push(item1);
    dummyCompany1.items.push(item2);
    const itemId1 = dummyCompany1.items[0]._id;
    const itemId2 = dummyCompany1.items[1]._id;
    const order = {
      orderedBy: mockObjectIdForUser1,
      orderList: [
        {
          itemId: itemId1,
          name: itemname1,
          quantity: 90,
        },
        {
          itemId: itemId2,
          name: itemname2,
          quantity: 1,
        },
      ],
    };
    const order2 = {
      orderedBy: mockObjectIdForUser1,
      orderList: [
        {
          itemId: itemId1,
          name: itemname1,
          quantity: 90,
        },
        {
          itemId: itemId2,
          name: itemname2,
          quantity: 1,
        },
      ],
    };
    dummyCompany1.orders.push(order);
    dummyCompany1.orders.push(order2);
    await dummyCompany1.save();
    const companyId = dummyCompany1._id;
    const orderId = dummyCompany1.orders[0]._id;
    const orderId2 = dummyCompany1.orders[1]._id;
    body = {
      companyId,
      orderId,
    };

    // when
    const response = await client
      .delete("/api/orders/:id")
      .set({ authorization: token })
      .send(body);

    // then
    expect(response.status).toBe(200);
    const company = await CompanyEntity.find();
    expect(company[0].orders).toHaveLength(1);
    expect(company[0].orders[0]._id).toStrictEqual(orderId2);
  });
});
