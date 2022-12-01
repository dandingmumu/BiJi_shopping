import request from "@/utils/request.js"

/**
 * 获取定位
 * @param {Object} params
 */
export function getLocationInfoApi (params) {
	return request.get(`get_city?location=${params}`)
}


/**
 * 根据选择城市返回市下级
 * @param {Object} citycode
 */
export function getCityClassifyListApi (citycode) {
	return request.get(`get_city_region/${citycode}`)
}

/**
 * 根据城市获取相应的 城市banner
 * @param {Object} citycode
 */
export function getBannerListApi (citycode) {
	return request.get(`get_banner_list/${citycode}`)
}

/**
 * 获取首页商户列表
 * @param {Object} params
 */
export function getProductListApi (params) {
	return request.get('product/get_list', params)
}
// 获取分类列表
export function getcategoryApi (params) {
	return request.get('product/category', params)
}
