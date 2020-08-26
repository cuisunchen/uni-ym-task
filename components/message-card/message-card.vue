<template>
	<view class="messageCard">
		<view class="con flex1 flex-column flex-between">
			 <view class="line1 flex flex-between">
					<view class="money flex align-center"><text class="tag">{{item.tag}}</text>{{item.title}}</view>
					<text class="time">{{item.time}}</text>
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
			this.item.tag = this.item.tag.substring(0,2)
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.messageCard{
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
			 .money{
					font-size: 28rpx;
					color: #666;
					.tag{
						 display: inline-block;
						 color: #fff;
						 height: 30rpx;
						 line-height: 30rpx;
						 margin-right: 14rpx;
						 padding: 4rpx 6rpx;
						 border-radius: 6rpx;
						 background-color: #50A839;
					}
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
