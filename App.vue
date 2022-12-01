<script>
	export default {
		onLaunch: function() {

		},
		onShow: function() {

		},
		onHide: function() {

		},
		globalData: {
		},
	}
</script>

<style>
	/*每个页面公共css */
	.shopping-menus__dropdownItem .van-dropdown-menu__bar {
		height: auto;
		box-shadow: none;
		justify-content: space-evenly;

	}

	.van-dropdown-menu__item {
		margin: 0 5px;
		/* flex: initial !important; */
		/* width: 136rpx; */
		height: 57rpx;
		border-radius: 28.5rpx;
		background-color: #F4F4F4;
	}

	/* // 导航栏字体 */
	.uni-page-head .uni-page-head__title {
		font-size: $silu-fontsize17 !important;
	}

	/* // tab图标 */
	.uni-tabbar__item:nth-child(2) .uni-tabbar__icon {
		width: 38rpx !important;
		height: 46rpx !important;
		overflow: hidden;
	}

	.uni-tabbar__item:nth-child(3) .uni-tabbar__icon {
		width: 47rpx !important;
		height: 42rpx !important;
		overflow: hidden;
	}

	.uni-tabbar__item:nth-child(4) .uni-tabbar__icon {
		width: 40rpx !important;
		height: 38rpx !important;
		overflow: hidden;
	}

	.uni-tabbar__item:nth-child(5) .uni-tabbar__icon {
		width: 38rpx !important;
		height: 38rpx !important;
		overflow: hidden;
	}

	.uni-tabbar .uni-tabbar__icon img {
		width: 100%;
		height: 100%;
		display: block;
	}

	.uni-video-cover-duration {
		display: none;
	}
</style>
