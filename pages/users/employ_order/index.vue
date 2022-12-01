<template>
	<view class="">
		<view class="employOrder-title">
			请在2022.12.01（含）前到店消费
		</view>
		<view class="employOrder-commodityDetails" @click='gotoDetail(orderInfo.withProductInfo.id)'>
			<view class="commodityDetailsTop">
				<view class="commodityDetailsTop__img">
					<image width="100%" height="100%" :src="orderInfo.withProductInfo?.recommend_image"
						mode='aspectFill' />
				</view>
				<view class="commodityDetailsTop-group">
					<view class="commodityDetailsTop-group__title">{{orderInfo.withProductInfo?.title}}</view>
					<veiw class="commodityDetailsTop-group__subheading">共计：{{orderInfo.total_num}}份 </veiw>
					<view class="commodityDetailsTop-group__price">￥{{orderInfo.withAttrsValues?.price}}</view>
				</view>
				<view class="" style="display: flex;align-items: center;">
					<van-icon name="arrow" />
				</view>
			</view>
			<van-divider :style="{ borderColor: '#CDCDCD'}" />
			<view class="commodityDetailsBottom">
				<view class="commodityDetailsBottom__item">
					<van-icon name="passed" size="45rpx" color="#F6892F" />
					<view class="span">随时退</view>
				</view>
				<view class="commodityDetailsBottom__item">
					<van-icon name="passed" size="45rpx" color="#F6892F" />
					<view class="span">过期自动退</view>
				</view>
				<view class="commodityDetailsBottom__item">
					<van-icon name="passed" size="45rpx" color="#F6892F" />
					<view class="span">免预约</view>
				</view>
			</view>
		</view>

		<view class="employOrder-voucher">
			<view class="employOrder-voucher__title">
				使用凭证
			</view>
			<view class="employOrder-voucher__qrcode">
				<view class="pictrueQr">
					<view class="pictrue">
						<image :src="codeSrc" mode=""></image>
						<zb-code ref="qrcode" :show="codeShow" :cid="cid" :val="val" :size="size" :unit="unit"
							:background="background" :foreground="foreground" :pdground="pdground" :icon="icon"
							:iconSize="iconsize" :onval="onval" :loadMake="loadMake" @result="qrR" />
					</view>
				</view>
				<view class="gear">
					<image src="@/static/images/writeOff.jpg"></image>
				</view>
				<view class="num">{{ orderInfo._verify_code }}</view>
			</view>
			<view class="employOrder-voucher__mbsNumber">券号:214371625317625316</view>
			<view class="employOrder-voucher__footer">
				<view class="">
					2022.12.01后到期
				</view>
				<van-button type="default" size="small" @click='gototk'>申请退款</van-button>
			</view>
		</view>
		<view @click='gotoAddDr' v-if='is_expert==0'>
			<view class="addDr">
				<image src="@/static/images/jrdr.png" mode="widthFix" style='width: 100%; height: 100%;'></image>
				<!-- 加入达人立即返现{{orderInfo.rebate}}元 <van-icon name="arrow" /> -->
			</view>
		</view>
		<view class="employOrder-apply" v-if='orderInfo.withMerchantsInfo?.children_count!=0'>
			<view class="employOrder-apply__cell">
				<view class="title">适用门店（{{orderInfo.withMerchantsInfo?.children_count}}家）</view>
				<view class="extra" @click='gotooutlets'>
					全部门店
					<van-icon name="arrow" />
				</view>
			</view>
			<view class="employOrder-apply__body">
				<view class="thumbnail">
					<van-image width="100%" height="100%" :src="orderInfo.withMerchantsInfo.avatar" />
				</view>
				<view class="details">
					<view class="details__title">{{orderInfo.withMerchantsInfo.title}}</view>
					<view class="details__subheading">龙湖 | 人均¥69 | 89%用户推荐</view>
					<view class="details__ranking"><span>邯郸市川菜热销第四名</span></view>
				</view>
				<view style="display: flex;align-items: flex-end;">
					<van-image width="50rpx" height="50rpx" src="/static/icon/phone.png" />
				</view>
			</view>
			<van-divider :style="{ borderColor: '#CDCDCD', margin: '37rpx 31rpx' }" />
			<view class="employOrder-apply__site">
				<view class="left">
					<span>最近</span>{{orderInfo.withMerchantsInfo.distance}} | {{orderInfo.withMerchantsInfo.address}}
				</view>
				<view class="right">
					导航
					<van-icon name="arrow" />
				</view>
			</view>
		</view>
		<view class="employOrder-groupDetails">
			<view class="title">
				团购详情
			</view>
			<view class="" v-for="(item,index) in orderInfo.results" :key='index'>
				<view class="" style='margin-left: 40rpx;'>
					<view class="" style='margin-left: 10rpx; margin-bottom: 40rpx; font-size: 36rpx;'>
						{{item.title}}
					</view>
					<view class="" style='margin: 20rpx 0; display: flex;' v-for="(item1,index1) in item.attrs"
						:key='index1'>
						<view class="" style='width: 75%;'>
							<span style='font-size: 50rpx; vertical-align: middle;'>·</span>{{item1.name}}
						</view>
						<view class="" style='flex: 1; font-size: 36rpx;'>
							￥{{item1.price}}
						</view>
					</view>
				</view>

			</view>
		</view>
		<view class="employOrder-rule">
			<view class="title">
				使用规则
			</view>
			<view class="body">
				<view class="boldface">有效期</view>
				<view class="black">·2022.11.02 至 2022.12.01</view>
				<view class="boldface">可用时间</view>
				<view class="black">·商家营业时间可用</view>
				<view class="boldface">预约规则</view>
				<view class="black">·无需预约，高峰期可能需要排队</view>
				<view class="boldface">预约规则</view>
				<view class="black">·不能在包间消费时使用不可同时享受</view>
			</view>
		</view>
	</view>
</template>

<script>
	import zbCode from '@/components/zb-code/zb-code.vue'
	import {
		getOrderInfoApi
	} from '@/api/order.js'

	export default {
		components: {
			zbCode
		},
		data() {
			return {
				// 订单ID
				order_id: '',

				orderInfo: {},

				//二维码参数
				codeShow: false,
				cid: '1',
				ifShow: true,
				val: "", // 要生成的二维码值
				size: 200, // 二维码大小
				unit: 'upx', // 单位
				background: '#f2f5f7', // 背景色
				foreground: '#000', // 前景色
				pdground: '#000', // 角标色
				icon: '', // 二维码图标
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: true, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				src: '', // 二维码生成后的图片地址或base64
				codeSrc: "",
				wd: 0,
				hg: 0,
				mpUrl: "",
				user_phone: '', //用户手机号
				is_expert: 0, //是否是达人
				location:''
			}
		},
		onLoad(options) {
			if (options.order_id) {
				this.$set(this, 'order_id', options.order_id);
			}
			uni.getStorage({
				key: `location`,
				success: res=>{
					this.location=res.data
				}
			})
		},
		onShow() {
			this.getOrderInfo()
		},
		methods: {
			qrR(res) {
				this.codeSrc = res
			},
			getOrderInfo() {
				let that = this;
				getOrderInfoApi(this.order_id, this.location).then(res => {
					that.$set(that, 'orderInfo', res.data);
					that.user_phone = res.data.user_phone
					that.is_expert = res.data.userInfo.is_expert
					this.$nextTick(() => {
						that.val = that.orderInfo.verify_code
					})

				}).catch(err => {
					console.log(err)
				})
			},
			gotoDetail(id) {
				uni.navigateTo({
					url: '/pages/details/index?id='+id
				})
			},
			gotoAddDr() {
				uni.navigateTo({
					url: '/pages/users/addTalent/index?user_phone=' + this.user_phone
				})
			},
			gotooutlets() {
				// console.log(this.detailsData);
				// uni.navigateTo({
				// 	url: '/pages/outlets/index?mid=' + this.detailsData.mid + '&location=' + this.fromcoord
				// })
			},
			// 申请退款
			gototk() {
				uni.navigateTo({
					url: '/pages/users/users_tk/index?id=' + this.order_id
				})
			},
		}
	}
</script>

<style lang="scss">
	body {
		background: #FAFAFA;
	}

	// 标题
	.employOrder-title {
		// width: 568rpx;
		height: 38rpx;
		margin: 44rpx auto 56rpx;
		text-align: center;
		font-size: 38rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #191919;
		line-height: 38rpx;
	}

	// 商品详情
	.employOrder-commodityDetails {
		// width: 690px;
		// height: 460rpx;
		margin: 0 27rpx 44rpx;
		padding: 70rpx 31rpx;
		background: #FFFFFF;
		box-shadow: 0px 6rpx 26rpx 0px rgba(0, 0, 0, 0.05);
		border-radius: 40rpx;
		box-sizing: border-box;

		.commodityDetailsTop {
			display: flex;

			&__img {
				width: 185rpx;
				height: 185rpx;
				border-radius: 40rpx;
				overflow: hidden;
			}

			.commodityDetailsTop-group {
				width: 401rpx;
				margin-left: 30rpx;
				overflow: hidden;

				&__title {
					display: block;
					width: 401rpx;
					// height: 36px;
					font-size: 32rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #191919;
					// line-height: 36rpx;
					word-wrap: break-word;
					/*强制换行*/
					overflow: hidden;
					/*超出隐藏*/
					text-overflow: ellipsis;
					/*隐藏后添加省略号*/
					white-space: nowrap;
					/*强制不换行*/
				}

				&__subheading {
					display: block;
					// width: 290px;
					// height: 26px;
					margin: 25rpx 0 35rpx;
					font-size: 26rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #414141;
					// line-height: 26rpx;
				}

				&__price {
					display: block;
					// width: 155px;
					// height: 36px;
					font-size: 36rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #414141;
					// line-height: 36rpx;
				}
			}
		}

		.commodityDetailsBottom {
			display: flex;
			justify-content: space-between;
			align-items: center;

			&__item {
				// height: 30px;
				display: flex;
				align-items: center;

				& .span {
					// width: 78px;
					// height: 26px;
					margin-left: 10rpx;
					font-size: 26rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #191919;
					// line-height: 26px;
				}
			}
		}

	}

	// 使用凭证
	.employOrder-voucher {
		// width: 690px;
		// height: 557rpx;
		margin: 0 27rpx 30rpx;
		background: #FFFFFF;
		box-shadow: 0px 6rpx 26rpx 0px rgba(0, 0, 0, 0.05);
		border-radius: 40rpx;
		overflow: hidden;

		&__title {
			// width: 152px;
			// height: 38px;
			margin: 44rpx 53rpx;
			font-size: 38rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #191919;
			line-height: 38rpx;
		}

		&__qrcode {
			// width: 220rpx;
			// height: 220rpx;
			margin: 0 auto 62rpx;

			.pictrueQr {
				background-color: #f2f5f7;
				width: 590rpx;
				height: 384rpx;
				border-radius: 20rpx 20rpx 0 0;
				margin: 50rpx auto 0 auto;
				// padding-top: 55rpx;
				position: relative;
			}

			.pictrue {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 220rpx;
				height: 220rpx;
				margin: 0 auto;
				overflow: hidden;
			}

			.pictrue image {
				width: 100%;
				height: 100%;
			}

			.gear {
				width: 590rpx;
				height: 30rpx;
				margin: 0 auto;
			}

			.gear image {
				width: 100%;
				height: 100%;
				display: block;
			}

			.num {
				background-color: #f0c34c;
				width: 590rpx;
				height: 84rpx;
				color: #282828;
				font-size: 48rpx;
				margin: 0 auto;
				border-radius: 0 0 20rpx 20rpx;
				text-align: center;
				padding-top: 4rpx;
			}
		}

		&__mbsNumber {
			margin: 0 61rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #191919;
			// line-height: 28rpx;
		}

		&__footer {
			display: flex;
			justify-content: space-between;
			// align-items: center;
			align-items: flex-start;
			margin: 25rpx 61rpx 66rpx;
		}
	}

	// 适用门店
	.employOrder-apply {
		// width: 690px;
		// height: 477rpx;
		margin: 0 27rpx 30rpx;
		background: #FFFFFF;
		box-shadow: 0px 6rpx 26rpx 0px rgba(0, 0, 0, 0.05);
		border-radius: 40rpx;
		overflow: hidden;

		&__cell {
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			margin: 72rpx 44rpx 63rpx;

			.title {
				// width: 335px;
				// height: 38px;
				font-size: 38rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #191919;
				line-height: 38rpx;
			}

			.extra {
				// width: 112px;
				// height: 28px;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #191919;
				line-height: 28rpx;
			}
		}

		&__body {
			display: flex;
			margin: 0 44rpx;

			.thumbnail {
				width: 145rpx;
				height: 140rpx;
				border-radius: 14rpx;
				overflow: hidden;
			}

			.details {
				flex: 1;
				margin-left: 25rpx;

				&__title {
					// width: 180px;
					// height: 30px;
					font-size: 30rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #191919;
					// line-height: 30rpx;
				}

				&__subheading {
					// width: 329px;
					// height: 30px;
					margin: 6rpx 0 8rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #191919;
					// line-height: 30rpx;
				}

				&__ranking {
					// width: 288px;
					height: 49rpx;
					line-height: 49rpx;

					span {
						// width: 240px;
						// height: 24px;
						padding: 10rpx;
						border-radius: 4rpx;
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						background: #E6E6E6;
						color: #8A8A8A;
						line-height: 24rpx;
					}
				}
			}

		}

		&__site {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0 31rpx 45rpx;

			.left {
				// width: 444px;
				height: 30rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #9A9A9A;
				line-height: 30rpx;

				span {
					padding: 5rpx;
					margin-right: 3rpx;
					background: #FFC7C7;
					border-radius: 3px;
					// width: 444px;
					// height: 30px;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FF2E2E;
					line-height: 30rpx;
				}
			}

			.right {
				// width: 48px;
				height: 30rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #191919;
				line-height: 30rpx;
			}
		}
	}

	// 团购详情
	.employOrder-groupDetails {
		// width: 690px;
		// height: 584rpx;
		margin: 0 27rpx 30rpx;
		background: #FFFFFF;
		box-shadow: 0px 6rpx 26rpx 0rpx rgba(0, 0, 0, 0.05);
		border-radius: 40rpx;
		overflow: hidden;
		padding-bottom: 20rpx;

		.title {
			// width: 120px;
			// height: 30px;
			margin: 47rpx 41rpx;
			font-size: 30rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #191919;
			line-height: 30rpx;
		}
	}


	.employOrder-rule {
		// height: 584rpx;
		margin: 0 27rpx 101rpx;
		background: #FFFFFF;
		box-shadow: 0px 6rpx 26rpx 0rpx rgba(0, 0, 0, 0.05);
		border-radius: 40rpx;
		overflow: hidden;

		.title {
			// width: 120px;
			// height: 30px;
			margin: 82rpx 41rpx 40rpx;
			font-size: 30rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #191919;
			// line-height: 30px;
		}

		.body {
			margin: 0 41rpx;

			.boldface {
				// width: 90px;
				// height: 30px;
				margin-bottom: 30rpx;
				font-size: 30rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #191919;
				// line-height: 30rpx;
			}

			.black {
				// width: 363px;
				// height: 30px;
				margin-bottom: 40rpx;
				font-size: 30rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #8B8B8B;
				line-height: 30rpx;
			}
		}
	}

	.addDr {
		margin: 0 27rpx 30rpx;
		box-shadow: 0px 6rpx 26rpx 0px rgba(0, 0, 0, 0.05);
	}
</style>
