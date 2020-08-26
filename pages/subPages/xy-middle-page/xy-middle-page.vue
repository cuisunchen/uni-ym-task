<template>
	<view class="xyMiddlePage">
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:""
			}
		},
		onLoad(opt) {
			this.url = decodeURIComponent(opt.url)
		},
		methods: {
			
		}
	}
</script>

<style>
.xyMiddlePage{
	
}
</style>
