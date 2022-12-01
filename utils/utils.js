/**
 * 是否是微信H5
 */
export function isWeixin() {
	return navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1;
}
/**
 * 参数请求截取
 */
export function parseQuery() {
	const res = {};

	const query = (location.href.split("?")[1] || "")
		.trim()
		.replace(/^(\?|#|&)/, "");

	if (!query) {
		return res;
	}

	query.split("&").forEach(param => {
		const parts = param.replace(/\+/g, " ").split("=");
		const key = decodeURIComponent(parts.shift());
		const val = parts.length > 0 ? decodeURIComponent(parts.join("=")) : null;

		if (res[key] === undefined) {
			res[key] = val;
		} else if (Array.isArray(res[key])) {
			res[key].push(val);
		} else {
			res[key] = [res[key], val];
		}
	});

	return res;
}


/**
 * 用户信息分享海报
 * @param array arr2 海报素材  1背景 0二维码
 * @param string nickname 昵称
 * @param string sitename 价格
 * @param function successFn 回调函数
 */
export function userPosterCanvas(arr2, nickname, sitename, index, w, h, successFn) {
	let that = this;
	const ctx = uni.createCanvasContext('myCanvas' + index);
	ctx.clearRect(0, 0, 0, 0);
	/**
	 * 只能获取合法域名下的图片信息,本地调试无法获取
	 * 
	 */
	uni.getImageInfo({
		src: arr2[1],
		success: function(res) {
			const WIDTH = res.width;
			const HEIGHT = res.height;
			ctx.fillStyle = '#fff';
			ctx.fillRect(0, 0, w, h);
			ctx.drawImage(arr2[1], 0, 0, w, h);
			ctx.setTextAlign('left')
			ctx.setFontSize(12);
			ctx.setFillStyle('#333');

			// x:240 y:426
			let codex = 0.1906
			let codey = 0.7746
			let codeSize = 0.21666
			let namex = 0.4283
			let namey = 0.8215
			let markx = 0.4283
			let marky = 0.8685
			ctx.drawImage(arr2[0], w * codex, h * codey, w * codeSize, w * codeSize);
			if (w < 270) {
				ctx.setFontSize(8);
			} else {
				ctx.setFontSize(10);
			}
			ctx.fillText(nickname, w * namex, h * namey);
			if (w < 270) {
				ctx.setFontSize(8);
			} else {
				ctx.setFontSize(10);
			}
			ctx.fillText('邀请您加入' + sitename, w * markx, h * marky);
			ctx.save();
			ctx.draw(true, function() {
				uni.canvasToTempFilePath({
					canvasId: 'myCanvas' + index,
					fileType: 'png',
					quality: 1,
					success: function(res) {
						successFn && successFn(res.tempFilePath);
					}
				})
			});
		},
		fail: function(err) {
			uni.hideLoading();
			that.Tips({
				title: '无法获取图片信息'
			});
		}
	})
}
