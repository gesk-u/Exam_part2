const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const connectDB = require("../config/db");
const User = require("../models/userModel");

const api = supertest(app);

// ===== CHANGE ONLY THESE =====
const Workout = require("../models/workoutModel");
const BASE_URL = "/api/workouts";
const SIGNUP_URL = "/api/users/signup";
const TITLE = "workoutTitle"; // a required string field, used for checks

// 2 objects with EVERY required field of your schema
const initialWorkouts = [
  {
    workoutTitle: "Morning HIIT",
    description: "High intensity interval training session",
    location: { city: "Helsinki", state: "Uusimaa" },
    sessionPrice: 25,
    fitnessLevel: "Intermediate",
    requiredEquipment: "None",
  },
  {
    workoutTitle: "Strength Basics",
    description: "Fundamental strength training",
    location: { city: "Tampere", state: "Pirkanmaa" },
    sessionPrice: 30,
    fitnessLevel: "Beginner",
    requiredEquipment: "Dumbbells",
  },
];
const newWorkout = { ...initialWorkouts[0], [TITLE]: "New workout" };
const validUpdate = { sessionPrice: 42 };
const invalidUpdate = { [TITLE]: "" }; // empty required field -> 400

// every field your User workout requires
const testUser = {
  name: "jane",
  username: "jane.doe",
  password: "Secret123!",
  phone_number: "+358401234567",
  address: "adress",
};
// =============================

let token = null;
const workoutsInDb = async () => {
  const workouts = await Workout.find({});
  return workouts.map((w) => w.toJSON());
};

beforeAll(async () => {
  await connectDB();
  await User.deleteMany({});
  const res = await api.post(SIGNUP_URL).send(testUser);
  token = res.body.token;
});

beforeEach(async () => {
  await Workout.deleteMany({});
  await Workout.insertMany(initialWorkouts);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("with a valid token", () => {
  it("GET all is public and returns all workouts", async () => {
    const res = await api.get(BASE_URL).expect(200);
    expect(res.body).toHaveLength(initialWorkouts.length);
  });

  it("GET one is public", async () => {
    const [first] = await workoutsInDb();
    await api.get(`${BASE_URL}/${first.id}`).expect(200);
  });

  it("POST creates an workout", async () => {
    await api
      .post(BASE_URL)
      .set("Authorization", `Bearer ${token}`)
      .send(newWorkout)
      .expect(201);
    const after = await workoutsInDb();
    expect(after).toHaveLength(initialWorkouts.length + 1);
    expect(after.map((i) => i[TITLE])).toContain(newWorkout[TITLE]);
  });

  it("POST returns 400 when a required field is missing", async () => {
    const { [TITLE]: _removed, ...invalid } = newWorkout;
    await api
      .post(BASE_URL)
      .set("Authorization", `Bearer ${token}`)
      .send(invalid)
      .expect(400);
    expect(await workoutsInDb()).toHaveLength(initialWorkouts.length);
  });

  it("PUT updates an workout", async () => {
    const [first] = await workoutsInDb();
    const res = await api
      .put(`${BASE_URL}/${first.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(validUpdate)
      .expect(200);
    for (const [key, value] of Object.entries(validUpdate)) {
      expect(res.body[key]).toBe(value);
    }
  });

  it("PUT returns 400 for invalid data", async () => {
    const [first] = await workoutsInDb();
    await api
      .put(`${BASE_URL}/${first.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(invalidUpdate)
      .expect(400);
  });

  it("PUT returns 404 for a non-existing id", async () => {
    await api
      .put(`${BASE_URL}/${new mongoose.Types.ObjectId()}`)
      .set("Authorization", `Bearer ${token}`)
      .send(validUpdate)
      .expect(404);
  });

  it("DELETE removes an workout", async () => {
    const [first] = await workoutsInDb();
    await api
      .delete(`${BASE_URL}/${first.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);
    expect(await Workout.findById(first.id)).toBeNull();
  });

  it("DELETE returns 400 for an invalid id", async () => {
    await api
      .delete(`${BASE_URL}/12345`)
      .set("Authorization", `Bearer ${token}`)
      .expect(400);
  });
});

describe("without a valid token", () => {
  it("POST returns 401 without a token and saves nothing", async () => {
    await api.post(BASE_URL).send(newWorkout).expect(401);
    expect(await workoutsInDb()).toHaveLength(initialWorkouts.length);
  });

  it("PUT returns 401 without a token", async () => {
    const [first] = await workoutsInDb();
    await api.put(`${BASE_URL}/${first.id}`).send(validUpdate).expect(401);
  });

  it("DELETE returns 401 with a fake token", async () => {
    const [first] = await workoutsInDb();
    await api
      .delete(`${BASE_URL}/${first.id}`)
      .set("Authorization", "Bearer not.a.real.token")
      .expect(401);
    expect(await Workout.findById(first.id)).not.toBeNull();
  });
});
