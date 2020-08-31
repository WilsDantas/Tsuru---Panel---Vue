import axios from 'axios'
import { API_VERSION } from '@/configs/api'

const RESOURCE = 'orders'

export default {
    
    getOrders({ commit }, params) {
        return axios.get(`${API_VERSION}/${RESOURCE}/paginate/${params.per_page}/${params.search}/?page=${params.page}`,)
            .then(response => {
                commit('SET_ORDERS', response.data)
                commit('SET_PAGINATE', response.data.meta)
            })
    },

    getAllOrders({ commit }) {
        return axios.get(`${API_VERSION}/${RESOURCE}`,)
            .then(response => {
                commit('SET_ALL_ORDERS', response.data.data)
            })
    },


    getOrder({ commit }, identify) {
        return axios.get(`${API_VERSION}/${RESOURCE}/${identify}`,)
            .then(response => {
                commit('SET_ORDER', response.data.data)
            })
    },

    editOrder({ commit }, params) {
        return new Promise((resolve, reject) => {
            axios.put(`${API_VERSION}/${RESOURCE}/${params.identify}`, params)
                .then(() => {resolve()})
                .catch(error => reject(error))
        })
    },
}