import axios from 'axios'
import { API_VERSION } from '@/configs/api'

const RESOURCE = 'products'

export default {
    getProducts({ commit }, params) {
        return axios.get(`${API_VERSION}/${RESOURCE}/paginate/${params.per_page}/${params.search}/?page=${params.page}`,)
            .then(response => {
                commit('SET_PRODUCTS', response.data)
                commit('SET_PAGINATE', response.data.meta)
            })
    },
}