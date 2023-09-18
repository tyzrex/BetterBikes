import ApiClient from './initRequest'

export const GetRequest = (url: string, config: {} = {}) => {
    return ApiClient.get(url, config)
}

export const PostRequest = (url: string, body: {}, config = {}) => {
    return ApiClient.post(url, body, config)
}

export const PutRequest = (url: string, body?: {}, config?: {}) => {
    return ApiClient.put(url, body, config)
}

export const DeleteRequest = (url: string, data?: any, config: {} = {}) => {
    return ApiClient.delete(url, { data })
}

export const PatchRequest = (url: string, data: any, config: any) => {
    return ApiClient.patch(url, data, config)
}