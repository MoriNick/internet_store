import { ADMIN_ROUTE, REGISTRATION_ROUTE, LOGIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, SHOP_ROUTE } from './utils/consts';
import Admin from './pages/Admin';
import Auth from './pages/Auth';
import Basket from './pages/Basket';
import DevicePage from './pages/DevicePage';
import Shop from './pages/Shop';


export const authRoutes = [
    {
        path: BASKET_ROUTE,
        Component: <Basket />
    }
]

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <Admin />
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: <Auth />
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <Auth />
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: <DevicePage />
    },
    {
        path: SHOP_ROUTE,
        Component: <Shop />
    }
]