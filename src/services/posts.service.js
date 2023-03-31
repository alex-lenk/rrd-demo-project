import httpService from "./http.service";
const API_URL = "/api/posts/";
const get = () => {
    return httpService.get(API_URL);
};
const postsService = {
    get,
};

export default postsService;
