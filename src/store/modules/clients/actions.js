import axios from 'axios'
import { API_VERSION } from '@/configs/api'

const RESOURCE = 'clients'

export default {
    getClients({ commit }, params) {
        return axios.get(`${API_VERSION}/${RESOURCE}/paginate/${params.per_page}/${params.search}/?page=${params.page}`,)
            .then(response => {
                commit('SET_CLIENTS', response.data)
                commit('SET_PAGINATE', response.data.meta)
            })
    },

    getAllClients({ commit }, params) {
        return axios.get(`${API_VERSION}/${RESOURCE}`,)
            .then(response => {
                commit('SET_ALL_CLIENTS', response.data.data)
            })
    },

    createClient({ commit }, params) {
        return new Promise((resolve, reject) => {
            axios.post(`${API_VERSION}/${RESOURCE}`, params)
                .then(() => resolve())
                .catch(error => reject(error))
        })
    },

    getClient({ commit }, identify) {
        return axios.get(`${API_VERSION}/${RESOURCE}/${identify}`,)
            .then(response => {
                commit('SET_CLIENT', response.data)
            })
    },

    editClient({ commit }, params) {
        return new Promise((resolve, reject) => {
            axios.put(`${API_VERSION}/${RESOURCE}/${params.identify}`, params)
                .then(() => {resolve()})
                .catch(error => reject(error))
        })
    },
}