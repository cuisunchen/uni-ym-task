<template>
	<scroll-view scroll-y :refresher-enabled="true" :refresher-triggered="triggered" refresher-threshold
				 @scrolltolower="infiniteScroll" class="nearbyList" 
				@refresherrefresh="refresh">
		<view class="recommendBox">
			<recommend-list :is-title-show="false" :data-obj="recommendList" @click="goDetail"></recommend-list>
		</view>
		
		<view class="listWrap" v-if="list.length > 0">
			<gl-list-item v-for="(item,index) in list" :key="index" :data-obj="item" @click="glDetail(item,index)"></gl-list-item>
			<uni-load-more v-if="pullupLoadingType == 'loading'" :status="pullupLoadingType"></uni-load-more>
		</view>
		<div class="nodata flex-column align-center" v-if="list.length == 0">
				<image class="img" src="../../../static/noData.png" mode="scaleToFill"></image>
				<view class="desc">暂无数据</view>
		</div>
	</scroll-view>
</template>

<script>
	export default {
		data(){
			return{
				list: [],
				recommendList: [],
				pullupLoadingType:'more',
				param:{
					"typeId": '3',
					"cityCode": '',
					"pagesNum": 1,
					"pageSize": 8
				},
				triggered: false,
				isFresh: false
			}
		},
		created() {
			uni.$on('sendNearby', e =>{
				this.$set(this.list,e.index,e.data)
			})
			this.isFresh = false
			// #ifdef APP-PLUS
			this.param.cityCode = this.$parent.cityCode
			// #endif
			// #ifdef H5
			this.param.cityCode = 440306
			// #endif
			this.getGoodLuckTask()
			this.getRecommendData()
		},
		methods:{
			userClick(item,index){
				let param = {homeAdId : item.homeAdId}
				this.$request('/api/userClick','post',param).then(res => {
					if(res.code != 200){
						this.showToast(res.msg || res.data)
						return
					}
					item.clickNum ++
					this.$set(this.list,index,item)
				})
			},
			getGoodLuckTask(type){
				this.$request('/api/view/goodLuckTask','post',this.param).then(res => {
					uni.hideLoading()
					if(res.code == 200){
						this.triggered = false
						this.isFresh = false
						if(type == 'loadmore'){
							this.list.push(...res.data.homeAdList)
						}else{
							this.list = res.data.homeAdList
						}
						
						if(res.data.sumPage == this.param.pagesNum || res.data.sumPage < this.param.pagesNum){
							this.pullupLoadingType = 'noMore'
						}else{
							this.pullupLoadingType = 'more'
						}
					}else{
						this.showToast(res.msg)
					}
				})
			},
			getRecommendData(){
				this.$request('/api/weChat/goodLuck','post',{"cityCode": this.param.cityCode}).then(res => {
					if(res.code == 200){
						// this.recommendDatas = res.data
						this.recommendList = res.data.nearby
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
				this.userClick(data)
				
				uni.navigateTo({
					url: '../../subPages/details/details?param='+ encodeURIComponent(JSON.stringify(data)) + '&type=goodLuck&tabType=3&index='+ index
				})
			},
			goDetail(data){
				if(!data.homeBigImgUrl && !data.bigImg && !data.contentImg){return}
				data.bigImg = data.homeBigImgUrl
				var strRegex = "((http[s]{0,1}|ftp)://[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)|(www.[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)";
				let re=new RegExp(strRegex);
				if (!re.test(data.bigImg)) {
					this.showToast('详情页地址有误,请联系客服')
					return
				}
				uni.navigateTo({
					url: "../../subPages/details/details?param=" + encodeURIComponent(JSON.stringify(data))
				})
			},
			refresh() {
				if(this.isFresh){return}
				this.triggered = true
				this.param.pageSize = 10
				this.param.pagesNum = 1
				this.pullupLoadingType = 'more'
				this.getGoodLuckTask('refresh')
			},
			infiniteScroll() {
				if(this.list.length == 0){return}
				if(this.param.pagesNum < 5 && this.pullupLoadingType == 'noMore'){
					uni.showModal({
						title:'提示',
						content:'等级不足,邀请好友提升等级,可展示更多广告,获取更多收益!',
						confirmText:'去分享',
						success: (res)=> {
							if (res.confirm) {
									uni.navigateTo({
										url:'../../subPages/download/download'
									})
							}
						}
					})
					return
				}
				if(this.pullupLoadingType == 'noMore'){return}
				this.param.pagesNum ++
				this.pullupLoadingType = 'loading'
				this.getGoodLuckTask('loadmore')
			},
		}
	}
</script>

<style lang="scss" scoped>
	.nearbyList{
		height: 100%;
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
