import axios from "axios";

const db = axios.create({
  baseURL: "https://freelance-student-job.herokuapp.com",
});

export default db;
