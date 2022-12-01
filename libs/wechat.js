// #ifdef H5
import WechatJSSDK from "weixin-js-sdk"

import {
	getWechatConfigApi,
	wechatAuthApi
} from '@/api/public.js'

import {
	WX_AUTH,
	STATE_KEY,
	LOGINTYPE,
	BACK_URL
} from '@/config/cache'

import {
	parseQuery
} from '@/utils/utils.js'

import Cache from '@/utils/cache'

class AuthWechat {

	constructor() {
		// 微信实例化对象
		this.instance = WechatJSSDK;
		// 是否实例化
		this.status = false;
		// 初始化配置
		this.initConfig = {};
	}

	/**
	 * 初始化wechat
	 */
	wechat() {
		return new Promise((resolve, reject) => {
			console.log('111');
			// if (this.status && !this.isAndroid()) return resolve(this.instance);
			getWechatConfigApi()
				.then(res => {
					console.log('22');
					this.instance.config(res.data);
					this.initConfig = res.data;
					this.status = true;
					this.instance.ready(() => {
						resolve(this.instance);
					})
				}).catch(err => {
					this.status = false;
					reject(err);
				});
		});
	}

	/**
	 * 登录链接
	 */
	signLink() {
		if (typeof window.entryUrl === 'undefined' || window.entryUrl === '') {
			window.entryUrl = document.location.href
		}
		return /(Android)/i.test(navigator.userAgent) ? document.location.href : window.entryUrl;
	}

	/**
	 * 自动去授权
	 * @param {Object} snsapiBase 登录方式
	 * @param {Object} url 跳转回调地址
	 */
	oAuth(snsapiBase, url) {
		if (uni.getStorageSync(WX_AUTH) && snsapiBase == 'snsapi_base') return;
		let {
			code
		} = parseQuery();
		let snsapiCode = uni.getStorageSync('snsapiCode')
		if (code instanceof Array) {
			code = code[code.length - 1]
		}
		if (snsapiCode instanceof Array) {
			snsapiCode = snsapiCode[snsapiCode.length - 1]
		}
		if (!code || code == snsapiCode) {
			uni.setStorageSync('authIng', true)
			return this.toAuth(snsapiBase, url);
		} else {}
	}

	/**
	 * 跳转自动登陆
	 * @param {Object} snsapiBase
	 * @param {Object} backUrl
	 */
	toAuth(snsapiBase, backUrl) {
		let that = this;
		this.wechat().then(wx => {
			location.href = this.getAuthUrl(that.initConfig.appId, snsapiBase, backUrl);
		})
	}

	/**
	 * 获取授权登录地址
	 * @param {Object} appId
	 * @param {Object} snsapiBase
	 * @param {Object} backUrl
	 */
	getAuthUrl(appId, snsapiBase, backUrl) {
		if (backUrl) {
			let backUrlArr = backUrl.split('&');
			let newUrlArr = backUrlArr.filter(item => {
				if (item.indexOf('code=') === -1) {
					return item;
				}
			});
			backUrl = newUrlArr.join('&');
		}

		let url = `${location.origin}${backUrl}`
		if (url.indexOf('?') === -1) {
			url = url + '?'
		} else {
			url = url + '&'
		}
		// const redirect_uri = encodeURIComponent(
		// 	`${url}scope=${snsapiBase}&back_url=` +
		// 	encodeURIComponent(
		// 		encodeURIComponent(
		// 			uni.getStorageSync(BACK_URL) ?
		// 			uni.getStorageSync(BACK_URL) :
		// 			location.pathname + location.search
		// 		)
		// 	)
		// );

		let redirect_uri = encodeURIComponent(window.location.href);
		uni.removeStorageSync(BACK_URL);
		const state = encodeURIComponent(
			("" + Math.random()).split(".")[1] + "authorizestate"
		);
		uni.setStorageSync(STATE_KEY, state);
		if (snsapiBase === 'snsapi_base') {
			return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=${state}&connect_redirect=1#wechat_redirect`;
		} else {
			return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=${state}&connect_redirect=1#wechat_redirect`;
		}

	}

	/**
	 * 授权登陆获取token
	 * @param {Object} code
	 */
	auth(code) {
		return new Promise((resolve, reject) => {
			let loginType = Cache.get(LOGINTYPE)
			wechatAuthApi(code, parseInt(Cache.get("spread"))).then(({
				data
			}) => {
				Cache.set(WX_AUTH, code);
				Cache.clear(STATE_KEY);
				resolve(data);
			}).catch(reject);
		});
	}

	/**
	 * 是否是微信内部H5
	 */
	isWeixin() {
		return navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1;
	}

	/**
	 * 微信支付
	 * @param {Object} config
	 */
	pay(config) {
		return new Promise((resolve, reject) => {
			this.wechat().then((wx) => {
				this.toPromise(wx.chooseWXPay, config).then(res => {
					resolve(res);
				}).catch(res => {
					reject(res);
				});
			}).catch(res => {
				reject(res);
			});
		});
	}

	/**
	 * 跳支付
	 */
	toPromise(fn, config = {}) {
		return new Promise((resolve, reject) => {
			fn({
				...config,
				success(res) {
					resolve(res);
				},
				fail(err) {
					reject(err);
				},
				complete(err) {
					reject(err);
				},
				cancel(err) {
					reject(err);
				}
			});
		});
	}

	/**
	 * 扫码
	 */
	scanQRCodes() {
		return new Promise((resolve, reject) => {
			this.instance.ready(() => {
				this.instance.scanQRCode({
					needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
					scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
					success: function(res) {
						var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
					},
					fail: function() {}
				})
			})
		})
	}

	AppMessageShare() {
		let that = this;

		return new Promise((resolve, reject) => {
			that.wechat().then(wx => {
				this.toPromise(wx.updateAppMessageShareData, ).then(res => {
					resolve(res);
				}).catch(res => {
					reject(res);
				});
			})
		})
	}

	/**
	 * 绑定事件
	 * @param {Object} name 事件名
	 * @param {Object} config 参数
	 */
	wechatEvevt(name, config) {
		let that = this;
		return new Promise((resolve, reject) => {
			let configDefault = {
				fail(res) {
					if (that.instance) return reject({
						is_ready: true,
						wx: that.instance
					});
					that.verifyInstance().then(wx => {
						return reject({
							is_ready: true,
							wx: wx
						});
					})
				},
				success(res) {
					return resolve(res, 2222);
				}
			};
			Object.assign(configDefault, config);
			that.wechat().then(wx => {
				if (typeof name === 'object') {
					name.forEach(item => {
						wx[item] && wx[item](configDefault)
					})
				} else {
					wx[name] && wx[name](configDefault)
				}
			})
		});
	}
}

export default new AuthWechat();
// #endif
