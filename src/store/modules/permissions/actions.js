import axios from 'axios'
import { API_VERSION } from '@/configs/api'

const RESOURCE = 'permissions'

export default {

    getAllPermissions({ commit }, params) {
        return axios.get(`${API_VERSION}/${RESOURCE}`,)
            .then(response => {
                commit('SET_ALL_PERMISSIONS', response.data.data)
            })
    },
}