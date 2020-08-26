<template>
	<view class="feedBackPage">
		<ygc-refresh class="lists"
		    @onRefresh="refresh" 
		    @scrolltolower="infiniteScroll">
			<view class="wrap" v-for="(item,index) in list" :key="index" v-if="list.length > 0">
				<feedBack-card :data-obj="item" @click="goAddReply(item)"></feedBack-card>
			</view>
			
			<div class="nodata flex-column align-center" v-if="list.length == 0">
					<image class="img" src="../../../static/noData.png" mode="scaleToFill"></image>
					<p class="desc">暂无数据</p>
			</div>
			<uni-load-more v-if="list.length > 10" :status="pullupLoadingType"></uni-load-more>
		</ygc-refresh>
	</view>
</template>
<script>
	import feedBackCard from '@/components/feedBack-card/feedBack-card.vue'
	import ygcRefresh from '@/components/ygc-refresh/ygc-refresh.vue';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components:{ygcRefresh,uniLoadMore,feedBackCard},
		data() {
			return {
				list:[],
				pullupLoadingType:'more',
				param:{
					"pageNum": 1,
					"pageSize": 10,
					"typeId" : 0
				}
			}
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url:'../addFeedback/addFeedback?typeId=' + this.param.typeId
			})
		},
		onShow() {
			uni.showLoading({
				title:'加载中'
			})
			this.getList()
		},
		onLoad(opt) {
			if(opt.title){
				this.param.typeId = 1
			}
		},
		methods: {
			getList(type='refresh'){
				this.$request('/api/getUserFeedback','post',this.param).then(res => {
					uni.hideLoading()
					if(res.code == 200){
						if(res.data.length < this.param.pageSize){
							this.pullupLoadingType = 'noMore'
						}else{
							this.pullupLoadingType = 'more'
						}
						if(type == 'loadmore'){
							this.list.push(...res.data.list)
						}else{
							this.list = res.data.list
						}
					}
				})
			},
			refresh() {
				this.param = {
					"pageNum": 1,
					"pageSize": 10
				}
				this.pullupLoadingType == 'more'
				this.getList('refresh')
			},
			infiniteScroll() {
				if(this.pullupLoadingType == 'noMore'){
					return
				}
				this.param.pageNum ++
				this.pullupLoadingType = 'loading'
				this.getList('loadmore')
			},
			goAddReply(data){
				uni.navigateTo({
					url:'../addReply/addReply?param=' + encodeURIComponent(JSON.stringify(data)) + "&typeId=" + this.param.typeId
				})
			},
		}
	}
</script>

<style>
	page{
		background-color: #fff;
	}
</style>
<style lang="scss" scoped>
.feedBackPage{
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
		background-color: #f6f6f6;
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
