import axios from 'axios'
import { API_VERSION } from '@/configs/api'

const RESOURCE = 'brands'

export default {
    getAllBrands({ commit }) {
        return axios.get(`${API_VERSION}/${RESOURCE}`,)
            .then(response => {
                commit('SET_ALL_BRANDS', response.data.data)
            })
    },

    getBrands({ commit }, params) {
        return axios.get(`${API_VERSION}/${RESOURCE}/paginate/${params.per_page}/${params.search}/?page=${params.page}`,)
            .then(response => {
                commit('SET_BRANDS', response.data)
                commit('SET_PAGINATE', response.data.meta)
            })
    },

    getBrand({ commit }, identify) {
        return axios.get(`${API_VERSION}/${RESOURCE}/${identify}`,)
            .then(response => {
                commit('SET_BRAND', response.data)
            })
    },

    editBrand({ commit }, params) {
        return new Promise((resolve, reject) => {
            axios.put(`${API_VERSION}/${RESOURCE}/${params.identify}`, params)
                .then(() => {resolve()})
                .catch(error => reject(error))
        })
    },
}