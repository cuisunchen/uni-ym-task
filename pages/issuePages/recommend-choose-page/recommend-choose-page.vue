<template>
	<view class="recommendChoosePage">
		<view class="item flex align-center flex-between" v-for="(item,index) in list" :key="index" @click="goPage(item.type)">
			<view class="text">{{item.title}} - {{item.desc}}</view>
			<uni-icons class="iconBox flex flex-end" type="arrowright" size="20" color="#fff" ></uni-icons>
		</view>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons'
	export default {
		components:{
			uniIcons
		},
		data() {
			return {
				list:[
					{title: '首页',desc: '今日推荐 (全国)',type:'recommend-home'},
					{title: '好运',desc: '祝您好运推荐 (全国)',type:'recommend-GL1'},
					{title: '好运',desc: '同城活动推荐',type:'recommend-GL2'},
					{title: '好运',desc: '附近活动推荐',type:'recommend-GL3'}
				]
			}
		},
		onLoad(opt) {
			
		},
		methods: {
			goPage(type){
				uni.navigateTo({
					url: '../issueRecommend/issueRecommend?type='+ type
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.recommendChoosePage{
	padding: 180rpx 60rpx 0;
	.item{
		color: #fff;
		font-size: 32rpx;
		padding: 40rpx 20rpx;
		border-radius: 10rpx;
		margin-bottom: 60rpx;
		background-color: rgb(206,177,120);
		&:last-child{
			margin-bottom: 0;
		}
		.text{
			margin-left: 20rpx;
		}
	}
}
</style>
