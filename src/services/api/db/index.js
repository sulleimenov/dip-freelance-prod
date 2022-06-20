import axios from "axios";

const db = axios.create({
  baseURL: "http://localhost:8000",
});

export default db;
