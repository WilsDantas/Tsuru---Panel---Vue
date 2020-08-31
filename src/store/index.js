import Vue from 'vue'
import Vuex from 'vuex'

import products from './modules/products'
import auth from './modules/auth'
import brands from './modules/brands'
import clients from './modules/clients'
import users from './modules/users'
import orders from './modules/orders'
import profiles from './modules/profiles'
import subcategories from './modules/subCategories'
import categories from './modules/categories'
import paginate from './modules/paginate'


Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        products,
        paginate,
        auth,
        orders,
        categories,
        subcategories,
        brands,
        profiles,
        clients,
        users,
    }
})


export default store