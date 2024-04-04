import axios from "axios";

export const mockApi = axios.create({
  baseURL: "/mock",
  headers: {
    "Content-type": "application/json",
  },
});
