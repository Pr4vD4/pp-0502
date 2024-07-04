import axios from "axios";

// function getHeaders(){
//     const header = {};
//     if (localStorage.getItem('token')){
//         header.Authorization =  'Bearer ' + localStorage.getItem('token');
//     }
//     return header;
// }

const api = axios.create({
    baseURL: 'http://pp-0502-api/api',
})

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config

    }
)

export {api}
