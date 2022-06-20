import axios from "axios";

const db = axios.create({
  baseURL: "http://localhost:3001",
  // baseURL: "https://freelance-student-job.herokuapp.com",
});

export default db;
