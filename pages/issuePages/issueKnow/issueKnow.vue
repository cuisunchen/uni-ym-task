<template>
	<view class="issueKnowPage">
		<image class="img" :src="item.titleImg" v-for="(item,index) in list" :key="index" mode="" @click="goDetail(item)"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[]
			}
		},
		onLoad(opt) {
			this.getList()
		},
		methods: {
			getList(){
				this.$request('/api/releaseNotes','',{}).then(res => {
					if(res.code == 200){
						this.list = res.data
					}
				})
			},
			goDetail(data){
				uni.navigateTo({
					url: '../issue-know-detail/issue-know-detail?param='+ encodeURIComponent(JSON.stringify(data))
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.issueKnowPage{
	padding: 20rpx;
	.img{
		width: 100%;
		height: 200rpx;
		border-radius: 10rpx;
		margin-bottom: 20rpx;
	}
} 
</style>
