import request from '@/utils/request.js'

import wechat from '@/libs/wechat.js'

/**
 * 获取微信sdk配置
 * @param {Object} url
 */
export function getWechatConfigApi (url) {
	return request.get("wechat/config", {
		url: wechat.signLink()
		// url:'http://xzhk-h5.profess.top/'
	});
}

/**
 * 微信授权获取用户信息
 * @param {Object} code
 * @param {Object} spread
 */
export function wechatAuthApi(code, spread) {
	return request.get(
		"wechat/mp_auth", {
			code,
			spread
		}, {
			noAuth: true
		}
	);
}
// 核销二维码
export function getcode (code) {
	return request.get(`merchants/verification/`+code
	)
}

//我的金库
export function getusersProperty () {
	return request.get(`users/users_property`
	)
}

// 达人注册
export function expertRegister (data) {
	return request.post('users/expert_register', data)
}

// 申请提现
export function cash (data) {
	return request.post('extract/cash', data)
}
// 获取提现记录
export function getcommission () {
	return request.get(`commission`
	)
}

// 绑定银行卡
export function bindBank (data) {
	return request.post('bind_bank_card', data)
}
// 获取验证码
export function getSms (data) {
	return request.post('get_sms', data)
}
