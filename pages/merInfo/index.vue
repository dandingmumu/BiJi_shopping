<template>
	<view >
		<p v-for="(item,index) in images">
			<image :src='item' :key='index' class='img' mode='widthFix'></image>
		</p>
	</view>
</template>

<script>
	import {getlicense} from '../../api/merInfo.js'
	export default {
		data() {
			return {
				mid:undefined,
				images:[]
			}
		},
		onLoad(options) {
			this.mid=options.mid
			this.getImg()
			
		},
		methods: {
			getImg(){
				getlicense({mid:this.mid}).then(res=>{
					console.log(res);
					this.images=res.data.images
				}).catch(err => {

				})
			}
		}
	}
</script>

<style>
 body{
	 overflow: hidden;
 }
 .img{
	 width: 100%;
	 height: 100%;
	 margin-top: 10rpx;
 }
</style>
