import axios from 'axios'

const api = axios.create({
    // baseURL: 'http://prooxi.kinghost.net:21566'
    baseURL: 'http://10.0.2.2:3000'
});

export default api;