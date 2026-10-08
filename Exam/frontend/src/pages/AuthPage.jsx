import { useNavigate, Link } from "react-router-dom";
import WorkoutForm from "../components/WorkoutForm";
import { login, signup, saveUser } from "../utils/api";
import { LOGIN_FIELDS, SIGNUP_FIELDS, ROUTES } from "../config";

const AuthPage = ({ mode, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const isLogin = mode === "login";

  const handleSubmit = async (data) => {
    const user = isLogin ? await login(data) : await signup(data);
    saveUser(user); // includes token
    setIsAuthenticated(true);
    navigate(ROUTES.home);
  };

  return (
    <div className="create">
      <h2>{isLogin ? "Login" : "Create an Account"}</h2>
      <WorkoutForm
        key={mode}
        fields={isLogin ? LOGIN_FIELDS : SIGNUP_FIELDS}
        submitLabel={isLogin ? "Login" : "Sign up"}
        onSubmit={handleSubmit}
      />
      <p>
        {isLogin ? "No account? " : "Already have an account? "}
        <Link to={isLogin ? ROUTES.signup : ROUTES.login}>{isLogin ? "Sign up" : "Login"}</Link>
      </p>
    </div>
  );
};

export default AuthPage;
