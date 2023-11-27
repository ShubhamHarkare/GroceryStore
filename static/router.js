import Home from './components/Home.js'
import Login from './components/Login.js'
import Users from './components/Users.js'
import AddProduct from './components/AddProduct.js'
import UpdateProduct from './components/UpdateProduct.js'
import CreateSection from './components/CreateSection.js'
import UpdateSection from './components/UpdateSection.js'
import Cart from './components/Cart.js'
import Sections from './components/Sections.js'
const routes = [
    {
        path:'/',
        name:'Home',
        component: Home
    },
    {
        path:'/login',
        name:'Login',
        component: Login
    },
    {
        path:'/users',
        name: 'User',
        component: Users
    },
    {
        path: '/add-product',
        name: 'AddProduct',
        component: AddProduct
    },
    {
        path: '/update-product',
        name: 'UpdateProduct',
        component: UpdateProduct
    },
    {
        path: '/create-section',
        name: "CreateSection",
        component: CreateSection
    },
    {
        path: '/update-section',
        name: 'UpdateSection',
        component: UpdateSection
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart
    },
    {
        path:'/approve-sections',
        name: 'Sections',
        component: Sections
    }
] 

export default new VueRouter({
    routes,
})