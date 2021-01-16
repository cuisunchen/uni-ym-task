<template>
	<view class="orderDetail">
		<view class="statusBox flex align-center">
			<image class="topBg" src="../../../static/mineBg.jpeg" mode="aspectFill"></image>
			<view class="grayBg"></view>
			<view class="info">
				<view class="ptLabel">交易关闭</view>
				<view class="totalMoney">{{dataObj.typeStatusTxt}}</view>
			</view>
		</view>
		
		<view class="userInfoBox flex">
			<image class="icon" src="../../../static/dizhi@2x.png" mode=""></image>
			<view class="info flex-column flex-between" v-if="dataObj.name">
				<view class="tit">
					<text class="name">{{dataObj.name}}</text>
					<text class="phone">{{dataObj.phone}}</text>
				</view>
				<view class="addr">{{dataObj.address}}</view>
			</view>
			<view class="info flex all-center" v-else>你可能在国外,我拿不到你的地址~~~</view>
		</view>
		
		<view class="goodsInfoBox flex">
			<image class="goodImg" :src="dataObj.icon" mode="" @load="imgLoad"></image>
			<view class="goodInfo flex1 flex-column flex-between">
				<view class="title ellipsis_two">{{dataObj.title}}</view>
				<view class="price flex align-center"><text class="label">合计:</text><text class="num">{{dataObj.price}}元</text></view>
			</view>
		</view>
		
		<view class="orderInfo">
			<view class="title flex align-center">
				<view class="line"></view>
				<text class="txt">订单信息</text>
			</view>
			
			<view class="wrap flex flex-between">
				<text class="label">拼团时间</text>
				<text class="val">{{dataObj.dateTime}}</text>
			</view>
			<view class="wrap flex flex-between">
				<text class="label">订单编号</text>
				<text class="val">{{dataObj.order}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataObj:{}
			};
		},
		onLoad(opt) {
			uni.showLoading({
				title: '加载中 ...'
			})
			this.dataObj = JSON.parse(opt.datas)
			console.log(this.dataObj)
		},
		methods:{
			imgLoad(){
				uni.hideLoading()
			},
		}
	}
</script>

<style lang="scss" scoped>
.orderDetail{
	.statusBox{
		position: relative;
		height: 280rpx;
		padding: 0 40rpx;
		.topBg{
			position: absolute;
			top: 0;
			left: 0;
			width: 750rpx;
			height: 280rpx;
			z-index:7;
		}
		.grayBg{
			position: absolute;
			top: 0;
			left: 0;
			width: 750rpx;
			height: 280rpx;
			z-index:8;
			background-color: rgba(0, 0, 0, 0.3);
		}
		.info{
			position: relative;
			z-index: 9;
			color: #fff;
			.ptLabel{
				font-size: 30rpx;
			}
		}
	}
	.userInfoBox{
		color: #515052;
		margin: 20rpx 0;
		padding: 20rpx 20rpx;
		background-color: #fff;
		.icon{
			width: 90rpx;
			height: 90rpx;
			margin-right: 16rpx;
		}
		.name{
			color: #000;
			font-size: 30rpx;
			font-weight: bold;
			margin-right: 16rpx;
		}
	}
	
	.goodsInfoBox{
		padding: 20rpx 30rpx;
		background-color: #fff;
		.goodImg{
			width: 200rpx;
			height: 200rpx;
			border-radius: 10rpx;
			margin-right: 20rpx;
		}
		.title{
			font-size: 28rpx;
			margin-top: 6rpx;
		}
		.price{
			margin-bottom: 16rpx;
		}
		.label{
			color: #515052;
			font-size: 24rpx;
		}
		.num{
			color: red;
			font-size: 28rpx;
		}
	}
	.orderInfo{
		padding: 20rpx;
		margin-top: 20rpx;
		background-color: #fff;
		.title{
			margin-bottom: 16rpx;
			.line{
				width: 6rpx;
				height: 30rpx;
				margin-right: 20rpx;
				background-color: red;
			}
			.txt{
				font-size: 30rpx;
			}
		}
		
		.wrap{
			color: #666;
			margin-bottom: 20rpx;
			&:last-child{
				margin: 0;
			}
		}
	}
}
</style>
