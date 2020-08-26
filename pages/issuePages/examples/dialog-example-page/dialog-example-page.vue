<template>
	<view class="dialogExamplePage">
		<view class="dialog flex-column all-center">
			<view class="imgWrap" @click="goDetail">
				<image :src="obj.homeTopImgUrl || obj.imgUrl" mode="aspectFill"></image>
			</view>
			<view class="close">
				<uni-icons class="close flex all-center" type="closeempty" color="#999" size="22"></uni-icons>
			</view>
		</view>
		
		<uni-popup ref="popup" type="bottom">
			<view class="popupWrap">
				<view class="top">点击图片查看详情</view>
				
				<view class="title flex all-center">发布规则</view>
				<view class="desc">1. 发布时间: 审核通过,到达发布时间,即发布</view>
				<view class="desc">2. 可发布时间: 平台每天最多发布1条,未满可选</view>
				<view class="desc">3. 高曝光率: 全国型,所有用户均显示</view>
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
					homeTopImgUrl: "../../../../static/other/ste@2x.png",
					bigImg: "../../../static/other/content@2x.png"
				}
			}
		},
		onNavigationBarButtonTap() {
			this.$refs.popup.open()
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
		}
	}
</script>

<style lang="scss" scoped>
.dialogExamplePage{
	height: 100%;
	background: url(../../../../static/other/tan@2x.png) no-repeat;
	background-size: cover;
	.dialog{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0,0,0, .4);
		.imgWrap{
			width: 650rpx;
			height: 650rpx;
			border-radius: 10rpx;
			margin-bottom: 50rpx;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.close{
			width: 60rpx;
			height: 60rpx;
			border-radius: 50%;
			background-color: #fff;
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
