<template>
	<view class="goodsHome page flex-column">
		<view class="page-swiper">
			<special-banner :banner-list="bannerList" :swiper-config="swiperConfig" 
				:hasDesc="false" :scaleX="bannerList.length > 2 ? '1.1591': '1.2436'"
				@click="goDetail"/>
		</view>
		<bar class="bar flex-shrink" @click="barClick"></bar>
		
		<view class="listsWrap">
			<view class="listOf2 wrap" v-for="(item,index) in goodsList" :key="index">
				<view class="listTit title1 flex align-center flex-between">
					<view class="leftBox flex align-center">
						<text class="label">{{item.title}}</text> 
						<text class="line">丨</text> 
						<text class="nums">红包奖励概率: {{index == 0 ? 50 : index == 1 ? 70 : index == 2 ? 94 : 97}}%</text>
					</view>
					<view class="rightBox flex align-center" @click="goWatchMorePage(index)">
						<text class="more">查看更多</text>
						<uni-icons type="arrowright" color="#666" size="16"></uni-icons>
					</view>
				</view>
				<view class="cardWrap" v-for="list in item.subList">
					<goods-card @click="cardClick(list)" :data-obj="list"></goods-card>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import specialBanner from "@/components/EtherealWheat-banner/specialBanner.vue"
	import bar from './bar.vue'
	import goodsCard from '@/components/goods-card/goods-card.vue'
	export default {
		components:{specialBanner,bar,goodsCard},
		data() {
			return {
				bannerList: [],
				swiperConfig: {
					indicatorDots: false,
					indicatorColor: 'rgba(255, 255, 255, .4)',
					indicatorActiveColor: 'rgba(255, 255, 255, 1)',
					autoplay: true,
					interval: 4000,
					duration: 300,
					circular: true,
					previousMargin: '58rpx',
					nextMargin: '58rpx',
				},
				goodsList:[]
			}
		},
		onLoad(){
			let userInfo = uni.getStorageSync('userInfo')
			if(!userInfo){return}
			uni.showLoading({
				title:'加载中' 
			})
			this.getDatas()  
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url:'../../subPages/homeSearch/homeSearch'
			})
		},
		methods: {
			async getDatas(){
				let recommendData = await this.getRecommendData()
				let dataObj = await this.getGoodsList()
				this.goodsList = dataObj.contentList
				this.bannerList = recommendData.carousel.map(item=>{
					item.picture = item.imgUrl
					item.bigImg = item.jumpUrl
					return item
				})
			},
			getRecommendData(){
				return new Promise((resolve, reject) => {
					this.$request('/api/view/homeAdImg','get',{}).then(res => {
						if(res.code == 200){
							resolve(res.data)
						}else{
							reject(res)
						}
					})
				})
			},
			getGoodsList(){
				return new Promise((resolve, reject) => {
					this.$request('/snap/getSnapUpList','get',{}).then(res => {
						if(res.code == 200){
							resolve(res.data)
						}else{
							reject(res)
						}
					})
				})
			},
			goDetail(data){
				if(!data.homeBigImgUrl && !data.bigImg && !data.contentImg){return}
				uni.showLoading({
					title: '将前往详情页面',
					duration: 2000,
					mask: true
				})
				data.bigImg = data.homeBigImgUrl || data.jumpUrl || data.contentImg
				var strRegex = "((http[s]{0,1}|ftp)://[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)|(www.[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)";
				let re=new RegExp(strRegex);
				if (!re.test(data.bigImg)) {
					this.showToast('详情页地址有误,请联系客服')
					return
				}
				uni.navigateTo({
					url: "../../subPages/details/details?param=" + encodeURIComponent(JSON.stringify(data))
				})
			},
			goWatchMorePage(nums){
				uni.navigateTo({
					url:'../../subPages/watchMore/watchMore?type=' + nums
				})
			},
			barClick(data,index){
				switch (index){
					case 0:
						uni.navigateTo({
							url:'../../subPages/myOrder/myOrder'
						})
						break;
					case 1:
						uni.navigateTo({
							url:'../../subPages/goodsPublicPage/goodsPublicPage?type=0'
						})
						break;
					case 2:
						uni.navigateTo({
							url:'../../subPages/goodsPublicPage/goodsPublicPage?type=1'
						})
						break;
					case 3:
						uni.navigateTo({
							url:'../../subPages/ptReward/ptReward'
						})
						break;
				}
			},
			cardClick(item){
				uni.navigateTo({
					url:'../../subPages/goodsDetail/goodsDetail?groupType=' + type + '&id=' + item.id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.goodsHome{
	height: 100%;
	overflow-y: scroll;
	-webkit-overflow-scrolling:touch;
	/deep/ .banner-container {
		width: 100%;
		.uswiper{
			width: 100%;
			height: 300rpx;
		}
		.smallMargin{
			width: 100%;
			.uni-swiper-slides{
				left: 0rpx!important;
				right: 0rpx!important;
				.uni-swiper-slide-frame{
					width: 100%;
					height: 100%;
					.slide-image{
						width: 100%;
						height: 100%;
						border-radius: 0;
						transform: scale(1, 1)!important;
					}
				}
			}
		}
	}
	
	.bar{
		padding: 30rpx 0;
		border-radius: 10rpx;
		margin: 0 0 30rpx;
		background-color: #fff;
		.item{
			.img{
				width: 98rpx;
				height: 82rpx;
				margin-bottom: 20rpx;
			}
			.title{
				font-size: 24rpx;
				line-height: 20rpx;
			}
		}
	}
	
	.listsWrap{
		background-color: #f6f6f6;
		.wrap{
			margin-bottom: 20rpx;
			.listTit{
				height: 80rpx;
				padding: 0 20rpx;
				background-color: #fff;
				position: sticky;
				top: 0;
				z-index: 9;
				border-bottom: 1rpx solid #f6f6f6;
				.title2{
					z-index: 10;
				}
				.title3{
					z-index: 11;
				}
				.title4{
					z-index: 12;
				}
				.leftBox{
					.label{
						font-weight: bold;
					}
					.line{
						font-size: 22rpx;
						margin: 0 10rpx;
						color: #666;
					}
					.nums{
						color: #666;
					}
				}
				.rightBox{
					.more{
						color: #666;
					}
				}
			}
			.cardWrap{
				padding: 0 20rpx;
				background-color: #fff;
				&:first-child{
					padding-top: 0;
				}
				&::last-child{
					padding-bottom: 0;
				}
				&:last-child{
					.goodsCard{
						border-bottom: 0;
					}
				}
			}
		}
	}
}
</style>
