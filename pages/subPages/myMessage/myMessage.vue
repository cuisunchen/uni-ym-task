<template>
	<view class="myMessagePage" :class="{'flex all-center': list.length == 0}">
		<ygc-refresh class="lists"
		    @onRefresh="refresh" 
		    @scrolltolower="infiniteScroll">
				<view class="wrap" v-for="(item,index) in list" :key="index" v-if="list.length > 0">
					<message-card :data-obj="item"></message-card>
				</view>
				
				<div class="nodata flex-column align-center" v-if="list.length == 0">
						<image class="img" src="../../../static/noData.png" mode="scaleToFill"></image>
						<view class="desc">暂无数据</view>
				</div>
				<uni-load-more v-if="list.length > 0 && (pullupLoadingType == 'loading' || pullupLoadingType == 'more')" :status="pullupLoadingType"></uni-load-more>
		</ygc-refresh>
	</view>
</template>
<script>
	import messageCard from '@/components/message-card/message-card.vue'
	import ygcRefresh from '@/components/ygc-refresh/ygc-refresh.vue';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components:{messageCard,ygcRefresh,uniLoadMore},
		data() {
			return {
				list:[],
				param:{
					"pageNum": 1,
					"pageSize": 10
				},
				pullupLoadingType:'more'
			}
		},
		onLoad() {
			uni.showLoading({
				title:'加载中'
			})
			this.getMsgList()
		},
		methods: {
			getMsgList(type){ 
				this.$request('/api/userMessage','post',this.param).then(res => {
					uni.hideLoading()
					if(res.code == 200){
						if(res.data.length < this.param.pageSize){
							this.pullupLoadingType = 'noMore'
						}else{
							this.pullupLoadingType = 'more'
						}
						if(type == 'loadmore'){
							this.list.push(...res.data)
						}else{
							this.list = res.data
						}
					}
				})
			},
			refresh() {
				this.param = {
					"pageNum": 1,
					"pageSize": 10
				}
				uni.showLoading({
					title:'加载中'
				})
				this.pullupLoadingType == 'more'
				this.getMsgList('refresh')
			},
			infiniteScroll() {
				if(this.pullupLoadingType == 'noMore'){
					return
				}
				this.param.pageNum ++
				this.pullupLoadingType = 'loading'
				uni.showLoading({
					title:'加载中'
				})
				this.getMsgList('loadmore')
			},
		}
	}
</script>

<style lang="scss" scoped>
.myMessagePage{
	height: calc(100% - 48rpx);
	padding: 24rpx;
	.lists{
		/deep/ .uni-scroll-view-content{
			height: calc(100% + 100rpx);
			.refresh-moudle{
				height: 100%;
				.down-tip{
					height: 100rpx;
				}
			}
		}
	}
	.wrap{
		margin-bottom: 24rpx;
		padding: 24rpx;
		border-radius: 8rpx;
		background-color: #fff;
	}
	.nodata{
		 margin-top: 100rpx;
		 .img{
				width: 150rpx;
				height: 150rpx;
		 }
		 .desc{
				color: #999;
		 }
	}
}
</style>
