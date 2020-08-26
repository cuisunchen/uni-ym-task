<template>
	<view class="goodLuckPage">
		<ym-tabs class="tabs" :data-obj="tabs" :tab-index="swiperIndex" @change="tabChange"></ym-tabs>
		<view class="con" >
			<view class="emptyBox"></view>
			<swiper class="swiper" :current="swiperIndex" :indicator-dots="false" 
						:autoplay="false" :duration="500" @change="swiperChage">
				<swiper-item>
					<nationwide ref="nationwide"></nationwide>
				</swiper-item>
				<swiper-item>
					<same-city-list ref="sameCityList"></same-city-list>
				</swiper-item>
				<swiper-item>
					<nearby-list ref="nearbyList"></nearby-list>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import recommendList from "@/components/recommend-list/recommend-list.vue"
	import glListItem from "@/components/gl-list-item/gl-list-item.vue"
	import ymTabs from "@/components/ym-tabs/ym-tabs.vue"
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import nationwide from './nationwideList.vue'
	import sameCityList from './sameCityList.vue'
	import nearbyList from './nearbyList.vue'
	export default {
		data() {
			return {
				tabs:['祝您好运','同城活动','附近活动'],
				tabIndex:1,
				swiperIndex: 0,
				list: [],
				recommendDatas:{},
				recommendList: [],
				cityCode:""
			}
		},
		onShow() {
			uni.$on('sendGL', e =>{
				this.$set(this.list,e.index,e.data)
			})
		},
		onLoad() {
			this.cityCode = uni.getStorageSync('location')? JSON.parse(uni.getStorageSync('location')).adcode : '440306'
		},
		onUnload() {
			 uni.$off('sendGL'); 
		},
		methods: {
			tabChange(i){
				this.tabIndex = i + 1
				this.swiperIndex = i
			},
			swiperChage(e){
				this.swiperIndex = e.detail.current
				this.tabIndex = e.detail.current
			},
		},
		components: {recommendList,glListItem,ymTabs,nationwide,sameCityList,nearbyList}
	}
</script>

<style>
	page{
		height: 100%;
	}
</style>
<style lang="scss" scoped>
	.goodLuckPage{
		height: 100%;
		background-color: #f6f6f6;
		.con{
			height: 100%;
			overflow-y: scroll;
			-webkit-overflow-scrolling:touch;
			.emptyBox{
				height: 100rpx;
				width: 100%;
			}
		}
		.tabs{
			position: fixed;
			left: 0;
			right: 0;
			top: 0;
			z-index: 9;
		}
		.swiper{
			// height: auto;
			height: calc(100% - 50px);
			/deep/ uni-swiper-item{
				overflow-y: scroll;
			}
		}
	}
</style>
