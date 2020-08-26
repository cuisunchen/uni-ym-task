<template>
	<view class="msgCenterPage">
		<ygc-refresh class="lists"
		    @onRefresh="refresh" 
		    @scrolltolower="infiniteScroll">
				
				<view class="wrap" v-if="msgLists.length > 0">
					<msg-card class="item" v-for="(item,index) in msgLists" :key="index" :data-obj="item"></msg-card>
				</view>
			
				<div class="nodata flex-column align-center" v-if="msgLists.length == 0">
					<image class="img" src="../../../static/noData.png" mode="scaleToFill"></image>
					<p class="desc">暂无数据</p>
				</div>
				<uni-load-more v-if="msgLists.length > 0 && (pullupLoadingType == 'loading' || pullupLoadingType == 'more')" :status="pullupLoadingType"></uni-load-more>
		</ygc-refresh>
	</view>
</template>

<script>
	import ygcRefresh from '@/components/ygc-refresh/ygc-refresh.vue';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import msgCard from '@/components/message-card/message-card.vue'
	export default {
		components:{msgCard,ygcRefresh,uniLoadMore},
		data() {
			return {
				msgLists:[],
				pullupLoadingType:'more',
				param:{
					"pageNum": 1,
					"pageSize": 10
				}
			}
		},
		onLoad() {
			uni.showLoading({
				title:'加载中'
			})
			this.getList()
		},
		methods: {
			getList(type){
				this.$request('/api/find/merchantMessage','post',this.param).then(res => {
					uni.hideLoading()
					if(res.code == 200){
						if(res.data.length < this.param.pageSize){
							this.pullupLoadingType = 'noMore'
						}else{
							this.pullupLoadingType = 'more'
						}
						if(type == 'loadmore'){
							this.msgLists.push(...res.data)
						}else{
							this.msgLists = res.data
						}
					}else{
						this.showToast(res.msg)
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
				this.getList('refresh')
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
				this.getList('loadmore')
			},
		}
	}
</script>

<style>
page{
	background-color: #eee;
} 
</style>
<style lang="scss" scoped>
.msgCenterPage{
	height: 100%;
	padding: 26rpx 26rpx 0;
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
	.item{
		margin-bottom: 30rpx;
		padding: 20rpx;
		border-radius: 10rpx;
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
