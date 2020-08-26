<template>
	<view class="coverExamplePage flex-column">
		<view class="topHandle flex flex-between align-center">
			<uni-icons class="back all-center" type="arrowleft" color="#d5d5d5" size="22" @click="goBack"></uni-icons>
			<view class="flex align-center" @click="knowMore">
				<text>了解更多</text>
				<uni-icons class="all-center" type="arrowright" color="#d5d5d5" size="18"></uni-icons>
			</view>
		</view>
		
		<image class="imgBox" :src="obj.homeTopImgUrl || obj.imgUrl" mode="aspectFill" @click="goDetail"></image>
		
		<view class="flex1 flex all-center">
			<image src="../../../../static/tip02@2x.png" mode=""></image>
		</view>
		
		<uni-popup ref="popup" type="bottom">
			<view class="popupWrap">
				<view class="top">点击图片查看详情</view>
				
				<view class="title flex all-center">发布规则</view>
				<view class="desc">1. 发布时间:审核通过,到达发布时间,即发布</view>
				<view class="desc">2. 可发布时间: 对应位置每天最多3条广告,未满可选</view>
				<view class="desc">3. 高曝光率:全国型,所有用户均显示</view>
				<view class="desc">4. 下架时间: 所选日期当晚24:00下架,</view>
				
				<view class="title tip flex all-center">温馨提示</view>
				<view class="desc">为保证曝光率,封面型/弹框型广告平台每天最多发布1条,如果当天已被其他商户使用,您可选择其他时间,或者发布问答型或好运型的全国型广告,发布数量不限,曝光率和点击率更高</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import popup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components:{uniIcons,popup},
		data() {
			return {
				obj:{
					homeTopImgUrl: "../../../../static/other/sfe@2x.png",
					bigImg: "../../../static/other/content@2x.png"
				}
			}
		},
		onLoad(opt) {
			if(opt.type == 'preview'){
				this.obj = JSON.parse(decodeURIComponent(opt.pageData))
			}
		},
		methods: {
			goDetail(){
				uni.navigateTo({
					url: '../../../subPages/details/details?param='+ encodeURIComponent(JSON.stringify(this.obj))
				})
			},
			knowMore(){
				this.$refs.popup.open()
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.coverExamplePage{
	height: 100%;
	.topHandle{
		position: fixed;
		left: 0;
		right: 0;
		top: var(--status-bar-height);
		padding: 0 40rpx;
		height: 70upx;
		z-index: 9;
		.back{
			width: 70upx;
			height: 70upx;
			line-height: 70upx;
			border-radius: 50%;
			background-color: rgba(0, 0, 0, .4);
		}
		.flex{
			color: #fff;
			height: 46rpx;
			border-radius: 23rpx;
			padding: 0 10rpx;
			background-color: rgba(0, 0, 0, .4);
		}
	}
	.imgBox{
		width: 100%;
		flex: 3;
	}
	.flex1{
		image{
			width: 400rpx;
			height: 170rpx;
		}
	}
	.popupWrap{
		padding-bottom: 20rpx;
		background-color: #fff;
		.top{
			color: #666;
			line-height: 40rpx;
			padding: 20rpx;
			background-color: #eee;
		}
		.title{
			color: #fff;
			height: 80rpx;
			margin-bottom: 20rpx;
			background-color: green;
		}
		.desc{
			color: #666;
			line-height: 40rpx;
			padding: 0 20rpx;
		}
		.tip{
			margin-top: 20rpx;
			line-height: 30rpx;
		}
	}
}
</style>
