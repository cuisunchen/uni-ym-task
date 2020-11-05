<template>
	<view class="swiperExamplePage">
		<view class="title flex align-center"><text class="label">{{pageTit}}</text> <text>- 点击查看详情</text></view>
		<view class="imgWrap flex all-center">
			<image :src="dataObj.homeTopImgUrl" mode="aspectFill" @click="goDetail"></image>
		</view>
		<view class="con">
			<view class="card">
				<view class="title flex all-center">发布规则</view>
				<view class="desc">1. 发布时间:审核通过,到达发布时间,即发布</view>
				<view class="desc">2. 可发布时间: 对应位置每天最多3条广告,未满可选</view>
				<view class="desc">3. 高曝光率:全国型,所有用户均显示</view>
				<view class="desc">4. 下架时间: 所选日期当晚24:00下架,</view>
			</view>
			
			<view class="card">
				<view class="title flex all-center">温馨提示</view>
				<view class="desc tip">为保证曝光率,轮播图平台每天最多发布3条,如果当天已满,可选择发布问答型或好运型全国型广告,发布数量不限,曝光率和点击率更高</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageTit:'示例',
				dataObj:{
					homeTopImgUrl:'../../../../static/other/sle@2x.png',
					bigImg:'../../../static/other/content@2x.png',
				}
			}
		},
		onLoad(opt) {
			if(opt.type == 'preview'){
				this.pageTit = '效果如下'
				this.dataObj = JSON.parse(decodeURIComponent(opt.pageData))
			}
		},
		methods: {
			goDetail(){
				uni.navigateTo({
					url: '../../../subPages/details/details?param='+ encodeURIComponent(JSON.stringify(this.dataObj))
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.swiperExamplePage{
	.title{
		padding: 0 20rpx;
		color: #666;
		font-size: 24rpx;
		line-height: 60rpx;
		.label{
			color: #000;
			font-size: 28rpx;
			margin-right: 20rpx;
		}
	}
	.imgWrap{
		height: 375rpx;
		background-color: #fff;
		image{
			width: 710rpx;
			height: 335rpx;
			border-radius: 10rpx;
		}
	}
	.item{
		border-bottom: none;
		margin-bottom: 0;
		padding: 20rpx;
		background-color: #fff;
	}
	.con{
		padding: 0 20rpx;
		.card{
			color: #666;
			overflow: hidden;
			margin-top: 40rpx;
			padding-bottom: 10rpx;
			border-radius: 10rpx;
			background-color: #fff;
			.title{
				color: #fff;
				font-size: 26rpx;
				height: 80rpx;
				margin-bottom: 10rpx;
				background-color: green;
			}
			.desc{
				padding: 0 16rpx;
				line-height: 50rpx;
				&.tip{
					line-height: 40rpx;
				}
			}
		}
	}
}
</style>
