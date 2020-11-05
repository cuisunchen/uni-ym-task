<template>
	<view class="todayProfit">
		<view class="earnInfo">
			<image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581324711206&di=f05b3780acdebb599875a7f494333155&imgtype=0&src=http%3A%2F%2Ffinance.gog.cn%2Fpic%2F003%2F034%2F112%2F00303411233_42c474b3.jpg" alt="" srcset=""></image>
			<view class="todayAmount">
				<view class="text">今日收益(元)</view>
				<view class="num">{{info.sum}}</view>
				<view class="todayRank">今日收益排名: 第{{info.userOrder}}名</view>
			</view>
		</view>
		<view class="content">
			<view class="earnDetail">
				<view class="friendEarn flex">
					<view class="index flex all-center">1</view>
					<view class="main flex1 flex-column flex-between">
						<view class="text flex flex-between"><text>米圈收益</text> <text>当前返利比: {{userInfo.rebackRate}}%</text></view>
						<view class="num">+ {{info.invite}}</view>
					</view>
				</view>
				<view class="questionEarn flex">
					<view class="index flex all-center">2</view>
					<view class="main flex-column flex-between">
						<view class="text">拼团收益</view>
						<view class="num">+ {{info.snapUp}}</view>
					</view>
				</view>
				<view class="goodluckEarn flex">
					<view class="index flex all-center">3</view>
					<view class="main flex-column flex-between">
						<view class="text">问答和好运收益</view>
						<view class="num">+ {{info.glqa}}</view>
					</view>
				</view>
				<view class="othersEarn flex">
					<view class="index flex all-center">4</view>
					<view class="main flex-column flex-between">
						<view class="text">其他收益(如签到)</view>
						<view class="num">+ {{info.other}}</view>
					</view>
				</view>
			</view>
			<view class="tip">
				<view class="title">如何提高收益?</view>
				<view class="text">分享链接,邀请好友,用户第一次下载登录后,他将成为您的终身好友(第一次有效,如用户之后通过别的链接下载登录,用户依然只是你的好友),您可按照您当前等级的返利比,获得他每天收益返利
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
				userInfo:{},
			}
		},
		created() {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			if(this.userInfo.vipLevel == 1){
				 this.userInfo.rebackRate = 25
			}else if(this.userInfo.vipLevel == 2){
				 this.userInfo.rebackRate = 30
			}else if(this.userInfo.vipLevel == 3){
				 this.userInfo.rebackRate = 35
			}else if(this.userInfo.vipLevel == 4){
				 this.userInfo.rebackRate = 40
			}else if(this.userInfo.vipLevel == 5){
				 this.userInfo.rebackRate = 50
			}
			this.getData()
		},
		methods: {
			getData(){
				this.$request('/api/userTodayAmount','get',{}).then(res => {
					this.info = res.data
					this.info.glqa = (Number(res.data.goodLuck)+Number(res.data.qa)).toFixed(2)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.todayProfit{
	height: 100%;
	.earnInfo{
		height: 480rpx;
		position: relative;
		image{
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 0;
		}
		.todayAmount{
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			height: 100%;
			color: #fff;
			z-index: 1;
			padding: 0 40rpx;
			.text{
				font-size: 28rpx;
				margin-top: 80rpx;
				text-align: right;
			}
			.num{
					font-weight: 700;
					font-size: 46rpx;
					margin-top: 30rpx;
					text-align: right;
			 }
		}
		.todayRank{
			position: absolute;
			bottom: 140rpx;
			display: inline-block;
			font-size: 28rpx;
			padding: 0 20rpx;
			border-radius: 8rpx;
			background-color: rgba(0,0,0, .5)
		}
	}
	.content{
		padding: 0 40rpx;
		position: relative;
		top: -100rpx;
		z-index: 2;
		>view{
			padding: 30rpx;
			border-radius: 20rpx;
			background-color: #fff;
		}
		.earnDetail{
			padding: 0 30rpx;
			>view{
				padding: 20rpx 0;
				border-bottom: 1px solid #eee;
				&:last-child{
					border-bottom: none;
				}
				.index{
					width: 70rpx;
					height: 70rpx;
					color: #fff;
					font-weight: 400;
					font-size: 46rpx;
					border-radius: 10rpx;
					background-color: rgb(238, 193, 134);
				}
				.main{
					padding: 0 20rpx;
					.text{
						font-size: 28rpx;
						color: #666;
						line-height: 32rpx;
					}
					.num{
						font-size: 24rpx;
						color: rgb(42, 211, 42)
					}
				}
			}
		}
		.tip{
			margin: 40rpx 0 50rpx;
			.title{
				font-size: 32rpx;
				margin-bottom: 20rpx;
			}
			.text{
				color: #666;
				font-size: 24rpx;
				line-height: 40rpx;
				letter-spacing: 2rpx;
			}
		}
	}
}
</style>
