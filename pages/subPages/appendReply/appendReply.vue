<template>
	<view class="appendRplyPage">
		<view class="inputBox">
			 <view class="tit">
					<text class="tag">追加回复:</text>
			 </view>
			 <view class="textareaBox">
					<textarea class="textarea" focus v-model="content" placeholder-class="textHolder" placeholder="请输入您的问题" />
			 </view>
		</view>

		<view class="btns flex">
			 <button class="cancel flex all-center" @click="goBack">放弃返回</button>
			 <button class="submit flex1 flex all-center" :loading="laodding" @click="appendReply">确认提交</button>
		</view>
	</view>
</template>
<script>
	export default {
		components:{},
		data() {
			return {
				id:null,
				content:'',
				laodding:false,
				typeId: 0
			}
		},
		onLoad: function (option) {
			if(option.id){
				this.id = decodeURIComponent(option.id);
			}
			this.typeId = option.typeId || 0
		},
		methods: {
			appendReply(){
				let param = {
					"content": this.content,
					"fatherId": this.id,
					"typeId": this.typeId
				}
				this.laodding = true
				this.$request('/api/addFeedback','post',param).then(res => {
					this.laodding = false
					if(res.code == 200){
						this.showToast('您的回复提交成功,我们会第一时间处理,请耐心等待!')
						this.content = ''
					}else{
						this.showToast(res.msg)
					}
				})
			},
			goBack(){
				uni.navigateBack({
					delta: 1
				})
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
.appendRplyPage{
	height: 100%;
	padding: 24rpx;
	.inputBox{
		padding: 16rpx 20rpx;
		background-color: #eee;
		border-radius: 8rpx;
		.tit{
			 margin-bottom: 16rpx;
			 .tag{
					color: #fff;
					padding: 0 10rpx;
					border-radius: 6rpx;
					background-color: #B4C386;
			 }
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
		.cancel{
			 color: #fff;
			 width: 250rpx;
			 height: 80rpx;
			 border-radius: 6rpx;
			 background-color: rgb(105, 105, 104);
		}
		.submit{
			 color: #fff;
			 margin-left: 20rpx;
			 border-radius: 6rpx;
			 background-color: #D4BA88;
		}
	}   
}
</style>
