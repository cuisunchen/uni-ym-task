<template>
	<view class="orderDetailPage">
		<view class="wrap flex-column">
			<view class="title flex all-center flex-shrink">订单编号: {{pageData.orderNum}}</view>
			<view class="con flex-column">
				<view class="orderInfo flex flex-shrink">
					<view class="imageBox">
						<image :src="info.homeTopImgUrl || info.imgUrl" mode=""></image>
					</view>
					<view class="info flex1 flex-column flex-between">
						<view class="cell"><text class="label">发布状态:</text> <text class="status">{{pageData.status}}</text></view>
						<view class="cell"><text class="label">发布类型:</text> <text class="range">{{pageData.homeType}}</text></view>
						<view class="cell"><text class="label">发布费用:</text> <text class="money">{{pageData.releasePrice}}</text></view>
						<!-- <view class="cell"><text class="label">已点击量:</text> <text class="type">2</text></view> -->
					</view>
				</view>
				
				<view class="rowCell flex-shrink">
					<text class="label">发布位置:</text> <text class="res">{{info.location || "全国"}}</text>
				</view>
				<view class="rowCell flex-shrink">
					<text class="label">发布时间:</text> <text class="res">{{pageData.releaseTime}}</text>
				</view>
				<view class="rowCell flex-shrink">
					<text class="label">结束时间:</text> <text class="res">{{info.endDate || '有效条数消耗完的当天凌晨下架'}}</text>
				</view>
			</view>
		</view>
		<view class="adInfo" v-if="type == '问答'">
			<view class="item1">
				<view class="rowCell flex-shrink">
					<text class="label">广告标题:</text> <text class="res">{{info.title}}</text>
				</view>
				<view class="rowCell flex-shrink">
					<text class="label">问答单价:</text> <text class="res price">{{info.unitPrice}} 元/条</text>
				</view>
				<view class="rowCell flex-shrink">
					<text class="label">发布总数:</text> <text class="res total">{{info.totalNums}}条</text>
				</view>
			</view>
			<view class="item2">
				<view class="rowCell flex-shrink">
					<text class="label">广告标题:</text> <text class="res">{{info.question}}</text>
				</view>
				<view class="rowCell flex-shrink">
					<text class="label">正确答案:</text> <text class="res">{{info.rightAnswer}}</text>
				</view>
				<view class="rowCell flex-shrink">
					<text class="label">错误答案:</text> <text class="res">{{info.errorAnswer}}</text>
				</view>
			</view>
		</view>
		
		<view class="adInfo" v-else>
			<view class="item1">
				<view class="rowCell flex-shrink flex">
					<text class="label">广告标题:</text> <text class="res flex1 ellipsis_two">{{info.title}}</text>
				</view>
				<view class="rowCell flex-shrink">
					<text class="label">发布总数:</text> <text class="res total">{{info.totalNums}} 条</text>
				</view>
				<view class="rowCell flex-shrink">
					<text class="label">中奖总数:</text> <text class="res">{{info.winNum}} 条</text>
				</view>
			</view>
			<view class="item2">
				<view class="rowCell flex">
					<view class="maxMoney flex1"><text class="label">最高奖励金额:</text> <text class="res">{{info.maxReward}} 元</text></view>
					<view class="minNum flex1"><text class="label">条数:</text> <text class="res">{{info.maxRewardNum}} 条</text></view>
				</view>
				<view class="rowCell flex">
					<view class="minMoney flex1"><text class="label">最低奖励金额:</text> <text class="res">{{info.minReward}} 元</text></view>
					<view class="minNum flex1"><text class="label">条数:</text> <text class="res">{{info.minRewardNum}} 条</text></view>
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
				pageData:{},
				type:''
			}
		},
		onLoad(opt) {
			this.pageData = JSON.parse(decodeURIComponent(opt.pageData))
			this.type = this.pageData.homeType.split('-')[0]
			this.getInfo(this.pageData.homeAdId)
		},
		methods: {
			getInfo(id){
				this.$request('/api/view/getOrderInfo','post',{homeAdId: id}).then( res => {
					if(res.code == 200){
						this.info = res.data
						this.info.endDate = res.data.finishTime.split(' ')[0] + " 23:59:59"
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
	height: 100%;
	padding: 20rpx;
	overflow: hidden;
	.wrap{
		border-radius: 10rpx;
		overflow: hidden;
		background-color: #eee;
		.title{
			color: #fff;
			height: 80rpx;
			font-size: 28rpx;
			background-color: #B4C386;
		}
		.con{
			padding: 20rpx;
			background-color: #fff;
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
							color: #009193;
						}
						.type{
							color: red;
							font-weight: bold;
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
					color: #999;
					margin-right: 20rpx;
				}
				.res{
					color: #333;
				}
			}
		}
	}
	.adInfo{
		margin-top: 1rpx;
		padding: 0 20rpx 20rpx;
		border-radius: 10rpx;
		background-color: #fff;
		>view{
			padding: 20rpx 0;
		}
		.item2{
			border-top: 1rpx solid #eee;
		}
		.label{
			color: #999;
			margin-right: 20rpx;
		}
		.res{
			color: #333;
			&.price{
				color: #AF52DE;
			}
			&.total{
				color: #009193;
			}
		}
	}
} 
</style>
