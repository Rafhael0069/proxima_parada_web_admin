import { http } from "./config";

export default {
  postNewAdmin: (adminData) => {
    return http.post("/admin", adminData);
  },

  getAllUsers: () => {
    return http.get("/admin/users");
  },

  getStatistics: () => {
    return http.get("/admin/statistics");
  },

  getAllStatusRequest: () => {
    return http.get("/admin/statusRequest");
  },

  updateStatusRequest: (data) => {
    return http.put("/admin/statusRequest/" + data.id, data);
  },
};
