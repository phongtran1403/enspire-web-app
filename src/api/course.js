import { axiosService } from "./axiosService";

const courseApi = {
    getDetail(id) {
        const url = `/course/detail/${id}`;
        return axiosService.get(url);
    },
    getListCategory() {
        const url = 'course/category/list'
        return axiosService.get(url)
    },
    getListCourseByCate(idCategory) {
        const url = `course/byCate/`
        return axiosService.get(url, { params: { idCategory } })
    },
    add(body) {
        const url = '/course/save';
        return axiosService.post(url, body);
    },
    update(id, body) {
        const url = `/course/update/${id}`;
        return axiosService.put(url, body);
    },
    delete(id) {
        const url = `/course/delete/${id}`
        return axiosService.delete(url)
    }
}

export default courseApi;