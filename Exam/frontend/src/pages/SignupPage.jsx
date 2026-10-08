import useField from "../hooks/useField";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Signup = ({ setIsAuthenticated }) => {
  const { authenticate, isLoading, error } = useAuth("/api/users/signup")
  const name = useField("text")
  const username = useField("text");
  const password = useField("password");
  const phone_number = useField("tel");
  const address = useField("text");

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    const user = await authenticate({name, email, password});
    if (user) {
      setIsAuthenticated(true);
      navigate("/");
    }}

  return (
    <div className="create">
      <h2>Create an Account</h2>

      <form onSubmit={submitForm}>
        <label htmlFor="username">Username:</label>
        <input id="username" {...username} required />

        <label htmlFor="name">Name:</label>
        <input id="name" {...name} required />

        <label htmlFor="phone_number">Phone Number:</label>
        <input id="phone_number" {...phone_number} required />

        <label htmlFor="password">Password:</label>
        <input id="password" {...password} required />

        <label htmlFor="address">Phone Number:</label>
        <input id="address" {...address} required />

        <button>Sign Up</button>
        {error && <p className="error">{error}</p>}
      </form>

      <p>
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default Signup;


