<template>
	<view>
		<view class="top">
			<view class="info">
				<image src="../../../static/images/payok.png" mode="" style='width: 253rpx; height: 212rpx;'></image>

				<view class="text">支付成功</view>
				<view class="text1">状态描述 订单已成功发送至服务商</view>
				<view class="btn">
					<view class="btn1" @click='goMyorder'>我的订单</view>
					<view class="btn2" @click='goOrderDetail'>查看订单</view>
				</view>
			</view>
		</view>
		<view class="liyou">1. 如有任何问题，欢迎直接拨打电话来咨询我们的后续服务；</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				order_id:''
			}
		},
		onLoad(options) {
			this.order_id=options.order_id
		},
		methods: {
			goMyorder(){
				uni.redirectTo({
					url:'/pages/users/myOrder/index?active='+0,
					
				})
			},
			goOrderDetail(){
				uni.redirectTo({
					url:'/pages/users/employ_order/index?order_id='+this.order_id
				})
			}
		}
	}
</script>

<style>
	page {
		overflow-x: hidden;
	}

	.top {
		height: 800rpx;
		width: 100%;
		background-color: #FF9D3E;
	}

	.top .info {
		width: 100%;
		text-align: center;
	}

	.top .text {
		text-align: center;
		font-size: 36rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		margin-top: 40rpx;
	}

	.top .text1 {
		text-align: center;
		font-size: 24rpx;

		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFD7B1;
		margin-top: 20rpx;
	}

	.top .info image {
		/* margin-left: 34%; */
		margin-top: 18%;
	}

	.btn {
		display: flex;
		width: 100%;
		margin-left: 19%;
		margin-top: 60rpx;
	}

	.btn1 {
		width: 200rpx;
		height: 64rpx;
		border-radius: 32rpx;
		border: 2rpx solid #FFFFFF;
		color: #fff;
		text-align: center;
		line-height: 64rpx;
		margin-right: 40rpx;
	}

	.btn2 {
		width: 200rpx;
		height: 64rpx;
		border-radius: 32rpx;		
		border: 2rpx solid #FFFFFF;
		background: #FFFFFF;
		color: #FF9D3E;
		text-align: center;
		line-height: 64rpx;
	}
	.liyou{
		width: 700rpx;
		margin-left: 30rpx;
		color: #666666;
		font-size: 28rpx;
		margin-top: 40rpx;
	}
</style>
