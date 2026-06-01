// api/http.uts

import { get, post, put, del, http, type ApiResponse } from '@/uni_modules/m-unix/components/m-tools/Request.uts'
import { config, setToken, clearToken } from '@/common/config'

// 定义类型
export type LoginParams = {
  phone: string
  password: string
}

export type LoginData = {
  token: string
  refreshToken: string
  userId: number
  nickname: string
}

// 显式指定泛型类型和返回类型
export const login = (params: LoginParams): Promise<ApiResponse<LoginData>> => {
  const data: UTSJSONObject = {
    'phone': params.phone,
    'password': params.password
  }
  return post<LoginData>('/user/login', data,null)
}