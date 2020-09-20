<template>
	<view class="taskRequirementPage">
		<view class="textareaBox">
			<textarea class="textarea" focus v-model="content" maxlength="20" placeholder-class="textHolder" :placeholder="holderText" />
		</view>
		
		<view class="btns">
			 <button class="submit flex all-center" :loading="loadding" @click="addReply">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:'',
				loadding:false,
				typeId: 0,
				holderText:'请输入任务要求,如"仅限未注册过的新用户申请此任务",要求简单明了,不得超过80个字,不要使用特殊符号。'
			};
		},
		methods:{
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

<style lang="scss" scoped>
.taskRequirementPage{
	height: 100%;
	padding: 24rpx;   
	.textareaBox{
		padding: 10rpx;
		border-radius: 10rpx;
		background-color: #fff;
		.textarea{
			font-size: 28rpx;
			width: 100%;
			line-height: 40rpx;
			background-color: #fff;
		}
		.textHolder{
			 font-size: 26rpx;
			 line-height: 40rpx;
		}
	}   
	
	.btns{
		font-size: 32rpx;
		margin: 40rpx 0 60rpx;
		.submit{
			 color: #fff;
			 height: 80rpx;
			 border-radius: 6rpx;
			 background-color: #2C405A;
		}
	}
}
</style>
