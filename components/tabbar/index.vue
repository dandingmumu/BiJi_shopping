<template>
	<van-tabbar v-model="active" active-color="#FF7B40" inactive-color="#000">
	  <van-tabbar-item icon="home-o">标签</van-tabbar-item>
	  <van-tabbar-item icon="search">标签</van-tabbar-item>
	  <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
	  <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
	</van-tabbar>
</template>

<script>
	import { ref } from 'vue';

	export default {
	  setup() {
		const active = ref(0);
		return { active };
	  },
	};
</script>

<style>

</style>