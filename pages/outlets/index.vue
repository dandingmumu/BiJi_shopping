<template>
	<view>
		<view class="detailsInfoLocation" v-for="(item,index) in merchantInfo">
			<view class="" >
				<view class="detailsInfoLocation__dishName">
					{{ item.title }}
				</view>
				<view class="detailsInfoLocation__road">
					<span>{{ item.address }}</span>
					<!-- <van-icon name="coupon" color="#4391FF" size="50rpx"
						style="margin: 0rpx 50rpx 0rpx 0rpx;" /> -->
					<van-icon name="phone-circle" color="#4391FF" size="60rpx" @click='callPhone(item.mobile)' />
				</view>
			</view>
			<view class="detailsInfoLocation__distance">
				<view class="detailsInfoLocation__distanceLocation">
				<van-icon name="location" size="40rpx" />
					距您{{ item.distance }}km
				</view>
				<view class="detailsInfoLocation__distanceNavigation" @click='handelMap(item.location,item.address)'>
					导航
					<van-icon name="arrow" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getmerchant} from '../../api/outlets.js'
	export default {
		data() {
			return {
				merchantInfo:{
				},
				params:{}
			}
		},
		onLoad(options) {
			this.params=options
			console.log(options);
			let that=this
			getmerchant(options).then(res=>{
				console.log(res);
				that.merchantInfo=res.data.list
			}).catch(err => {

				})
		},
		methods: {
			// 点击导航
			handelMap(location,address) {
				let key = '6ITBZ-OEA62-WXGUX-CLPRV-HUTIJ-CEBVF'
				// let aaa=`https://apis.map.qq.com/uri/v1/routeplan?type=bus&fromcoord=${this.fromcoord}&to=${this.toname}&tocoord=${this.tocoord}&policy=1&referer=${key}`
			
				window.location.href =
					`https://apis.map.qq.com/uri/v1/routeplan?type=bus&from=我的位置&fromcoord=${this.params.location}&to=${address}&tocoord=${location}&policy=1&referer=${key}`
			},
			// 拨打电话
			callPhone(mermobile) {
				uni.makePhoneCall({
					phoneNumber: mermobile
				});
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f6f6f6;
	}
	.detailsInfoLocation {
			margin: 20rpx 48rpx 48rpx;
			background-color: #fff;
			border-radius: 20rpx;
			&__cell {
				display: flex;
				align-items: flex-end;
				justify-content: space-between;
				

				.cell-left {
					// width: 144px;
					// height: 36px;
					font-size: 36rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #434343;
					line-height: 36rpx;
				}

				.cell-right {
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #434343;
					line-height: 24rpx;
				}
			}

			&__dishName {
				width: 88%;
				padding: 40rpx 0 30rpx 0;
				height: 36rpx;
				margin-bottom: 5rpx;
				font-size: 30rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #434343;
				line-height: 36rpx;
				margin: 0 auto;
				border-bottom: 1px solid #eee;
				
			}

			&__road {
				display: flex;
				align-items: center;
				justify-content: space-between;
					margin: 20rpx 40rpx;
				& span {
					flex: 1;
					width: 412rpx;
					height: 24rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #9f9f9f;
					line-height: 24rpx;
				}
			}

			&__distance {
				display: flex;
				align-items: center;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #434343;
				line-height: 24rpx;
				margin-top: 0rpx;
			}

			&__distanceLocation {
				// width: 106px;
				// height: 24px;
				margin: 0 16rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #434343;
				line-height: 24rpx;
				padding-bottom: 24rpx;
				color: #9f9f9f;
			}

			&__distanceNavigation {
				// width: 56px;
				// height: 24px;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #347DFF;
				line-height: 24rpx;
				padding-bottom: 16rpx;
			}

		}

</style>
