// common/config.ts
export type AuthApiPaths = {
  login: string
  logout: string
  refreshToken: string
}

// ApiPaths 只引用已定义的 interface
export type ApiPaths = {
  auth: AuthApiPaths
}

// 其他配置类型
export type ConfigInfo = {
  name: string
  versionCode: number
  versionName: string
  appId?: string
  logo?: string
  desc?: string
}

export type StorageKeys = {
  token: string
  refreshToken: string
}

export type ProjectConfig = {
  baseUrl: string
  timeout: number
  env: string
  api: ApiPaths
  storage: StorageKeys
  configInfo: ConfigInfo
  tenantId: string
  loginPagePath?: string
  loginRequiredPaths?: string[]
}

// ============ 配置值 ============

// 环境配置
const ENV = 'dev' // local | dev | prod

const API_CONFIG: UTSJSONObject = {
  dev: {
    baseUrl: 'http://192.168.3.7:8081',
    timeout: 30000
  },
  prod: {
    baseUrl: 'https://cmpapp.zdiot.cn/prod-api',
    timeout: 30000
  }
}

const currentConfig = API_CONFIG[ENV] as UTSJSONObject

// 导出配置对象
export const config: ProjectConfig = {
  baseUrl: currentConfig['baseUrl'] as string,
  timeout: currentConfig['timeout'] as number,
  env: ENV,
  tenantId: '000000', // 租户ID
  
  api: {
    auth: {
      login: '/auth/login',
      logout: '/auth/logout',
      refreshToken: '/auth/refresh'
    },
  },
  
  storage: {
    token: 'access_token',
    refreshToken: 'refresh_token',
  },
  
  configInfo: {
    name: '我的应用',
    versionCode: 1,
    versionName: '1.0.0',
    appId: 'your-app-id'
  },
  loginPagePath: '',
  loginRequiredPaths: []
}


export function getToken(): string {
  const token = uni.getStorageSync(config.storage.token)
  if (token == null) {
    return ''
  }
  return token as string
}

export function setToken(token: string, refreshToken: string = '') {
  uni.setStorageSync(config.storage.token, token)
  if (refreshToken.length > 0) {
    uni.setStorageSync(config.storage.refreshToken, refreshToken)
  }
}

export function clearToken() {
  uni.removeStorageSync(config.storage.token)
  uni.removeStorageSync(config.storage.refreshToken)
}

// 本地存储操作
export function setStorageSync(key: string, value: any) {
  uni.setStorageSync(key, value)
}

// 从存储中获取值
export function getStorageSync(key: string): string {
  return uni.getStorageSync(key) as string
}

// 从存储中移除值
export function removeStorageSync(key: string) {
  uni.removeStorageSync(key)
}
