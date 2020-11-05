<template>
	<view class="managePublicPage flex all-center">
		<view class="lists" v-if="renderList.length > 0">
			<issue-card class="item" v-for="(item,index) in renderList" :data-obj="item" :key="index" @click="goDetail(item)"></issue-card>
		</view>
		
		<div class="nodata flex-column align-center" v-if="renderList.length == 0">
				<image class="img" src="../../../static/noData.png" mode="scaleToFill"></image>
				<view class="desc">暂无数据</view>
		</div>
	</view>
</template>

<script>
	import issueCard from '../../../components/issue-card/issue-card.vue'
	export default {
		components:{issueCard},
		data() {
			return {
				renderList:[],
				requestUrl:''
			}
		},
		onLoad(opt) {
			uni.setNavigationBarTitle({
			　　title:opt.title
			})
			switch (opt.title){
				case '待审核':
					this.requestUrl = '/api/find/unreviewed'
					break;
				case '发布':
					this.requestUrl = '/api/find/passed'
					break;
				case '已完成':
					this.requestUrl = '/api/find/completed'
					break;
				case '已驳回':
					this.requestUrl = '/api/find/notPassed'	
					break;
				case '未付款':
					this.requestUrl = '/api/find/notPay'
					break;
				case '其他':
					this.requestUrl = '/api/find/violation'
					break;
			}
			uni.showLoading({
				title:'加载中'
			})
			this.getList()
		},
		methods: {
			goDetail(item){
				let url = ''
				let type = item.homeType.split('-')[0]
				if(type == '问答' || type == '好运'){
					url = '../order-detail/order-detail-QSGL'
				}else{
					url = '../order-detail/order-detail'
				}
				uni.navigateTo({
					url: url+'?pageData=' + encodeURIComponent(JSON.stringify(item))
				})
			},
			
			getList(){
				this.$request(this.requestUrl,'',{}).then( res => {
					uni.hideLoading()
					if(res.code == 200){
						this.renderList = res.data
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.managePublicPage{
	height: 100%;
	.lists{
		width: 100%;
		height: 100%;
		margin: 0 20rpx;
		padding-top: 40rpx;
		.item{
			margin-bottom: 26rpx;
			&:last-child{
				margin-bottom: none;
			}
		}
	}
	
	.nodata{
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
