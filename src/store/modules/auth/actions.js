import axios from 'axios'
import { API_VERSION , TOKEN_NAME} from '@/configs/api'

export default {
    login(context, params) {
        return new Promise((resolve, reject) => {
            axios.post(`${API_VERSION}/auth`, params)
                .then(response => {
                    context.commit('AUTH_USER_OK', response.data.user)
                    const token = response.data.token
                    localStorage.setItem(TOKEN_NAME, token)
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                    axios.defaults.headers.common['content-type'] = `multipart/forma-data`
                    resolve()
                }).catch(error => reject(error))
        })
    },
    checkLogin(context) {
        return new Promise((resolve, reject) => {
            const token = localStorage.getItem(TOKEN_NAME)
                if (!token) {
                    return reject()
            } else {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                axios.defaults.headers.common['content-type'] = `multipart/forma-data`
                axios.get(`${API_VERSION}/me`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(response => {
                        context.commit('AUTH_USER_OK', response.data.data)
                        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                        resolve()
                    })
                    .catch(error => reject(error))
            }
        })
    },
    logout(context) {
        return new Promise((resolve, reject) => {
            const token = localStorage.getItem(TOKEN_NAME)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            if (!token) {
                return reject()
            } else {
                axios.get(`${API_VERSION}/logout`, {})
                    .then(() => {
                        localStorage.removeItem(TOKEN_NAME)
                        resolve()
                    })
            }
        })
    }
}