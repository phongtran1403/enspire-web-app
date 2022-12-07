import { axiosService } from "./axiosService";

const blogApi = {
    getDetail(id) {
        const url = `/blog/detail/${id}`;
        return axiosService.get(url);
    },
    getCategoryBlog() {
        const url = 'blog/getCategory'
        return axiosService.get(url)
    },
    getBlogByCate(id) {
        const url = `blog/list/${id}`
        return axiosService.get(url)
    },
    add(body) {
        const url = '/blog/save';
        return axiosService.post(url, body);
    },
    update(id, body) {
        const url = `/blog/update/${id}`;
        return axiosService.put(url, body);
    },
    delete(id) {
        const url = `/blog/delete/${id}`
        return axiosService.delete(url)
    }
}

export default blogApi;