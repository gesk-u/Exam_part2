const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  workoutTitle: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    city: { type: String, required: true },
    state: { type: String, required: true },
  },
  sessionPrice: { type: Number, required: true },
  fitnessLevel: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner",
  },
  postedDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["available", "full", "cancelled"],
    default: "available",
  },
  requiredEquipment: { type: String, required: true },
});

workoutSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
