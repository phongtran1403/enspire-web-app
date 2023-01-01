import { getUser } from "utils/";
import { axiosService } from "./axiosService";

const orderApi = {
    getAll() {
        const url = 'order/list';
        return axiosService.get(url);
    },
    getByUser() {
        const idUser = getUser().userId
        const url = 'order/list';
        return axiosService.get(url, { params: { idUser } });
    },
    add(body) {
        const url = 'order/add';
        return axiosService.post(url, body);
    },
    updateStatus(body) {
        const url = `order/change/status/`;
        return axiosService.put(url, body);
    },
}

export default orderApi;