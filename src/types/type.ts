export type PostsType = {
    id: number
    message: string
    likesCount: number
}
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type ProfileTypes = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contakts: ContactsType
    photos: PhotosType | null
}
export type UsersType = {
    id: number
    name: string
    status: string | null
    photos: PhotosType | null
    followed: boolean
}

export enum ResultCodeEnum  {
    Success = 0,
    Error = 1,

}
export enum CaptchaRequiredEnum  {
    CaptchaIsRequired = 10
}