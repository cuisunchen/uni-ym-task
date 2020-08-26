<template>
	<view class="collectionADPage flex-column">
		<ym-tabs class="tabs" :data-obj="tabs" :tab-index="swiperIndex" @change="tabChange"></ym-tabs>
		<view class="con" >
			<!-- #ifdef APP-PLUS -->
			<view class="emptyBox"></view>
			<!-- #endif -->
			<swiper class="swiper" :current="swiperIndex" :indicator-dots="false" 
						:autoplay="false" :duration="500" @change="swiperChage">
				<swiper-item>
					<question-col ref="nationwide"></question-col>
				</swiper-item>
				<swiper-item>
					<goodluck-col ref="sameCityList"></goodluck-col>
				</swiper-item>
				<swiper-item>
					<others-list ref="nearbyList"></others-list>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>
<script>
	import ymTabs from "@/components/ym-tabs/ym-tabs.vue"
	import ygcRefresh from '@/components/ygc-refresh/ygc-refresh.vue';
	import homeListItem from "@/components/home-list-item/home-list-item.vue"
	import glListItem from "@/components/gl-list-item/gl-list-item.vue"
	import questionCol from './questionCol.vue'
	import goodluckCol from './goodluckCol.vue'
	import othersList from './othersList.vue'
	export default {
		components:{ymTabs,ygcRefresh,homeListItem,glListItem,questionCol,goodluckCol,othersList},
		data() {
			return {
				tabs:['接单收藏','好运收藏','其他收藏'],
				pullupLoadingType:'more',
				swiperIndex: 0,
			}
		},
		methods: {
			tabChange(i){
				this.tabIndex = i + 1
				this.swiperIndex = i
			},
			swiperChage(e){
				this.tabIndex = e.detail.current
				this.swiperIndex = e.detail.current
			}
		}
	}
</script>

<style lang="scss" scoped>
.collectionADPage{
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
	
	
	
	
	
	// height: 100%;
	.head{
		position: fixed;
		/* #ifdef APP-PLUS */
		top: 0;
		/* #endif */
		/* #ifdef H5 */
		top: 44px;
		/* #endif */
		left: 0;
		right: 0;
		z-index: 9;
	}
	.con{
		overflow-y: scroll;
		-webkit-overflow-scrolling:touch;
		.emptyBox{
			height: 100rpx;
			width: 100%;
		}
	}
	.swiper{
		// height: auto;
		height: 100%;
		/deep/ uni-swiper-item{
			overflow-y: scroll;
		}
	}
	/deep/ uni-scroll-view{
		width: auto;
	}
 // 	.lists{
	// 	overflow-y: scroll;
	// 	/deep/ .uni-scroll-view-content{
	// 		height: calc(100% + 100rpx);
	// 		.refresh-moudle{
	// 			height: 100%;
	// 			.down-tip{
	// 				height: 100rpx;
	// 			}
	// 		}
	// 	}
	// 	.swiper{
	// 		height: 100%;
	// 		/deep/ uni-swiper-item{
	// 			overflow-y: scroll;
	// 			&:nth-child(1){
	// 				background-color: #fff;
	// 			}
	// 		}
	// 		.swiper-item{
	// 			height: 100%;
	// 			padding: 0 30rpx;
	// 			overflow: scroll;
	// 			-webkit-overflow-scrolling: touch;
	// 		}
	// 		.swiper-item2{
	// 			height: 100%;
	// 			background-color: #eee;
	// 		}
	// 		.nodata{
	// 			 margin-top: 100rpx;
	// 			 .img{
	// 					width: 150rpx;
	// 					height: 150rpx;
	// 			 }
	// 			 .desc{
	// 					color: #999;
	// 			 }
	// 		}
	// 	}
	// }
}
</style>
