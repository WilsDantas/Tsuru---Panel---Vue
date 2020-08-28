import Vue from 'vue'
import Vuex from 'vuex'

import products from './modules/products'
import auth from './modules/auth'
import paginate from './modules/paginate'


Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        products,
        paginate,
        auth,
    }
})


export default store