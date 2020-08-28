import login from '@/pages/Auth/Login'
import register from '@/pages/Auth/Register'

import dashboard from '@/pages/dashboard'
import products from '@/pages/products'

const routes = [
    {
        path: '/',
        component: () => import('@/layouts/DefaultTemplate'),
        children: [
            {
                path: '/',
                component: dashboard,
                name: 'dashboard',
                meta: {
                    title: 'Dashboard - Tsuru'
                }
            },
            {
                path: '/products',
                component: products,
                name: 'products.index',
                meta: {
                    title: 'Tsuru - Products'
                }
            }
        ],
    },
    {
        path: '/',
        component: () => import('@/layouts/AuthTemplate'),
        children: [
            {
                path: '/login',
                component: login,
                name: 'login',
                meta: {
                    title: 'Login - Tsuru'
                }
            },
            {
                path: '/register',
                component: register,
                name: 'register',
                meta: {
                    title: 'Register - Tsuru'
                }
            }
        ]
    }
]


export default routes