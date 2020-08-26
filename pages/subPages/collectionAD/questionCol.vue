<template>
	<scroll-view scroll-y :refresher-enabled="true" :refresher-triggered="triggered" :refresher-threshold="true"
				 @scrolltolower="infiniteScroll" class="nationwideList" 
				@refresherrefresh="refresh">
		
		<view class="listWrap" v-if="questions.length > 0">
			<home-list-item v-for="(item,index) in questions" :key="item.id" :data-obj="item" @click="qsDetail(item,index)"></home-list-item>
			<uni-load-more v-if="questions.length > 8 || pullupLoadingType == 'loading'" :status="pullupLoadingType"></uni-load-more>
		</view>
		<view class="nodata flex-column align-center" v-if="questions.length == 0">
				<image class="img" src="../../../static/noData.png" mode="scaleToFill"></image>
				<view class="desc">暂无数据</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data(){
			return{
				questions: [],
				pullupLoadingType:'more',
				param:{
					"homeType": 8,
					"pageNum": 1,
					"pageSize": 10
				},
				triggered: false,
				isFresh: false
			}
		},
		created() {
			this.getDatas()
			this.isFresh = false
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
						
						this.questions = res.data.homeAdList
						
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
			qsDetail(data,index){
				var strRegex = "((http[s]{0,1}|ftp)://[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)|(www.[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)";
				let re=new RegExp(strRegex);
				if (!re.test(data.bigImg)) {
					this.showToast('详情页地址有误,请联系客服')
					return
				}
				uni.navigateTo({
					url: '../../subPages/details/details?param='+ encodeURIComponent(JSON.stringify(data)) + '&type=questionCol&index='+index
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.nationwideList{
		height: 100%;
		/* #ifdef APP-PLUS */
		padding: 0 20rpx 80rpx;
		/* #endif */
		/* #ifdef H5 */
		padding: 0 20rpx;
		/* #endif */
		background-color: #fff;
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
