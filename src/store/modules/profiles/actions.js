import axios from 'axios'
import { API_VERSION } from '@/configs/api'

const RESOURCE = 'profiles'

export default {
    getProfiles({ commit }, params) {
        return axios.get(`${API_VERSION}/${RESOURCE}/paginate/${params.per_page}/${params.search}/?page=${params.page}`,)
            .then(response => {
                commit('SET_PROFILES', response.data)
                commit('SET_PAGINATE', response.data.meta)
            })
    },

    getProfile(context, identify) {
        return new Promise((resolve, reject) => {
            axios.get(`${API_VERSION}/${RESOURCE}/${identify}`)
                .then((response) => {
                    context.commit('SET_PROFILE', response.data)
                    resolve()
                })
                .catch(error => reject(error))
        })
    },

    getAllProfiles({ commit }, params) {
        return axios.get(`${API_VERSION}/${RESOURCE}`,)
            .then(response => {
                commit('SET_ALL_PROFILES', response.data)
            })
    },

    editProfile({ commit }, params) {
        return new Promise((resolve, reject) => {
            axios.put(`${API_VERSION}/${RESOURCE}/${params.identify}`, params)
                .then(() => {resolve()})
                .catch(error => reject(error))
        })
    },

    destroyProfile({ commit }, identify) {
        return new Promise((resolve, reject) => {
            axios.delete(`${API_VERSION}/${RESOURCE}/${identify}`)
                .then(() => {resolve()})
                .catch(error => reject(error))
        })
    },

    createProfile({ commit }, params) {
        return new Promise((resolve, reject) => {
            axios.post(`${API_VERSION}/${RESOURCE}`, params)
                .then(() => {resolve()})
                .catch(error => reject(error))
        })
    },

    editProfilePermissions(context, params) {
        return new Promise((resolve, reject) => {
            return axios.put(`${API_VERSION}/${RESOURCE}/AttachPermissions/${params.identify}`, params)
                .then(() => { resolve() })
                .catch(error => reject(error))
        })
    }
}