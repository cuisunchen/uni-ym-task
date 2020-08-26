<template>
	<view class="issueKnowDetail">
		<image ref="img" class="img" :src="dataObj.contentImg" mode="aspectFill" @load="imgLoad" :style="{height:imgHeight+'px'}"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataObj:{},
				imgHeight:null,
			}
		},
		onLoad(option) {
			uni.showLoading({
				title:'内容加载中'
			})
			this.dataObj = JSON.parse(decodeURIComponent(option.param))
		},
		methods: {
			imgLoad(e){
				uni.hideLoading()
				let imgWidth = e.detail.width  //  图片实际宽度
				let currentWidth = uni.getSystemInfoSync().windowWidth   //  图片展示的宽度
				let imgHeight = e.detail.height   //  图片实际高度
				this.imgHeight = currentWidth/(imgWidth/imgHeight)
			},
		}
	}
</script>

<style lang="scss" scoped>
.issueKnowDetail{
	.img{
		width: 100%;
	}
}
</style>
