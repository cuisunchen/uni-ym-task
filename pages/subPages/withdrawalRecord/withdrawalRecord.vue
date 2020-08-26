<template>
	<view class="withdrawalRecord">
		<ygc-refresh class="lists"
		    @onRefresh="refresh" 
		    @scrolltolower="infiniteScroll">
				<withdrawal-card class="item" v-for="(item,index) in lists" :key="index" :data-obj="item" @click="itemClick(item)"></withdrawal-card>
				<uni-load-more :status="pullupLoadingType"></uni-load-more>
		</ygc-refresh>
		<aui-toast
		    ref="toast"
		    :msg="auiToast.msg"
		    :location = "auiToast.location"
		    :direction="auiToast.direction"
		    :icon="auiToast.icon"
		    :duration="auiToast.duration"
		></aui-toast>
	</view>
</template>

<script>
	import ygcRefresh from '@/components/ygc-refresh/ygc-refresh.vue';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import withdrawalCard from "@/components/withdrawal-card/withdrawal-card.vue"
	import auiToast from '@/components/aui-toast/aui-toast.vue';
	export default {
		components:{ygcRefresh,uniLoadMore,withdrawalCard,auiToast},
		data() {
			return {
				pullupLoadingType:'more',
				param: {
					"pageNum": 1,
					"pageSize": 10
				},
				lists:[],
				auiToast: {
						msg: '网络连接错误，请稍后再试',
						icon: '../../../static/warning.png',
						location: 'middle',
						direction: 'col',
						duration: 2000,
				},
			}
		},
		onLoad() {
			this.getLists()
		},
		methods: {
			itemClick(item){
				if(item.status == '失败'){
					this.auiToast.msg = '提现失败,理由:' + item.reason
					this.auiToast.icon = '../../../static/warning.png'
				}else{
					this.auiToast.msg = '提现成功,去账户里看看是否到账'
					this.auiToast.icon = '../../../static/success.png' 
				}
				this.$refs.toast.show()
			},
			getLists(type){
				this.$request('/api/view/getWithdrawList','post',this.param).then(res=>{
					// console.log(res)
					uni.hideLoading()
					if(res.code == 200){
						if(type == 'loadmore'){
							this.lists.push(...res.data)
						}else{
							this.lists = res.data
						}
						if(res.data.length < this.param.pageSize){
							this.pullupLoadingType = 'noMore'
						}else{
							this.pullupLoadingType = 'more'
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
				this.getLists('refresh')
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
				this.getLists('loadmore')
			},
		}
	}
</script>

<style lang="scss" scoped>
.withdrawalRecord{
	height: calc(100% - 40rpx);
	padding: 20rpx;
	.lists{
		/deep/ .uni-scroll-view-content{
			height: calc(100% + 100rpx);
			.refresh-moudle{
				height: 100%;
				display: flex;
				flex-direction: column;
			}
		}
	}
	.item{
		margin-bottom: 20rpx;
	}
}
</style>
