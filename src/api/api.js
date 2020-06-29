import { getRequest } from '@/utils/wxlib/httpRequest'

// 获取video列表
export const getVideoLists = () => getRequest('/apipublic/video/getinfo')
