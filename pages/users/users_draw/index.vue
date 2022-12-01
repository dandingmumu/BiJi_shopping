<template>
	<view>
		<view class="info">
			<view class="title">
				提现金额
			</view>
			<view class="price">
				<view class="left">
					￥
				</view>
				<view class="center">
					<input type="text" v-model='TxPrice'  placeholder='请输入提现金额' >
				</view>
				<view class="right" @click='all'>
					全部提现
				</view>
			</view>
			<view style="border-top: 1px solid #D8D8D8; width: 90%; margin: 40rpx auto;"></view>
			<view class="tishi">
				可提现金额 {{numMoney}} 元
			</view>
		</view>
		<view class="btn" @click='tx'>
			申请提现
		</view>
	</view>
</template>

<script>
	import{Toast} from 'vant'
	import {cash} from '@/api/public.js'
	export default {
		data() {
			return {
				numMoney:0,
				TxPrice:''
			}
		},
		onLoad(options) {
			this.numMoney=options.numMoney
		},
		methods: {
			all(){
				if(this.numMoney==0){
					Toast.fail('暂无可提现金额')
					return
				}
				this.TxPrice=this.numMoney
			},
			tx(){
				if(this.numMoney==0){
					Toast.fail('暂无可提现金额')
					return
				}
				cash({money:this.TxPrice}).then(res=>{
					Toast.success(res.msg)
					setTimeout(()=>{
						uni.navigateBack()
					},1000)
				}).catch(err=>{
					Toast.fail(err)
				})
			}
		}
	}
</script>

<style>
	body{
		background-color: #FAFAFA;
	}
	.info{
		width: 650rpx;
		background: #FFFFFF;
		box-shadow: 0px 2rpx 40rpx 0px rgba(0,0,0,0.03);
		border-radius: 20rpx;
		margin: 30rpx auto;
	}
	.title{
		padding: 60rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #191919;
		line-height: 28rpx;
	}
	.price{
		display: flex;
		/* padding: 0 60rpx; */
	}
	.price .left{
		font-size: 70rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #767676;
		width: 15%;
		line-height: 44rpx;
		margin-left: 20rpx;
	}
	.center{
		font-size: 50rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #767676;
		width: 60%;
	}
	.right{
		flex: 1;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FF7456;
		line-height: 64rpx;
	}
	.tishi{
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #989898;
		line-height: 20rpx;
		margin-left: 30rpx;
		padding-bottom: 40rpx;
	}
	.btn{
		width: 650rpx;
		height: 111rpx;
		background: #FF7155;
		box-shadow: 0px 2rpx 40rpx 0px rgba(0,0,0,0.03);
		border-radius: 56rpx;
		margin: 20rpx auto;
		font-size: 36rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		text-align: center;
		line-height: 111rpx;
	}
</style>
