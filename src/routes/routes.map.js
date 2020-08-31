import login from '@/pages/Auth/Login'
import register from '@/pages/Auth/Register'

import dashboard from '@/pages/dashboard'
import products from '@/pages/products'
import productsCreate from '@/pages/products/create'

import categories from '@/pages/categories'
import categoriesCreate from '@/pages/categories/create'
import categoriesEdit from '@/pages/categories/edit'

import profiles from '@/pages/profiles'
import profilesCreate from '@/pages/profiles/create'
import profilesEdit from '@/pages/profiles/edit'

import clients from '@/pages/clients'
import clientsEdit from '@/pages/clients/edit'

import orders from '@/pages/orders'
import ordersEdit from '@/pages/orders/edit'

import brands from '@/pages/brands'
import brandsCreate from '@/pages/brands/create'
import brandsEdit from '@/pages/brands/edit'

import subcategories from '@/pages/subcategories'
import subcategoriesCreate from '@/pages/subcategories/create'
import subcategoriesEdit from '@/pages/subcategories/edit'

import users from '@/pages/users'
import usersCreate from '@/pages/users/create'
import usersEdit from '@/pages/users/edit'


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
            },
            {
                path: '/products/create',
                component: productsCreate,
                name: 'products.create',
                meta: {
                    title: 'Tsuru - Product Registration'
                }
            },

            //Categories
            {
                path: '/categories',
                component: categories,
                name: 'categories.index',
                meta: {
                    title: 'Tsuru - Categories'
                }
            },
            {
                path: '/categories/create',
                component: categoriesCreate,
                name: 'categories.create',
                meta: {
                    title: 'Tsuru - Category Registration'
                }
            },
            {
                path: '/categories/edit/:identify',
                component: categoriesEdit,
                name: 'categories.edit',
                props: true,
                meta: {
                    title: 'Tsuru - Category Edit'
                }
            },

            //SubCategories
            {
                path: '/subcategories',
                component: subcategories,
                name: 'subcategories.index',
                meta: {
                    title: 'Tsuru - Sub Categories'
                }
            },
            {
                path: '/subcategories/create',
                component: subcategoriesCreate,
                name: 'subcategories.create',
                meta: {
                    title: 'Tsuru - Sub Category Registration'
                }
            },
            {
                path: '/subcategories/edit/:identify',
                component: subcategoriesEdit,
                name: 'subcategories.edit',
                props: true,
                meta: {
                    title: 'Tsuru - Sub Category Edit'
                }
            },

            //Users

            {
                path: '/users',
                component: users,
                name: 'users.index',
                meta: {
                    title: 'Tsuru - Users'
                }
            },
            {
                path: '/users/create',
                component: usersCreate,
                name: 'users.create',
                meta: {
                    title: 'Tsuru - User Registration'
                }
            },
            {
                path: '/users/edit/:identify',
                component: usersEdit,
                name: 'users.edit',
                props: true,
                meta: {
                    title: 'Tsuru - User Edit'
                }
            },

            //Profiles

            {
                path: '/profiles',
                component: profiles,
                name: 'profiles.index',
                meta: {
                    title: 'Tsuru - Profiles'
                }
            },
            {
                path: '/profiles/create',
                component: profilesCreate,
                name: 'profiles.create',
                meta: {
                    title: 'Tsuru - Profile Registration'
                }
            },
            {
                path: '/profiles/edit/:identify',
                component: profilesEdit,
                name: 'profiles.edit',
                props: true,
                meta: {
                    title: 'Tsuru - Profile Edit'
                }
            },

            //Brands

            {
                path: '/brands',
                component: brands,
                name: 'brands.index',
                meta: {
                    title: 'Tsuru - Brands'
                }
            },
            {
                path: '/brands/create',
                component: brandsCreate,
                name: 'brands.create',
                meta: {
                    title: 'Tsuru - Brand Registration'
                }
            },
            {
                path: '/brands/edit/:identify',
                component: brandsEdit,
                name: 'brands.edit',
                props: true,
                meta: {
                    title: 'Tsuru - Brand Edit'
                }
            },

            //Clients

            {
                path: '/clients',
                component: clients,
                name: 'clients.index',
                meta: {
                    title: 'Tsuru - Clients'
                }
            },
            {
                path: '/clients/edit/:identify',
                component: clientsEdit,
                name: 'clients.edit',
                props: true,
                meta: {
                    title: 'Tsuru - Client Edit'
                }
            },

            //Clients

            {
                path: '/orders',
                component: orders,
                name: 'orders.index',
                meta: {
                    title: 'Tsuru - Orders'
                }
            },
            {
                path: '/orders/edit/:identify',
                component: ordersEdit,
                name: 'orders.edit',
                props: true,
                meta: {
                    title: 'Tsuru - Order Edit'
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