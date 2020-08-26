<template>
	<view class="withdrawalCard" @click="itemClick">
		<view class="lineOne flex flex-between">
			<view class="type flex align-center">
				<text>{{item.payType == 'aliPay' ? '支付宝' : '微信'}}</text>
				<view class="tag suc" v-if="item.status == '已提现'">{{item.status}}</view>
				<view class="tag nopass" v-if="item.status == '失败'">{{item.status}}</view>
				<view class="tag ing" v-if="item.status == '提现中'">{{item.status}}</view>
			</view>
			<view class="time">{{item.withdrawTime}}</view>
		</view>
		<view class="lineTwo flex flex-between">
			<view class="type flex align-center">订单编号:{{item.order}}</view>
			<view class="money"><text>{{item.withdrawMoney}}</text>元</view>
		</view>
	</view>
</template>

<script>
	export default{
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
		data(){
			return{
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
		methods:{
			itemClick(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.withdrawalCard{
		padding: 20rpx;
		border-radius: 10rpx;
		background-color: #fff;
		.tag{
			color: #fff;
			border-radius: 6rpx;
			padding: 0 8rpx;
			font-size: 24rpx;
			margin-left: 20rpx;
			background-color: #4F8F00;
		}
		.nopass{
			background-color: #555;
		}
		.ing{
			background-color: #E34219;
		}
		
		.time{
			color: #b0adb2;
		}
		.lineTwo{
			margin-top: 10rpx;
			.type{
				color: #858386;
			}
			.money{
				color: green;
				
				text{
					font-size: 28rpx;
					font-weight: bold;
				}
			}
		}
	}
</style>
