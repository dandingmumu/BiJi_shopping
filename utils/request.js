import {
	HTTP_REQUEST_URL,
	HEADER,
	TOKENNAME
} from '@/config/app';
import {
	toLogin
} from '@/libs/login';
import store from '@/store';


/**
 * 发送请求
 */
function baseRequest(url, method, data, {
	noAuth = false,
	noVerify = false
}) {
	let Url = HTTP_REQUEST_URL,
		header = HEADER;

	// if (noAuth) {
	// 	//登录过期自动登录
	// 	if (!store.state.app.token && !checkLogin()) {
	// 		toLogin();
	// 		return Promise.reject({
	// 			msg: '未登录'
	// 		});
	// 	}
	// }
	if (store.state.app.token) header[TOKENNAME] = 'Bearer ' + store.state.app.token;

	return new Promise((reslove, reject) => {
		uni.request({
			url: Url + url,
			method: method || 'GET',
			header: header,
			data: data || {},
			success: (res) => {
				if (noVerify)
					reslove(res.data, res);
				else if (res.data.code == 200)
					reslove(res.data, res);
				else if ([410000, 410001, 410002].indexOf(res.data.code) !== -1) {
					toLogin();
					reject(res.data);
				} else if (res.data.code == 410010) {
					uni.showModal({
						title: '提示',
						content: res.data.msg,
						showCancel: false,
						confirmText: '我知道了'
					});
				} else
					reject(res.data.msg || '系统错误');
			},
			fail: (msg) => {
				let data = {
					mag: '请求失败',
					status: 1 //1没网
				}
				// #ifdef APP-PLUS
				reject(data);
				// #endif
				// #ifndef APP-PLUS
				reject('请求失败');
				// #endif
			}
		})
	});
}

const request = {};

['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method) => {
	request[method] = (api, data, opt) => baseRequest(api, method, data, opt || {})
});



export default request;
