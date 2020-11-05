<template>
	<view class="recommendExamplePage">
		<view class="title flex align-center"><text class="label">{{pageTit}}</text> <text>- 点击查看详情</text></view>
		<recommend-list class="item" :is-title-show="false" :data-obj="recommendList" @click="goDetail"></recommend-list>
		<view class="con">
			<view class="card">
				<view class="title flex all-center">发布规则</view>
				<view class="desc">1. 开始发布时间: 审核通过,到达发布时间,即发布</view>
				<view class="desc">2. 结束发布时间: 所选日期的24:00下架</view>
				<view class="desc">3. 发布位置: 全国,同城(可选城市),附近(可选县/区)</view>
				<view class="desc">4. 可发布时间: 对应位置每天最多3条广告,未满可选</view>
				<view class="desc">5. 曝光率: 在对应发布位置所有用户均显示</view>
			</view>
			
			<view class="card">
				<view class="title flex all-center">广告在APP内显示位置</view>
				<view class="desc">1. 易赚界面顶部: 全国所有用户显示</view>
				<view class="desc">2. 问答/好运-全国顶部: 全国所有用户显示</view>
				<view class="desc">3. 问答/好运-同城顶部: 同城所有用户显示</view>
				<view class="desc">4. 问答/好运-附近顶部: 同县/区所有用户显示</view>
			</view>
		</view>
	</view>
</template>

<script>
	import recommendList from '@/components/recommend-list/recommend-list.vue'
	export default {
		components: {recommendList},
		data() {
			return {
				pageTit:'示例',
				recommendList:[
					{
							clickNum: 0,
							collect: false,
							homeBigImgUrl:'../../../static/other/content@2x.png',
							bigImg: "../../../static/other/content@2x.png",
							homeTopImgUrl: "../../../../static/other/ste@2x.png",
							id: "",
							title: "发布价格低,只要会拍照,就会发广告",
						},
						{
							clickNum: 0,
							collect: false,
							bigImg: "",
							homeBigImgUrl:'',
							homeTopImgUrl: "../../../../static/place/fang@2x.png",
							id: "",
							title: "广告位招租",
						},
						{
							clickNum: 0,
							collect: false,
							bigImg: "",
							homeBigImgUrl:'',
							homeTopImgUrl: "../../../../static/place/fang@2x.png",
							id: "",
							title: "广告位招租",
						}
				],
			}
		},
		onLoad(opt) {
			if(opt.type == 'preview'){
				this.pageTit = '效果如下'
				this.dataObj = JSON.parse(decodeURIComponent(opt.pageData))
				this.recommendList[0].homeTopImgUrl = this.dataObj.homeTopImgUrl
				this.recommendList[0].homeBigImgUrl = this.dataObj.homeBigImgUrl
				this.recommendList[0].bigImg = this.dataObj.bigImg
				this.recommendList[0].title = this.dataObj.title
			}
		},
		methods: {
			goDetail(data){
				if(!data.bigImg){
					return
				}
				
				uni.navigateTo({
					url: '../../../subPages/details/details?param='+ encodeURIComponent(JSON.stringify(data))
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.recommendExamplePage{
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
