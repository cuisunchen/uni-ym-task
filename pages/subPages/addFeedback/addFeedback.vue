<template>
	<view class="addFeedbackPage">
		<view class="inputBox">
			 <view class="tit">
					您有什么问题,可以告诉我们:
			 </view>
			 <view class="textareaBox">
					<textarea class="textarea" focus v-model="content" placeholder-class="textHolder" placeholder="请输入您的问题" />
			 </view>
		</view>

		<view class="btns">
			 <button class="submit flex all-center" :loading="laodding" @click="addReply">提交</button>
		</view>
	</view>
</template>
<script>
	export default {
		components:{},
		data() {
			return {
				content:'',
				laodding:false,
				typeId: 0
			}
		},
		onLoad(opt) {
			this.typeId = opt.typeId || 0
		},
		methods: {
			addReply(){
				if(!this.content){
					this.showToast('请输入您要反馈的问题')
					return
				}
				let param = {
					"content": this.content,
					"fatherId": null,
					"typeId": this.typeId
				}
				this.laodding = true
				this.$request('/api/addFeedback','post',param).then(res => {
					this.laodding = false
					if(res.code == 200){
						this.showToast('您的反馈提交成功,我们会第一时间处理,请耐心等待!')
						this.content = ''
					}else{
						this.showToast(res.msg)
					}
				})
			},
		}
	}
</script>

<style>
	page{
		background-color: #fff;
	}
</style>
<style lang="scss" scoped>
.addFeedbackPage{
	height: 100%;
	padding: 24rpx;
	.inputBox{
		padding: 16rpx 20rpx;
		background-color: #eee;
		border-radius: 8rpx;
		.tit{
			 margin-bottom: 16rpx;
		}
	      
		.textareaBox{
			 padding: 10rpx;
			 background-color: #fff;
			 .textarea{
					width: 100%;
					background-color: #fff;
			 }
			 .textHolder{
				 font-size: 24rpx;
			 }
		}   
	}
	.btns{
		font-size: 32rpx;
		margin: 40rpx 0 60rpx;
		.submit{
			 color: #fff;
			 height: 80rpx;
			 border-radius: 6rpx;
			 background-color: #D4BA88;
		}
	}   
}
</style>
