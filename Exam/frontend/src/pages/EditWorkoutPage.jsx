import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import WorkoutForm from "../components/WorkoutForm";
import { getWorkoutById, updateWorkout } from "../utils/api";
import { toFormValues } from "../utils/fields";
import { WORKOUT_NAME, ROUTES } from "../config";

const EditWorkoutPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: workout, loading, error } = useFetch(() => getWorkoutById(id), [id]);

  const handleSubmit = async (data) => {
    await updateWorkout(id, data);
    navigate(`${ROUTES.details}/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="create">
      <h2>Update {WORKOUT_NAME}</h2>
      <WorkoutForm initialValues={toFormValues(workout)} submitLabel="Update" onSubmit={handleSubmit} />
    </div>
  );
};

export default EditWorkoutPage;
