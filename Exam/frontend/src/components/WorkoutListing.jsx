import { Link } from "react-router-dom";
import { FIELDS, LIST_FIELDS, ROUTES, TITLE_FIELD } from "../config";
import { formatValue } from "../utils/fields";

const WorkoutListing = ({ workout }) => (
  <div className="workout-preview">
    <Link to={`${ROUTES.details}/${workout.workoutId}`}>
      <h2>{workout[TITLE_FIELD]}</h2>
    </Link>
    {FIELDS.filter((f) => LIST_FIELDS.includes(f.name)).map((f) => (
      <p key={f.name}>{f.label}: {formatValue(workout, f)}</p>
    ))}
  </div>
);

export default WorkoutListing;