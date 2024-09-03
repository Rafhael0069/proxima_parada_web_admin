import { http } from "./config";

export default {
  signinUser: (userAuth) => {
    return http.post("/user/session", userAuth);
  },

  signinAdmin: (adminAuth) => {
    return http.post("/admin/session", adminAuth);
  },


  signupUser: (userData) => {
    return http.post("/users", userData);
  },

  logout: () => {
    return http.post("/sessions/logout");
  },

  resume: () => {
    return http.post("/sessions/resume");
  },
};
