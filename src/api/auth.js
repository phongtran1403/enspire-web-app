import { axiosService } from "./axiosService";

const authApi = {
    login(body) {
        const url = '/login';
        return axiosService.post(url, body);
    },
    register(body) {
        const url = '/register';
        return axiosService.post(url, body);
    }
}

export default authApi;