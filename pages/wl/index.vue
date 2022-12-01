<template>
	<view class="content">
		<!-- 定位OR通告 -->
		<view class="shopping-header">
			<view class="location" @click="areaShow = true">
				<span>{{cityName}}</span>
				<van-icon name="arrow-down" />
			</view>
			<view class="annunciate" @click="annunciateOverlayShow = true">
				<img class="annunciateImg" src="/static/menus_icon/annunciate.png" alt="">
				<span>放心买，随心退</span>
				<van-icon size="12" name="arrow" />
			</view>
		</view>
		<!-- 商品搜索 -->
		<view class="shopping-search">
			<van-icon name="search" class='shopping-search_icon' color='#999' />
			<van-field class="shopping-search_s" v-model="value2" autosize clearable autocomplete="false"
				placeholder="请输入关键词搜索" />
			<view class="shopping-search_sbtn">
				搜索
			</view>
		</view>
		<!-- banner -->
		<view class="shopping-banner">
			<swiper class="my-swipe" :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item class="swipe-item" v-for="(item, index) in shoppingBanner" :key="index">
					<image style="width: 100%;height: 100%;" :src="item.cover" mode="aspectFill">
					</image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 菜单栏 -->
		<view :class="handleVanStickyShow?'shopping-menus' : 'shopping-menus shopping-menusChange'">
			<view class="shopping-menus__dropdown" :class="handleVanStickyShow || 'shopping-menusChange'">
				<van-sticky @change="handleVanSticky">
					<van-dropdown-menu class="shopping-menus__dropdownItem">
						<van-dropdown-item :title="cityNames" ref="cityListDropdownItem">
							<van-row gutter="20">
								<van-col span="12">
									<view class="shopping-menus__dropdownHeight cityList">
										<view class="cityListItem" :class="adCode == 0 ? 'on' : ''"
											@click="handleCityClick(0)">
											全部区域
										</view>
										<view class="cityListItem" :class="adCode == item.citycode ? 'on' : ''"
											v-for="(item, index) in cityClassifyListData" :key="index"
											@click="handleCityClick(item.citycode)">
											{{ item.name }}
										</view>
									</view>
								</van-col>
								<van-col span="12">
									<view v-if="adCode == 0" class="shopping-menus__dropdownHeight">
										<view class="cityListItem" :class="adCode == 0 ? 'on' : ''"
											@click="handleCityClick(0)">
											不限
										</view>
										<view class="cityListItem" :class="adCode == item.meter ? 'on' : ''"
											v-for="(item, index) in cityClassifyListMeterData" :key="index"
											@click="handleCityMeterClick(item.meter)">
											{{ item.text }}
										</view>
									</view>
								</van-col>
							</van-row>
						</van-dropdown-item>
						<van-dropdown-item title="分类" ref="item">
						</van-dropdown-item>
						<van-dropdown-item v-model="recommendValue" :options="recommendOptions">
						</van-dropdown-item>
						<van-dropdown-item title="筛选" ref="item">
							<view class="" style="margin: 10rpx 20rpx;">
								<van-row gutter="20">
									<van-col span="12">
										<van-button type="default" plain size="small" block round @click="">
											重置
										</van-button>
									</van-col>
									<van-col span="12">
										<van-button type="primary" size="small" block round @click="">
											确认
										</van-button>
									</van-col>
								</van-row>
							</view>
						</van-dropdown-item>
					</van-dropdown-menu>
				</van-sticky>
			</view>
			<view class="shopping-menus__iconBtn" v-show="handleVanStickyShow">
				<view class="shopping-menus__iconBtnItem">
					<img class="icon" src="/static/menus_icon/finefood.png" alt="" srcset="">
					<span>
						美食餐饮
					</span>
				</view>
				<view class="shopping-menus__iconBtnItem">
					<img class="icon" src="/static/menus_icon/recreation.png" alt="" srcset="">
					<span>
						休闲娱乐
					</span>
				</view>
				<view class="shopping-menus__iconBtnItem">
					<img class="icon" src="/static/menus_icon/hotel.png" alt="" srcset="">
					<span>
						酒店住宿
					</span>
				</view>
				<view class="shopping-menus__iconBtnItem">
					<img class="icon" src="/static/menus_icon/park.png" alt="" srcset="">
					<span>
						公园
					</span>
				</view>
				<view class="shopping-menus__iconBtnItem">
					<img class="icon" src="/static/menus_icon/hairdressing.png" alt="" srcset="">
					<span>
						美容美发
					</span>
				</view>
			</view>
		</view>
		<!-- 商家列表 -->
		<view class="shopping-productList">
			<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="handleOnLoad">
				<template v-for="(item, index) in productListData" :key="index">
						<view class="shopping-productListItem" @click='gotoDetail(item.id)'>
							<view class="infoImg" >
								<image :src="item.recommend_image"  mode='aspectFill'></image>
							</view>
							<view class="infoDescription">{{ item.selling_point }}</view>
							<view class="unitPrice">
								<view><span class="price">￥</span><span class="money">{{item.preferential_price}}</span>
								</view>
								<view class="rackRate">门市价￥{{item.unit_price}}</view>
								<view class="return" v-if='userInfo!=undefined && userInfo.is_expert!=0'>
									<span class="fan">返</span>
									<span class="fanMoney">￥{{item.rebate}}</span>
								</view>
							</view>
						</view>
				</template>
			</van-list>
		</view>
	</view>
	<!-- 安心退遮罩层 -->
	<van-overlay z-index="1000" :show="annunciateOverlayShow">
		<div class="wrapper" @click.stop>
			<div class="frame">
				<view class="frameBg">
					<view class="frameBg__title">
						放心买，随心退
					</view>
				</view>
				<view class="frameBody">
					<view class="frameBody__title">随心退是什么？</view>
					<view class="frameBody__content">在爆品商城里购买的商品，在未使用核销的情况下可享受退款无服务费的权益。</view>
					<view class="frameBody__title">哪些商品可以享受随心退？</view>
					<view class="frameBody__content">在爆品商城里购买的商品，在未使用核销的情况下可享受退款无服务费的权益。</view>
					<view class="frameBody__title">已经过期的订单是否可以随心退？</view>
					<view class="frameBody__content">在爆品商城里购买的商品，在未使用核销的情况下可享受退款无服务费的权益。</view>
				</view>
			</div>
			<div class="frameClose">
				<van-icon name="close" size="65rpx" @click="annunciateOverlayShow = false" />
			</div>
		</div>
	</van-overlay>
	<!-- 城市 -->
	<van-popup v-model:show="areaShow" round position="bottom">
		<van-area title="选择城市" confirm-button-text :area-list="areaList" :value="cityAdCode" :columns-num="2"
			@cancel="handleAreaShow(false)" @confirm="handleAreaSubmit" />
	</van-popup>
	<tabbar></tabbar>

</template>

<script>
	import {
		handleError,
		ref
	} from 'vue'
	import Tabbar from '@/components/tabbar/index.vue'
	import {
		areaList
	} from '@vant/area-data'

	import {
		getLocationInfoApi,
		getCityClassifyListApi,
		getBannerListApi,
		getProductListApi
	} from '@/api/home.js'
import cache from '../../utils/cache.js'
	export default {
		components: {
			Tabbar
		},
		data() {
			return {
				// 城市所在地名
				cityName: '暂未选择',
				// 默认所在的城市选择
				cityAdCode: 0,
				// 用户所存在的区级城市
				adCode: 0,

				// 安心退遮罩层
				annunciateOverlayShow: false,
				// 首页轮播图
				shoppingBanner: [],

				// 下级城市数据
				cityClassifyListData: [],
				// 下拉城市分类附近
				cityClassifyListMeterValue: 0,
				// 下级城市公里单位
				cityClassifyListMeterData: [{
						meter: 1,
						text: '500M'
					},
					{
						meter: 1,
						text: '1KM'
					},
					{
						meter: 1,
						text: '3KM'
					},
					{
						meter: 1,
						text: '5KM'
					},
					{
						meter: 1,
						text: '10KM'
					}
				],
				// 默认设置区域占位符
				cityNames: '全部',

				recommendValue: 0,
				recommendOptions: [{
						text: '推荐',
						value: 0
					},
					{
						text: '距离优先',
						value: 1
					},
					{
						text: '销量优先',
						value: 2
					},
					{
						text: '价格优先',
						value: 3
					}
				],

				// 菜单黏贴
				handleVanStickyShow: true,
				// 城市选择器
				areaShow: false,

				// 列表加载
				loading: false, // 是否处在加载状态
				finished: false, // 是否已加载完成
				onLoad: false,

				// 商家数据
				productListData: [],

				// 筛选条件
				productWhere: {
					cityAdCode: 0,
					meter: 0,

					page: 1, // 分页
					page_size: 10, // 每页条数
					total: 0 // 数据总条数
				},
				userInfo:cache.get('USER_INFO'), //

			}
		},
		setup() {
			return {
				areaList
			};
		},
		onLoad() {
			const that = this
			uni.getLocation({
				type: 'wgs84',
				success: function(res) {
					// console.log('当前位置的经度：' + res.longitude);
					// console.log('当前位置的纬度：' + res.latitude);

					that.getLocation(res.latitude + ',' + res.longitude)
				}
			})

			// this.getProductList(this.productWhere)
			this.userInfo=JSON.parse(this.userInfo)
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.cityName
			})
		},
		methods: {
			/**
			 * 获取当心位置信息接口
			 * @param {Object} data
			 */
			getLocation(data) {
				getLocationInfoApi(data).then(res => {
					const that = this
					const data = res.data.result.ad_info
					this.cityName = data.city
					// that.cityAdCode = data.city_code.slice(3)
					// this.adCode = data.adcode
					that.getCityClassifyList(data.city_code.slice(3) - 0)

					this.getBannerList(data.city_code.slice(3) - 0)
				}).catch(err => {
					console.log('请求失败' + err)
				})
			},
			/**
			 * 监听城市选择
			 * @param {Object} e
			 */
			handleAreaSubmit(e) {
				uni.setNavigationBarTitle({
					title: e[1].name
				})

				this.cityName = e[1].name
				this.areaShow = false

				this.getCityClassifyList(e[1].code)
			},
			/**
			 * 获取首页轮播图
			 * @param {Object} cityCode
			 */
			getBannerList(cityCode) {
				getBannerListApi(cityCode).then(res => {
					this.shoppingBanner = res.data
				}).catch(err => {
					console.log('请求错误' + err)
				})
			},
			/**
			 * 处理菜单黏贴
			 * @param {Object} e
			 */
			handleVanSticky(e) {
				this.handleVanStickyShow = !e
			},

			/**
			 * 处理城市动作面板展开
			 * @param {Object} e
			 */
			handleAreaShow(e) {
				this.areaShow = e
			},
			/**
			 * 根据所选城市返回下级
			 * @param {Object} cityCode
			 */
			getCityClassifyList(cityCode) {
				getCityClassifyListApi(cityCode).then(res => {
					this.cityClassifyListData = res.data
				}).catch(err => {
					console.log('请求错误: ' + err)
				})
			},

			/**
			 * 获取商家数据列表
			 * @param {Object} params
			 */
			getProductList(params) {
				getProductListApi({
					page: this.productWhere.page,
					limit: this.productWhere.page_size
				}).then(res => {
					if (res.data.list.length === 0) { // 判断获取数据条数若等于0
						this.productListData = []; // 清空数组
						this.finished = true; // 停止加载
					}

					// 若数据条数不等于0
					this.productWhere.total = res.data.count; // 给数据条数赋值
					this.productListData.push(...res.data.list) // 将数据放入list中
					this.loading = false; // 加载状态结束 

					// 如果list长度大于等于总数据条数,数据全部加载完成
					if (this.productListData.length >= res.data.count) {
						this.finished = true; // 结束加载状态
					}
				}).catch(err => {
					console.log('请求错误: ' + err)
				})
			},

			/**
			 * 处理分页加载
			 */
			handleOnLoad() {
				let timer = setTimeout(() => { // 定时器仅针对本地数据渲染动画效果,项目中axios请求不需要定时器
					this.getProductList(this.productWhere); // 调用上面方法,请求数据
					this.productWhere.page++; // 分页数加一
					this.finished && clearTimeout(timer); //清除计时器
				}, 100);
			},

			/**
			 * 处理选择城市更新选择状态以及更新商家列表数据
			 * @param {Object} cityCode
			 * @param {Object} cityName
			 */
			handleCityClick(cityCode, cityNames = '') {
				this.adCode = cityCode
				if (cityCode == 0) {
					return
				} else {
					this.$refs.cityListDropdownItem.toggle();
				}
			},
			/**
			 * 处理选择全部城市的时候附近公里选择
			 * @@param {number} meterValue
			 * @@param {string} meterText
			 */
			handleCityMeterClick(meterValue, meterText = '') {
				this.cityClassifyListMeterValue = meterValue
			},
			// 跳转详情
			gotoDetail(id){
				uni.navigateTo({
					url:'../details/index?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
	body {
		background-color: #F6f6f6;
	}

	//  定位 OR 通告
	.shopping-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 41rpx 30rpx;

		.location {
			// width: 96rpx;
			height: 36rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #191919;
			line-height: 36rpx;
		}

		.annunciate {
			display: flex;
			align-items: center;
			flex-wrap: nowrap;
			align-content: center;
			height: 24rpx;
			line-height: 24rpx;

			.annunciateImg {
				display: block;
				width: 20rpx;
				height: 20rpx;
				margin-right: 5rpx;
			}

			span {
				width: 176rpx;
				height: 24rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #191919;
			}
		}
	}

	// 搜索
	.shopping-search {
		height: 88rpx;
		border-radius: 35rpx;
		border: none;
		margin: 0 30rpx;
		background-color: #F1F1F1;
		overflow: hidden;
		position: relative;

		&_s {
			background-color: transparent;
			outline: none;
			font-size: 22rpx;
		}

		&_sbtn {
			width: 100rpx;
			height: 50rpx;
			background-color: #2663AE;
			position: absolute;
			right: 20rpx;
			top: 18rpx;
			border-radius: 25rpx;
			color: #fff;
			text-align: center;
			line-height: 50rpx;
			font-size: 24rpx;
		}

		&_icon {
			font-size: 44rpx;
			position: absolute;
			top: 24rpx;
			left: 14rpx;

		}

	}

	::v-deep .van-field__control {
		font-size: 28rpx;
		margin-left: 34rpx;
	}
	::v-deep .van-dropdown-menu__bar{
		width: 100%;
		left: 0;
		height: 88rpx;
	}

	// 轮播图
	.shopping-banner {
		height: 340rpx;
		margin: 31rpx 30rpx 0;
	
		overflow: hidden;

		.my-swipe {
			height: 340rpx;
	border-radius: 10rpx;
			width: 100%;

			.swipe-item {
				width: 100%;
				height: 100%;
			}
		}

		&__img {
			width: 100%;
			height: 100%;
			display: block;
		}
	}

	// 菜单
	.shopping-menus {
		display: flex;
		flex-wrap: wrap;
		align-content: space-around;
		height: 273rpx;
		margin: 30rpx 20rpx;
		border-radius: 20rpx;
		background-color: #FFF;

		.shopping-menus__dropdown{
			margin-bottom: -36rpx;
			width: 100%;
		}
		.shopping-menus__iconBtn {
			width: 100%;
			
		}

		.shopping-menus__dropdownItem {
			.shopping-menus__dropdownHeight {
				height: 400rpx;
				margin: 20rpx;
				padding: 20rpx 0;
				overflow-y: auto;

				.cityListItem {
					padding: 10rpx;
				}

				.cityListItem.on {
					color: red;
				}
			}
		}

		.shopping-menus__iconBtn {
			display: flex;
			justify-content: space-around;
		}

		.shopping-menus__iconBtnItem {
			text-align: center;

			.icon {
				width: auto;
				height: 56rpx;
				display: inline-block;
				text-align: center;
			}

			span {
				display: block;
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #191919;
				line-height: 24px;
			}
		}
	}

	::v-deep .van-ellipsis {
		font-size: 24rpx;
	}

	.shopping-menusChange {
		height: auto;
		margin: 0 !important;
		border-radius: 0;
	}

	// 商品列表
	.shopping-productList {
		// height: 1000px;
		margin: 41rpx 20rpx 0;
		border-radius: 12rpx;
		overflow: hidden;


		.shopping-productListItem {
			// height: 580rpx;
			border-radius: 20rpx;
			margin-bottom: 30rpx;
			background-color: #FFF;
			overflow: hidden;

		}

		.infoImg {
			width: 100%;
			image {
				width: 100%;
				height: 300rpx;
				display: block;
			}
		}

		.infoDescription {
			margin: 20rpx 23rpx 20rpx;
			font-size: 26rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #656565;
			border-radius: 12rpx 12rpx 0 0;
		}

		.unitPrice {
			display: flex;
			align-items: flex-end;
			margin: 0 26rpx 28rpx 26rpx;
		}

		.price {
			font-size: 30rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FF1E1E;
		}

		.money {
			font-size: 48rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FF1E1E;
		}

		.rackRate {
			// width: 140rpx;
			// height: 24rpx;
			margin-left: 15rpx;
			text-decoration: line-through;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #191919;
			margin-bottom: 6rpx;
			// line-height: 24rpx;
		}

		.return {
			width: 101rpx;
			height: 43rpx;
			margin-left: 29rpx;
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
	}

	// 安心退弹窗
	.wrapper {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 549rpx;
		// height: 775rpx;
		margin: auto;
	}

	.frame {
		height: 775rpx;
		border-radius: 58rpx;
		background: #FFFFFF;
	}

	.frameBg {
		// width: 549rpx;
		// height: 146rpx;
		padding: 58rpx 48rpx;
		background: linear-gradient(180deg, #7598FF 0%, #FFFFFF 100%);
		border-radius: 58rpx 58rpx 0rpx 0rpx;

		&__title {
			// width: 262px;
			// height: 30px;
			font-size: 36rpx;
			font-family: HYk1gj;
			color: #FFFFFF;
			// line-height: 30px;
		}
	}

	.frameBody {
		padding: 54rpx 48rpx;

		&__title {
			// width: 210px;
			// height: 30px;
			margin-bottom: 27rpx;
			font-size: 30rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #191919;
			// line-height: 30px;
		}

		&__content {
			// width: 452px;
			// height: 70px;
			margin-bottom: 42rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #191919;
			// line-height: 35px;
		}
	}

	.frameClose {
		margin-top: 80rpx;
		text-align: center;
		color: #fff;
	}
	::v-deep .van-sticky{
		width: 100% !important;
	}
	::v-deep .van-haptics-feedback{
		margin-top: 14rpx;
	}
	::v-deep .uni-swiper-wrapper{
		border-radius: 20rpx;
	}
</style>
