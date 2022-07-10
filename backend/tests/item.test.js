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
        role: "owner",
        userId: mockObjectId1,
        email: "boss",
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
        role: "owner",
        userId: mockObjectId1,
        email: "boss",
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
        role: "owner",
        userId: mockObjectId1,
        email: "boss",
      },
    });
    await dummyCompany1.save();
    const mockObjectId = new mongoose.Types.ObjectId();
    const item = {
      name: "itemname",
    };
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
    const company = await CompanyEntity.findOne({ name: name1 });
    expect(company.items).toHaveLength(1);
    expect(company.items[0].name).toBe(item.name);
    expect(response.status).toBe(200);
  });
});

// describe("POST requests to api/dashboard/items", () => {
//   let connection;
//   let server;
//   let client;

//   beforeAll(async () => {
//     const result = await startDb();
//     connection = result[0];
//     server = result[1];
//     client = mockServer.agent(app);
//   });

//   afterAll(async () => {
//     await stopDb(connection, server);
//   });

//   afterEach(async () => {
//     await deleteAll(CompanyEntity);
//   });

//   test("should return 401 without auth header", async () => {
//     // given
//     const token = jwt.sign({}, process.env.JWT_SECRET_KEY);
//     const name1 = "Energo";
//     const mockObjectId1 = new mongoose.Types.ObjectId();
//     const dummyCompany1 = new CompanyEntity({
//       name: name1,
//       roles: {
//         role: "owner",
//         userId: mockObjectId1,
//         email: "boss",
//       },
//     });
//     const item1 = {
//       name: "itemname1",
//     };
//     const item2 = {
//       name: "itemname2",
//     };
//     dummyCompany1.items.push(item1);
//     dummyCompany1.items.push(item2);
//     await dummyCompany1.save();
//     const body = { companyId: dummyCompany1._id };

//     // when
//     const response = await client
//       .post("/api/dashboards/items")
//       .set({})
//       .send(body);

//     // then
//     expect(response.status).toBe(401);
//   });

//   test("should return 400 without companyId", async () => {
//     // given
//     const token = jwt.sign({}, process.env.JWT_SECRET_KEY);
//     const name1 = "Energo";
//     const mockObjectId1 = new mongoose.Types.ObjectId();
//     const dummyCompany1 = new CompanyEntity({
//       name: name1,
//       roles: {
//         role: "owner",
//         userId: mockObjectId1,
//         email: "boss",
//       },
//     });
//     const item1 = {
//       name: "itemname1",
//     };
//     const item2 = {
//       name: "itemname2",
//     };
//     dummyCompany1.items.push(item1);
//     dummyCompany1.items.push(item2);
//     await dummyCompany1.save();
//     const body = {};

//     // when
//     const response = await client
//       .post("/api/dashboards/items")
//       .set({ authorization: token })
//       .send(body);

//     // then
//     expect(response.status).toBe(400);
//   });

//   test("should add item with correct body and return 200", async () => {
//     // given
//     const token = jwt.sign({}, process.env.JWT_SECRET_KEY);
//     const name1 = "Energo";
//     const mockObjectId1 = new mongoose.Types.ObjectId();
//     const dummyCompany1 = new CompanyEntity({
//       name: name1,
//       roles: {
//         role: "owner",
//         userId: mockObjectId1,
//         email: "boss",
//       },
//     });
//     const item1 = {
//       name: "itemname1",
//     };
//     const item2 = {
//       name: "itemname2",
//     };
//     dummyCompany1.items.push(item1);
//     dummyCompany1.items.push(item2);
//     await dummyCompany1.save();
//     const body = {
//       companyId: dummyCompany1._id,
//     };

//     // when
//     const response = await client
//       .post("/api/dashboards/items")
//       .set({ authorization: token })
//       .send(body);

//     // then
//     const company = await CompanyEntity.findOne({ name: name1 });
//     expect(company.items).toHaveLength(2);
//     expect(company.items[0].name).toBe(item1.name);
//     expect(company.items[1].name).toBe(item2.name);
//     expect(response.status).toBe(200);
//   });
// });

describe("PUT requests to api/dashboard/item", () => {
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
        email: "boss",
      },
    });
    const item1 = {
      name: "itemname1",
    };
    const item2 = {
      name: "itemname2",
    };
    dummyCompany1.items.push(item1);
    dummyCompany1.items.push(item2);
    await dummyCompany1.save();
    const changedItemName = "changedItemName";
    const itemId = dummyCompany1.items[0]._id;
    const body = {
      companyId: dummyCompany1._id,
      itemId,
      item: {
        name: changedItemName,
      },
    };

    // when
    const response = await client
      .put("/api/dashboards/item")
      .set({})
      .send(body);

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
        email: "boss",
      },
    });
    const item1 = {
      name: "itemname1",
    };
    const item2 = {
      name: "itemname2",
    };
    dummyCompany1.items.push(item1);
    dummyCompany1.items.push(item2);
    await dummyCompany1.save();
    const changedItemName = "changedItemName";
    const itemId = dummyCompany1.items[0]._id;
    body = {
      companyId: dummyCompany1._id,
      itemId,
      item: {
        name: changedItemName,
      },
    };

    // when
    const response = await client
      .put("/api/dashboards/item")
      .set({ authorization: token })
      .send();

    // then
    expect(response.status).toBe(400);
  });

  test("should update item with correct body and return 200", async () => {
    // given
    const token = jwt.sign({}, process.env.JWT_SECRET_KEY);
    const name1 = "Energo";
    const mockObjectId1 = new mongoose.Types.ObjectId();
    const dummyCompany1 = new CompanyEntity({
      name: name1,
      roles: {
        role: "owner",
        userId: mockObjectId1,
        email: "boss",
      },
    });
    const item1 = {
      name: "itemname1",
      price: 100,
    };
    const item2 = {
      name: "itemname2",
    };
    dummyCompany1.items.push(item1);
    dummyCompany1.items.push(item2);
    await dummyCompany1.save();
    const changedItemName = "changedItemName";
    const itemId = dummyCompany1.items[0]._id;
    body = {
      companyId: dummyCompany1._id,
      item: {
        itemId,
        name: changedItemName,
      },
    };

    // when
    const response = await client
      .put("/api/dashboards/item")
      .set({ authorization: token })
      .send(body);

    // then
    const company = await CompanyEntity.findOne({ name: name1 });
    expect(company.items).toHaveLength(2);
    expect(company.items[0].name).toBe(changedItemName);
    expect(company.items[0].price).toBe(100);
    expect(company.items[1].name).toBe(item2.name);
    expect(response.status).toBe(200);
  });
});

describe("DELETE requests to api/dashboard/items/:id", () => {
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
        email: "boss",
      },
    });
    const item1 = {
      name: "itemname1",
    };
    const item2 = {
      name: "itemname2",
    };
    dummyCompany1.items.push(item1);
    dummyCompany1.items.push(item2);
    await dummyCompany1.save();
    const changedItemName = "changedItemName";
    const itemId = dummyCompany1.items[0]._id;
    const body = {
      companyId: dummyCompany1._id,
      itemId,
    };

    // when
    const response = await client
      .delete("/api/dashboards/items/:id")
      .set({})
      .send(body);

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
        email: "boss",
      },
    });
    const item1 = {
      name: "itemname1",
    };
    const item2 = {
      name: "itemname2",
    };
    dummyCompany1.items.push(item1);
    dummyCompany1.items.push(item2);
    await dummyCompany1.save();
    const changedItemName = "changedItemName";
    const itemId = dummyCompany1.items[0]._id;
    body = {
      companyId: dummyCompany1._id,
      itemId,
    };

    // when
    const response = await client
      .delete("/api/dashboards/items/:id")
      .set({ authorization: token })
      .send();

    // then
    expect(response.status).toBe(400);
  });

  test("should update item with correct body and return 200", async () => {
    // given
    const token = jwt.sign({}, process.env.JWT_SECRET_KEY);
    const name1 = "Energo";
    const mockObjectId1 = new mongoose.Types.ObjectId();
    const dummyCompany1 = new CompanyEntity({
      name: name1,
      roles: {
        role: "owner",
        userId: mockObjectId1,
        email: "boss",
      },
    });
    const item1 = {
      name: "itemname1",
      price: 100,
    };
    const item2 = {
      name: "itemname2",
    };
    dummyCompany1.items.push(item1);
    dummyCompany1.items.push(item2);
    await dummyCompany1.save();
    const changedItemName = "changedItemName";
    const itemId = dummyCompany1.items[0]._id;
    body = {
      companyId: dummyCompany1._id,
      itemId,
    };

    // when
    const response = await client
      .delete("/api/dashboards/items/:id")
      .set({ authorization: token })
      .send(body);

    // then
    const company = await CompanyEntity.findOne({ name: name1 });
    expect(company.items).toHaveLength(1);
    expect(company.items[0].name).toBe(item2.name);
    expect(company.items[0].price).toBe(0);
    expect(response.status).toBe(200);
  });
});
