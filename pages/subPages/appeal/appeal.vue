<template>
	<view class="appealPage">
		<view class="appendReply">
			 <view class="tit">
					<text>申诉</text> - 广告有问题,可以告诉我们
			 </view>
			 <view class="textareaBox">
					<textarea class="textarea" v-model="content" placeholder-class="holder" placeholder="请输入您的问题" />
					<appeal-upload @choose="imgChoose"></appeal-upload>
			 </view>

			 <button class="submitBtn flex1 flex all-center" @click="submit">提交</button>
		</view>
	</view>
</template>

<script>
	import appealUpload from '@/components/appeal-upload/appeal-upload.vue'
	export default {
		components:{
			appealUpload
		},
		data() {
			return {
				content:'',
				imageUrl:'',
				adId:'',
				timer:null
			}
		},
		onLoad(opt) {
			this.adId = opt.id
		},
		onUnload() {
			clearTimeout(this.timer)
		},
		methods: {
			submit(){
				let param = {
					"content": this.content,
					"homeAdId": this.adId,
					"imgUrl": this.imageUrl
				}
				this.$request('/api/view/reportAd','post',param).then(res=>{
					if(res.code == 200){
						this.showToast(res.data)
						this.content = ''
						this.imgUrl = ''
						this.timer = setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1500)
					}else{
						this.showToast(res.msg)
					}
				})
			},
			imgChoose(url){
				this.imageUrl = url
			}
		}
	}
</script>

<style>
	page{
		background-color: #fff;
	}
</style>
<style lang="scss" scoped>
.appealPage{
	height: 100%;
	padding: 30rpx;
	.appendReply{
		overflow: hidden;
		border-radius: 8rpx;
		padding: 30rpx 30rpx 0 30rpx;
		background-color: #eee;
		.tit{
			 color: #333;
			 font-size: 28rpx;
			 margin-bottom: 20rpx;
		}
		.holder{
			color: #999;
			font-size: 24rpx;
		}
		.textareaBox{
			 padding: 16rpx;
			 border-radius: 8rpx;
			 background-color: #fff;
			 .textarea{
					width: auto;
					padding: 10rpx;
					height: 250rpx;
					color: #333;
					font-size: 26rpx;
					margin-bottom: 20rpx;
					background-color: #eee;
			 }
			 .img{
					width: 100rpx;
					height: 100rpx;
			 }
		}
		.submitBtn{
			 color: #fff;
			 font-size: 32rpx  ;
			 margin: 30rpx 0;
			 background-color: #50A839;
		}
	}
}
</style>
