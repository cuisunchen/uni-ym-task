<template>
	<view class="sharePage page">
		<image class="img" src="../../../static/other/share01@2x.png" mode="widthFix"></image>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				
			}
		},
		onNavigationBarButtonTap() {  
			uni.navigateTo({
				url:'../download/download'
			})
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
.sharePage{
	height: 100%;
	font-size: 0;
	.img{
		width: 100%;
		position: relative;
		top: -8rpx;
	}
}
</style>
