import { API_URL, USERS_API } from "../config";

export const getUser = () => JSON.parse(localStorage.getItem("user"));
export const saveUser = (user) => localStorage.setItem("user", JSON.stringify(user));
export const clearUser = () => localStorage.removeItem("user");

const request = async (url, method = "GET", body) => {
  const headers = { "Content-Type": "application/json" };
  const token = getUser()?.token;
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const data = res.status === 204 ? null : await res.json();
  if (!res.ok) throw new Error(data?.error || data?.message || `Request failed (${res.status})`);
  return data;
};

export const getAllWorkouts = () => request(API_URL);
export const getWorkoutById = (id) => request(`${API_URL}/${id}`);
export const createWorkout = (item) => request(API_URL, "POST", item);
export const updateWorkout = (id, item) => request(`${API_URL}/${id}`, "PUT", item);
export const deleteWorkout = (id) => request(`${API_URL}/${id}`, "DELETE");

export const signup = (data) => request(`${USERS_API}/signup`, "POST", data);
export const login = (data) => request(`${USERS_API}/login`, "POST", data);

