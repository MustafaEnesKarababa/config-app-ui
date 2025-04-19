import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7197", 
});

export const getAllConfigs = () => api.get("/GetAllConfig");

export const createConfig = (data) => api.post("/AddConfig", data);

export const updateConfig = (data) => api.put("/UpdateConfig", data);

export const deleteConfig = (id) => api.delete(`/DeleteConfig/${id}`);

export const getConfigById = (id) => api.get(`/GetById/${id}`);

