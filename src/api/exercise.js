import { axiosService } from "./axiosService";

const exerciseApi = {
    getList(id) {
        const url = `course/ex/${id}`
        return axiosService.get(url)
    },
    add(body) {
        const url = '/course/ex/save';
        return axiosService.post(url, body);
    },
    update(body) {
        const url = `/course/ex/update`;
        return axiosService.put(url, body);
    },
    delete(id) {
        const url = `/course/ex/delete/${id}`
        return axiosService.delete(url)
    }
}

export default exerciseApi;