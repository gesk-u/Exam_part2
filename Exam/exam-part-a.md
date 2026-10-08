# Exam: Part A: Web Development Course (2 hours, 270 points)


## Overview

You are given a [starter code for a Workout listing application.](https://github.com/tx00-web-en/Exam) Some parts are already implemented and working:

**Already working:**
- Backend: `getAllWorkouts` (GET /api/workouts) and `createWorkout` (POST /api/workouts)
- Backend: `signup` (POST /api/users/signup) and `login` (POST /api/users/login)
- Backend: `requireAuth` middleware in `middleware/requireAuth.js`
- Frontend: Home page lists workouts fetched from the API
- Frontend: Add Workout page creates a workout via POST
- Frontend: `useLogin` and `useSignup` hooks in `hooks/` folder

**Your job:** *Clone the starter repository* and implement the remaining features described in Sections 1–3 below.

---

## Section 1: Backend Controllers (85 points)

### Q1: Get Workout by ID (30 pts)

Implement `getWorkoutById` in `backend/controllers/workoutControllers.js`.

- Find the workout using `req.params.workoutId`
- Return the workout as JSON
- Return **404** with `{ error: "Workout not found" }` if no workout is found

**Commit your changes** with message: `Q1: Implement getWorkoutById`

### Q2: Delete Workout (25 pts)

Implement `deleteWorkout` in `backend/controllers/workoutControllers.js`.

- Delete the workout by `req.params.workoutId`
- Return the deleted workout as JSON
- Return **404** with `{ error: "Workout not found" }` if no workout is found

**Commit your changes** with message: `Q2: Implement deleteWorkout`

### Q3: Update Workout (30 pts)

Implement `updateWorkout` in `backend/controllers/workoutControllers.js`.

- Update the workout by `req.params.workoutId` using `req.body`
- Use options `{ new: true, runValidators: true }`
- Return the updated workout as JSON
- Return **404** with `{ error: "Workout not found" }` if no workout is found

**Commit your changes** with message: `Q3: Implement updateWorkout`

---

## Section 2: Frontend Pages (115 points)

### Q4: Workout Detail Page (40 pts)

Implement the `WorkoutPage` component in `frontend/src/pages/WorkoutPage.jsx`.

Requirements:
- Use `useParams()` to get the workout ID from the URL
- Fetch the workout from `/api/workouts/:id` when the component mounts
- Display **all** workout fields:
  - workoutTitle, description
  - City, state
  - Session price, fitness level, status
  - Required equipment
- Add a **Delete** button that:
  - Sends a DELETE request to `/api/workouts/:id`
  - Navigates to `"/"` on success
- Add an **Edit** link that navigates to `/edit-workout/:id`

**Commit your changes** with message: `Q4: Implement WorkoutPage`

### Q5: Edit Workout Page (40 pts)

Implement the `EditWorkoutPage` component in `frontend/src/pages/EditWorkoutPage.jsx`.

Requirements:
- Use `useParams()` to get the workout ID from the URL
- Fetch the existing workout and **pre-fill** all form fields (use the Add Workout page as reference for the form structure)
- Extract location values from fetched data: `data.location.city`, `data.location.state`
- On submit: send a **PUT** request to `/api/workouts/:id` with the updated data
- Build the request body with the same structure as the Add Workout page
- Navigate to `/workouts/:id` on success

**Commit your changes** with message: `Q5: Implement EditWorkoutPage`

### Q6: Signup Page (35 pts)

Implement the `SignupPage` component in `frontend/src/pages/SignupPage.jsx`.

A `useSignup` hook is provided in `hooks/useSignup.jsx`. Study it before starting.

Requirements:
- Import and use the `useSignup` hook
- Create state for all required user fields: `name`, `username`, `password`, `phone_number`, `address`
- On form submit, call `signup({ name, username, password, phone_number, address })`
- Display the error from the hook if present (red text)
- Disable the submit button while `isLoading` is true
- Navigate to `"/"` on successful signup
- The form should have:
  - Name text input (required)
  - Username text input (required)
  - Password input (required)
  - Phone Number text input (required)
  - Address text input (required)
  - Submit button with text "Sign Up"

**Commit your changes** with message: `Q6: Implement SignupPage`

---

## Section 3: Authentication & Protection (70 points)

### Q7: Protect Backend Routes (35 pts)

A `requireAuth` middleware is already provided in `backend/middleware/requireAuth.js`. Study it to understand what it does.

In `backend/routes/workoutRouter.js`, add the `requireAuth` middleware to protect the following routes:
- POST `/` (createWorkout)
- PUT `/:workoutId` (updateWorkout)
- DELETE `/:workoutId` (deleteWorkout)

Leave GET routes **unprotected** (anyone can read workouts).

You will need to import `requireAuth` from the middleware file.

**Commit your changes** with message: `Q7: Protect backend routes`

### Q8: Conditional Navbar & Frontend Auth (35 pts)

Update the `Navbar` component in `frontend/src/components/Navbar.jsx` to show different links based on whether the user is logged in.

The `useLogin` and `useSignup` hooks save `user` and `token` to localStorage. Use this to determine login state.

Requirements:
- Check `localStorage` for a saved user/token
- **When logged in**, the Navbar should show:
  - Home link
  - Add Workout link
  - A **Logout** button that clears localStorage and navigates to `"/"`
  - The logged-in user's name (e.g., `Welcome, {name}`)
- **When not logged in**, the Navbar should show:
  - Home link
  - Signup link
  - Login link
- Also update the **AddWorkoutPage** to include the Authorization header in the POST request:
  ```js
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
  }
  ```

**Commit your changes** with message: `Q8: Conditional Navbar and frontend auth`


---

## Summary

| Question | Topic | Points |
|----------|-------|--------|
| Q1 | getWorkoutById | 30 |
| Q2 | deleteWorkout | 25 |
| Q3 | updateWorkout | 30 |
| Q4 | WorkoutPage (detail + delete + edit) | 40 |
| Q5 | EditWorkoutPage (fetch + form + PUT) | 40 |
| Q6 | SignupPage (useSignup hook) | 35 |
| Q7 | Protect backend routes | 35 |
| Q8 | Conditional Navbar + frontend auth | 35 |
| **Total** | | **270** |
