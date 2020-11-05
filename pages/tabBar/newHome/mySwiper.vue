<template>
	<view class="page-swiper all-center">
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000"
				@change="swiperChange" >
			<swiper-item class="swiper-item" v-for="(item, i) in bannerList" :key="i">
				<view class="swiper-item-box">
					<image class="swiperImg" :src="item.imgUrl" mode="aspectFill"></image>
				</view>
			</swiper-item>
		</swiper>
		
	</view>
</template>

<script>
	import {request} from '@/common/utils/request.js' 
	export default {
		props:{
			bannerList: Array
		},
		data(){
			return{
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
				curIndex: 0,
			}
		},
		created() {
		},
		methods:{
			swiperChange (e) {
			  this.curIndex = e.detail.current
			},
		}
	}
</script>

<style>
.page-swiper{
	flex-direction: row;
}
.swiper{
	width: 700upx;
	height: 350rpx;
}
.swiper-item{
	height: 350rpx;
	flex: 1;
	background-color: blue;
}
.swiper-item-box{
	flex: 1;
	background-color: #007AFF;
}
.swiperImg{
	flex: 1;
	/* width: 600upx; */
	/* transform: scaleX(0.8); */
}
</style>
