import axios from 'axios';

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authInterceptor = config => {//функция, которая кладет токен в headers из local storage, куда он был введен после авторизации
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
}

$authHost.interceptors.request.use(authInterceptor);//добавляем интерцептор для запроса

export {
    $host,
    $authHost
}