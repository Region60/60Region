import {instance} from "./api";
import {profileAPI} from "./profile-api";

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },

    follow(userId: number) {
        return instance.post(`follow/${userId}`).then(res=>res.data)
    },

    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`).then(res=>res.data)
    },
    getProfile(userId: number) {
        console.warn('Obsolete method. Please profileAPI object.')
        return profileAPI.getProfile(userId)
    }

}