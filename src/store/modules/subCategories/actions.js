import axios from 'axios'
import { API_VERSION } from '@/configs/api'

const RESOURCE = 'subcategories'

export default {
    getSubCategories({ commit }, params) {
        return axios.get(`${API_VERSION}/${RESOURCE}/paginate/${params.per_page}/${params.search}/?page=${params.page}`,)
            .then(response => {
                commit('SET_SUB_CATEGORIES', response.data)
                commit('SET_PAGINATE', response.data.meta)
            })
    },

    getAllSubCategories({ commit }) {
        return axios.get(`${API_VERSION}/${RESOURCE}`,)
            .then(response => {
                commit('SET_ALL_SUB_CATEGORIES', response.data.data)
            })
    },

    getSubCategory({ commit }, identify) {
        return axios.get(`${API_VERSION}/${RESOURCE}/${identify}`,)
            .then(response => {
                commit('SET_SUB_CATEGORY', response.data.data)
            })
    },

    createSubCategory({ commit }, params) {
        return new Promise((resolve, reject) => {
            axios.post(`${API_VERSION}/${RESOURCE}`, params)
                .then(() => resolve())
                .catch(error => reject(error))
        })
    },

    editSubCategory({ commit }, params) {
        return new Promise((resolve, reject) => {
            console.log(params)
            axios.put(`${API_VERSION}/${RESOURCE}/${params.identify}`, params)
                .then(() => resolve())
                .catch(error => reject(error))
        })
    },

    destroySubCategory({ commit }, identify) {
        return new Promise((resolve, reject) => {
            axios.delete(`${API_VERSION}/${RESOURCE}/${identify}`)
                .then(() => {resolve()})
                .catch(error => reject(error))
        })
    },
}