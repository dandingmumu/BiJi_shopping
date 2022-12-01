import request from '@/utils/request.js'

/**
 * 获取用户信息
 */
export function getUserInfoApi () {
	return request.get('users')
}

/**
 * 图片链接转base64
 * @param {Object} data
 */
export function imgToBase(data) {
	return request.post('image_base64', data);
}

/**
 * 新版分享海报信息获取
 * 
 */
export function spreadMsg() {
	return request.get('user/spread_info');
}