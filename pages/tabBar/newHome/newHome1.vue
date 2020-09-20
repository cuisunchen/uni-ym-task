<template>
	<view class="newHomePage page flex-column">
		<view class="page-swiper">
			<special-banner :banner-list="bannerList" :swiper-config="swiperConfig" 
				:hasDesc="false" :scaleX="bannerList.length > 2 ? '1.1591': '1.2436'"
				@click="goDetail"/>
		</view>
		
		<view class="bar flex">
			<view class="item flex1 flex-column align-center">
				<image class="img" src="../../../static/biaoqing.png" mode=""></image>
				<view class="title">任务分类</view>
			</view>
			<view class="item flex1 flex-column align-center">
				<image class="img" src="../../../static/biaoqing.png" mode=""></image>
				<view class="title">任务分类</view>
			</view>
			<view class="item flex1 flex-column align-center">
				<image class="img" src="../../../static/biaoqing.png" mode=""></image>
				<view class="title">任务分类</view>
			</view>
			<view class="item flex1 flex-column align-center">
				<image class="img" src="../../../static/biaoqing.png" mode=""></image>
				<view class="title">任务分类</view>
			</view>
		</view>
	</view>
</template>

<script>
	import specialBanner from "@/components/EtherealWheat-banner/specialBanner.vue"
	export default {
		components:{specialBanner},
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
					nextMargin: '58rpx'
				},
			}
		},
		onLoad(){
			let userInfo = uni.getStorageSync('userInfo')
			if(!userInfo){return}
			uni.showLoading({
				title:'加载中'
			})
			// this.param.cityCode = uni.getStorageSync('location')? JSON.parse(uni.getStorageSync('location')).adcode : '440306'
			// this.getDatas()
			this.getRecommendData()  
		},
		methods: {
			getRecommendData(){
				this.$request('/api/view/homeAdImg','get',{}).then(res => {
					if(res.code == 200){
						this.bannerList = res.data.carousel.map(item=>{
							item.picture = item.imgUrl
							item.bigImg = item.jumpUrl
							return item
						})
						this.recommendList = res.data.todayRecommend
					}else{
						this.showToast(res.msg)
					}
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
		}
	}
</script>

<style lang="scss" scoped>
	 
.newHomePage{
	.bar{
		padding: 30rpx 0;
		border-radius: 10rpx;
		margin: 30rpx 20rpx;
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
}
</style>
