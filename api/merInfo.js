
import request from "@/utils/request.js"

export function getlicense (params) {
	return request.get(`merchant/get_business_license`,params)
}