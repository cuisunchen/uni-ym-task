<template>
	<view class="feedBackCard" @click="itemClick">
		<view class="con flex1 flex-column flex-between">
			 <view class="line1 flex">
					<view class="tag flex align-center">{{item.tags}}</view>
					<text class="time">{{item.createTime}}</text>
			 </view>
			 <view class="line2 flex flex-between">{{item.content}}</view>
		</view>
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
.feedBackCard{
	.sign{
		color: #fff;
		width: 76rpx;
		height: 76rpx;
		margin-right: 16rpx;
		border-radius: 10rpx;
		background-color: rgb(221, 197, 168);
  }
  .con{
		.line1{
			margin-bottom: 8rpx;
			 .tag{
			 	 font-size: 26rpx;
			 	 color: #666;
			 	 display: inline-block;
			 	 color: #fff;
			 	 height: 30rpx;
			 	 line-height: 30rpx;
			 	 margin-right: 14rpx;
			 	 padding: 4rpx 6rpx;
			 	 border-radius: 6rpx;
			 	 background-color: #50A839;
			 }
			 .time{
					color: #999
			 }
		}
		.line2{
			 color: #000;
			 font-size: 28rpx;
		}
  }
}
</style>
