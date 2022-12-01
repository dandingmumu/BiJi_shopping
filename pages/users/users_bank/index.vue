<template>
	<view>
		<view class="userInfo">
			<view class="userInfo-title">
				请核实身份证信息内容
			</view>
			<view style="border-top: 1px solid #D8D8D8; width: 90%; margin: 0 auto;margin-bottom: 30rpx;"></view>
			<view class="userInfo-info">
				<view class="userInfo-info-left">姓名</view>
				<view class="userInfo-info-right">
					<input type="text" placeholder='请输入你的姓名' v-model='realname'>
				</view>
			</view>
			<view class="userInfo-info">
				<view class="userInfo-info-left">身份证号</view>
				<view class="userInfo-info-right">
					<input type="idcard" placeholder='请输入你的身份证号' v-model='idcard_number' maxlength='18'>
				</view>
				<!-- 	<view class="zright">
					<image src="../../../static/images/xj.png"
						style='width: 40rpx; height: 30rpx;vertical-align: middle;' mode="widthFix"></image>
					拍照识别
				</view> -->
			</view>
			<view class="userInfo-info">
				<view class="userInfo-info-left">银行卡号</view>
				<view class="userInfo-info-right">
					<input type="number" placeholder='请输入你的银行卡号' v-model='bankcard_number'>
				</view>
				<!-- <view class="zright">
					<image src="../../../static/images/xj.png"
						style='width: 40rpx; height: 30rpx;vertical-align: middle;' mode="widthFix"></image>
					拍照识别
				</view> -->
			</view>
			<view class="userInfo-info">
				<view class="userInfo-info-left">手机号</view>
				<view class="userInfo-info-right">
					<input type="number" placeholder='请输入你的手机号' v-model='mobile_number' maxlength='11'>
				</view>
			</view>
			<view class="userInfo-info">
				<view class="userInfo-info-left">验证码</view>
				<view class="userInfo-info-right">
					<input type="number" placeholder='请输入你的验证码' v-model='captcha' maxlength='4'>
				</view>
				<view class="zright" @click='getCode'>
				{{codeText}} 
				<span v-if="codeText!='获取验证码' ">S</span>
				</view>
			</view>
		</view>
		<view class="xieyi">
			<radio-group @change="radioChange" style='display: inline-block;'>
				<radio v-model='radio' />
			</radio-group>
			以阅读并同意 <span style='	color: #FF9A17;'>《自由服务者协议》</span>
		</view>

		<view class="btn" @click='handelbind'>提交认证</view>
	</view>
</template>

<script>
	import {
		bindBank,
		getSms
	} from '../../../api/public.js'
	import {
		Toast
	} from 'vant'
	export default {
		data() {
			return {
				radio: false,
				realname: '',
				bankcard_number: '',
				mobile_number: '',
				idcard_number: '',
				codeText: '获取验证码',
				captcha:''
			}
		},
		methods: {
			radioChange(e) {
				this.radio=true
			},
			handelbind() {
				if(!this.radio){
					Toast.fail('请先阅读协议')
					return
				}
				const data = {
					realname: this.realname,
					bankcard_number: this.bankcard_number,
					mobile_number: this.mobile_number,
					idcard_number: this.idcard_number,
					captcha:this.captcha
				}
				bindBank(data).then(res => {
					uni.redirectTo({
						url:'/pages/my/index'
					})
				}).catch(err => {
					Toast.fail(err)
				})
			},
			getCode() {
				
				if (this.mobile_number == '') {
					Toast.fail('请输入手机号')
					return
				}
				if (!(/^1[3456789]\d{9}$/.test(this.mobile_number))) {
					Toast.fail('请填写正确的手机号')
					return false;
				}
				getSms({phone:this.mobile_number}).then(res=>{
					Toast.success(res.msg)
				}).catch(err=>{
					Toast.fail(err)
				})
				this.codeText = 60
				setInterval(()=>{
					this.codeText =this.codeText-1 
					if(this.codeText==0){
						this.codeText ='获取验证码'
					}
				},1000)
			}
		}
	}
</script>

<style lang='scss'>
	page {
		background-color: #FAFAFA;
		overflow-x: hidden;
	}

	.userInfo {
		background-color: #fff;
		padding-bottom: 20rpx;
		font-size: 26rpx;

		.userInfo-title {
			width: 100%;
			padding: 40rpx;
			font-size: 32rpx;
			color: #2A2A2A;
		}

		.userInfo-info {
			display: flex;
			padding: 20rpx 40rpx;
			font-size: 28rpx;
		}

		.userInfo-info-left {
			width: 26%;
		}

		.userInfo-info-right {
			flex: 1;
		}

		.zright {
			font-size: 24rpx;

			color: #FF9A17;
		}
	}

	.xieyi {
		text-align: center;
		color: #B1B1B1;
		font-size: 28rpx;
		margin-top: 40rpx;
	}

	.btn {
		width: 583rpx;
		height: 90rpx;
		background: #FFB14C;
		border-radius: 8px;
		text-align: center;
		line-height: 90rpx;
		color: #fff;
		font-size: 32rpx;
		margin: 140rpx auto;
	}
</style>
