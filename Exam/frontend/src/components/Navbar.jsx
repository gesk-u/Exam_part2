import { Link, useNavigate } from "react-router-dom";
import { APP_NAME, WORKOUT_NAME, ROUTES, USER_DISPLAY_FIELD } from "../config";
import { getUser, clearUser } from "../utils/api";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    setIsAuthenticated(false);
    navigate(ROUTES.login);
  };

  return (
    <nav className="navbar">
      <Link to={ROUTES.home}><h1>{APP_NAME}</h1></Link>
      <div className="links">
        <Link to={ROUTES.home}>Home</Link>
        {isAuthenticated ? (
          <>
            <Link to={ROUTES.add}>Add {WORKOUT_NAME}</Link>
            <span>{getUser()?.[USER_DISPLAY_FIELD]}</span>
            <button onClick={handleLogout}>Log out</button>
          </>
        ) : (
          <>
            <Link to={ROUTES.login}>Login</Link>
            <Link to={ROUTES.signup}>Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
