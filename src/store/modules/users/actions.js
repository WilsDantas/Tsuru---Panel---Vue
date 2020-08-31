import axios from 'axios'
import { API_VERSION } from '@/configs/api'

const RESOURCE = 'users'

export default {
    getUsers({ commit }, params) {
        return axios.get(`${API_VERSION}/${RESOURCE}/paginate/${params.per_page}/${params.search}/?page=${params.page}`,)
            .then(response => {
                commit('SET_USERS', response.data)
                commit('SET_PAGINATE', response.data.meta)
            })
    },

    getUser({ commit }, identify) {
        return axios.get(`${API_VERSION}/${RESOURCE}/${identify}`,)
            .then(response => {
                commit('SET_USER', response.data.data)
            })
    },

    createUser({ commit }, params) {
        return new Promise((resolve, reject) => {
            axios.post(`${API_VERSION}/${RESOURCE}`, params)
                .then(() => resolve())
                .catch(error => reject(error))
        })
    },

    editUser({ commit }, params) {
        return new Promise((resolve, reject) => {
            axios.put(`${API_VERSION}/${RESOURCE}/${params.identify}`, params)
                .then(() => {resolve()})
                .catch(error => reject(error))
        })
    },
}