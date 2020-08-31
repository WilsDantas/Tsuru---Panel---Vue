import axios from 'axios'
import { API_VERSION } from '@/configs/api'

const RESOURCE = 'products'

const CONFIGS = {
    headers: {
        'content-type': 'multipart/forma-data'
    }
}

export default {
    getProducts({ commit }, params) {
        return axios.get(`${API_VERSION}/${RESOURCE}/paginate/${params.per_page}/${params.search}/?page=${params.page}`,)
            .then(response => {
                commit('SET_PRODUCTS', response.data)
                commit('SET_PAGINATE', response.data.meta)
            })
    },

    createProduct({ commit }, params) {
        return new Promise((resolve, reject) => {
            axios.post(`${API_VERSION}/${RESOURCE}`, params)
                .then(() => resolve())
                .catch(error => reject(error))
        })
    },
}