<template>
	<view>
		<view class="orderListItem">
			<view class="orderListItem__body">
				<view class="orderListItem__bodyThumbnail">
					<image :src="productInfo.recommend_image" mode="aspectFill">
					</image>
				</view>
				<view class="orderListItem__bodyDetails">
					<view class="title">
						{{productInfo.title}}
					</view>
					<view class="info">
						{{attrInfo.suk}}
					</view>
				</view>
				<view class="price">
					￥{{attrInfo.price}}
				</view>
			</view>
			<view style="border-top: 1px solid #D8D8D8; width: 90%; margin: 0 auto;"></view>
			<view class="tkyy-line">
				<view class="tkyy-left">数量 </view>
				<view class="tkyy-right">
					<van-stepper v-model="num" />
				</view>
			</view>
		</view>

		<view class="userInfo">
			<view class="userInfo-title">
				使用人信息
			</view>
			<view style="border-top: 1px solid #D8D8D8; width: 90%; margin: 0 auto;"></view>
			<view class="userInfo-info">
				<view class="userInfo-info-left">姓名</view>
				<view class="userInfo-info-right">
					<input type="text" placeholder='请输入你的姓名' v-model='nickname'>

				</view>
			</view>
			<view style="border-top: 1px solid #D8D8D8; width: 90%; margin: 0 auto;"></view>
			<view class="userInfo-info">
				<view class="userInfo-info-left">电话</view>
				<view class="userInfo-info-right">
					<input type="number" placeholder='请输入你的电话' v-model='iphone' maxlength='11'>

				</view>
			</view>
			<view style="border-top: 1px solid #D8D8D8; width: 90%; margin: 0 auto;"></view>
			<view class="userInfo-info">
				<view class="userInfo-info-left">备注</view>
				<view class="userInfo-info-right">
					<input type="text" placeholder='请输入你要的信息' v-model='remarks'>

				</view>
			</view>
		</view>
		<view class="zhu">
			注:达人购买成功后，返佣将在我的金库可查看，销后可提现
		</view>
		<view class="bottom-btn">
			<view class="bottom-price">
				小计：<span style='color: #FF1414;'>¥{{(attrInfo.price*num).toFixed(2)}}</span>
			</view>
			<view class="bottom-pay" @click='onSubmitPay'>
				微信支付
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getWechatConfigApi
	} from '@/api/public.js'
	import {
		productPayApi,
		getProductCartConfirmApi,
		getorderCreate_del
	} from '@/api/details.js'
	import {
		getUserInfoApi
	} from '@/api/users.js'
	import {
		Dialog,
		Toast
	} from 'vant'
	export default {
		data() {
			return {
				num: 1,
				nickname: '',
				iphone: '',
				remarks: '',
				attrInfo: {},
				productInfo: {},
				uniques: '',
				product_id: ''
			}
		},
		onLoad(options) {
			console.log(options);
			this.product_id = options.product_id
			this.uniques = options.uniques
			this.getProductCart(options)
		},
		methods: {
			/**
			 * 
			 * 去支付
			 */
			onSubmitPay() {
				let that = this;
				if (this.nickname == '') {
					Toast.fail('请输入姓名')
					return
				}
				if (this.iphone == '') {
					Toast.fail('请输入手机号')
					return
				}
				if (!(/^1[3456789]\d{9}$/.test(this.iphone))) {
					Toast.fail('请填写正确的手机号')
					return false;
				}
				Dialog.confirm({
						title: '温馨提示',
						confirmButtonColor: '#000',
						cancelButtonColor: '#FF2626',
						cancelButtonText: '重新输入',
						messageAlign: 'left',
						message: `姓名：${this.nickname}\n电话：${this.iphone}\n确认无误继续下单支付吗`,
					})
					.then(() => {
						let paytype = 'WECHAT_PAY'
						const data = {
							// #ifdef H5
							'from': this.$wechat.isWeixin() ? 'weixin' : 'weixinh5',
							// #endif
						}
						productPayApi(this.product_id, {
							num: that.num,
							mark: that.remarks,
							uniques: that.uniques,
							nickname: that.nickname,
							iphone: that.iphone,
							// #ifdef H5
							'from': this.$wechat.isWeixin() ? 'weixin' : 'weixinh5',
							// #endif
						}).then(res => {
							let jsConfig = res.data.result.jsConfig;
							let goPages = '/pages/users/payOk/index?order_id=' + res.data.result.orderInfo.unique;
							let status = res.data.status
							switch (paytype) {
								case 'WECHAT_PAY':
									if (jsConfig === undefined) return that.$util.Tips({
										title: '缺少支付参数'
									});
									this.$toast.loading({
										message: '支付中...',
										forbidClick: true,
									});
									
									that.$wechat.pay(jsConfig).then(() => {
										return that.$Tools.Tips({
											title: "支付成功",
											icon: 'success'
										}, {
											tab: 5,
											url: goPages
										});
									}).catch((err) => {
										// if (!this.$wechat.isWeixin()) {
										// 	uni.redirectTo({
										// 		url: goPages +
										// 			'&msg=支付失败&status=2'
										// 	})
										// }
										// if (err.errMsg == 'chooseWXPay:cancel'){
										getorderCreate_del(res.data.result.orderInfo.id).then(res => {
											Toast.fail('取消支付')
											that.$util.Tips({
												title: '取消支付'
											}, {
												tab: 5,
												url: goPages + '&status=2'
											})
										}).catch(err1 => {

										})

										// } 

									});
									
									break;
							}
						}).catch(err => {
						})
					})
					.catch(() => {
						// on cancel
					});


			},
			getProductCart(data) {
				let that = this
				getProductCartConfirmApi(data).then(res => {
					that.attrInfo = res.data.attrInfo
					that.productInfo = res.data.productInfo
				}).catch(err => {
					Toast.fail(err.msg)
				})
			}

		}
	}
</script>

<style lang='scss'>
	page {
		background-color: #FAFAFA;
		width: 100%;
		overflow-x: hidden;
		padding: 40rpx 0;
	}

	.orderListItem {
		background-color: #fff;
		width: 670rpx;
		margin: 0 auto;
		padding-bottom: 20rpx;
		border-radius: 20rpx;
	}

	.orderListItem__body {
		display: flex;
		// align-items: center;
	}

	.orderListItem__bodyThumbnail {
		width: 140rpx;
		height: 140rpx;
		margin-right: 29rpx;
		border-radius: 10rpx;
		overflow: hidden;
		margin: 30rpx 30rpx;
	}

	.orderListItem__bodyDetails {
		width: 330rpx;

		.title {
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #191919;
			line-height: 32rpx;
			margin-top: 30rpx;
		}

		.info {
			margin-top: 40rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #989898;
			line-height: 26rpx;
		}
	}

	.price {
		flex: 1;
		color: #FF0D0D;
		margin-top: 120rpx;
		/* margin-left: 100rpx; */
	}

	.tkyy-line {
		display: flex;
		padding: 40rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #414141;
		font-size: 30rpx;
	}

	.tkyy-left {
		width: 30%;
	}

	.tkyy-right {
		flex: 1;
		text-align: right;
	}

	::v-deep .van-stepper__input {
		background-color: #fff;
		margin: 0 10rpx;
	}

	::v-deep .van-stepper__plus {
		background-color: #FF2929;
		color: #fff;
		height: 44rpx;
		line-height: 44rpx;
		border-radius: 4rpx !important;
	}

	::v-deep .van-stepper__minus {
		background-color: #FFFFFF;
		color: #3C3C3C;
		height: 44rpx;
		line-height: 44rpx;
		box-shadow: 0px 0px 5px #888888;
		border-radius: 4rpx !important;
	}

	.userInfo {
		background-color: #fff;
		width: 670rpx;
		margin: 20rpx auto;
		padding-bottom: 20rpx;
		border-radius: 20rpx;
		font-size: 26rpx;
		height: 500rpx;

		.userInfo-title {
			width: 100%;
			padding: 40rpx;
			color: #2A2A2A;
		}

		.userInfo-info {
			display: flex;
			padding: 40rpx;
		}

		.userInfo-info-left {
			width: 26%;
		}

		.userInfo-info-right {
			flex: 1;
		}
	}

	.zhu {
		width: 644rpx;
		height: 123rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #767676;
		line-height: 41rpx;
		margin: 30rpx auto;

	}

	.bottom-btn {
		width: 100%;
		height: 153rpx;
		background: #FFFFFF;
		position: fixed;
		bottom: 0;
		display: flex;
	}

	.bottom-price {
		padding: 30rpx;
		padding-top: 50rpx;
		width: 50%;
	}

	.bottom-pay {
		width: 270rpx;
		height: 74rpx;
		background: #FF1414;
		border-radius: 37rpx;
		color: #FFFFFF;
		line-height: 74rpx;
		font-size: 26rpx;
		text-align: center;
		margin-top: 30rpx;
		/* margin-left: 70rpx; */
	}
</style>
