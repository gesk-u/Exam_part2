import { useNavigate } from "react-router-dom";
import WorkoutForm from "../components/WorkoutForm";
import { createWorkout } from "../utils/api";
import { WORKOUT_NAME, ROUTES } from "../config";

const AddWorkoutPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (workout) => {
    await createWorkout(workout);
    navigate(ROUTES.home);
  };

  return (
    <div className="create">
      <h2>Add a New {WORKOUT_NAME}</h2>
      <WorkoutForm submitLabel={`Add ${WORKOUT_NAME}`} onSubmit={handleSubmit} />
    </div>
  );
};

export default AddWorkoutPage;