const express = require("express");
const router = express.Router();
const {
  getAllWorkouts,
  createWorkout,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutControllers");

const requireAuth = require("../middleware/requireAuth");

// GET /api/workouts
router.get("/", getAllWorkouts);
// GET /api/workouts/:workoutId
router.get("/:workoutId", getWorkoutById);

router.use(requireAuth);
// POST /api/workouts
router.post("/", createWorkout);


// PUT /api/workouts/:workoutId
router.put("/:workoutId", updateWorkout);

// DELETE /api/workouts/:workoutId
router.delete("/:workoutId", deleteWorkout);

module.exports = router;
