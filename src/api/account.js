import { axiosService } from "./axiosService";

const accountApi = {
    getAll(params) {
        const url = `/user`;
        return axiosService.get(url, { params });
    },
    getAccByUsername(params) {
        const url = `/user/info`;
        return axiosService.get(url, { params });
    },
    getAllStaff(id) {
        const url = `/user/staff/${id}`;
        return axiosService.get(url);
    },
    changePassword(body) {
        const url = `/user/change-password`;
        return axiosService.post(url, body);
    },
    addAccount(body) {
        const url = '/user/register';
        return axiosService.post(url, body);
    },
    editAccount(body) {
        const url = '/user/update';
        return axiosService.put(url, body);
    },
    deleteAccount(id) {
        const url = `/user/${id}`;
        return axiosService.delete(url);
    }
}

export default accountApi;