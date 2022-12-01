<template>
	<view>
		<van-skeleton title avatar :row="28" v-if='showpage' style='margin-top: 20rpx;' />
		<view class="" v-if='!showpage'>
			<!-- 商家信息 -->
			<view class="shopping-userInfo">
				<!-- 		<view class="userInfo">
					<view class="avatar">
						<img src="/static/icon/pictureFrame.png" alt="" srcset="">
						<view class="avatarImg">
							<van-image width="100%" height="100%" :src="merchantInfo.avatar" />
						</view>
					</view>
					<view class="nickname">
						<view>
							<span>{{ merchantInfo.nickname }}</span>
							<view class="level">
								<span style='font-size: 38rpx;'>♔</span>
								<span>老板</span>
							</view>
						</view>

						<text class="ipone">{{ phoneNumbe }}</text>
					</view>
					<view class="enter" @click='handelSettled'>
						<van-icon name="plus" />入驻
					</view>
				</view> -->
				<view class="userInfoBackground">
					<view class="uni-margin-wrap">
						<swiper class="swiper" circular :indicator-dots="true" indicator-active-color='#fff'
							:autoplay="false" :interval="interval" :duration="duration">
							<swiper-item class="swiper-item " v-for="(item,index) in luboImg">
								<view class='mask'></view>
								<image style='width: 100%; height: 100%;' :src="item" mode="aspectFill"></image>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
			<!-- 内容区域 -->
			<view class="shopping-content">
				<view class="detailsInfo">
					<view class="detailsInfo__price">
						<view><span>￥</span><span
								style="font-size: 40rpx;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;">{{ detailsData.preferential_price }}</span>
						</view>
						<view class="detailsInfo__originalCost">
							￥{{ detailsData.unit_price }}
						</view>
						<view class="detailsInfo__return" v-if='userInfo!=undefined && userInfo.is_expert!=0'>
							<span class="fan">返</span>
							<span class="fanMoney">￥{{ detailsData.rebate }}</span>
						</view>
						<view class="detailsInfo__sell">已出售{{ detailsData.sales }}</view>
					</view>
					<view class="detailsInfo__description" v-text="detailsData.subheading"></view>
				</view>
				<view class="partingLine"></view>
				<view class="detailsInfoLocation">
					<view class="detailsInfoLocation__cell">
						<span class="cell-left" style="font-size: 36rpx;">
							适用门店
						</span>
						<span class="cell-right" @click='gotooutlets'>
							6家门店适用
							<van-icon name="arrow" />
						</span>
					</view>
					<view class="">
						<view class="detailsInfoLocation__dishName">
							鱼爱上蛙自助火锅
						</view>
						<view class="detailsInfoLocation__road">
							<span>{{ merchantInfo.address }}</span>
							<van-icon name="coupon" color="#4391FF" size="50rpx" style="margin: 0rpx 50rpx 0rpx 0rpx;"
								@click='gotomerInfo' />
							<van-icon name="phone-circle" color="#4391FF" size="50rpx" @click='callPhone' />
						</view>
					</view>
					<view class="detailsInfoLocation__distance">
						<van-icon name="location" size="40rpx" />
						<view class="detailsInfoLocation__distanceLocation">
							距您{{ detailsData.distance }}km
						</view>
						<view class="detailsInfoLocation__distanceNavigation" @click='handelMap'>
							导航
							<van-icon name="arrow" />
						</view>
					</view>
				</view>
				<view class="partingLine" v-if='topThree.length==3'></view>
				<view class="detailsInfoRanking" v-if='topThree.length==3'>
					<view class="detailsInfoRanking__title">
						转发排行榜
					</view>
					<view class="topThree">
						<view class="topThreeItem topThree__two">
							<img src="../../static/icon/two.png" alt="">
							<view class="topThreeItemAvatar">
								<van-image round width="100%" height="100%" :src="topThree[1].avatar" />
							</view>
							<view class="topThreeItemNumber">{{topThree[1].number}}</view>
							<view class="topThreeItemNickname" style="">
								{{topThree[1].nickname}}
							</view>
						</view>
						<view class="topThreeItem topThree__one">
							<img src="../../static/icon/one.png" alt="">
							<view class="topThreeItemAvatar">
								<van-image round width="100%" height="100%" :src="topThree[0].avatar" />
							</view>
							<view class="topThreeItemNumber">{{topThree[0].number}}</view>
							<view class="topThreeItemNickname" style="">
								{{topThree[0].nickname}}
							</view>
						</view>
						<view class="topThreeItem topThree__three">
							<img src="../../static/icon/three.png" alt="">
							<view class="topThreeItemAvatar">
								<van-image round width="100%" height="100%" :src="topThree[1].avatar" />
							</view>
							<view class="topThreeItemNumber">{{topThree[1].number}}</view>
							<view class="topThreeItemNickname" style="">
								{{topThree[1].nickname}}
							</view>
						</view>
					</view>
					<view class="" style='height: 40rpx;' v-if='topFifty.length==0'></view>
					<view class="rankingFourth" v-if='topFifty.length!=0'>
						<swiper circular :indicator-dots="false" :autoplay="true" :disable-touch='true' :interval='2000'
							:vertical="true" style="width: 100%;" :display-multiple-items='3'>
							<swiper-item v-for="(item,index) in topFifty" :key='index'>
								<view class="rankingFourthItem">
									<view class="">
										{{index}}
									</view>
									<van-image class="rankingFourthItem__avatar" round width="81rpx" height="81rpx"
										:src="item.avatar" />
									<view class="rankingFourthItem__nickname">
										{{item.nickname}}
									</view>
									<view class="">
										{{item.number}}次
									</view>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
				<view class="partingLine"></view>
				<view class="detailsInfoSku">
					<view class="detailsInfoSku__title">
						选择套餐
					</view>
					<view class="detailsInfoSku__category">
						<van-space wrap>
							<template v-for="(itemn, indexn) in productAttr.attr_value" :key="indexn">
								<view class="detailsInfoSku__categoryItem"
									:class="productAttr.index === itemn.attr ? 'on' : ''"
									@click="ChangeAttr(indexn,itemn.attr)">
									{{ itemn.attr }}
								</view>
							</template>
						</van-space>
					</view>
				</view>

				<!-- 锚点导航 -->
				<view class="tabap">
					<van-sticky>
						<van-tabs ref="tabs" class='mddh' @click="handeltabap" v-model:active="tabactive"
							color="#FF5B5B" background="#f6f6f6">
							<van-tab title="套餐详情"></van-tab>
							<van-tab title="图文介绍"></van-tab>
							<van-tab title="用户评论"></van-tab>
							<van-tab title="购买须知"></van-tab>
						</van-tabs>
					</van-sticky>
				</view>
				<view class="colorModel">

				</view>
				<view class="">
					<!-- <scroll-view :scroll-into-view="toView" :show-bar="false" :scroll-y="true"
					:scroll-with-animation="true"> -->
					<view class='mealDetail' id='md1'>
						<view class="mealDetail-title">
							套餐详情
						</view>
						<view class="mealDetail-item">
							<p>特大蟹礼遇三对装888型</p>
							<view class="mealDetail-info">
								<view class="mealDetail-info-left">
									熊蟹4.0两3只 雌蟹2.8只两三只(1份)
								</view>
								<view class="mealDetail-info-right">
									888
								</view>
							</view>
						</view>
						<!-- <view class="mealDetail-line"></view> -->
					</view>
					<!-- 图文介绍 -->
					<view id='md2'>
						<view class="partingLine"></view>
						<view class="titModel">
							图文介绍
						</view>
						<view class="detailsInfoContent">
							<view v-html='detailsData?.description'></view>
						</view>
					</view>
					<!-- 用户评价 -->
					<view id='md3'>
						<view class="partingLine"></view>
						<view class="detailsInfoComment">
							<view class="detailsInfoComment__title">
								用户评价（12）
							</view>
							<view class="detailsInfoComment__list">
								<view class="detailsInfoComment__listItem">
									<view class="listItemLeft">
										<van-image round width="100%" height="100%"
											src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
									</view>
									<view class="listItemRight">
										<view class="listItemRight__nickname">
											李*霍
										</view>
										<view class="listItemRight__time">
											2天前评价！
										</view>
										<view class="listItemRight__body">
											<view class="listItemRight__bodyContent">
												衣服很好看，物流也很快，非常完美的一次购物！
											</view>
											<view class="listItemRight__body">

											</view>
										</view>
									</view>
								</view>
								<view class="detailsInfoComment__listItem">
									<view class="listItemLeft">
										<van-image round width="100%" height="100%"
											src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
									</view>
									<view class="listItemRight">
										<view class="listItemRight__nickname">
											韩*刚
										</view>
										<view class="listItemRight__time">
											2天前评价！
										</view>
										<view class="listItemRight__body">
											<view class="listItemRight__bodyContent">
												非常好看，穿衣效果爆炸！
											</view>
											<view class="listItemRight__bodyImage">
												<van-image width="100%" height="234rpx"
													src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
											</view>
										</view>
									</view>
								</view>
							</view>
							<view class="load">
								查看更多
							</view>
						</view>
					</view>
					<!-- 购买须知 -->
					<view id='md4'>
						<view class="partingLine" style='margin-top: 10rpx;'></view>
						<view class="titModel">
							购买须知
						</view>
						<view class="purchaseNotes">
							<span v-html='detailsData?.purchase_notes'></span>
						</view>
					</view>



				</view>
				<!-- </scroll-view> -->
			</view>
			<!-- 购买动作面板 -->
			<view class="actionBar">
				<van-action-bar>
					<van-action-bar-icon icon="wap-home-o" to="/pages/index/index" text="首页" />
					<van-action-bar-icon icon="chat-o" to="/pages/index/index" text="客服" />
					<van-action-bar-button type="warning" text="立即购买" @click="handlePayment(true)" />
					<van-action-bar-button v-if='userInfo!=undefined && userInfo.is_expert!=0' type="danger"
						text="转发购买返￥15" @click="showShare = true" />
				</van-action-bar>
			</view>
		</view>
		<!-- 支付弹窗 -->
		<van-popup v-model:show="payPopupShow" round :close-on-click-overlay="false" closeable position="bottom">
			<view class="" style="margin: 80rpx 20rpx 0;">
				<van-cell title="参数" label="描述信息">
					<template #label>
						<view class="" v-for="(item, index) in cartData.cartInfo" :key="index">
							<view style="color: #000;">{{ item.productInfo.attrInfo.suk }}</view>
							<view style="text-decoration: line-through;">{{ item.productInfo.attrInfo.cost }}</view>
							<view style="color: red;">{{ item.productInfo.attrInfo.price }}</view>
						</view>
					</template>
				</van-cell>
			</view>
			<view class="contact">
				<van-form>
					<van-cell-group inset>
						<van-field v-model="formPyData.nickname" name="联系人" label="联系人" placeholder="联系人"
							:rules="[{ required: true, message: '请填写联系人' }]" />
						<van-field v-model="formPyData.iphone" name="联系电话" label="联系电话" placeholder="联系电话"
							:rules="[{ required: true, message: '请填写联系电话' }]" />
					</van-cell-group>
					<div style="margin: 16px;">
						<van-button round block type="primary" native-type="submit" @click="onSubmitPay">
							去支付
						</van-button>
					</div>
				</van-form>
			</view>
		</van-popup>
		<!-- 分享面板 -->
		<van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="options" @select="handleShareSelect" />
		<!-- 入驻 -->
		<van-popup v-model:show="showSettled" title='商家入驻' :before-close="closeSettled"
			style='padding: 40rpx;border-radius: 20rpx;'>
			<view style='text-align: center;padding:0 0 20rpx 0; font-size: 40rpx;'>
				商家入驻
			</view>
			<van-form @submit="onSubmitSettled" style='width:500rpx'>
				<van-cell-group inset>
					<van-field v-model="realname" name="联系人" label="联系人" placeholder="请输入您的姓名" />
					<van-field v-model="mobile" name="联系电话" label="联系电话" placeholder="请输入您的电话" maxlength='11' />
				</van-cell-group>
				<div style="margin: 16px;">
					<van-button round block type="primary" native-type="submit">
						提交
					</van-button>
				</div>
			</van-form>
		</van-popup>
		<view class="shareFriend" v-if='shareFriend' @click='closeshareFriend'>
			<image src="../../static/images/fxhy.png" style="width: 100%;height: 100%;"></image>
		</view>

		<view class="">

		</view>

	</view>
</template>

<script>
	import wx from 'weixin-js-sdk'
	import {
		mapGetters
	} from 'vuex';
	import {
		getWechatConfigApi
	} from '@/api/public.js'
	import {
		getProductDetailsApi,
		setProductCartAddApi,
		getProductCartConfirmApi,
		productPayApi,
		merchantsEnter,
		getshareList,
		getreplyList
	} from '@/api/details.js'

	import {
		Toast,
		Dialog
	} from 'vant';
	import cache from '../../utils/cache.js'
	import {
		getUserInfoApi
	} from '@/api/users.js'
	import wechat from '@/libs/wechat.js'
	export default {
		data() {
			return {
				// 商品ID
				proucteId: 0,

				// 商品详情
				detailsData: {},
				// 商家详情
				merchantInfo: {},
				// 商品sku值
				productAttr: {},
				// 系统属性
				productValue: [],

				productSelect: {},

				phone: "17300000000",
				showShare: false,

				// 支付弹窗
				cartId: '',
				cartData: {
					orderKey: '',
					cartInfo: []
				},
				payPopupShow: false,
				formPyData: {
					nickname: '山野藏爱深.',
					iphone: '17331073786'
				},

				options: [{
						name: '微信',
						icon: 'wechat'
					},
					// {
					// 	name: '微博',
					// 	icon: 'weibo'
					// },
					{
						name: '复制链接',
						icon: 'link'
					},
					{
						name: '分享海报',
						icon: 'poster'
					},
					// {
					// 	name: '二维码',
					// 	icon: 'qrcode'
					// },
				],
				showSettled: false,
				showpage: true,
				realname: undefined, //入驻  商家联系人
				mobile: undefined, // 入驻  商家联系电话
				uid: undefined,
				shareFriend: false,
				interval: 2000,
				duration: 500,
				swiperItem: [], //轮播图
				selectPayInfo: {},
				fromname: '', //起始名称
				toname: '', //终点名称
				fromcoord: undefined, //起始位置
				tocoord: undefined, //终点地址
				mermobile: undefined, //商家电话
				userInfo: cache.get('USER_INFO'), //
				tabactive: 0,
				wxInfo: {},
				luboImg: [],
				topThree: [],
				topFifty: [],
			}
		},
		onLoad(options) {
			let that = this;
			getWechatConfigApi().then(res => {

				wx.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: res.data.appId, // 必填，公众号的唯一标识
					timestamp: Number(res.data.timestamp), // 必填，生成签名的时间戳
					nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
					signature: res.data.signature, // 必填，签名
					jsApiList: ['updateAppMessageShareData'],
				})

			})
			that.proucteId = options.id
			that.getProductDetails()
			that.getshare(options.id) //获取排行榜数据 
			that.getreply(options.id) //获取评论列表
			uni.pageScrollTo({
				scrollTop: 0,
			});
			if (this.userInfo != undefined) {
				this.userInfo = JSON.parse(this.userInfo)
			}
			this.wxInfo = options
			const {
				code,
				state,
				scope
			} = options;
			if (wechat.isWeixin() && code && scope !== 'snsapi_base') {
				wechat.auth(code, state).then(res => {
					let time = res.expires_time - that.$Cache.time();
					that.$store.commit('LOGIN', {
						token: res.token,
						time: time
					});
					that.userInfo = res;
					this.$toast('登录成功');
					that.showpage = false
					getUserInfoApi().then(res1 => {
						that.$store.commit("SETUID", res1.data.uid);
						that.$store.commit('UPDATE_USERINFO', res1.data);
					}).catch(err => {
						console.log(err)
					})
				}).catch(error => {
					console.log(error)
				});
				return
			}

		},
		onShow: function() {
			// this.tabactive=0

		},
		onBackPress() {
			this.tabactive = 0
		},
		onPageScroll(e) {
			let anchor1 = this.$el.querySelector('#md1')?.offsetTop
			let anchor2 = this.$el.querySelector('#md2')?.offsetTop
			let anchor3 = this.$el.querySelector('#md3')?.offsetTop
			let anchor4 = this.$el.querySelector('#md4')?.offsetTop
			if (e.scrollTop >= anchor1) {
				this.tabactive = 0
			}
			if (e.scrollTop >= anchor2) {
				this.tabactive = 1
			}
			if (e.scrollTop >= anchor3) {
				this.tabactive = 2
			}
			if (e.scrollTop >= anchor4) {
				this.tabactive = 3
			}
		},

		computed: {
			phoneNumbe() {
				// 手机号仅显示前三位及后四位数字，隐藏信息用*代替
				return this.phone.substr(0, 3) + '****' + this.phone.substring(7);
			}
		},
		watch: {
			detailsData: {
				handler: function() {
					this.$nextTick(() => {});
				},
				immediate: true,
			}
		},
		methods: {
			/**
			 * 获取商品详情
			 */
			getProductDetails() {
				let that = this;
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						that.fromcoord = res.latitude + ',' + res.longitude
						getProductDetailsApi(that.proucteId, {
							location: res.latitude + ',' + res.longitude
						}).then(res => {
							that.$set(that, "merchantInfo", res.data.storeInfo.withMerchanInfo);
							that.$set(that, "detailsData", res.data.storeInfo);
							that.$set(that, "productAttr", res.data.storeInfoAttr);
							that.$set(that, "productValue", res.data.storeInfoValue);
							that.DefaultSelect()
							that.showpage = false
							that.uid = res.data.uid
							that.luboImg = res.data.storeInfo.slider_image
							that.tocoord = res.data.storeInfo.withMerchanInfo.location
							that.toname = res.data.storeInfo.withMerchanInfo.address
							that.mermobile = res.data.storeInfo.withMerchanInfo.mobile
						}).catch(err => {
							console.log(err)
						})
					}
				})
			},
			/**
			 * 设置默认选择SKU
			 */
			DefaultSelect() {
				let productAttr = this.productAttr;
				let value = [];
				for (var key in this.productValue) {
					value = key.split(",")
					break;
				}
				this.$set(productAttr, "index", value[0]);

				// sort();排序函数:数字-英文-汉字；
				let productSelect = this.productValue[value];

				if (productSelect && productAttr) {
					this.$set(
						this.productSelect,
						"store_name",
						this.detailsData.subheading
					);
					this.$set(this.productSelect, "price", productSelect.price);
					this.$set(this.productSelect, "unique", productSelect.uniques);
					this.$set(this.productSelect, "cart_num", 1);
				} else if (!productSelect && productAttr) {
					this.$set(
						this.productSelect,
						"store_name",
						this.detailsData.subheading
					);
					this.$set(this.productSelect, "price", this.detailsData.price);
					this.$set(this.productSelect, "unique", "");
					this.$set(this.productSelect, "cart_num", 0);
				} else if (!productSelect && !productAttr) {
					this.$set(
						this.productSelect,
						"store_name",
						this.detailsData.subheading
					);
					this.$set(this.productSelect, "price", this.detailsData.price);
					this.$set(
						this.productSelect,
						"unique",
						this.detailsData.uniques || ""
					);
					this.$set(this.productSelect, "cart_num", 1);
				}
			},
			/**
			 * SKU选择
			 * @param {Object} indexn
			 */
			ChangeAttr(indexn, value) {
				this.$set(this.productAttr, 'index', this.productAttr.attr_values[indexn]);
				let productSelect = this.productValue[this.productAttr.attr_values[indexn]];
				this.$set(this.detailsData, "preferential_price", productSelect.price);
				this.$set(this.detailsData, "unit_price", productSelect.cost);
				this.$set(this.productSelect, 'unique', productSelect.uniques);
			},

			/**
			 * 处理微信内部支付
			 * @param {Object} number
			 * @param {Object} paytype
			 */
			handlePayment(news) {
				let that = this;
				if (this.userInfo == undefined) {
					this.$wechat.oAuth('snsapi_userinfo', '/pages/details/index');
					return
				}
				uni.navigateTo({
					url: `/pages/users/users_orderOk/index?uniques=${that.productSelect.unique}&product_id=${this.proucteId}`
				})
				return
				let data = {
					productId: that.proucteId,
					cartNum: that.productSelect.cart_num,
					new: news === undefined ? 0 : 1,
					uniqueId: that.productSelect !== undefined ? that.productSelect.unique : "",
					virtual_type: that.detailsData.virtual_type,
				};

				setProductCartAddApi(data).then(res => {
					this.$set(this, 'cartId', res.data.cartId)
					this.getOrderConfirmInfo(res.data.cartId, news)
				}).catch(err => {
					console.log(err)
				})
			},

			/**
			 * 获取订单缓存信息
			 * @param {Object} cartId
			 */
			getOrderConfirmInfo(cartId, news) {
				getProductCartConfirmApi({
					cartId: cartId,
					new: news
				}).then(res => {
					// this.$set(this.cartData, 'orderKey', res.data.orderKey)
					// this.$set(this.cartData, 'cartInfo', res.data.cartInfo)
					this.cartData = res.data
					this.payPopupShow = true
				}).catch(err => {
					console.log(err)
					this.$util.Tips({
						title: '获取订单缓存信息失败'
					});
				})
			},

			/**
			 * 
			 * 去支付
			 */
			onSubmitPay() {
				let that = this;
				let paytype = 'WECHAT_PAY'
				productPayApi(that.cartData.orderKey, {
					nickname: that.formPyData.nickname,
					iphone: that.formPyData.iphone,
					paytype: paytype,
					// type: that.friendPay ? 1 : 0,
					// #ifdef H5
					'from': this.$wechat.isWeixin() ? 'weixin' : 'weixinh5',
					// #endif
				}).then(res => {
					let jsConfig = res.data.result.jsConfig;
					let goPages = '/pages/users/employ_order/index?order_id=' + this.cartData.orderKey;
					let status = res.data.status
					switch (paytype) {
						case 'WECHAT_PAY':
							if (jsConfig === undefined) return that.$util.Tips({
								title: '缺少支付参数'
							});

							// #ifdef H5
							this.$toast.loading({
								message: '支付中...',
								forbidClick: true,
							});
							that.$wechat.pay(jsConfig).then(() => {
								this.payPopupShow = false
								return that.$Tools.Tips({
									title: "支付成功",
									icon: 'success'
								}, {
									tab: 5,
									url: goPages
								});
							}).catch(() => {
								if (!this.$wechat.isWeixin()) {
									uni.redirectTo({
										url: goPages +
											'&msg=支付失败&status=2'
									})
								}
								if (res.errMsg == 'chooseWXPay:cancel') return that.$util.Tips({
									title: '取消支付'
								}, {
									tab: 5,
									url: goPages + '&status=2'
								});
								// return that.$Tools.Tips({
								// 	title: '支付失败'
								// }, () => {
								// 	that.$emit('onChangeFun', {
								// 		action: 'pay_fail'
								// 	});
								// });
							});
							// #endif
							break;
					}
				}).catch(err => {

				})
			},

			/**
			 * 处理分享
			 * @param {Object} options
			 */
			handleShareSelect(options) {
				// this.$wechat.AppMessageShare()
				// wx.checkJsApi({
				// 	jsApiList: ['updateAppMessageShareData', 'onMenuShareAppMessage'], // 须要检测的JS接口列表，全部JS接口列表见附录2,
				// 	success: function(res) {
				// 		// 以键值对的形式返回，可用的api值true，不可用为false
				// 		// 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
				// 	}
				// });
				wx.ready(() => {
					wx.updateAppMessageShareData({ //编辑分享内容
						title: '标题',
						desc: '测试',
						imgUrl: '//img14.360buyimg.com/n1/jfs/t1/207828/37/25243/495428/62ea3799E7c263685/be8689177122e7f2.jpg',
						link: "http://xzhk-h5.profess.top", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						success: () => {
							this.shareFriend = true
						}
					})
				})
				wx.error(err => {
						console.log(err);
				})

			},
			// 入驻
			handelSettled() {
				this.showSettled = true
			},
			// 提交入驻信息
			onSubmitSettled() {
				if (this.realname == undefined) {
					Toast.fail('请填写联系姓名');
					return
				}
				if (this.mobile == undefined) {
					Toast.fail('请填写联系电话');
					return
				}
				const data = {
					realname: this.realname,
					uid: this.uid,
					mobile: this.mobile
				}
				merchantsEnter(data).then(res => {
					Toast.success(res.msg);
					this.showSettled = false
				}).catch(err => {
					Toast.fail(err.msg);
				})
			},
			// 关闭入驻商家弹框
			closeSettled() {
				this.showSettled = false
				this.realname = undefined
				this.mobile = undefined
			},
			// 关闭分享朋友
			closeshareFriend() {
				this.shareFriend = false
			},
			// 点击导航
			handelMap() {
				let key = '6ITBZ-OEA62-WXGUX-CLPRV-HUTIJ-CEBVF'
				// let aaa=`https://apis.map.qq.com/uri/v1/routeplan?type=bus&fromcoord=${this.fromcoord}&to=${this.toname}&tocoord=${this.tocoord}&policy=1&referer=${key}`

				window.location.href =
					`https://apis.map.qq.com/uri/v1/routeplan?type=bus&from=我的位置&fromcoord=${this.fromcoord}&to=${this.toname}&tocoord=${this.tocoord}&policy=1&referer=${key}`
			},
			// 拨打电话
			callPhone() {
				uni.makePhoneCall({
					phoneNumber: this.mermobile
				});
			},
			gotooutlets() {
				// console.log(this.detailsData);
				uni.navigateTo({
					url: '/pages/outlets/index?mid=' + this.detailsData.mid + '&location=' + this.fromcoord
				})
			},
			handeltabap(e) {
				this.tabactive = e
				let selector = '#md' + (e + 1)
				let anchor = this.$el.querySelector(selector)
				document.documentElement.scrollTop = anchor.offsetTop + 310
			},
			gotomerInfo() {
				uni.navigateTo({
					url: '/pages/merInfo/index?mid=' + this.detailsData.mid
				})
			},
			wxLogin() {



			},
			// 获取排行榜数据
			getshare(id) {
				let that = this
				getshareList(id).then(res => {

					that.topThree = res.data.topThree
					that.topFifty = res.data.topFifty
				}).catch(err => {
					Toast.fail(err.msg)
				})
			},
			// 获取评论列表
			getreply(id) {
				let that = this
				getreplyList(id).then(res => {
					console.log(res);
				}).catch(err => {
					Toast.fail(err.msg)
				})
			}

		}
	}
</script>

<style lang="scss">
	.shopping-userInfo {
		height: 721rpx;
		overflow: hidden;

		.userInfo {
			position: relative;
			display: flex;
			flex: 1;
			height: 160rpx;
			margin: 40rpx 30rpx 0;
			color: #fff;
			z-index: 1;

			.avatar {
				position: relative;
				width: 160rpx;
				height: 150rpx;
				margin: 0px;
				// padding: 29rpx 32rpx 34rpx;
				// background-color: #fff;
				// box-shadow: 0 2rpx 2rpx rgba(0, 0, 0, 0.3);
				box-sizing: border-box;
				border-radius: 50%;
				// background: url('/static/icon/位图.png') no-repeat;
				// background-size: 100% 100%;
				// background-attachment:fixed;

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
				flex: 1;
				// height: 34rpx;
				margin-top: 29rpx;
				margin-left: 32rpx;
				// padding: 29rpx 0;
				font-size: 34rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				// color: #191919;
				line-height: 34rpx;

				text {
					display: block;
				}

				.level {
					display: inline-block;
					width: 98rpx;
					height: 39rpx;
					margin-left: 21rpx;
					border: 2rpx solid rgba(255, 193, 66, 1);
					border-radius: 7rpx;
					// border-image: linear-gradient(145deg, rgba(255, 226, 118, 1), rgba(255, 193, 66, 1), rgba(255, 193, 66, 1))1 1;
					text-align: center;
					// line-height: 39rpx;
				}

				// .level::after {}

				.level span {
					// width: 48rpx;
					// height: 39rpx;
					font-size: 22rpx;
					// font-family: PingFangSC-Regular, PingFang SC;
					// font-weight: 400;
					color: #FFCF68;
					// line-height: 39rpx;

				}
			}

			.ipone {
				height: 24rpx;
				margin-top: 18rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				// color: #191919;
				line-height: 24rpx;
			}

			.enter {
				width: 108rpx;
				height: 50rpx;
				margin-top: 29rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				text-align: center;
				background: linear-gradient(180deg, #FFE87D 0%, #F18A0D 100%);
				border-radius: 7rpx;
				line-height: 50rpx;
			}
		}

		.userInfoBackground {
			position: absolute;
			top: 0;
			z-index: 0;
			width: 100%;
			height: 721rpx;
			background: rgba(0, 0, 0, 0.29);
		}

		#myVideo {
			width: 100%;
			height: 100%;
		}
	}

	.shopping-content {
		position: relative;
		width: 100%;
		// height: 16811rpx;
		margin-top: -48rpx;
		margin-bottom: 30rpx;
		// padding-bottom: 100rpx;
		background: #FFFFFF;
		border-radius: 60rpx 60rpx 0px 0px;
		z-index: 1;

		.detailsInfo {
			padding: 30rpx 60rpx 0;

			&__price {
				display: flex;
				// width: 108rpx;
				height: 50rpx;
				font-size: 30rpx;
				// font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FF3232;
				line-height: 50rpx;
			}

			&__originalCost {
				// width: 72rpx;
				height: 50rpx;
				margin-top: 5rpx;
				margin-left: 10rpx;
				margin-right: 30rpx;
				font-size: 30rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				text-decoration: line-through;
				color: #A3A3A3;
				line-height: 50rpx;
			}

			&__return {
				width: 101rpx;
				height: 43rpx;
				border-radius: 8rpx;
				border: 1rpx solid #EC4040;
				line-height: 43rpx;
				display: flex;

				.fan {
					display: inline-block;
					width: 43rpx;
					height: 43rpx;
					background: linear-gradient(133deg, #FB8383 0%, #E72C2C 100%);
					border-radius: 8rpx;
					text-align: center;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;

				}

				.fanMoney {
					// width: 43px;
					// height: 24px;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #3B3B3B;
					line-height: 46rpx;
				}
			}

			&__sell {
				flex: 1;
				// width: 124px;
				// height: 24px;
				margin-top: 5rpx;
				text-align: end;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #A3A3A3;
				// line-height: 24rpx;
			}
		}

		.detailsInfo__description {
			height: 111rpx;
			margin-top: 21rpx;
			margin-bottom: 43rpx;
			font-size: 26rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #656565;
			line-height: 37rpx;
		}

		.detailsInfoLocation {
			margin: 0 48rpx 48rpx;

			&__cell {
				display: flex;
				align-items: flex-end;
				justify-content: space-between;
				margin: 40rpx 0;

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
				// width: 240rpx;
				height: 36rpx;
				margin-bottom: 5rpx;
				font-size: 30rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #434343;
				line-height: 36rpx;
				margin-top: 64rpx;
			}

			&__road {
				display: flex;
				align-items: center;
				justify-content: space-between;

				& span {
					flex: 1;
					width: 412rpx;
					height: 24rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #434343;
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
			}

			&__distanceNavigation {
				// width: 56px;
				// height: 24px;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #347DFF;
				line-height: 24rpx;
			}

		}


		.detailsInfoRanking {
			margin: 48rpx 48rpx;

			&__title {
				// width: 180px;
				// height: 36px;
				font-size: 36rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #434343;
				line-height: 36rpx;
			}

			.topThree {
				display: flex;
				justify-content: space-between;
				align-content: flex-end;
				align-items: flex-end;
				height: 161rpx;
				margin-top: 110rpx;
			}

			.topThreeItem {
				position: relative;
				width: 161rpx;
				height: 134rpx;

				.topThreeItemAvatar {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 81rpx;
					height: 81rpx;
					border-radius: 50%;
					margin-top: 22rpx;
					// margin: auto;
					overflow: hidden;
					z-index: 0;
				}

				.topThreeItemNumber {
					position: absolute;
					bottom: -2rpx;
					width: 100%;
					text-align: center;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #434343;
					// line-height: 36px;
					z-index: 2;
				}

				.topThreeItemNickname {
					position: absolute;
					bottom: -40rpx;
					width: 100%;
					text-align: center;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #434343;
				}

				img {
					position: absolute;
					width: 100%;
					height: 100%;
					z-index: 1;
				}
			}

			.topThree__one {
				width: 259rpx;
				height: 196rpx;
				margin-bottom: 30rpx;

				.topThreeItemAvatar {
					width: 128rpx;
					height: 128rpx;
					margin-top: 26rpx;
				}

				.topThreeItemNumber {
					bottom: 6rpx;
				}
			}

			.rankingFourth {
				// width: 670rpx;
				// height: 389rpx;
				margin: 71rpx 0 0;
				background: #FFFFFF;
				box-shadow: 0px 4rpx 30rpx 12rpx rgba(0, 0, 0, 0.06);
				border-radius: 8rpx;
				overflow: hidden;
			}

			.rankingFourthItem {
				display: flex;
				flex-wrap: nowrap;
				align-items: center;
				padding: 20rpx 40rpx;
				// width: 100%;
				height: 66rpx;

				&__avatar {
					margin: 0 26rpx;
				}

				&__nickname {
					flex: 1;
				}
			}

			// .topThree__two {
			// 	// background-position:center center;
			// 	background-size: 100% 100%;
			// 	background: url('../../static/icon/two.png') no-repeat;
			// }
		}

		.detailsInfoSku {
			margin: 46rpx 50rpx 0;

			&__title {
				// width: 144px;
				// height: 36px;
				margin-bottom: 49rpx;
				font-size: 36rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #434343;
				line-height: 36rpx;
			}

			&__category {
				// display: flex;
				//    flex-direction: row;
				//    flex-wrap: wrap;
				//    justify-content: flex-start;
			}

			&__categoryItem {
				// width: 263px;
				// height: 83px;
				padding: 24rpx 32rpx;
				border-radius: 8rpx;
				border: 1rpx solid #FF3232;
			}

			&__categoryItem.on {
				background: rgba(255, 50, 50, 0.06);
				color: #ff3434;
			}
		}

		.detailsInfoContent {
			width: 100%;
			box-sizing: border-box;
			padding: 0 30rpx;
			padding-bottom: 30rpx;
			// height: 16811px;
			background: #FFFFFF;
			border-radius: 60rpx 60rpx 0rpx 0rpx;

			img {
				width: 100%;
			}
		}

		.detailsInfoComment {
			margin: 44rpx 50rpx 0;

			&__title {
				// width: 253px;
				// height: 36px;
				font-size: 36rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #434343;
				line-height: 36rpx;
			}

			&__list {
				margin-top: 58rpx;
			}

			.load {
				position: relative;
				// width: 96px;
				// height: 24px;
				margin-top: 30rpx;
				text-align: center;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #525252;
				line-height: 24rpx;
			}

			.load::after {
				content: '';
				position: absolute;
				top: 0;
				width: 0px;
				height: 0px;
				margin-top: 3rpx;
				margin-left: 3rpx;
				border: 12rpx solid #000;
				border-top-color: #5C5C5C;
				border-bottom-color: transparent;
				border-left-color: transparent;
				border-right-color: transparent;
			}

			.detailsInfoComment__listItem {
				display: flex;
				margin-bottom: 20rpx;
			}

			.listItemLeft {
				width: 78rpx;
				height: 78rpx;
				overflow: hidden;
			}

			.listItemRight {
				flex: 1;
				width: 100%;
				padding: 27rpx 26rpx;
				margin-left: 27rpx;
				background: #F9F9F9;

				&__nickname {
					// width: 73px;
					// height: 24px;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #525252;
					line-height: 24rpx;
				}

				&__time {
					// width: 112px;
					// height: 24px;
					margin: 12rpx 0 15rpx;
					font-size: 20rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #9A9A9A;
					line-height: 24rpx;
				}

				&__body {
					// width: 484px;
					// height: 24px;
					font-size: 22rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #9A9A9A;
					line-height: 24rpx;
				}

				.listItemRight__bodyImage {
					margin-top: 20rpx;
				}
			}
		}


		.purchaseNotes {
			padding: 0 30rpx;
			background-color: #fff;
			margin-bottom: 100rpx;
		}

		.purchaseNotes span {
			width: 660rpx;
			// height: 1152rpx;
			font-size: 32rpx;
			letter-spacing: 1rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #434343;
			line-height: 36rpx;
		}


	}

	.actionBar {
		position: relative;
		height: 100rpx;
		z-index: 10;
	}

	.partingLine {
		width: 100%;
		height: 19rpx;
		background: #f6f6f6;
	}

	.titModel {
		padding: 30rpx;
		font-size: 40rpx;
	}

	.van-cell {
		padding-left: 0;
		padding-right: 0;
	}

	.contact {
		margin: 20rpx 0 80rpx;
	}

	.shareFriend {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		z-index: 2007;
	}

	.uni-margin-wrap {
		width: 100%;
	}

	.swiper {
		height: 721rpx;
	}

	.swiper-item {
		display: block;
		height: 721rpx;
		line-height: 721rpx;
		text-align: center;
	}

	::v-deep .uni-swiper-dots-horizontal {
		left: 50%;
		bottom: 88rpx;
		text-align: center;
		white-space: nowrap;
		transform: translate(-50%, 0);
	}

	::v-deep .uni-swiper-dot {
		display: inline-block;
		width: 122rpx;
		height: 10rpx;
		cursor: pointer;
		transition-property: background-color;
		transition-timing-function: ease;
		background: rgba(0, 0, 0, 0.3);
		border-radius: 10rpx;
	}

	.swiper-item {
		position: relative;

		.mask {
			background-color: #000;
			opacity: 0.3;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 6;
			width: 100%;
			height: 100%;
		}

		image {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 5;
		}
	}

	.uni-margin-wrap1 {
		width: 500rpx;
		/* height: 68rpx; */
		/* overflow-y: hidden; */
		font-size: 24rpx;
		background-color: red;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #1B292E;
		line-height: 34rpx;
		position: relative;
		z-index: 9999;
	}

	::v-deep .rankingFourth uni-swiper {
		display: block;
		height: 330rpx !important;
	}

	.tabap {}

	.colorModel {
		width: 100%;
		height: 10rpx;
		background-color: #f6f6f6;
	}

	::v-deep .tabap .van-tab__text {
		font-size: 32rpx;
	}

	::v-deep .tabap .van-tabs--line {
		margin-top: 0 !important;
	}

	::v-deep .tabap .van-tabs--line van-tabs__line {
		margin-bottom: 10rpx;
	}

	.flexRowCc {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.scroll-content {
		position: relative;

		.scroll-tab {
			.flexRowCc {
				justify-content: space-between;
				width: 100%;
				height: 44px;
				box-sizing: border-box;
				border-top: 1px solid #F1F1F1;
				border-bottom: 1px solid #F1F1F1;
				background: #FFFFFF;
				position: relative;
				z-index: 999;
			}

			;

			&_static {
				position: relative !important;
			}

			&_fixed {
				position: fixed;
				top: 44px;
				left: 0;
			}

			&_list {
				text-align: center;
				font-size: 32rpx;
				flex: 1 1 auto;

				&_text {
					display: inline-block;
				}
			}

			&_bar {
				width: 64rpx;
				height: 4rpx;
				background: rgba(222, 37, 37, 100);
				position: absolute;
				bottom: 8rpx;
				border-radius: 16rpx;
				transition-duration: .5s;
			}
		}
	}

	.scroll-warp {
		height: 100vh;
	}

	// 套餐详情
	.mealDetail {
		width: 100%;
		background-color: #fff;
		padding: 30rpx 0;

		.mealDetail-title {
			font-size: 40rpx;
			margin-left: 30rpx;
		}

		.mealDetail-item {
			margin-top: 20rpx;
			margin-left: 30rpx;

			.mealDetail-info {
				margin-top: 10rpx;
				display: flex;

				.mealDetail-info-left {
					width: 75%;
					// flex: 1 1 0%;
				}

				.mealDetail-info-right {
					flex: 1;
					font-size: 34rpx;
					line-height: 46rpx;
				}
			}
		}

		.mealDetail-line {
			width: 92%;
			margin: 20rpx auto;
			height: 1px;
			background-color: #f6f6f6;
		}
	}
</style>
