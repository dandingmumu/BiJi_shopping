import request from '@/utils/request.js'

/**
 * 获取商品详情
 * @param {Object} id
 * @param {Object} params
 */
export function getProductDetailsApi (id, params) {
	return request.get(`product/details/${id}`, params)
}

/**
 * 添加商品到购物车
 * @param {Object} data
 */
export function setProductCartAddApi (data) {
	return request.post('product/cart/add', data)
}

/**
 * 确认订单接口
 * @param {Object} data
 */
export function getProductCartConfirmApi(data) {
	return request.post('product/confirms', data)
}

/**
 * 支付接口
 */
export function productPayApi ( id,params) {
	return request.post(`product/pay/${id}`, params)
}
/**
 * 商家入驻提交
 * @param {Object} data
 */
export function merchantsEnter(data) {
	return request.post('merchants/enter', data)
}

// 获取排行榜数据
export function getshareList (id) {
	return request.get(`product/share_list?product_id=${id}`)
}
// 获取评论列表
export function getreplyList (id) {
	return request.get(`product/reply?product_id=${id}`)
}
// 取消支付
export function getorderCreate_del (id) {
	return request.get(`pay/order_create_del/${id}`)
}