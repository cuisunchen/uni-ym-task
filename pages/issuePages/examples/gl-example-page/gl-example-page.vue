<template>
	<view class="glExamplePage">
		<view class="title flex align-center"><text class="label">{{pageTit}}</text> <text>- 点击查看详情</text></view>
		<gl-list-item class="item" :data-obj="dataObj" @click="glDetail(dataObj)"></gl-list-item>
		
		<view class="con">
			<view class="card">
				<view class="title flex all-center">发布规则</view>
				<view class="desc">1. 发布时间:审核通过,到达发布时间,即发布</view>
				<view class="desc">2. 发布条数:有效条数用完后,次日凌晨下架</view>
				<view class="desc">3. 中奖概率:中间条数/发布条数不低于20%</view>
				<view class="desc">4. 高曝光率:对应发布类型之内所有用户均能看到</view>
				<view class="desc">5. 奖励说明:2/3用户收益,其他按比例返给上级</view>
			</view>
			
			<view class="card">
				<view class="title flex all-center">标签解释</view>
				<view class="desc">1. 发布类型: 全国,同城,附近</view>
				<view class="desc">2. 兴趣: 根据用户兴趣精准的推送给用户</view>
				<view class="desc">3. 已完成/未完成: 发布条数是否用完</view>
			</view>
		</view>
	</view>
</template>

<script>
	import glListItem from "@/components/gl-list-item/gl-list-item.vue"
	export default {
		components: {glListItem},
		data() {
			return {
				pageTit:'示例',
				dataObj:{
					title:'每日友米 曝光率高,匹配度高,发布价格低至3元,只要会拍照,就会发布广告',
					titleImg:'../../../../static/other/luckE@2x.png',
					bigImg:'../../../static/other/content@2x.png',
					tags:'未读',
					status:'未完成',
					clickNum: 0,
					probability: '20',
					maxReward: '1.00'
				}
			}
		},
		onLoad(opt) {
			if(opt.type == 'preview'){
				this.pageTit = '效果如下'
				this.dataObj = JSON.parse(decodeURIComponent(opt.pageData))
				this.dataObj.maxReward = String(Number(this.dataObj.maxReward)*2/3).substring(0,4)
			}
		},
		methods: {
			glDetail(data){
				uni.navigateTo({
					url: '../../../subPages/details/details?param='+ encodeURIComponent(JSON.stringify(data))
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.glExamplePage{
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
	.item{
		border-bottom: none;
		margin-bottom: 0;
		padding: 20rpx;
		margin-top: 0;
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
			}
		}
	}
}
</style>
