import axios from 'axios'
import { API_VERSION } from '@/configs/api'

const RESOURCE = 'categories'

export default {
    getCategories({ commit }, params) {
        return axios.get(`${API_VERSION}/${RESOURCE}/paginate/${params.per_page}/${params.search}/?page=${params.page}`,)
            .then(response => {
                commit('SET_CATEGORIES', response.data)
                commit('SET_PAGINATE', response.data.meta)
            })
    },

    getAllCategories({ commit }, params) {
        return axios.get(`${API_VERSION}/${RESOURCE}`,)
            .then(response => {
                commit('SET_ALL_CATEGORIES', response.data.data)
            })
    },

    createCategory({ commit }, params) {
        return new Promise((resolve, reject) => {
            axios.post(`${API_VERSION}/${RESOURCE}`, params)
                .then(() => resolve())
                .catch(error => reject(error))
        })
    },

    getCategory({ commit }, identify) {
        return axios.get(`${API_VERSION}/${RESOURCE}/${identify}`,)
            .then(response => {
                commit('SET_CATEGORY', response.data)
            })
    },

    editCategory({ commit }, params) {
        return new Promise((resolve, reject) => {
            axios.put(`${API_VERSION}/${RESOURCE}/${params.identify}`, params)
                .then(() => {resolve()})
                .catch(error => reject(error))
        })
    },

    destroyCategory({ commit }, identify) {
        return new Promise((resolve, reject) => {
            axios.delete(`${API_VERSION}/${RESOURCE}/${identify}`)
                .then(() => {resolve()})
                .catch(error => reject(error))
        })
    },
}