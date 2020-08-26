<template>
	<view class="friendListItem flex">
		<view class="lastNum flex all-center" :style="{backgroundColor:colors[String(item.phone).substr(String(item.phone).length-1,1)]}">{{String(item.phone).substr(String(item.phone).length-1,1)}}</view>
		<view class="phoneNumBox flex1 flex align-center">
			<text class="phoneNum">{{item.phone}}</text>
			<text class="level">LV{{item.level}}</text>
		</view>
		<view class="moneyBox flex align-center">
			 <view><text class="money">+ {{item.amount}}元</text></view>
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
				default () {
					return {}
				}
			}
		},
		data() {
			return {
				item:{},
				colors:['#699E11','#358CBD','#E7932E','#4CAFA3','#8BD188','#FFBD00','#307469','#F299AA','#FF3B30','#4DA54F']
			};
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
		created() {
			// #ifdef APP-PLUS
			this.item=JSON.parse(this.dataObj)
			// #endif
			// #ifdef H5
			this.item=this.dataObj
			// #endif
		}
	}
</script>

<style lang="scss" scoped>
.friendListItem{
	.lastNum{
		width: 80rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 36rpx;
		color: #fff;
		background-color: aqua;
		border-radius: 10rpx;
		margin-left: 20rpx;
	}
	.phoneNumBox{
		font-size: 30rpx;
		color: #333;
		line-height: 80rpx;
		padding: 0 18rpx;
		.phoneNum{
			 margin-right: 18rpx;
		}
		.level{
			 color: #fff;
			 font-size: 22rpx;
			 line-height: 40rpx;
			 border-radius: 6rpx;
			 padding: 0 10rpx;
			 background-color: rgb(241, 193, 131);
		}
	}
	.moneyBox{
		.money{
			 color: green;
			 font-size: 28rpx;
			 font-weight: bold;
		}
	}
}
</style>
