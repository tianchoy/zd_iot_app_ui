// api/http.uts
import { ApiUrl } from './url'
import { request, type ApiResponse } from './Request.uts'
import { config } from '@/common/config.uts'
import type {
  LoginData,
  CountryData,
  TenantInfoData,
  QueryCardListParams,
  CardListSumData,
  BindCard,
  PkgInfoListParams,
  QueryOrderListXcxParams,
  QueryOrderListXcxData,
  QueryOrderDetailXcxData,
  QueryOrderSuccessParams,
  RechargeData
} from './types'

// 查询国家列表
export function getCountryList(withToken: boolean = false): Promise<ApiResponse<CountryData[]>> {
  return request<CountryData[]>({
    url: ApiUrl.countries as string,
    method: 'GET',
    withToken
  })
}

// 登录
/*
* 登录需要这三个固定的参数
* tenantId
* clientId:12353d4772a25656d6d2a67d53353cc3
* grantType:xcx
*/
export function login(data: UTSJSONObject, withToken: boolean = true): Promise<ApiResponse<LoginData>> {
  return request<LoginData>({
    url: ApiUrl.login as string,
    method: 'POST',
    data: {
      ...data,
      tenantId: config.api.auth.tenantId,
      clientId: config.api.auth.clientId,
      grantType: config.api.auth.grantType,
    },
    withToken
  })
}

// 获取租户页面配置（自动适配平台）
export function getTenantInfo(tenantId: string, withToken: boolean = true): Promise<ApiResponse<TenantInfoData>> {











	// 其他平台默认使用H5配置
	const url = (ApiUrl.getTenantPageConfigH as string) + '/' + config.api.auth.tenantId
  const token = false


	return request<TenantInfoData>({
		url: url,
		method: 'GET',
		withToken: token
	})
}

// 查询卡列表
export function queryCardList(params: QueryCardListParams, withToken: boolean = true): Promise<ApiResponse<RechargeData[]>> {
  const data: UTSJSONObject = {
    rechargeNo: params.rechargeNo,
    status: params.status,
    isSort: params.isSort
  }
  return request<RechargeData[]>({
    url: ApiUrl.queryCardList as string,
    method: 'GET',
    data: data,
    withToken: withToken
  })
}

// 查询卡列表统计
export function queryCardListSum(withToken: boolean = true): Promise<ApiResponse<CardListSumData>> {
  return request<CardListSumData>({
    url: ApiUrl.queryCardListSum as string,
    method: 'GET',
    withToken: withToken
  })
}

// 查询卡详情Xcx
export function queryCardDetail(id: string,countryCode?: string, isFind?:string, withToken: boolean = true): Promise<ApiResponse<RechargeData>> {






















	// 其他平台默认使用H5配置
	const url = (ApiUrl.card_detail as string) + id
  const token = true



	return request<RechargeData>({
		url: url,
		method: 'GET',
		withToken: token
	})
}


// 绑定卡
export function userBindCard(data: BindCard, withToken: boolean = true): Promise<ApiResponse<any>> {
  const body: UTSJSONObject = {
    rechargeNo: data.rechargeNo
  }
  return request<any>({
    url: ApiUrl.userBindCard as string,
    method: 'POST',
    data: body,
    withToken: withToken
  })
}

// 解绑卡
export function userUnBindCard(id: string, withToken: boolean = true): Promise<ApiResponse<any>> {
  return request<any>({
    url: (ApiUrl.userUnBindCard as string) + id,
    method: 'DELETE',
    withToken: withToken
  })
}



// 查询套餐信息列表 
export function queryPkgInfoList(data: PkgInfoListParams, withToken: boolean = true): Promise<ApiResponse<any>> {











	// 其他平台默认使用H5配置
	const url = (ApiUrl.queryPkgInfoList as string)
  const token = false


	const body: UTSJSONObject = {
		rechargeNo: data.rechargeNo,
		status: data.status
	}

	return request<any>({
		url: url,
		method: 'GET',
		data: body,
		withToken: token
	})
}

// 查询套餐信息详情
export function queryPkgInfoDetail(id: string, withToken: boolean = true): Promise<ApiResponse<CardDetail>> {
  return request<CardDetail>({
    url: (ApiUrl.queryPkgInfoDetail as string) + id,
    method: 'GET',
    withToken: withToken
  })
}

// 查询订单列表Xcx
export function queryOrderList(data: UTSJSONObject, withToken: boolean = true): Promise<ApiResponse<QueryOrderListXcxData>> {












  // 其他平台默认使用H5配置
  const url = (ApiUrl.queryOrderList as string)
  const token = false


  return request<QueryOrderListXcxData>({
    url: url,
    method: 'GET',
    data: data,
    withToken: token
  })
}

// 添加订单Xcx
export function addOrder(data: UTSJSONObject, withToken: boolean = true): Promise<ApiResponse<any>> {











  // 其他平台默认使用H5配置
  const url = (ApiUrl.addOrder as string)
  const token = false


  return request<any>({
    url: url,
    method: 'POST',
    data: data,
    withToken: token
  })
}

// 查询订单详情Xcx
export function queryOrderDetail(id: string, withToken: boolean = true): Promise<ApiResponse<QueryOrderDetailXcxData>> {










  // 其他平台默认使用H5配置
  const url = (ApiUrl.queryOrderPackInfo as string) + id
  const token = false


  return request<QueryOrderDetailXcxData>({
    url: url,
    method: 'GET',
    withToken: token
  })
}

//支付成功页面
export function queryOrderSuccess(id: string, payChannelId: string, withToken: boolean = true): Promise<ApiResponse<QueryOrderSuccessParams>> {
  return request<QueryOrderSuccessParams>({
    url: (ApiUrl.queryOrderSuccess as string) + id + '/' + payChannelId,
    method: 'GET',
    withToken: withToken
  })
}

// 订单详情里去支付Xcx
export function goPayXcx(orderId:string, withToken: boolean = true): Promise<ApiResponse<any>> {
  return request<any>({
    url: (ApiUrl.goPayXcx as string) + orderId,
    method: 'POST',
    withToken: withToken
  })
}

// 查询套餐信息详情Xcx  
export function queryPkgInfoXcx(id: string, withToken: boolean = true): Promise<ApiResponse<any>> {
  return request<any>({
    url: (ApiUrl.queryPkgInfoXcx as string) + id,
    method: 'GET',
    withToken: withToken
  })
}
