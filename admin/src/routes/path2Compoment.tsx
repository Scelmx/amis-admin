import Product from '@/pages/admin/product';
import Login from '../pages/admin/common/Login';
// import Register from '../pages/admin/common/Register';
import ImagesManage from '@/pages/admin/imagesManage';
import customer from '@/pages/admin/customer';
import Orders from '@/pages/admin/orders';
import Mold from '@/pages/admin/molds';
import { ProduceDispatch } from '@/pages/admin/produceDispatch';
import MoldsOther from '@/pages/admin/moldsOther';
import MusicPlayer from '@/pages/admin/music';

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
        path: '/molds/index',
        component: Mold,
    },
    {
        path: "/molds-other/index",
        component: MoldsOther
    },
    {
        path: '/product/image-manange',
        component: ImagesManage
    },
    {
        path: '/produce-plan/orders',
        component: Orders,
    },
    {
        path: '/produce-plan/index',
        component: ProduceDispatch
    },
    // 隐蔽的音乐播放器路由 - 使用一个不容易被发现的路径
    {
        path: '/system/audio/player',
        component: MusicPlayer
    }
]

export default path2components;