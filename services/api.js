import axios from "axios";

const api = axios.create({
  // Usando o seu IP e a porta HTTP que vimos no seu JSON
  baseURL: "http://192.168.0.77:5066", 
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;