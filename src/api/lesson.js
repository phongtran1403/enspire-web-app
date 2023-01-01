import { axiosService } from "./axiosService";

const lessonApi = {
    getDetail(params) {
        const url = `/course/lesson/detail`;
        return axiosService.get(url, { params });
    },
    getList(id) {
        const url = `course/lesson/${id}`
        return axiosService.get(url)
    },
    add(body) {
        const url = '/course/lesson/save';
        return axiosService.post(url, body);
    },
    update(body) {
        const url = `/course/lesson/update`;
        return axiosService.put(url, body);
    },
    delete(id) {
        const url = `/course/lesson/delete/${id}`
        return axiosService.delete(url)
    }
}

export default lessonApi;