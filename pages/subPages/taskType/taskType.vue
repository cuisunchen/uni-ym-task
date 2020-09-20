<template>
	<view class="taskTypePage">
		<view class="item" v-for="(item,index) in types" :key="index">
			<task-type-card :data-obj="item"></task-type-card>
		</view>
		
	</view>
</template>

<script>
	import taskTypeCard from '../../../components/task-type-card/task-type-card.vue'
	export default {
		components:{taskTypeCard},
		data() {
			return {
				types:[
					{
						imgUrl: '../../../static/place/fang@2x.png',
						title:'注册任务',
						price:'0.04',
						desc:'APP注册,网站注册等,增加用户'
					},
					{
						imgUrl: '../../../static/place/fang@2x.png',
						title:'下载任务',
						price:'0.03',
						desc:'APP注册,网站注册等,增加用户'
					},
					{
						imgUrl: '../../../static/place/fang@2x.png',
						title:'关注任务',
						price:'0.02',
						desc:'APP注册,网站注册等,增加用户'
					},
					{
						imgUrl: '../../../static/place/fang@2x.png',
						title:'注册任务',
						price:'0.04',
						desc:'APP注册,网站注册等,增加用户'
					},
					{
						imgUrl: '../../../static/place/fang@2x.png',
						title:'下载任务',
						price:'0.03',
						desc:'APP注册,网站注册等,增加用户'
					},
					{
						imgUrl: '../../../static/place/fang@2x.png',
						title:'关注任务',
						price:'0.02',
						desc:'APP注册,网站注册等,增加用户'
					},
				]
			};
		}
	}
</script>

<style lang="scss" scoped>
.taskTypePage{
	padding: 20rpx 20rpx 40rpx;
	.item{
		margin-bottom: 30rpx;
	}
}
</style>
