<template>
	<view class="myOrderCard flex-column">
		<view class="cardTitle">10人拼团</view>
		<view class="main">
			<view class="goodsInfo flex">
				<view class="goodsImg flex-shrink">
					<image class="img" src="../../static/pic1.jpeg" mode=""></image>
				</view>
				<view class="content flex-column flex-between">
					<view class="title ellipsis_two">自然堂安贫面膜10片烟洗按细致提亮补水保湿海藻修护女官网旗舰店全品商品任选</view>
					<view class="nums">数量: 1</view>
				</view>
			</view>  
			<view class="handleBox flex align-center flex-between">
				<view class="leftBox flex align-center">
					<text class="label">12小时内可取消发货</text> 
					<u-icon name="info-circle" size="34"></u-icon>
				</view>
				<view class="btn">
					<u-button type="error" :ripple="true" size="medium" class="custom-style">取消发货</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myOrderCard{
		background-color: #fff;
		.cardTitle{
			color: #999;
			line-height: 60rpx;
			padding: 0 20rpx;
			border-bottom: 1rpx solid #f6f6f6;
		}
		.main{
			padding: 20rpx;
			.goodsInfo{
				margin-right: 16rpx;
				.goodsImg{
					width: 150rpx;
					height: 150rpx;
					border-radius: 10rpx;
					overflow: hidden;
					background-color: #000;
					.img{
						width: 100%;
						height: 100%;
					}
				}
				.content{
					margin-left: 20rpx;
					.title{
						line-height: 36rpx;
					}
					.nums{
						color: #999;
					}
				}
			}
			.handleBox{
				height: 80rpx;
				.leftBox{
					color: #7a797b;
					.label{
						margin-right: 10rpx;
					}
				}
				.btn{
					.custom-style {
							width: 80rpx;
							height: 60rpx;
						}
				}
			}
		}
	}
</style>
