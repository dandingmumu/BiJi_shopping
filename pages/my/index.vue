<template>
	<view>
		<view class="content">
			<!-- 我的的信息 -->
			<view class="shopping-userInfo">
				<view class="userInfo">
					<view class="avatar">
						<!-- #ifdef H5 -->
						<template v-if="userInfo.uid">
							<img src="/static/icon/pictureFrame.png" alt="" srcset="">
							<view class="avatarImg">
								<van-image width="100%" height="100%" :src="userInfo.avatar"/>
							</view>
						</template>
						<view v-else class="avatarImg">
							<van-image width="100%" height="100%" src="/static/icon/avatar.png" />
						</view>
						<!-- #endif -->
					</view>
					<view class="nickname">
						<!-- #ifdef H5 -->
						<view class="name" v-if="!userInfo.uid && isWeixin" @click="wechatAuthLogin"
							style="height: 100%; display: flex; align-items: center;">
							请点击授权
						</view>
						<!-- #endif -->
						<!-- #ifdef H5 -->
						<view class="Info" v-if="userInfo.uid">
							<view><span>{{ userInfo.nickname }}</span></view>
							<view class="level">
								<span style='font-size: 38rpx; margin-bottom: 8rpx;'>♔</span>
								<span>老板</span>
							</view>
						</view>
						<!-- #endif -->
						<!-- <text  v-if="userInfo.id" class="ipone">{{ phoneNumbe }}</text> -->
						<view class="ipone" v-if="userInfo.phone" @click="goEdit()">
							<view class="num-txt">ID：{{userInfo.uid}}</view>
						</view>
						<!-- <text class="ipone" v-if="!userInfo.phone && isLogin" @tap="bindPhone">点击绑定手机号</text> -->
					</view>
					<view class="">
					</view>
					<template v-if="userInfo.uid && isWeixin">
						<navigator url="../users/users_setting/index" hover-class="none">
							<van-icon class="setting" name="setting-o" size="40rpx" />
						</navigator>
					</template>

				</view>
				<view class="userExchequer">
					<van-space size="40rpx">
						<view class="userExchequerItem" @click='gotoinviteCode'
							style="border-right: 1px solid #C8C8C8;padding-right: 10rpx;">
							<view class="userExchequerItemIcon userExchequerItemscan">
								<van-icon name="scan" size="44rpx" color="#fff" />
							</view>
							<view class="InvitationCode">
								<span class="yard">邀请码</span>
								<span class="invite">邀请好友赚钱</span>
							</view>
						</view>

						<view class="userExchequerItem" @click='gotoMy'>
							<view class="userExchequerItemIcon userExchequerItemWallet">
								<van-icon name="paid" size="44rpx" color="#fff" />
							</view>
							<view class="myWallet">
								<span class="purse">我的金库</span>
								<span class="deposit">收益可提现</span>
							</view>
						</view>
					</van-space>
				</view>
			</view>
			<!-- 我的订单 -->
			<view class="shopping-myOrder">
				<view class="orderCell" @click='gotoOrder(0)'>
					<view class="orderCell__title">
						我的订单
					</view>
					<view class="orderCell__extra" @click='gotoOrder(0)'> 
						全部订单
						<van-icon name="arrow" />
					</view>
				</view>
				<view class="orderMenus">
					<view class="orderMenusItem" @click='gotoOrder(1)'>
						<view class="orderMenusItem__icon">
							<van-icon size="50rpx" name="paid" />
						</view>
						<view class="orderMenusItem__title">
							已支付
						</view>
					</view>
					<view class="orderMenusItem" @click='gotoOrder(2)'> 
						<view class="orderMenusItem__icon">
							<van-icon size="50rpx" name="underway-o" />
						</view>
						<view class="orderMenusItem__title">
							已预约
						</view>
					</view>
					<view class="orderMenusItem" @click='gotoOrder(3)'>
						<view class="orderMenusItem__icon">
							<van-icon size="50rpx" name="notes-o" />
						</view>
						<view class="orderMenusItem__title">
							已完成
						</view>
					</view>
					<view class="orderMenusItem" @click='gotoOrder(4)'>
						<view class="orderMenusItem__icon">
							<van-icon size="50rpx" name="cash-back-record" />
						</view>
						<view class="orderMenusItem__title">
							退款/售后
						</view>
					</view>
				</view>
			</view>
			<!-- 在线客服 -->
			<view class="shopping-customerService">
				<view class="shopping-customerServiceCell">
					<div class="service-">
						<van-icon size="46rpx" name="service-o" />
					</div>
					<view class="service-o" style="flex: 1;">
						在线客服
					</view>
					<van-icon name="arrow" size="40rpx" />
				</view>

				<!-- <van-cell size="large" is-link>
					<template #icon>
						<div class="service-">
							<van-icon size="46rpx" name="service-o" />
						</div>
					</template>
					<template #title>
						<view class="service-o">
							在线客服
						</view>
					</template>
				</van-cell> -->
			</view>
		<!-- 	<view class="shopping-customerService" @click='gotoMyPay'>
				<view class="shopping-customerServiceCell">
					<div class="service-">
						<van-icon size="46rpx" name="balance-o" />
					</div>
					<view class="service-o" style="flex: 1;">
						我的小金库
					</view>
					<van-icon name="arrow" size="40rpx" />
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters
	} from "vuex"
	import {
		toLogin
	} from '@/libs/login.js'
	import {
		Toast
	} from 'vant'
	// #ifdef H5
	import wechat from '@/libs/wechat.js'
	// #endif

	import {
		getUserInfoApi
	} from '@/api/users.js'
	import cache from '../../utils/cache.js'

	export default {
		data() {
			return {
				// 用户信息
				userInfo: {},

				// #ifdef H5
				isWeixin: wechat.isWeixin(),
				//#endif

				phone: "17300000000"
			}
		},
		computed: {
			...mapGetters({
				isLogin: 'isLogin'
			}),
			phoneNumbe() {
				// 手机号仅显示前三位及后四位数字，隐藏信息用*代替
				return this.phone.substr(0, 3) + '****' + this.phone.substring(7);
			},
		},
		onLoad(options) {
			let that = this;
			// #ifdef H5
			const {
				code,
				state,
				scope
			} = options;
			this.options = options;

			// 获取确认授权code
			this.code = code || '';
			if (this.isWeixin && code && this.options.scope !== 'snsapi_base') {
				// 公众号授权登录回调
				wechat.auth(code, state).then(res => {
					let time = res.expires_time - that.$Cache.time();
					that.$store.commit('LOGIN', {
						token: res.token,
						time: time
					});
					that.userInfo = res;
					this.$toast('登录成功');
					that.$store.commit('SETUID', res.id);
					that.$store.commit('UPDATE_USERINFO', res.userInfo);

					setTimeout(res => {
						location.href = '/pages/index/index';
					}, 800);
				}).catch(error => {
					console.log(error)
				});
			}


			// #endif
		},
		onShow: function() {
			let that = this;
			console.log(that.isLogin)


			if (that.isLogin && cache.get('LOGIN_STATUS_TOKEN')) {
				this.getUserInfo();
			};
		},
		methods: {
			/**
			 * 获取用户信息
			 */
			getUserInfo() {
				let that = this;
				getUserInfoApi().then(res => {
					that.userInfo = res.data
					that.$store.commit("SETUID", res.data.uid);
					that.$store.commit('UPDATE_USERINFO', res.data);
				}).catch(err => {
					console.log(err)
				})
			},
			// 公众号登录
			wechatAuthLogin() {
				console.log(123)
				// if (!this.code || this.options.scope !== 'snsapi_base') {
				this.$wechat.oAuth('snsapi_userinfo', '/pages/my/index');
				// } else {
				// 	if (this.authKey) {
				// 		this.isUp = true;
				// 	}
				// }
			},
			// 跳转商家金库  后续会关掉
			gotoMyPay() {
				uni.navigateTo({
					url:'/pages/merchant/enter/index'
				})
				
			},
			// 跳转我的金库
			gotoMy() {
				uni.navigateTo({
					url: '/pages/users/users_exchequer/index'
				})
			},
			// 跳转邀请码
			gotoinviteCode() {
				uni.navigateTo({
					url: '../users/users_mycode/index'
				})
			},
			// 跳转订单
			gotoOrder(e){
				uni.navigateTo({
					url:'../users/myOrder/index?active='+e,
					
				})
			}
		}
	}
</script>

<style lang="scss">
	body {
		background-color: #FAFAFA;
	}

	// 个人中心
	.shopping-userInfo {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 100%;
		height: 482rpx;
		background: linear-gradient(160deg, #FFEDE4 0%, #FFFFFF 100%);

		.userInfo {
			position: relative;
			display: flex;
			margin: 43rpx 30rpx 0;

			.avatar {
				position: relative;
				width: 160rpx;
				height: 150rpx;
				margin: 0px;
				box-sizing: border-box;
				border-radius: 50%;

				img {
					position: absolute;
					width: 100%;
					height: 100%;
					z-index: 3;
				}

				.avatarImg {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 110rpx;
					height: 110rpx;
					border-radius: 50%;
					overflow: hidden;
					z-index: 0;

				}
			}

			.nickname {
				display: flex;
				flex-direction: column;
				flex-wrap: nowrap;
				justify-content: center;
				margin-left: 32rpx;
				// padding: 29rpx 0;
				font-size: 34rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #191919;

				.Info {
					display: flex;
				}

				.level {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 98rpx;
					height: 40rpx;
					margin-left: 21rpx;
					font-size: 20rpx;
					border-radius: 7rpx;
					border: 2rpx solid rgba(255, 193, 66, 1);
					// border-image: linear-gradient(145deg, rgba(255, 226, 118, 1), rgba(255, 193, 66, 1), rgba(255, 193, 66, 1)) 1 1;
					text-align: center;
				}

				.level span {
					// font-family: PingFangSC-Regular, PingFang SC;
					// font-weight: 400;
					font-size: 22rpx;
					color: #FFCF68;
					line-height: 22rpx;

				}
			}

			.ipone {
				height: 24rpx;
				margin-top: 18rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #191919;
				// line-height: 24rpx;
			}

			.setting {
				position: absolute;
				top: 29rpx;
				right: 25rpx;
			}
		}

		.userExchequer {
			display: flex;
			align-items: center;
			justify-content: space-around;
			// flex: 1;
			width: auto;
			height: 195rpx;
			margin: 0 30rpx 42rpx;
			padding: 0 36rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 6rpx 26rpx 0rpx rgba(0, 0, 0, 0.05);
			border-radius: 12px;


			.userExchequerItem {
				display: flex;

				// &:nth-child(2)::after {
				// 	content: '';
				// 	width: 0;
				// 	border: .5rpx solid #C8C8C8;
				// 	// margin-right: 20rpx;
				// }

				.InvitationCode,
				.myWallet {
					// display: flex;
					align-items: center;
					align-content: center;
					flex-direction: row;
					flex-wrap: wrap;
					// width: 200rpx;
					height: 88rpx;
					margin-left: 26rpx;
					line-height: 88rpx;

				}

				.InvitationCode span,
				.myWallet span {
					display: block;
				}
			}

			.InvitationCode .yard,
			.myWallet .purse {
				// width: 114rpx;
				height: 34rpx;
				margin-top: 15rpx;
				font-size: 34rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #191919;
				line-height: 34rpx;
			}

			.InvitationCode .invite,
			.myWallet .deposit {
				width: 150rpx;
				height: 20rpx;
				margin-top: 5rpx;
				font-size: 20rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #9E9E9E;
				line-height: 20rpx;
			}

			.userExchequerItemIcon {
				width: 88rpx;
				height: 88rpx;
				border-radius: 29rpx;
				text-align: center;
				line-height: 88rpx;
				font-size: 44rpx;
			}

			.userExchequerItemscan {
				background: linear-gradient(180deg, #C8EBFF 0%, #288EF0 100%);
			}

			.userExchequerItemWallet {
				background: linear-gradient(180deg, #FFC07C 0%, #F07528 100%);
			}
		}
	}

	// 我的订单
	.shopping-myOrder {
		display: flex;
		flex-direction: column;
		width: 690rpx;
		height: 316rpx;
		margin: 0 auto;
		background: #FFFFFF;
		box-shadow: 0rpx 6rpx 26rpx 0rpx rgba(0, 0, 0, 0.05);
		border-radius: 12rpx;
		overflow: hidden;

		.orderCell {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0 41rpx;
			flex: 1;

			&__title {
				width: 148rpx;
				height: 34rpx;
				font-size: 34rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #191919;
				line-height: 34rpx;
			}

			&__extra {
				display: flex;
				// width: 116rpx;
				height: 26rpx;
				font-size: 26rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #9E9E9E;
				line-height: 26rpx;
			}
		}

		.orderMenus {
			display: flex;
			justify-content: space-around;
			flex: 1;
			text-align: center;
			margin-top: 20rpx;
		}

		.orderMenusItem {

			&__title {
				// width: 83rpx;
				height: 26rpx;
				margin-top: 20rpx;
				font-size: 26rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #191919;
				line-height: 26rpx;
			}
		}
	}

	.shopping-customerService {
		width: 690rpx;
		// height: 128rpx;
		margin: 32rpx 32rpx 0;
		// padding: 20rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 6rpx 26rpx 0rpx rgba(0, 0, 0, 0.05);
		border-radius: 12rpx;
		overflow: hidden;

		.shopping-customerServiceCell {
			display: flex;
			align-items: center;
			padding: 20rpx;
		}

		.service-o {
			// width: 122px;
			// height: 26px;
			margin-left: 14rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #191919;
			line-height: 46rpx;
		}

		.van-cell {
			line-height: none;
		}
	}
</style>
