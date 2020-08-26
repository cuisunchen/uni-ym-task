<template>
	<scroll-view scroll-y :refresher-enabled="true" :refresher-triggered="triggered" refresher-threshold
				 @scrolltolower="infiniteScroll" class="sameCityList" 
				@refresherrefresh="refresh">
		
		<view class="listWrap" v-if="glList.length > 0">
			<gl-list-item v-for="(item,index) in glList" :key="index" :data-obj="item" @click="glDetail(item,index)"></gl-list-item>
			<uni-load-more v-if="glList.length > 8 || pullupLoadingType == 'loading'" :status="pullupLoadingType"></uni-load-more>
		</view>
		<div class="nodata flex-column align-center" v-if="glList.length == 0">
				<image class="img" src="../../../static/noData.png" mode="scaleToFill"></image>
				<view class="desc">暂无数据</view>
		</div>
	</scroll-view>
</template>

<script>
	export default {
		data(){
			return{
				glList: [],
				pullupLoadingType:'more',
				param:{
					"homeType": 9,
					"pageNum": 1,
					"pageSize": 10
				},
				triggered: false,
				isFresh: false,
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
						this.glList = res.data.homeAdList
						
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
			glDetail(data,index){
				var strRegex = "((http[s]{0,1}|ftp)://[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)|(www.[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)"; 
				let re=new RegExp(strRegex);
				if (!re.test(data.bigImg)) {
					this.showToast('详情页地址有误,请联系客服')
					return
				}
				
				uni.navigateTo({
					url: '../../subPages/details/details?param='+ encodeURIComponent(JSON.stringify(data)) + '&type=goodluckCol&index='+ index
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
	.sameCityList{
		height: 100%;
		padding: 0 20rpx;
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
