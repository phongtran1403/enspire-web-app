import { axiosService } from "./axiosService";

const blogApi = {
    getDetail(id) {
        const url = `/blog/id/${id}`;
        return axiosService.get(url);
    },
    add(body) {
        const url = '/blog';
        return axiosService.post(url, body);
    },
    update(body) {
        const url = '/blog';
        return axiosService.post(url, body);
    },
}

export default blogApi;