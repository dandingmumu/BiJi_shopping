<template>
	<view class="content">
		<view class="userInfo">
			<view class="">
				头像
			</view>
			<view class="userInfoAvatar">
				<van-image width="126rpx" height="126rpx" :src="userInfo.avatar" />
			</view>
		</view>
		<view class="partingLine"></view>
		<van-cell-group inset>
			<van-cell title="性别" size="large" :value="userInfo.sex==0?'保密':userInfo.sex==1?'男':userInfo.sex==2?'女':'保密'  " />
			<!-- <van-cell title="年龄" size="large" value="内容" is-link @click="show = true" /> -->
			<van-cell title="手机号" size="large" :value="userInfo.phone"  is-link  />
		</van-cell-group>
		<view class="bankCard" @click='txbank' v-if='userInfo?.is_bank==0'>
			<view style="flex: 1;">提现银行卡</view>
			<view>去认证
				<van-icon name="arrow" />
			</view>
		</view>
		<van-action-sheet v-model:show="show" :actions="actions" cancel-text="取消" description="选择性别"
			close-on-click-action :close-on-click-overlay="false" @cancel="onCancel" />
	</view>
</template>

<script>
	import cache from '@/utils/cache.js'
	export default {
		data() {
			return {
				show: false,
				actions: [{
						name: '选项一'
					},
					{
						name: '选项二'
					}
				],
				userInfo: cache.get('USER_INFO'), //
				
			}
		},
		onLoad() {
			// this.getProperty()
			if (this.userInfo != undefined) {
				this.userInfo = JSON.parse(this.userInfo)
			}
		},
		methods: {
			onCancel: function() {
				this.show = false
			},
			txbank(){
				uni.navigateTo({
					url:'/pages/users/users_bank/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	body{
		overflow-x: hidden;
	}
	.userInfo {
		width: 670rpx;
		height: 126rpx;
		margin: 10rpx auto 0;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16px 30px;
	}

	.userInfoAvatar {
		width: 126rpx;
		height: 126rpx;
		border-radius: 109rpx;
		border: 1px solid #979797;
		overflow: hidden;
	}

	.bankCard {
		display: flex;
		width: 620rpx;
		height: 126rpx;
		margin: 50rpx auto 0;
		padding: 0 26rpx;
		background: #ff9957;
		border-radius: 6px;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #fff;
		line-height: 126rpx;
		// border: 2rpx solid #fc904a;
	}
	.partingLine {
		width: 100%;
		height: 19rpx;
		background: #f6f6f6;
	}
	::v-deep .van-cell{
		line-height: 60rpx;
	}
	::v-deep .van-cell__right-icon{
		margin-top: 10rpx;
	}
</style>
