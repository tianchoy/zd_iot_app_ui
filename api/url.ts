export const ApiUrl = {
    card_detail: '/app/card/info/', // 查询卡详情
    countries: '/app/card/getH5CountryList', // 查询国家列表
    addOrder: '/order/pkgOrder', // 添加订单
    queryOrder: '/order/pkgOrder/', // 查询订单
    goPay: '/pay/order/goPayment', // 去支付
    queryBySuccessId: '/order/pkgOrder/success/', // 根据成功ID查询订单
    queryPkgInfoList: '/card/pkgInfo/list', // 查询套餐信息列表
    queryPkgInfoDetail: '/card/pkgInfo/info/', // 查询套餐信息详情
    queryOrderList: '/order/pkgOrder/list', // 查询订单列表
    queryOrderPackInfo: '/order/pkgOrder/getOrderPackInfo/' // 查询订单套餐信息
} 