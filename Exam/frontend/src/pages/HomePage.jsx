import useFetch from "../hooks/useFetch";
import { getAllWorkouts } from "../utils/api";
import WorkoutListing from "../components/WorkoutListing";

const HomePage = () => {
  const { data: workouts, loading, error } = useFetch(getAllWorkouts);

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>}
      {workouts && workouts.map((workout) => <WorkoutListing key={workout._id} workout={workout} />)}
    </div>
  );
};

export default HomePage;