import axios from "axios";


export const instance = axios.create({
    withCredentials: true,             //отправить вместе с запросом cookie
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "0ac29fb6-636b-4af2-87ca-b7b9a9a44a51"
    }
})

