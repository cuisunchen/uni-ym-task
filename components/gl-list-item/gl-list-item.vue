<template>
	<view class="listItem" @click="goPage">
		<view class="title">{{item.title}}</view>
		<view class="con">
			<image :src="item.titleImg" lazy-load mode="aspectFill"></image>
			<view class="tags">
				<text class="read">{{item.tags}}</text>
				<text class="status">{{item.status}}</text>
			</view>
			<view class="data">
				<text>中奖率:{{item.probability}}%</text>
				<text class="topVal">最高奖励:{{item.maxReward}}元</text>
				<text class="topVal">点击量:{{item.clickNum}}次</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			dataObj:{
				// #ifdef APP-PLUS
				type: String,
				// #endif
				// #ifdef H5
				type: Object,
				// #endif
				default () {
					return {}
				}
			}
		},
		watch:{
			dataObj(val){
				// #ifdef APP-PLUS
				this.item=JSON.parse(val)
				// #endif
				// #ifdef H5
				this.item=val
				// #endif
			},
		},
		data() {
			return {
				item:{}
			};
		},
		created() {
			// #ifdef APP-PLUS
			this.item=JSON.parse(this.dataObj)
			// #endif
			// #ifdef H5
			this.item=this.dataObj
			// #endif
		},
		methods:{
			goPage(){
				uni.navigateTo({
					url: '@/pages/subPages/detail/detail'
				})
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss" scoped>
.listItem{
	margin-top: 30rpx;
	background-color: #fff;
	border-radius: 10rpx;
	padding: 20rpx;
	.title{
		font-size: 28rpx;
		line-height: 36rpx;
		margin-bottom: 20rpx;
	}
	.con{
		position: relative;
		height: 250rpx;
		image{
			width: 100%;
			height: 100%;
			border-radius: 10rpx;
		}
		.tags{
			 position: absolute;
			 right: 20rpx;
			 top: 20rpx;
			 font-size: 0;
			 text{
					display: inline-flex;
					font-size: 20rpx;
					color: #fff;
					margin-right: 16rpx;
					padding: 4rpx 10rpx;
					border-radius: 6rpx;
					&:last-child{
						 margin-right: 0
					}
			 }
			 .read{
					background-color: rgba(76, 175 , 163 , 0.4);
			 }
			 .status{
					background-color: rgba(105, 157, 18, 0.4);
			 }
		}
		.data{
			color: #fff;
			font-size: 22rpx;
			padding: 2rpx 10rpx;
			position: absolute;
			right: 20rpx;
			bottom: 20rpx;
			border-radius: 6rpx;
			height: 30rpx;
			line-height: 30rpx;
			background-color: rgba(0,0,0,.6);
			.topVal{
				margin-left: 16rpx;
			}
		}
	}
	
}
</style>
