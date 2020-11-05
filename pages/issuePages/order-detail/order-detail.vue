<template>
	<view class="orderDetailPage">
		<view class="wrap flex-column">
			<view class="title flex all-center flex-shrink">订单编号: {{pageData.orderNum}}</view>
			<view class="con flex1 flex-column">
				<view class="orderInfo flex flex-shrink">
					<view class="imageBox">
						<image :src="info.homeTopImgUrl || info.imgUrl" mode=""></image>
					</view>
					<view class="info flex1 flex-column flex-between">
						<view class="cell"><text class="label">发布状态:</text> <text class="status">{{pageData.status}}</text></view>
						<view class="cell"><text class="label">发布类型:</text> <text class="range">{{pageData.homeType}}</text></view>
						<view class="cell"><text class="label">发布费用:</text> <text class="money">{{pageData.releasePrice}}</text></view>
						<view class="cell"><text class="label">支付方式:</text> <text class="type">{{info.payType}}</text></view>
					</view>
				</view>
				
				<view class="rowCell flex-shrink">
					<text class="label">发布位置:</text> <text class="res">{{info.location || '全国'}}</text>
				</view>
				<view class="rowCell flex">
					<view class="label">发布时间:</view> 
					<view class="timeList res flex1">
						<view class="item" v-for="(item,index) in info.issueTime" :key="index">{{item}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{},
				pageData:{}
			}
		},
		onLoad(opt) {
			this.pageData = JSON.parse(decodeURIComponent(opt.pageData))
			this.getInfo(this.pageData.homeAdId)
		},
		methods: {
			getInfo(id){
				this.$request('/api/view/getOrderInfo','post',{homeAdId: id}).then( res => {
					if(res.code == 200){
						this.info = res.data
					}
				})
			},
		}
	}
</script>

<style>
	page{
		background-color: #eee;
	}
</style>
<style lang="scss" scoped>
.orderDetailPage{
	width: 100%;
	height: 100%;
	overflow: hidden;
	.wrap{
		height: 80%;
		margin: 30rpx 20rpx;;
		border-radius: 10rpx;
		overflow: hidden;
		background-color: #fff;
		.title{
			color: #fff;
			height: 80rpx;
			font-size: 28rpx;
			background-color: #B4C386;
		}
		.con{
			padding: 20rpx;
			.orderInfo{
				margin-bottom: 10rpx;
				.imageBox{
					width: 150rpx;
					height: 150rpx;
					border-radius: 10rpx;
					overflow: hidden;
					margin-right: 26rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.info{
					.cell{
						.label{
							color: #666;
							margin-right: 20rpx;
						}
						.status, .range{
							color: #000;
						}
						.money{
							color: bue;
						}
						.type{
							color: red;
						}
					}
				}
			}
			>.rowCell{
				margin-bottom: 6rpx;
				&:last-child{
					margin-bottom: 0;
				}
				.label{
					color: #666;
					margin-right: 20rpx;
				}
				.res{
					color: #333;
				}
				.timeList{
					height: 400rpx;
					overflow-y: scroll;
					-webkit-overflow-scrolling:touch;
					.item{
						display: inline-block;
						width: 33.3333%;
					}
				}
			}
		}
	}
} 
</style>
