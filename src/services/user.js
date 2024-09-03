import { http } from "./config";

export default {
  getUserData: (userData) => {
    return http.get("/users/" + userData.id);
  },

  updateUserData: (userData) => {
    return http.put("/users/" + userData.id, userData);
  },

  uploadImageUser: (file) => {
    return http.patch("/users/avatar", file);
  },

  createNewVehicle: (carData) => {
    return http.post("/vehicles", carData);
  },

  updateVehicle: (carData) => {
    return http.put("/vehicles/" + carData.id_user, carData);
  },

  uploadImageCar: (id, file) => {
    return http.patch("/vehicles/avatar/" + id, file);
  },

  createNewStatusRequest: (id_user) => {
    return http.post("/statusRequest/" + id_user);
  },

  createNewPost: (postData) => {
    return http.post("/publications", postData);
  },

  editPost: (postData) => {
    return http.put("/publications/update/" + postData.id_user, postData);
  },

  finishVacanciesPost: (idUser, postData) => {
    return http.put("/publications/update/vacancies/" + idUser, postData);
  },

  cancelPost: (idUser, postData) => {
    return http.put("/publications/update/status/" + idUser, postData);
  },

  getAllPosts: () => {
    return http.get("/publications");
  },

  getAllPostsByIdUser: (idUser) => {
    return http.get("/users/publications/" + idUser);
  },
};
