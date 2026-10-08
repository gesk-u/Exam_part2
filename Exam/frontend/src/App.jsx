import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "./config";
import { getUser } from "./utils/api";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import WorkoutPage from "./pages/WorkoutPage";
import AddWorkoutPage from "./pages/AddWorkoutPage";
import EditWorkoutPage from "./pages/EditWorkoutPage";
import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(getUser()?.token));

  const onlyLoggedIn = (page) => (isAuthenticated ? page : <Navigate to={ROUTES.login} />);
  const onlyLoggedOut = (page) => (isAuthenticated ? <Navigate to={ROUTES.home} /> : page);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <div className="content">
          <Routes>
            <Route path={ROUTES.home} element={<HomePage />} />
            <Route path={`${ROUTES.details}/:id`} element={<WorkoutPage isAuthenticated={isAuthenticated} />} />
            <Route path={ROUTES.add} element={onlyLoggedIn(<AddWorkoutPage />)} />
            <Route path={`${ROUTES.edit}/:id`} element={onlyLoggedIn(<EditWorkoutPage />)} />
            <Route path={ROUTES.login} element={onlyLoggedOut(<AuthPage mode="login" setIsAuthenticated={setIsAuthenticated} />)} />
            <Route path={ROUTES.signup} element={onlyLoggedOut(<AuthPage mode="signup" setIsAuthenticated={setIsAuthenticated} />)} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
