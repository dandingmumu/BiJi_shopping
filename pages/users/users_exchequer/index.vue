<template>
	<view class="">
		<view class="userinfo-exchequer">
			<van-notice-bar class="notice-swipe" left-icon="volume-o" :scrollable="false" text="专属客服已上线，可以随时提现！"
				color="#FFFFFF" background="rgba(255,206,166,0.32)" />
			<view class="userinfo-exchequer__title">
				<view class="earnings">
					平台总收益（元）
				</view>
				<view class="unitary">
					一元提现
				</view>
			</view>
			<view class="userinfo-exchequer__withdrawDeposit">
				<view class="price">
					0
				</view>
				<view class="withdrawDeposit" @click='gotocash'>
					<button>申请体现</button>
				</view>
			</view>
			<view class="userinfo-exchequer__balance">
				<van-row gutter="20">
					<van-col span="8" style='position: relative;'>
						<van-icon name="question-o" @click='pointOut' size='42rpx' color='#ffaa00'
							style='position: absolute; top: -20rpx; right: 36rpx;' />
						<span style="margin-bottom: 29rpx;">待入账</span>
						<span style="margin-bottom: 31rpx;">{{Property.undeterminedNum}}</span>
					</van-col>
					<van-col span="8" style='position: relative;'>
						<van-icon name="question-o" @click='cash' size='42rpx' color='#ffaa00'
							style='position: absolute; top: -20rpx; right: 26rpx;' />
						<span style="margin-bottom: 29rpx;">可提现</span>
						<span style="margin-bottom: 31rpx;">{{Property.numMoney}}</span>
					</van-col>
					<van-col span="8">
						<span style="margin-bottom: 29rpx;">已提现</span>
						<span style="margin-bottom: 31rpx;">{{Property.usersExtractNum}}</span>
					</van-col>
				</van-row>
				<van-row gutter="20">
					<van-col span="8">
						<span style="margin-bottom: 29rpx;">直卖收益</span>
						<span style="margin-bottom: 21rpx;">{{Property.directSellingNum}}</span>
					</van-col>
					<van-col span="8">
						<span style="margin-bottom: 29rpx;">团队收益</span>
						<span style="margin-bottom: 21rpx;">{{Property.teamNum}}</span>
					</van-col>
					<van-col span="8">
						<span style="margin-bottom: 29rpx;">我的团队</span>
						<span style="margin-bottom: 1rpx;">{{Property.team}}</span>
					</van-col>
				</van-row>
			</view>
		</view>
		<!-- 订单 -->
		<view class="userInfo-order">
			<van-tabs style="margin-top: 28rpx;" v-model:active="active" color="#FFAD6A" background="#F4F4F4" @click-tab="onClickTab">
				<van-tab title="收益订单">
					<view class="shopping-orderList" v-if="orderList.length != 0">
						<view class="orderListItem" v-for="(item,index) in orderList" :key='index'>
							<view class="orderListItem__header">
								<view class="orderListItem__headerTitle">
									订单号：{{item.order_id}}
								</view>
								<view class="orderListItem__headerExtra">
									<view v-if='item.status==1'>已付款</view>
									<view v-if='item.status==2'>待评价</view>
									<view v-if='item.status==-2' style='color:#FF0D0D;'>已退款</view>
								</view>
							</view>
							<view style="border: 1rpx solid #EEEEEE; width: 88%; margin: 0 auto;"></view>
							<view class="orderListItem__body">
								<view class="orderListItem__bodyThumbnail">
									<image :src="item.withProductInfo.recommend_image" mode="widthFix"></image>
								</view>
								<view class="orderListItem__bodyDetails">
									<view class="title">
										{{item.withProductInfo.title}}
									</view>
									<view class="info">
										{{item.withAttrsValues.suk}}
									</view>
									<view class="price">
										<!-- 总价：￥{{item.withProductInfo.attrInfo.price}} -->
									</view>
								</view>
								<view class="price">
									￥{{item.withAttrsValues.price}}
									<view style='text-align: right; margin-top: 20rpx;'>x{{item?.total_num}}</view>
								</view>
							</view>
							<view style="border: 1rpx solid #EEEEEE; width: 88%; margin: 0 auto;"></view>
							<view class="orderListItem__footer">

								<view class="avatar">
									<view class="avatarImg">
										<image :src="userInfo.avatar" />
										<span class='text'>{{userInfo.nickname}}</span>
									</view>
								</view>
								<view class="text-right">
									<view class="">
										佣金：
										<span class='text-red'
											v-if='item?.refund_status==1'>￥{{item.back_price}}（待入账）</span>
										<span class='text-red' style='text-decoration: line-through;'
											v-if='item?.refund_status==-2'>￥{{item.back_price}}</span>
										<span class='text-black' v-if='item?.refund_status==-2'>￥0</span>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="ListEmpty" v-if="orderList.length== 0">
						<van-empty image-size="307rpx" description="暂无收益订单" />
					</view>
				</van-tab>
				<van-tab title="提现记录" >
					<view class="TxList" v-if='txList.length!=0'>
						<view class="TxItem" v-for="(item,index) in txList">
							<view class="TxItem-title">
								{{item.title}}
								
								<view class="" style='margin: 20rpx 0; font-size: 26rpx; color: #939393;'>{{item.add_time}}</view>
							</view>
							<view class="TxItem-price">
								-{{item.number}}
							</view>
						</view>
					</view>
					<view class="ListEmpty" v-if='txList.length==0'>
						<van-empty image-size="307rpx" description="暂无提现记录" />
					</view>
				</van-tab>
			</van-tabs>

		</view>
	</view>
</template>

<script>
	import {
		Dialog
	} from 'vant'
	import {
		getusersProperty,
		getcommission
	} from '../../../api/public.js'
	import {
		getOrderList
	} from '../../../api/order.js'
	import cache from '@/utils/cache.js'
	export default {
		data() {
			return {
				Property: {},
				txList: [],
				orderList: [],
				userInfo: cache.get('USER_INFO'), //
				
			}
		},
		onLoad() {
			// this.getProperty()
			if (this.userInfo != undefined) {
				this.userInfo = JSON.parse(this.userInfo)
			}
		},
		onShow() {
			this.getProperty()
			this.getOrderlist()
		},
		methods: {
			pointOut() {
				Dialog.alert({
					title: '待入账金额说明',
					confirmButtonText: '了解',
					confirmButtonColor: '#5555ff',
					message: '用户已支付但未核销的订单佣金统计在待入账金额\n用户退款时将会扣除对应的佣金\n用户核销成功对应佣金将可提现\n(以上仅限随心退订单，非随心退订单直接到可提现)\n电商产品在商家上传快递单号之前佣金统计在待入账金额',
				}).then(() => {
					// on close
				});
			},
			cash() {
				Dialog.alert({
					title: '可提现金额说明',
					confirmButtonText: '了解',
					confirmButtonColor: '#5555ff',
					message: '用户已支付成功且核销的订单佣金\n可提现\n电商产品在商家上传快递单号后，佣金\n可提现',
				}).then(() => {
					// on close
				});
			},
			getProperty() {
				let that = this
				getusersProperty().then(res => {
					that.Property = res.data
				}).catch(err => {

				})
			},
			// 跳转提现页面
			gotocash() {
				uni.navigateTo({
					url: '/pages/users/users_draw/index?numMoney=' + this.Property.numMoney
				})
			},
			// 获取提现记录
			commission() {
				let that = this
				getcommission().then(res => {
					console.log(res);
					that.txList = res.data.list
				}).catch(err => {

				})
			},
			// 获取订单列表
			getOrderlist() {
				let that = this
				getOrderList('').then(res => {
					this.orderList = res.data.list
				}).catch(err => {

				})
			},
			onClickTab(e){
				if(e.name==0){
					this.getOrderlist()
				}
				if(e.name==1){
					
				this.commission()
				}
			}
		}
	}
</script>

<style lang="scss">
	body {
		background: #F4F4F4;
	}

	.userinfo-exchequer {
		// width: 750rpx;
		height: 743rpx;
		background: linear-gradient(126deg, #FFA96A 0%, #F4A75D 100%);
		overflow: hidden;

		.notice-swipe {
			height: 111rpx;
			line-height: 111rpx;
		}

		&__title {
			display: flex;
			justify-content: space-between;
			margin: 38rpx 45rpx;

			.earnings {
				// width: 256px;
				// height: 36px;
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				// line-height: 36rpx;
			}

			.unitary {
				width: 144rpx;
				height: 48rpx;
				background: #FFF6C8;
				border-radius: 8rpx;
				text-align: center;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FF391E;
				line-height: 48rpx;
			}
		}

		&__withdrawDeposit {
			display: flex;
			align-items: flex-end;
			justify-content: space-between;
			margin: 38rpx 45rpx;

			.price {
				// width: 48px;
				// height: 80px;
				font-size: 80rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 80rpx;
			}

			.withdrawDeposit button {
				width: 213rpx;
				height: 77rpx;
				background: linear-gradient(360deg, #FFCE9F 0%, #FFFFFF 100%);
				border-radius: 47rpx;

				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #D77B22;
				line-height: 77rpx;
			}
		}

		&__balance {
			// width: 647rpx;
			// height: 407rpx;
			background: linear-gradient(180deg, #FFD1AE 0%, #F99C4E 100%);
			border-radius: 8rpx;
			border: 2rpx solid;
			border-image: linear-gradient(180deg, rgba(255, 255, 255, 1), rgba(249, 162, 89, 1)) 2 2;
			margin: 0 45rpx;
			padding: 48rpx 0;
			text-align: center;
			overflow: hidden;

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
		margin-top: -110rpx;
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

	.ListEmpty {
		background: #FFFFFF;
		box-shadow: 0px 6rpx 26rpx 0px rgba(0, 0, 0, 0.05);
		border-radius: 40rpx;
		width: 640rpx;
		margin: 0rpx auto;
		margin-top: 30rpx;
	}

	.shopping-orderList {
		width: 747rpx;
		// height: 1073px;
		margin-top: 45rpx;

		.orderListItem {
			width: 690rpx;
			// height: 398rpx;
			margin: 0 auto 40rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 6rpx 26rpx 0px rgba(0, 0, 0, 0.05);
			border-radius: 40rpx;
			overflow: hidden;
		}

		.orderListItem__header {
			display: flex;
			align-items: center;
			margin: 41rpx 40rpx 36rpx;
		}

		.orderListItem__headerLogo {
			width: 44rpx;
			height: 44rpx;
			margin-right: 26rpx;
			// border-radius: 10rpx;
			overflow: hidden;
		}

		.orderListItem__headerTitle {
			flex: 1;
			height: 36rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #191919;
			line-height: 36rpx;
		}

		.orderListItem__headerExtra {
			// width: 83px;
			// height: 30px;
			margin-top: 6rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #909090;
			line-height: 30rpx;
		}

		.orderListItem__body {
			display: flex;
			// align-items: center;
			margin: 30rpx 44rpx;
		}

		.orderListItem__bodyThumbnail {
			width: 140rpx;
			height: 140rpx;
			margin-right: 29rpx;
			border-radius: 10rpx;
			overflow: hidden;
		}

		.orderListItem__bodyDetails {
			.title {
				// width: 193px;
				// height: 26px;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #414141;
				line-height: 26rpx;
			}

			.info {
				// width: 233px;
				// height: 26px;
				margin-top: 22rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #989898;
				line-height: 26rpx;
			}

		}

		.price {
			font-size: 22rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #414141;
			line-height: 26rpx;
			margin-left: 10rpx;

		}

		.orderListItem__footer {
			margin: 30rpx;
			flex: 1;
			font-size: 26rpx;
			align-items: center;
			display: flex;

			.avatar {
				width: 50%;
			}

			.avatarImg image {
				width: 50rpx;
				height: 50rpx;
				vertical-align: middle;
				border-radius: 50%;
			}

			.avatarImg .text {
				display: inline-block;
				margin-left: 20rpx;
				color: #8D8D8D;
			}

			.text-right {
				flex: 1;
				// border-radius: 10rpx;
				text-align: right;
				color: #8D8D8D;
			}

			.text-red {
				color: #FF1515;
			}

			.text-black {
				color: #000;
			}
		}
	}
	.TxList{
		width: 690rpx;
		// height: 398rpx;
		margin: 50rpx auto;
		background: #FFFFFF;
		box-shadow: 0rpx 6rpx 26rpx 0px rgba(0, 0, 0, 0.05);
		border-radius: 40rpx;
		overflow: hidden;
	}
	.TxItem:last-child{ 
	 border: none;
	}
	.TxItem{
		margin:30rpx 40rpx;
		display: flex;
		border-bottom: 1px solid #CFCFCF;
		.TxItem-title{
			width: 50%;
		}
		.TxItem-price{
			font-size: 30rpx;
			color: #FFAD6A;
			text-align: right;
			flex: 1;
			margin-top: 20rpx;
		}
	}
</style>
