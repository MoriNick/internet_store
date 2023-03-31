import {$authHost, $host} from './index';

export const fetchDevicesFromBasket = async (basketId) => {
    const data = $host.get('/api/basket', {params: {basketId}});
    return data;
}

export const pushDeviceToBasket = async (basketId, deviceId) => {
    const {data} = $authHost.post('api/basket', {basketId, deviceId});
    return data;
}

export const deleteFromBasket = async (deviceId, basketId) => {
    const {data} = $host.get('api/basket/delete', {params: {deviceId, basketId}});
    return data;
}