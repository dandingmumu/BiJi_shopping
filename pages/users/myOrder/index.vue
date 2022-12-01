<template>
	<view class="">
		<view class="shopping-tabs">
			<view class="tabsItem" :class="tabsActive == 0 ? 'on' : ''" @click="statusClick(0)">
				<span>全部</span>
			</view>
			<view class="tabsItem" :class="tabsActive == 1 ? 'on' : ''" @click="statusClick(1)">
				<span>已支付</span>
			</view>
			<view class="tabsItem" :class="tabsActive == 2 ? 'on' : ''" @click="statusClick(2)">
				<span>已预约</span>
			</view>
			<view class="tabsItem" :class="tabsActive == 3 ? 'on' : ''" @click="statusClick(3)">
				<span>已完成</span>
			</view>
			<view class="tabsItem" :class="tabsActive == 4 ? 'on' : ''" @click="statusClick(4)">
				<span>退款/售后</span>
			</view>
		</view>
		<view class="shopping-orderList"  v-if="orderList.length != 0" >
			<view class="orderListItem" v-for="(item,index) in orderList" :key='index' >
				<view class="orderListItem__header">
					<view class="orderListItem__headerLogo">
						<van-image
						  width="44rpx"
						  height="44rpx"
						  fit="contain"
						  src="../../../static/images/logo.png"
						/>
					</view>
					<view class="orderListItem__headerTitle">
						荟氪玩家  
					</view>
					<view class="orderListItem__headerExtra">
						 <!-- {{item?.status}} -->
						 <view v-if='item.status==1'>已付款</view>
						 <view v-if='item.status==2'>待评价</view>
						 <view v-if='item.status==-2' style='color:#FF0D0D;'>已退款</view>
						 <view v-if='item.status==-1' style='color:#FF0D0D;'>已申请退款</view>
					</view>
				</view>
				<view style="border: 1rpx solid #EEEEEE; width: 88%; margin: 0 auto;"></view>
				<view class="orderListItem__body">
					<view class="orderListItem__bodyThumbnail">
						<image  :src="item.withProductInfo.recommend_image" mode="widthFix"></image>
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
						<!-- 是不是退款 -->
						<view class="" v-if='item?.refund_status==-2'>
							<image src="../../../static/images/ytk.png" style='width: 80rpx; height: 80rpx; margin-top: 20rpx;' mode=""></image>
						</view>
					</view>
				</view>
					<view style="border: 1rpx solid #EEEEEE; width: 88%; margin: 0 auto;"></view>
				<view class="orderListItem__footer">
					<!-- <van-button :type="item._status._type==0? 'danger': item._status._type==1? 'warning' :item._status._type==2?'success':item._status._type==-1?'primary': 'default' " size="small">{{item._status._title}}</van-button> -->
					<view class="text">
						总价：<span style='color: #FF0D0D;'>￥{{item.withAttrsValues.price}}</span>
					</view>
					<view class="btn">
						<!-- 再来一单 -->
						<view class="zlyd" @click='gotoshop(item.withProductInfo.id)'>
							再来一单
						</view>
						<view class="zlyd" style='margin-left: 10rpx;' @click='gotoDetail(item.unique)'>
							查看详情
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="shopping-orderListEmpty" v-if="orderList.length == 0">
			<van-empty :image="no_data" image-size="747rpx" description="暂无订单" />
		</view>
	</view>
</template>

<script>
	import no_data from '../../../static/icon/no-data.png'
	import {getOrderList} from '../../../api/order.js'
	export default {
		data() {
			return {
				// 订单状态
				tabsActive: 0,
				// 订单数组
				orderList: []
			}
		},
		onLoad(options) {
			this.getOrderlist(options.active)
			this.tabsActive=options.active
			
		},
		methods: {
			// 获取订单列表
			getOrderlist(type){
				let that=this
				getOrderList(type!=0?type:'').then(res=>{
					this.orderList=res.data.list
				}).catch(err=>{
					
				})
			},
			/**
			 * 切换类型
			 * @param {Object} status
			 */
			statusClick: function(status) {
				if (status == this.tabsActive) return;
				this.tabsActive = status;
				this.loadend = false;
				this.page = 1;
				this.getOrderlist(status);
			},
			gotoDetail(order_id){
				uni.navigateTo({
					url:'/pages/users/employ_order/index?order_id='+order_id
				})
			},
			gotoshop(id){
				uni.navigateTo({
					url:'/pages/details/index?id='+id
				})
			},
		}
	}
</script>

<style lang="scss">
	body {
		background-color: #FAFAFA;
	}

	.shopping-tabs {
		display: flex;
		justify-content: space-around;
		margin: 46rpx 20rpx 0;
		background-color: transparent;

		.tabsItem {
			position: relative;
			padding: 10rpx 0;
			text-align: center;
			font-size: 13px;
			color: #282828;
			
		}

		.tabsItem.on {
			font-weight: 700;
			border-color: #FF7B40;
		}
		
		.tabsItem.on::after {
			content: '';
			position: absolute;
			left: 50%;
			bottom: -15rpx;
			transform: translateX(-50%);
			width: 34rpx;
			height: 6rpx;
			border-bottom: 6rpx solid #FF7B40;
		}
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
			box-shadow: 0rpx 6rpx 26rpx 0px rgba(0,0,0,0.05);
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
			.text{
				width: 50%;
			}
			.btn {
				// border-radius: 10rpx;
				text-align: right;
				.zlyd{
					display: inline-block;
					width: 130rpx;
					height: 50rpx;
					border: 1px solid #979797;
					border-radius: 40rpx;
					text-align: center;
					line-height: 50rpx;
					font-size: 22rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #2A2A2A;
					margin: 0 10rpx;
				}
			}
		}
	}
	
	.shopping-orderListEmpty {
		margin-top: 45rpx;
		// background: #FFFFFF;
		// box-shadow: 0px 6rpx 26rpx 0px rgba(0,0,0,0.05);
		// border-radius: 40rpx;
	}
</style>
