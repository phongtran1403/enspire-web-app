import { axiosService } from "./axiosService";

const courseApi = {
    getDetail(params) {
        const url = `/course/detail`;
        return axiosService.get(url, { params });
    },
    getListCategory() {
        const url = 'course/category/list'
        return axiosService.get(url)
    },
    getListCourseByCate(idCategory) {
        const url = `course/byCate/`
        return axiosService.get(url, { params: { idCategory } })
    },
    search(params) {
        const url = 'course/search'
        return axiosService.get(url, { params })
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