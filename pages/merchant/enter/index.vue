<template>
	<view class="content">
		<view class="ipone">
			手机号登录
		</view>
		<view class="shopping-input">
			<input class="uni-input" type='number' v-model='phone' placeholder="输入手机号码" maxlength='11' />
		</view>
		<view class="" style='margin-top: 40rpx; width: 720rpx;margin-left: 20rpx;' v-if='showKeyboard'>
			<span style='display: inline-block;color: #969799;margin: 0 30rpx;margin-bottom: 30rpx;'>请输入验证码</span>
			<van-password-input :mask="false" :value="value" :focused="showKeyboard" @focus="showKeyboard = true"
				:length='4' />
		</view>
		<view class="shopping-checkbox">
			<van-checkbox v-model="checked" shape="square">
				<span style="color: #AFAFAF;">我已阅读并同意</span><span style="font-weight: 400;color: #FF7B40;">《隐私条款》</span>
			</van-checkbox>
		</view>
		<view class="shopping-button" @click='link'>
			<van-button type="default" block>下一步</van-button>
		</view>
	<!-- 	<view class="shopping-footer">
			已有账号，去<span style="color: #FF7B40;">登录</span>
			<van-icon name="arrow" />
		</view> -->
		<van-number-keyboard v-model="value" :show="showKeyboard" @blur="showKeyboard1 = false"  />
	</view>
</template>

<script>
	import {
		Toast
	} from 'vant'
	import {
		getSms
	} from '../../../api/public.js'
	export default {
		data() {
			return {
				checked: false,
				phone: '',
				value: '',
				showKeyboard: false,
				showKeyboard1:false
			}
		},
		methods: {
			link() {
				if (!this.checked) {
					Toast.fail('请先阅读服务协议')
					return
				}
				let that=this
				if(this.showKeyboard){
					Toast.success('登录成功')
					uni.navigateTo({
						url: "/pages/users/users_vault/index"
					})
					return
				}
				getSms({
					phone: this.phone
				}).then(res => {
				that.showKeyboard=true
				that.showKeyboard1=true
				}).catch(err => {
					Toast.fail(err)
				})
				
			},
		}
	}
</script>

<style lang="scss">
	.ipone {
		width: 250rpx;
		height: 50rpx;
		margin: 82rpx 55rpx;
		font-size: 50rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #191919;
		line-height: 50rpx;
	}


	.shopping-input {
		width: 655rpx;
		margin: 0 55rpx;
		padding: 10rpx 0;
		border-bottom: 1px solid #979797;
	}

	.shopping-checkbox {
		width: 655rpx;
		margin: 74rpx 55rpx;
	}

	.shopping-button {
		width: 655rpx;
		margin: 120rpx 55rpx 0;

		.van-button {
			border-radius: 4px;
			background-color: #F4F4F4;
			color: #191919;
		}
	}

	.shopping-footer {
		width: 655rpx;
		height: 30rpx;
		margin: 74rpx 55rpx;
		font-size: 30rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #AFAFAF;
		line-height: 30rpx;
	}

	// .uni-input {
	// 	height: 100rpx;
	// }
</style>
