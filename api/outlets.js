import request from "@/utils/request.js"

export function getmerchant (params) {
	return request.get(`merchant/multiple_shop`,params)
}