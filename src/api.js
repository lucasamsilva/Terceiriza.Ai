import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://lucasdev.space:21229',
    // baseURL: 'http://10.0.2.2:3000'
});


const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@terceirizaai_token')
        const objValue = JSON.parse(jsonValue);
        if (jsonValue !== null) {
            return objValue.token;
        } else {
            return null
        }
    } catch (e) {

    }
}

axios.interceptors.request.use(function (config) {

    getData().then(res => {
        if(res) {
            config.headers.Authorization = `Bearer ${res}`
        }
    });
    
    return config;

})

export default api;