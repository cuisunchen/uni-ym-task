<template>
	<view class="totalTaskPage flex-column">
		<v-tabs class="flex-shrink" v-model="current" color="#666" activeColor="#000" lineColor="#000" lineHeight="4rpx" :tabs="tabs" @change="changeTab"></v-tabs>
		<view class="content flex1">
			<swiper class="swiper" :current="current" :indicator-dots="false" :autoplay="false" 
					:interval="2000" @change="swiperChange">
					<swiper-item class="swiperItem" v-for="(item,index) in tabs" :key="index">
						<mescroll-body ref="mescrollRef" class="mescroll-body flex1" @init="mescrollInit" @down="downCallback" @up="upCallback">
							<view class="listBox" v-for="item in 10" @click="goTaskDetail(item.taskId)">
								<!-- <taskCard class="taskCard" :dataObj="item"></taskCard> -->
								<my-order-card></my-order-card>
							</view>
						</mescroll-body> 
					</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import vTabs from '@/components/v-tabs/v-tabs.vue'
	import myOrderCard from '@/components/myOrder-card/myOrder-card.vue'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import taskCard from '@/components/task-card/task-card.vue'
	export default {
		components:{vTabs,taskCard,myOrderCard},
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		data() {
			return {
				current: 0,
				tabs: [
					'待发货',
					'待收货'
				],
			};
		},
		methods:{
			upCallback(){},
			downCallback(){},
			mescrollInit(){},
			swiperChange(e){
				this.current = e.detail.current
			},
			changeTab(index) {
				console.log('当前选中的项：' + index)
			},
		}
	}
</script>

<style lang="scss">
.totalTaskPage{
	height: 100%;
	.head{
		height: 80rpx;
		background-color: yellow;
	}
	.content{
		.swiper{
			height: 100%;
			.swiperItem{
				overflow-y: scroll;
				-webkit-overflow-scrolling:touch;
				.mescroll-body{
					/deep/ .mescroll-body-content{
						padding-top: 20rpx;
					}
				}
				.listBox{
					margin-bottom: 20rpx;
				}
			}
		}
	}
}
</style>
