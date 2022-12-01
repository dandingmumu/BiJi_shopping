/**
 * 公共配置文件
 */
//H5接口是浏览器地址，非单独部署不用修改
// const HTTP_REQUEST_URL = `http://xzhk.profess.top/web/`
const HTTP_REQUEST_URL = 'http://192.168.110.12:8088/web/'
// 回话密钥名称 请勿修改此配置
const TOKENNAME = 'Authori-zation'
// const TOKENNAME = 'Authorization'
// 以下配置在不做二开的前提下,不需要做任何的修改
const HEADER = {
	'content-type': 'application/json',
	//#ifdef H5
	'Form-type': navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1 ? 'wechat' : 'h5',
	//#endif
	//#ifdef MP
	'Form-type': 'routine',
	//#endif
	//#ifdef APP-VUE
	'Form-type': 'app',
	//#endif
}
// 缓存时间 0 永久
const EXPIRE = 0
//分页最多显示条数
const LIMIT = 10

export {
	HTTP_REQUEST_URL,
	TOKENNAME,
	HEADER,
	EXPIRE,
	LIMIT
}
