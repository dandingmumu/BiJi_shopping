import request from '@/utils/request.js'

export function getOrderInfoApi (uni,location) {
	return request.get(`order/detail/${uni}?location=${location}`)
}
// 获取订单列表
export function getOrderList (uni) {
	return request.get(`order/list?type=`+uni)
}

// 获取订单申请退款理由
export function getrefundInfo (uni) {
	return request.get(`order/refund_reason=`+uni)
}

// 提交申请退款

export function refundApply(id,data) {
	return request.post(`order/refund/apply/${id}`,data)
}