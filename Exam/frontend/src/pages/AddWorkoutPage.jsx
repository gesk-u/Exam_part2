import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddWorkoutPage = () => {
  const navigate = useNavigate();
  const [workoutTitle, setWorkoutTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [sessionPrice, setSessionPrice] = useState("");
  const [fitnessLevel, setFitnessLevel] = useState("Beginner");
  const [requiredEquipment, setRequiredEquipment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newWorkout = {
      workoutTitle,
      description,
      location: { city, state },
      sessionPrice: Number(sessionPrice),
      fitnessLevel,
      requiredEquipment,
    };
    const res = await fetch("/api/workouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newWorkout),
    });
    if (res.ok) {
      navigate("/");
    }
  };

  return (
    <div className="create">
      <h2>Add a New Workout</h2>
      <form onSubmit={handleSubmit}>
        <label>Workout Title:</label>
        <input
          type="text"
          value={workoutTitle}
          onChange={(e) => setWorkoutTitle(e.target.value)}
          required
        />
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label>City:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <label>State:</label>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
        <label>Session Price:</label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={sessionPrice}
          onChange={(e) => setSessionPrice(e.target.value)}
          required
        />
        <label>Fitness Level:</label>
        <select
          value={fitnessLevel}
          onChange={(e) => setFitnessLevel(e.target.value)}
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <label>Required Equipment:</label>
        <input
          type="text"
          value={requiredEquipment}
          onChange={(e) => setRequiredEquipment(e.target.value)}
          required
        />
        <button type="submit">Add Workout</button>
      </form>
    </div>
  );
};

export default AddWorkoutPage;
