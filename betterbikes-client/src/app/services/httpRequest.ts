import axiosInstance from './initRequest'

export const GetRequest = (url: string, config: {} = {}) => {
    return axiosInstance.get(url, config)
}

export const PostRequest = (url: string, body: {}, config = {}) => {
    return axiosInstance.post(url, body, config)
}

export const PutRequest = (url: string, body?: {}, config?: {}) => {
    return axiosInstance.put(url, body, config)
}

export const DeleteRequest = (url: string, data?: any, config: {} = {}) => {
    return axiosInstance.delete(url, { data })
}

export const PatchRequest = (url: string, data: any, config: any) => {
    return axiosInstance.patch(url, data, config)
}