import API from "./api";

export const getDonors = () => API.get("/donors");

export const addDonor = (data) =>
  API.post("/donors", data);

export const updateDonor = (id, data) =>
  API.put(`/donors/${id}`, data);

export const deleteDonor = (id) =>
  API.delete(`/donors/${id}`);

export const searchDonors = (group) =>
  API.get(`/donors/search?bloodGroup=${group}`);

export const nearbyDonors = (lat, lon) =>
  API.get(`/donors/nearby?lat=${lat}&lon=${lon}`);