<template>
	<view class="">
		<view class="userinfo-vault">
			<view class="userinfo-vault__header">
				<view class="Info">
					<van-image round fit="fill" width="102rpx" height="102rpx"
						src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
					<view style="margin-left: 24rpx;">
						美食客商家
					</view>
				</view>
				<view class="verification" @click="handleScanner">
					<van-image fit="fill" width="88rpx" height="88rpx" src="/static/icon/qrcode.png"></van-image>
					<span>订单核销</span>
				</view>
			</view>
			<view class="userinfo-vault__balance">
				<view class="withdrawDeposit">
					<view class="price">
						0
					</view>
					<view>
						<button>申请体现</button>
					</view>
				</view>
				<van-row gutter="20">
					<van-col span="8">
						<span style="margin-bottom: 29rpx;">待入账</span>
						<span style="margin-bottom: 50rpx;">0</span>
					</van-col>
					<van-col span="8">
						<span style="margin-bottom: 29rpx;">可提现</span>
						<span style="margin-bottom: 50rpx;">0</span>
					</van-col>
					<van-col span="8">
						<span style="margin-bottom: 29rpx;">已提现</span>
						<span style="margin-bottom: 50rpx;">0</span>
					</van-col>
				</van-row>
			</view>
		</view>
		<!-- 订单 -->
		<view class="userInfo-order">
			<van-tabs style="margin-top: 28rpx;" v-model:active="active" color="#FFAD6A" background="#F4F4F4">
				<van-tab title="收益订单">
					<view class="userInfo-order__list">
						<view class="userInfo-order__listItem">
							<view class="title">
								<span>订单号:210720272358</span>
								<span
									style="font-size: 32rpx;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: #969696;">已完成</span>
							</view>
							<view class="content">
								【圆歌·未来石中心|莫掌门火锅】128元享门市价327元套餐，莫掌门秘制鸳鸯锅底(番茄/骨汤/菌汤3选2)+陕北滩羊肉1份+傲娇肥牛1份+养生乌鸡卷1份+巴沙鱼1份+掌门鲜血1份+大V蟹柳1份+昆仑卤牛肚1份+金针菇1份+白萝卜1份+油麦菜1份+川粉1份+土豆1份+拽面2根+酸梅汤1扎+自助小料4位+餐具4套~
							</view>
							<view class="userInfos">
								<van-space direction="vertical" size="40rpx">
									<view>姓名:潘**</view>
									<view>联系电话:13103303578</view>
									<view>货币:②</view>
									<view>当前状态:已完成</view>
								</van-space>
							</view>
						</view>
					</view>
				</van-tab>
				<van-tab title="提现记录">
					<view class="userInfo-order__list" style='background-color: #F4F4F4; height: 140rpx;'>
					</view>
				</van-tab>
			</van-tabs>
		
		</view>
	</view>
</template>

<script>
	import jweixin from "weixin-js-sdk"
	import {
		getWechatConfigApi,getcode
	} from '@/api/public.js'
	import wechat from '@/libs/wechat.js'
	import { Toast} from 'vant'
	export default {
		methods: {
			handleScanner() {
				getWechatConfigApi().then(res => {
					// wx.checkJsApi({
					//     jsApiList: res.data.jsApiList, // 须要检测的JS接口列表，全部JS接口列表见附录2,
					//     success: function(res) {
					//     // 以键值对的形式返回，可用的api值true，不可用为false
					//     // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
					//     }
					// });
					jweixin.config({
						debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId: res.data.appId, // 必填，公众号的唯一标识
						timestamp: res.data.timestamp, // 必填，生成签名的时间戳
						nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
						signature: res.data.signature, // 必填，签名
						jsApiList: [...res.data.jsApiList, 'scanQRCode'],

					})
					jweixin.scanQRCode({
						needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
						// 可以指定扫二维码还是一维码，默认二者都有
						scanType: ["qrCode", "barCode"],
						success: function(res) {
							//但是这里却不会打印出数据
							// alert(res.resultStr)
							getcode(res.resultStr).then(res=>{
								// alert(res.msg)
								 Toast.success(res.msg)
							}).catch(err=>{
								// alert(err.msg)
								Toast.error(err.msg)
							})
							console.log(res);
						// 	if (res.errMsg == 'scanQRCode:ok') {
						
						// 	}
						},
						fail: function(err) {
							//即使这个也不会弹出提示框
						}
					});
				})

			}
		}
	}
</script>

<style lang="scss">
	body {
		background: #F4F4F4;
	}

	.userinfo-vault {
		// width: 750rpx;
		height: 743rpx;
		background: linear-gradient(133deg, #EEDBB8 0%, #C4AA7E 100%);
		overflow: hidden;

		&__header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 44rpx 45rpx;

			.Info {
				display: flex;
				align-items: center;
			}

			.verification {
				display: flex;
				align-items: center;
				flex-direction: column;

				span {
					margin-top: 18rpx;
					font-size: 22rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #3E3E3E;
				}
			}
		}

		&__balance {
			// width: 647rpx;
			// height: 407rpx;
			background: linear-gradient(180deg, #585858 0%, #000000 100%);
			border-radius: 8rpx;
			border: 2rpx solid;
			border-image: linear-gradient(180deg, rgba(255, 255, 255, 1), rgba(249, 162, 89, 1)) 2 2;
			margin: 0 45rpx;
			// padding: 48rpx 0;
			text-align: center;
			overflow: hidden;

			.withdrawDeposit {
				display: flex;
				align-items: flex-end;
				justify-content: space-between;
				margin: 38rpx 45rpx;

				.price {
					font-size: 80rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 80rpx;
				}

				button {
					width: 184rpx;
					// height: 58rpx;
					background: linear-gradient(360deg, #FFCE9F 0%, #FFFFFF 100%);
					border-radius: 47rpx;
					text-align: center;

					font-size: 26rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #151515;
					line-height: 58rpx;
				}
			}


			span {
				display: block;
				// width: 78px;
				// height: 26px;
				font-size: 30rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 26rpx;
			}
		}
	}

	.userInfo-order {
		// height: 1212px;
		margin-top: -230rpx;
		background: #F4F4F4;
		border-radius: 45rpx 45rpx 0px 0px;
		overflow: hidden;

		&__list {
			margin-top: 20rpx;
			overflow: hidden;
		}

		&__listItem {
			// width: 670rpx;
			margin: 0 39rpx 30rpx;
			padding: 71rpx 42rpx;
			background: #FFFFFF;
			border-radius: 38rpx;
			box-sizing: border-box;

			.title {
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				margin-bottom: 50rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
			}

			.content {
				margin-bottom: 70rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
			}

			.userinfos {
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
			}
		}
	}
</style>
