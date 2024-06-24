import Product from '@/pages/admin/product';
import Login from '../pages/admin/common/Login';
// import Register from '../pages/admin/common/Register';
import ImagesManage from '@/pages/admin/imagesManage';
import customer from '@/pages/admin/customer';
const path2components = [
    {
        path: '/',
        component: Login
    },
    // {
    //     path: '/login',
    //     component: Login
    // },
    // {
    //     path: '/register',
    //     component: Register
    // },
    {
        path: '/customer/index',
        component: customer
    },
    {
        path: '/product/index',
        component: Product
    },
    {
        path: '/product/image-manange',
        component: ImagesManage
    }
]

export default path2components;