<template>
	<view class="sharePage page">
		<image class="img" :src="imgUrl" mode="widthFix"></image>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				imgUrl:''
			}
		},
		onNavigationBarButtonTap() {  
			uni.navigateTo({
				url:'../download/download'
			})
		},
		onLoad() {
			this.getImgUrl()
		},
		methods: {
			getImgUrl(){
				this.$request('/api/view/shareApp','get',{}).then(res => {
					if(res.code == 200){
						this.imgUrl = res.data
					}else{
						this.showToast(res.msg)
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.sharePage{
	height: 100%;
	font-size: 0;
	.img{
		width: 100%;
		position: relative;
		top: -8rpx;
	}
}
</style>
