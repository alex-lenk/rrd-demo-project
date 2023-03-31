import httpService from "./http.service";
const API_URL = "/api/auth/";
const signUp = (username, email, password) => {
    return httpService
        .post(API_URL + "signup", {
            username,
            email,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response;
        });
};
const login = (username, password) => {
    return httpService
        .post(API_URL + "login", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response;
        });
};
const logout = () => {
    localStorage.removeItem("user");
};
const authService = {
    signUp,
    login,
    logout,
};
export default authService;
