import {PhotosType, ProfileTypes, ResultCodeEnum} from "../types/type";
import {instance} from "./api";

type UpdateStatusResponseType = {
    resultCode:ResultCodeEnum
    messages:string
    data:object
}

type DataPhotosType = {
    photos: PhotosType
}
type SavePhotoResponseType = {
    data: DataPhotosType
    resultCode: ResultCodeEnum
    messages: Array<string>
}

type SaveProfileResponseType = {
    resultCode: ResultCodeEnum
    messages:string
    data:object
}


export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileTypes>(`profile/${userId}`)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put<UpdateStatusResponseType>('profile/status', {status: status})
    },
    savePhoto(photoFile: any) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.put<SavePhotoResponseType>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(formData: ProfileTypes) {
        return instance.put<SaveProfileResponseType>(`profile`, formData)

    }
}