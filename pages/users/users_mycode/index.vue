<template>
	<view style='width: 100%; position: relative;'>
		<view class="head">

		</view>
		<image src="../../../static/images/myYq.png" style='width: 100%;' mode="widthFix"></image>
		<view class='userinfo'>
			<view class="avatar">
				<image src="../../../static/icon/pictureFrame.png" class='img1' style='width: 120rpx; height: 120rpx;'  mode="widthFix"></image>
				<view class="">
					<image :src="userInfo.avatar" class='img2' style='width: 120rpx; height: 120rpx;'  mode="widthFix"></image>
					<view class="text">
						<view class="my-name">{{userInfo.name}}</view>
						<!-- <view class="my-team">我的团队：{{userInfo.team}}</view> -->
					</view>
				</view>
		  </view>
	</view>
	</view>
</template>

<script>
	import cache from '@/utils/cache.js'
	export default {
		data() {
			return {
				 userInfo: cache.get('USER_INFO'), //
			}
		},	
		onLoad() {
			if (this.userInfo != undefined) {
				this.userInfo = JSON.parse(this.userInfo)
			}
		},
		methods: {

		}
	}
</script>

<style lang='scss'>
	page {
		/* overflow: hidden; */
	}

	.head {
		width: 100%;
		/* background-color: red; */
		height: 100rpx;
		background-color: #1bbd8e;
	}

	.userinfo {
		position: absolute;
		width: 100%;
		top: 0;
	}

	.avatar {
		position: relative;
		margin: 0px;
		/* left: 20rpx; */
		box-sizing: border-box;
		border-radius: 50%;
	}
	.avatar .img1{
		position: absolute;
		left: 40rpx;
		top: 60rpx;
		z-index: 6;
	}
	.avatar .img2{
		position: absolute;
		left: 60rpx;
		top: 74rpx;
		width: 84rpx !important;
		height: 84rpx !important;
	}
	.text{
		position: absolute;
		left: 200rpx;
		top: 74rpx;
		color: #fff;
		.my-name{
			
		}
		.my-team{
			font-size: 24rpx;
			margin-top: 14rpx;
		}
	}
</style>
