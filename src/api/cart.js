import { getUser } from "utils/";
import { axiosService } from "./axiosService";

const cartApi = {
    getAll() {
        const idUser = getUser().userId
        const url = 'order/cart/list';
        return axiosService.get(url, { params: { idUser } });
    },
    add(body) {
        const url = 'order/cart/add';
        return axiosService.post(url, body);
    },
    update(body) {
        const url = `order/cart/update`;
        return axiosService.put(url, body);
    },
    delete(id) {
        const url = `order/cart/delete/${id}`
        return axiosService.delete(url)
    }
}

export default cartApi;