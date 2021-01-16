<template>
	<view class="needKown flex-column">
		<view class="back flex all-center" @click="goBack">
			<u-icon class="uicon" name="arrow-left" size="40" color="#000"></u-icon>
		</view>
		<view class="imgBox flex1">
			<image class="img" src="http://image.guangyi009.com/16104556096026867532.jpg" mode="widthFix" @load="imgLoad"></image>
		</view>
		<u-button class="confirmBtn" @click="knowed">我已知晓,返回上一页</u-button>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
		onShow() {
			uni.showLoading({
				title:'内容加载中...'
			})
		},
		methods:{
			imgLoad(){
				uni.hideLoading()
			},
			knowed(){
				uni.setStorageSync('needKown', true)
				this.goBack()
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.needKown{
		height: 100%;
		.back{
			position: fixed;
			top: 90rpx;
			left: 40rpx;
			width: 70rpx;
			height: 70rpx;
			border-radius: 50%;
			background-color: #fff;
			z-index: 999;
			.uicon{
				margin-left: -6rpx;
			}
		}
		.imgBox{
			overflow-y: auto;
			-webkit-overflow-scrolling: touch;
			.img{
				width: 100%;
			}
		}
		.confirmBtn{
			height: 80rpx;
			color: #fff;
			margin: 20rpx 20rpx 0;
			background-color: #2C405A;
		}
	}
</style>
