const mongoose = require("mongoose");
const Workout = require("../models/workoutModel");
const NAME = "Workout"


// GET /api/workouts — ALREADY IMPLEMENTED
const getAllWorkouts = async (req, res) => {
  const workouts = await Workout.find({});
  res.json(workouts);
};

// POST /api/workouts — ALREADY IMPLEMENTED
const createWorkout = async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json(workout);
};

// TODO (Q1): Implement getWorkoutById
// - Find the workout using req.params.workoutId
// - Return the workout as JSON
// - Return 404 with { error: "Workout not found" } if not found
const getWorkoutById = async (req, res) => {
  const { workoutId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(workoutId)) {
    return res.status(400).json({ message: "Invalid workout ID" });
  }

  try {
    const workout = await Workout.findById(workoutId);
    if (workout) {
      res.status(200).json(workout);
    } else {
      res.status(404).json({ message: "Workout is not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve a workout" });
  }


};


// TODO (Q3): Implement updateWorkout
// - Update the workout by req.params.workoutId using req.body
// - Use options { new: true, runValidators: true }
// - Return the updated workout as JSON
// - Return 404 with { error: "Workout not found" } if not found
const updateWorkout = async (req, res) => {
  const { workoutId } = req.params;
  //const user_id = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(workoutId)) {
    return res.status(400).json({ message: "Invalid workout ID" });
  }
  try {
    const updatedWorkout = await Workout.findOneAndUpdate(
      { _id: workoutId}, // { _id: workoutId, user_id }
      { ...req.body },
      { returnDocument: "after", runValidators: true},
    );
    if (updatedWorkout) {
      res.status(200).json(updatedWorkout);
    } else {
      res.status(404).json({ message: "Workout not found" });
    }

  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Failed to update a workout" });
  }
};


// TODO (Q2): Implement deleteWorkout
// - Delete the workout by req.params.workoutId
// - Return the deleted workout as JSON
// - Return 404 with { error: "Workout not found" } if not found
// DELETE /workouts/:workoutId
const deleteWorkout = async (req, res) => {
  const { workoutId } = req.params;
  //const user_id = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(workoutId)) {
    return res.status(400).json({ message: "Invalid workout ID" });
  }

  try {
    const deleteWorkout = await Workout.findOneAndDelete({ _id: workoutId}); // { _id: workoutId, user_id }
    if (deleteWorkout) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Workout not found" });
    }
  } catch {
    res.status(500).json({ message: "Failed to delete a workout" });
  }
};

module.exports = {
  getAllWorkouts,
  createWorkout,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
};
