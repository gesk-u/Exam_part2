


import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { getWorkoutById, deleteWorkout } from "../utils/api";
import { FIELDS, WORKOUT_NAME, ROUTES, TITLE_FIELD } from "../config";
import { formatValue } from "../utils/fields";

const WorkoutPage = ({ isAuthenticated }) => {
  const { workoutId } = useParams();
  const navigate = useNavigate();
  const { data: workout, loading, error } = useFetch(() => getWorkoutById(workoutId), [workoutId]);

  const onDelete = async () => {
    if (!window.confirm(`Delete this ${WORKOUT_NAME}?`)) return;
    try {
      await deleteWorkout(workoutId); // api.js V2 adds the token
      navigate(ROUTES.home);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!workout) return null;

  return (
    <div className="workout-details">
      <h2>{workout[TITLE_FIELD]}</h2>
      {FIELDS.filter((f) => f.name !== TITLE_FIELD).map((f) => (
        <p key={f.name}>{f.label}: {formatValue(workout, f)}</p>
      ))}
      {isAuthenticated && (
        <>
          <button onClick={() => navigate(`${ROUTES.edit}/${id}`)}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default WorkoutPage;

