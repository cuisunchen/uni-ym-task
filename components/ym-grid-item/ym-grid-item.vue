<template>
	<view class="ymGridItem flex-column align-center" @click="itemClick">
		<view class="imgBox">
			<image :src="item.iconPath" mode=""></image>
		</view>
		<view class="status">{{item.status}}</view>
		<view class="nums">({{item.nums}})</view>
		<view class="desc">{{item.desc}}</view>
	</view>
</template>

<script>
	export default {
		props:{
			dataObj:{
				// #ifdef APP-PLUS
				type: String,
				// #endif
				// #ifdef H5
				type: Object,
				// #endif
				default(){
					return {}
				}
			},
		},
		data() {
			return {
				item:{}
			}
		},
		created() {
			// #ifdef APP-PLUS
			this.item=JSON.parse(this.dataObj)
			// #endif
			// #ifdef H5
			this.item=this.dataObj
			// #endif
		},
		methods: {
			itemClick(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ymGridItem{
		padding: 32rpx 0;
		background-color: #fff;
		.imgBox{
			width: 60rpx;
			height: 60rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.status{
			margin-top: 8rpx;
		}
		.nums{
			color: orange;
			margin-bottom: 8rpx;
		}
		.desc{
			color: #999;
			font-size: 20rpx;
			line-height: 20rpx;
		}
	}
</style>
