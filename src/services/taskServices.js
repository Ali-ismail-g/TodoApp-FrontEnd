import axios from "axios";
const apiUrl = "http://localhost:5000/api/tasks";

export function getTasks() {
  return axios.get(apiUrl);
}

export function addTasks(task) {
  return axios.post(apiUrl + "/" + "add", task);
}

export function editTask(task) {
  return axios.put(apiUrl + "/" + "edit", task);
}

export function deleteTask(id) {
  return axios.delete(apiUrl + "/" + "delete", id);
}

export function searchForTask(title) {
  return axios.post(apiUrl + "/" + "search", title);
}
