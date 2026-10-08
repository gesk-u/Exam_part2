// ===== CHANGE ONLY THESE =====
export const APP_NAME = "My App";
export const WORKOUT_NAME = "Workout";
export const API_URL = "/api/workouts";

export const ROUTES = {
  home: "/",
  details: "/workouts", // details page = /workouts/:id
  add: "/add-workout",
  edit: "/edit-workout", // edit page = /edit-workout/:id
};

export const TITLE_FIELD = "workoutTitle"; // shown as heading
export const LIST_FIELDS = ["description", "price", "location.city", "sessionPrice", "fitnessLevel", "requiredEquipment"]; // shown on Home cards

// type: text (default) | textarea | number | email | date | select | password | tel
// nested fields use dots: "agency.name"
export const FIELDS = [
  { name: "workoutTitle", label: "Title", required: true },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "location.city", label: "City", type: "textarea", required: true },
  { name: "location.state", label: "State", type: "textarea", required: true },
  { name: "sessionPrice", label: "Price", type: "number", min: 0, required: true },
  { name: "fitnessLevel", label: "Difficulty", type: "select", options: ["Beginner", "Intermediate", "Advanced"] },
  { name: "requiredEquipment", label: "RequiredEquipment", type: "textarea", required: true },

  // more examples:
  // { name: "status", label: "Status", type: "select", options: ["available", "sold"] },
  // { name: "deadline", label: "Deadline", type: "date" },
  // { name: "owner.email", label: "Owner Email", type: "email", required: true }, // nested
];

// =============================

/* Workout example:
API_URL = "/api/workouts"; ROUTES.details = "/workouts"; ROUTES.add = "/add-workout"; ROUTES.edit = "/edit-workout";
TITLE_FIELD = "title"; LIST_FIELDS = ["difficulty", "price"];
FIELDS = [
  { name: "title", label: "Title", required: true },
  { name: "difficulty", label: "Difficulty", type: "select", options: ["Beginner", "Intermediate", "Advanced"], required: true },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "price", label: "Price", type: "number", min: 0, required: true },
];
*/

ROUTES.login = "/login";
ROUTES.signup = "/signup";
export const USERS_API = "/api/users";

export const USER_DISPLAY_FIELD = "username"; // shown in Navbar

export const SIGNUP_FIELDS = [
  { name: "username", label: "Username", required: true },
  { name: "name", label: "Name", required: true },
  { name: "phone_number", label: "Phone Number", type: "tel", required: true },
  { name: "password", label: "Password", type: "password", required: true },
  { name: "address", label: "Address", required: true },
  // { name: "role", label: "Role", type: "select", options: ["user", "admin"] },
];

export const LOGIN_FIELDS = [
  { name: "username", label: "Username", required: true },
  { name: "password", label: "Password", type: "password", required: true },
];