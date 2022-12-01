<template>
	<view>
		<view class="Top">
			<image class='imgB' src="../../../static/images/talentTop.png" mode="widthFix"></image>
			<view class="Yqbtn" @click='handelYq'></view>
		</view>

		<view class='info'>
			<image class='imgB' src="../../../static/images/talentInfo.png" mode="widthFix"></image>
			<view class="fromInfo">
				<van-field class="shopping-search_s" v-model="name" autosize clearable autocomplete="false"
					placeholder="你的姓名" />
				<van-field class="shopping-search_s" v-model="phone" autosize clearable autocomplete="false"
					placeholder="请输入手机号码" />
				<view class="addDR" @click='add'>
					加入达人
				</view>
				<view class="text">
					<checkbox v-model="checked" @click='checkedChange' color="#FFCC33" style="transform:scale(0.7)" />
					我已阅读并同意<span style='color: #ff0c0c;'>《荟氪玩家服务协议》</span>
				</view>
			</view>

		</view>
		<view class="bottom">
			<image class='imgB' src="../../../static/images/talentadd.png" mode="widthFix"></image>
		</view>
		<view :class=" btnBottomcss? 'btnBottom' : 'btnBottom btnBottomfixed' " @click='gotoback'>
			<image class='imgB' src="../../../static/images/talentaddbtn.png" mode="widthFix"></image>
		</view>
		<view class=""  v-if='!btnBottomcss' style='height: 150rpx; width: 100%;'></view>
	</view>
</template>

<script>
	import {
		Toast
	} from 'vant'
	import {expertRegister} from '../../../api/public.js'
	export default {
		data() {
			return {
				name: undefined,
				phone:undefined,
				checked: false,
				btnBottomcss:false,
			}
		},
		onLoad(options) {
			console.log(options);
			this.phone=options.user_phone
		},
		onShow() {
		},
		onPageScroll(e) {
			if(e.scrollTop>100){
				this.btnBottomcss=false
			}else{
				this.btnBottomcss=true
			}
		},
		methods: {
			handelYq() {
			
			},
			checkedChange(e) {
				this.checked = !this.checked
			},
			add() {
				if (!this.checked) {
					Toast.fail('请先阅读服务协议')
					return
				}
				if(this.name==undefined){
					Toast.fail('请填写姓名')
					return
				}
				if(this.phone==undefined){
					Toast.fail('请填写手机号')
					return
				}
				const data={
					phone:this.phone,
					realname:this.name
				}
				expertRegister(data).then(res=>{
					Toast.success(res.msg)
					uni.reLaunch({
						url:'/pages/my/index'
					})
				}).catch(err=>{
					Toast.fail(err.msg)
				})
			},
			gotoback(){
				document.documentElement.scrollTop = 0
			}
		}
	}
</script>

<style>
	body {
		overflow-x: hidden;
		background-color: #fd2352;
		/* background: linear-gradient(to bottom, #FF8F88, #fd2352); */
	}

	.imgB {
		width: 100%;
		height: 100%;
	}

	.Top {
		width: 100%;
		position: relative;
	}

	.Yqbtn {
		width: 330rpx;
		height: 80rpx;
		background-color: royalblue;
		border-radius: 20rpx;
		position: absolute;
		bottom: 140rpx;
		left: 210rpx;
		opacity: 0;
	}

	.info {
		position: relative;
		width: 100%;
	}

	.info image {
		margin-top: -10rpx;
	}

	.fromInfo {
		width: 620rpx;
		height: 375rpx;
		/* background-color: #000; */
		position: absolute;
		top: 60rpx;
		left: 66rpx;
	}

	.shopping-search_s {
		background-color: transparent;
		outline: none;
		font-size: 22rpx;
		background-color: #F1F1F1;
		width: 84%;
		text-align: center;
		margin: 0 auto;
		margin-top: 30rpx;
		border-radius: 40rpx;
		height: 76rpx;
		line-height: 40rpx !important;
	}

	.addDR {
		width: 428rpx;
		height: 80rpx;
		background: linear-gradient(to bottom, #ffa190, #ff2552);
		color: #fff;
		font-size: 34rpx;
		text-align: center;
		border-radius: 40rpx;
		margin: 30rpx auto;
		/* margin-top: rpx; */
		line-height: 80rpx;
	}

	.text {
		text-align: center;
		font-size: 26rpx;
		vertical-align: middle;
	}

	.bottom {
		margin-top: -20rpx;
	}

	.btnBottom {
		width: 100%;
		height: 150rpx;
		background-color: #ff2552;
		border-radius: 40rpx 40rpx 0 0;
		/* position: fixed; */
		bottom: 0;
	}

	.btnBottom image {
		margin-top: 20rpx;
	}
	.btnBottomfixed{
		position: fixed;
	}
</style>
