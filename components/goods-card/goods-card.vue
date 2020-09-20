<template>
	<view class="goodsCard flex" @click="itemClick">
		<view class="leftBox">
			<image class="img" :src="item.icon" mode=""></image>
		</view>
		<view class="rightBox flex1 flex-column flex-between"> 
			<view class="title ellipsis_two">{{item.title}}</view>
			
			<view class="tags flex">
				<view class="desctag flex all-center" v-for="(tag,index) in item.labels">
					<u-icon v-if="index == 0" class="uicon" name="rmb-circle-fill" color="#ff0000" size="32"></u-icon> {{tag}}
				</view>
			</view>
			
			<view class="moneyBox flex align-center">
				<text class="sellmoney">￥ {{item.price}}</text>
				<view class="tag numTag flex all-center">{{item.snapUpPeople}}/{{item.snapUpPeopleMax}}</view>
			</view>
			
			<view class="info flex">
				<view class="left flex1">
					<text class="tit">{{item.ruleDes}}</text>
					<view class="desc">未拼中立得 <text class="money">{{item.rebatePrice}}元</text></view>
				</view>
				<view class="right flex all-center">
					<uni-icons class="icon" type="pulldown" color='#ff0000'></uni-icons>
				</view>
			</view>
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
			},
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
	.goodsCard{
		padding: 20rpx 0;
		border-bottom-width: 1rpx;
		border-style: solid;
		border-color: #f6f6f6;
	}
	.leftBox{
		width: 270rpx;
		height: 270rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}
	.img{
		width: 100%;
		height: 100%;
	}
	.rightBox{
		margin-left: 16rpx;
	}
	.desctag{
		height: 36rpx;
		color: #ff0000;
		font-size: 24rpx; 
		padding: 0 6rpx;
		margin-right: 14rpx;
		border-radius: 4rpx;
		background-color: #ffeeec;
	}
	.uicon{
		margin-right: 6rpx;
	}
	.sellmoney{
		color: #000;
		font-size: 30rpx;
		margin-right: 16rpx;
		font-weight: bold;
	}
	.tag{
		height: 36rpx;
		color: #ff0000;
		padding: 0 10rpx;
		font-size: 24rpx;  
		margin-left: 14rpx;
		border-radius: 6rpx;
		background-color: #ffeeec;
	}
	.numTag{
		height: 30rpx;
		border-radius: 15rpx;
	}
	.info{
		padding: 0 16rpx;
		border-radius: 4rpx;
		background-color: #ffeeec;
	}
	.tit{
		font-size: 22rpx;
	}
	.desc{
		font-size: 26rpx;
	}
	.money{
		color: #ff0000;
		margin-left: 6rpx;
	}
	.icon{
		width: 30rpx;
		height: 30rpx;
		transform: rotate(-90deg);
	}
</style>
