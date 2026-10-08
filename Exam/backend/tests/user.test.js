const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = require("../app");
const connectDB = require("../config/db");
const User = require("../models/userModel");
const config = require("../utils/config");

const api = supertest(app);

// ===== CHANGE ONLY THESE =====
const USERS_URL = "/api/users";
const LOGIN_FIELD = "username";
const validUser = {
  name: "jane",
  username: "jane.doe",
  password: "Secret123!",
  phone_number: "+358401234567",
  address: "adress",
};
const credentials = { [LOGIN_FIELD]: validUser[LOGIN_FIELD], password: validUser.password };
// =============================

beforeAll(async () => {
  await connectDB();
  await User.init(); // builds the unique index before tests
});

beforeEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe(`POST ${USERS_URL}/signup`, () => {
  it("returns 201, a valid token and no password", async () => {
    const res = await api.post(`${USERS_URL}/signup`).send(validUser).expect(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body).not.toHaveProperty("password");
    const decoded = jwt.verify(res.body.token, config.SECRET);
    expect(decoded[LOGIN_FIELD]).toBe(validUser[LOGIN_FIELD]);
  });

  it("stores a hashed password", async () => {
    await api.post(`${USERS_URL}/signup`).send(validUser).expect(201);
    const saved = await User.findOne({ [LOGIN_FIELD]: validUser[LOGIN_FIELD] });
    expect(saved.password).not.toBe(validUser.password);
    expect(await bcrypt.compare(validUser.password, saved.password)).toBe(true);
  });

  it("returns 400 when fields are missing and saves nothing", async () => {
    const res = await api
      .post(`${USERS_URL}/signup`)
      .send({ [LOGIN_FIELD]: "only" })
      .expect(400);
    expect(res.body).toHaveProperty("error", "Please add all fields");
    expect(await User.find({})).toHaveLength(0);
  });

  it("returns 400 for a duplicate user", async () => {
    await api.post(`${USERS_URL}/signup`).send(validUser).expect(201);
    await api.post(`${USERS_URL}/signup`).send(validUser).expect(400);
    expect(await User.find({})).toHaveLength(1);
  });

  it("returns 400 for an unsupported role", async () => {
    await api.post(`${USERS_URL}/signup`).send({ ...validUser, role: "boss" }).expect(400);
  });
});

describe(`POST ${USERS_URL}/login`, () => {
  beforeEach(async () => {
    await api.post(`${USERS_URL}/signup`).send(validUser).expect(201);
  });

  it("returns 200 and a token for valid credentials", async () => {
    const res = await api.post(`${USERS_URL}/login`).send(credentials).expect(200);
    expect(res.body).toHaveProperty("token");
  });

  it("returns 400 for a wrong password", async () => {
    await api.post(`${USERS_URL}/login`).send({ ...credentials, password: "wrong" }).expect(400);
  });

  it("returns 400 for an unknown user", async () => {
    await api.post(`${USERS_URL}/login`).send({ ...credentials, [LOGIN_FIELD]: "nobody" }).expect(400);
  });

  it("returns 400 when the password is missing", async () => {
    await api.post(`${USERS_URL}/login`).send({ [LOGIN_FIELD]: validUser[LOGIN_FIELD] }).expect(400);
  });
});
