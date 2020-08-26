<template>
	<scroll-view scroll-y :refresher-enabled="true" :refresher-triggered="triggered" refresher-threshold
				 @scrolltolower="infiniteScroll" class="nearbyList" 
				@refresherrefresh="refresh">
		
		<view class="listWrap flex flex-between" v-if="othersList.length > 0">
			<other-card v-for="(item,index) in othersList" :key="index" :data-obj="item"  @click="otherDetail(item,index)"></other-card>
		</view>
		<div class="nodata flex-column align-center" v-if="othersList.length == 0">
				<image class="img" src="../../../static/noData.png" mode="scaleToFill"></image>
				<view class="desc">暂无数据</view>
		</div>
	</scroll-view>
</template>

<script>
	import otherCard from './otherCard.vue'
	export default {
		components:{
			otherCard
		},
		data(){
			return{
				othersList: [],
				pullupLoadingType:'more',
				param:{
					"homeType": 0,
					"pageNum": 1,
					"pageSize": 10
				},
				triggered: false,
				isFresh: false
			}
		},
		created() {
			this.isFresh = false
			this.getDatas()
		},
		methods:{
			getDatas(){
				uni.showLoading({
					title:'加载中'
				})
				this.$request('/api/view/getMyCollect','post',this.param).then(res => {
					uni.hideLoading()
					uni.stopPullDownRefresh();
					this.triggered = false
					this.isFresh = false
					if(res.code == 200){
						this.othersList = res.data.homeAdList
						
						if(res.data.sumPage <= this.param.pageNum || res.data.sumPage < this.param.pagesNum){
							this.pullupLoadingType = 'noMore'
						}else{
							this.pullupLoadingType = 'more'
						}
					}else{
						this.showToast(res.msg)
					}
				})
			},
			otherDetail(data,index){
				var strRegex = "((http[s]{0,1}|ftp)://[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)|(www.[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)"; 
				let re=new RegExp(strRegex);
				if (!re.test(data.bigImg)) {
					this.showToast('详情页地址有误,请联系客服')
					return
				}
				
				uni.navigateTo({
					url: '../../subPages/details/details?param='+ encodeURIComponent(JSON.stringify(data)) + '&type=others&index='+ index
				})
			},
			refresh() {
				if(this.isFresh){return}
				this.triggered = true
				this.param.pageSize = 10
				this.param.pageNum = 1
				this.pullupLoadingType = 'more'
				this.getDatas('refresh')
			},
			infiniteScroll() {
				if(this.pullupLoadingType == 'noMore'){return}
				this.param.pageNum ++
				this.pullupLoadingType = 'loading'
				this.getDatas('loadmore')
			},
		}
	}
</script>

<style lang="scss" scoped>
	.nearbyList{
		height: 100%;
		padding: 20rpx 30rpx;
		.listWrap{
			flex-flow: row wrap;
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
