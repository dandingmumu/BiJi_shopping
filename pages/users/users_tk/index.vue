<template>
	<view>
		<view class="">
			<view class="orderListItem__body">
				<view class="orderListItem__bodyThumbnail">
					<image :src="cartInfo.withProductInfo?.recommend_image" mode="widthFix"></image>
				</view>
				<view class="orderListItem__bodyDetails">
					<view class="title">
						{{cartInfo.withProductInfo?.title}}
					</view>
					<view class="info">
						¥{{cartInfo?.pay_price}}
					</view>
				</view>
			</view>

			<!-- 退款原因 -->
			<view class="tkyy">
				<view class="tkyy-line">
					<view class="tkyy-left">退款原因 <span style='color: red;'>*</span> </view>
					<view class="tkyy-right" @click='handelTk'>
						<view class="" v-if='select.length==0'>
							<span class='textHs'>至少选择一项</span>
							<van-icon name="arrow" color='#696969' style='margin-left: 30rpx;' />
						</view>
						<view class="" v-else
							style='overflow: hidden; text-overflow: ellipsis; width: 400rpx;  white-space: nowrap'>
							{{select[0]}}
						</view>
					</view>
				</view>

				<view class="tkyy-line">
					<view class="tkyy-left">退款份数 </view>
					<view class="tkyy-right">
						<van-stepper v-model="num" disable-input min="1" :max="cartInfo.total_num" @change='numchange' />
					</view>
				</view>

				<view class="tkyy-line">
					<view class="tkyy-left">退款金额 </view>
					<view class="tkyy-right">
						<span style='color: red;'>¥{{price}}</span>
					</view>
				</view>
				<view class="tkyy-line">
					<view class="tkyy-left">退款方式 </view>
					<view class="tkyy-right">
						原路退回
					</view>
				</view>
				<view style='height: 30rpx;'></view>
			</view>
		</view>
		<view class="tksm">
			<view class="tksm-title">退款说明</view>
			<view class="tskm-wby">
				<textarea v-model="desc" placeholder="请输入退款说明" maxlength="200" />
				<view class="num">{{ desc.length }}/200</view>
			</view>
		</view>
		<view class="tjbtn" @click='submitTk'>
			提交
		</view>
		<!-- 弹出层 -->
		<van-popup v-model:show="show" position="bottom" :style="{ height: '78%' }" :close-on-click-overlay='false'>
			<view class="Tk_title">退款原因</view>
			<view class='Tk_info' v-for="(item,index) in infoYy" :key="index">
				<view class="tk_ztitle">
					{{item.title}}
				</view>
				<view class='tk_ly' v-for="(item1,index1) in item.child" style='color: aliceblue;' :key="index1">
					<view @click='handelLy(item1.name)' :class="item1.checked ? 'active' : 'noactive'">
						{{item1.name}}
					</view>
				</view>
			</view>
			<view class="tk_btn" @click='handelOk'>
				确认
			</view>
		</van-popup>
	</view>
</template>

<script>
	import {
		Toast,
		Dialog
	} from 'vant'
	import {
		refundApply,
		getOrderInfoApi
	} from '@/api/order.js'
	export default {
		data() {
			return {
				num: 0,
				show: false,
				desc: '',
				infoYy: [{
					title: '其他原因',
					child: [{
							name: '个人原因: 用户认为产品质量有问题',
							checked: false,
						},
						{
							name: '个人原因: 用户忘记去使用',
							checked: false,
						},
						{
							name: '个人原因: 用户无法预定特定时间',
							checked: false,
						},
						{
							name: '个人原因: 用户无法前往',
							checked: false,
						},
						{
							name: '商家原因:商家停业，检查消防，无法使用',
							checked: false,
						},
						{
							name: '商家原因:商家停业装修，无法使用',
							checked: false,
						},
						{
							name: '商家原因:商家停业整顿，无法使用',
							checked: false,
						},
						{
							name: '商家原因:商家倒闭',
							checked: false,
						},
					]
				}],
				select: [],
				cartInfo: {},
				order_id:'',
				price:0
			}
		},
		onLoad(options) {
			this.getOrderInfo(options.id)
		},
		methods: {
			handelTk() {
				this.show = true
			},
			handelLy(value) {
				let that = this;
				let arr = that.select;
				if (arr.includes(value)) {
					//includes()方法判断是否包含某一元素,返回true或false表示是否包含元素，对NaN一样有效
					let index = arr.indexOf(value); // 判断数组中是否有选中的value,如果有则去掉
					if (index > -1) {
						arr.splice(index, 1)
					}
				} else {
					if (this.select.length >= 3) {
						Toast.fail('只能选择3条')
						return
					}
					that.select.push(value)
				}
				this.infoYy[0].child.filter((item) => {
					if (item.name === value) {
						item.checked = !item.checked
						// 通过checked的值改变按钮颜色
					}
				})

			},
			handelOk() {
				if (this.select.length == 0) {
					Toast.fail('至少选择1条')
					return
				}
				this.show = false

			},
			getOrderInfo(order_id) {
				let that = this
				getOrderInfoApi(order_id,'').then(res => {
					that.cartInfo = {
						pay_price: res.data.pay_price,
						...res.data
					}
					that.num=res.data.total_num
					that.order_id=res.data.id
					console.log(that.cartInfo);
					that.price=(res.data.withAttrsValues?.price*that.num).toFixed(2)
				}).catch(err => {
					console.log(err)
				})
			},
			// 确认退款
			submitTk() {
				let that = this
				if (this.select.length == 0) {
					Toast.fail('请选择退款原因')
					return
				}
				Dialog.confirm({
						message: `确认要退款吗？`,
					})
					.then(() => {
						const data={
							text:that.select,
							refund_reason_wap_explain:that.desc,
							refund_num:that.num
						}
						refundApply(that.order_id,data).then(res => {
							Toast.success(res.msg)
							uni.reLaunch({
								url:'/pages/index/index'
							})
						}).catch(err => {
							Toast.fail(err)
						})
					}).catch(() => {
						// on cancel
					});

			},
			numchange(){
				this.price=(this.cartInfo?.withAttrsValues.price*this.num).toFixed(2)
			}
		}
	}
</script>

<style lang='scss'>
	body {
		background-color: #FAFAFA;
		width: 100%;
		overflow-x: hidden;
		padding: 40rpx 0;
	}

	.orderListItem__body {
		display: flex;
		// align-items: center;
		background-color: #fff;
		width: 670rpx;
		margin: 0 auto;

	}

	.orderListItem__bodyThumbnail {
		width: 140rpx;
		height: 140rpx;
		margin-right: 29rpx;
		border-radius: 10rpx;
		overflow: hidden;
		margin: 30rpx 30rpx;
	}

	.orderListItem__bodyDetails {
		.title {
			font-size: 30rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #414141;
			line-height: 26rpx;
			margin-top: 40rpx;
		}

		.info {
			// width: 233px;
			// height: 26px;
			margin-top: 32rpx;
			font-size: 30rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #414141;
			line-height: 26rpx;
		}

	}

	.tkyy {
		background-color: #fff;
		width: 670rpx;

		margin: 40rpx auto;

		.tkyy-line {
			display: flex;
			padding: 40rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #414141;
			font-size: 30rpx;
		}

		.tkyy-left {
			width: 30%;
		}

		.tkyy-right {
			flex: 1;
			text-align: right;
		}

		.textHs {
			color: #C6C6C6;
		}
	}

	::v-deep .van-stepper__input {
		background-color: #fff;
		margin: 0 10rpx;
	}

	::v-deep .van-stepper__plus {
		background-color: #FF2929;
		color: #fff;
		height: 44rpx;
		line-height: 44rpx;
		border-radius: 4rpx !important;
	}

	::v-deep .van-stepper__minus {
		background-color: #FFFFFF;
		color: #3C3C3C;
		height: 44rpx;
		line-height: 44rpx;
		box-shadow: 0px 0px 5px #888888;
		border-radius: 4rpx !important;
	}

	::v-deep .van-popup--bottom {
		border-radius: 44rpx 44rpx 0 0;
	}

	.Tk_title {
		text-align: center;
		font-size: 36rpx;
		color: #414141;
		padding: 20rpx 0;
	}

	.Tk_info {
		padding: 40rpx 60rpx;
		font-size: 30rpx;
		color: #414141;
	}

	.tk_ztitle {}

	.tk_ly {
		margin-top: 40rpx;
	}

	.tk_btn {
		width: 670rpx;
		height: 110rpx;
		background: #FF5E5E;
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		text-align: center;
		line-height: 110rpx;
		margin: 0 auto;
		margin-top: 40rpx;
	}

	.tksm {
		background-color: #fff;
		width: 670rpx;
		margin: 40rpx auto;
		/* padding: 0 20rpx; */
		padding-bottom: 40rpx;
		position: relative;

		.tksm-title {
			padding: 40rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #414141;
			font-size: 30rpx;
		}

		.tskm-wby {
			padding: 40rpx;
			height: 240rpx;
			width: 540rpx;
			background: #F7F7F7;
			margin: 0 auto;
		}

		.num {
			position: absolute;
			bottom: 70rpx;
			right: 80rpx;
			color: #B2B2B2;
		}
	}

	.tjbtn {
		width: 670rpx;
		height: 110rpx;
		background: #FF5E5E;
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		text-align: center;
		line-height: 110rpx;
		margin: 0 auto;
		margin-top: 40rpx;
	}

	.noactive {
		color: #414141;
	}

	.active {
		color: #FF5E5E
	}
</style>
