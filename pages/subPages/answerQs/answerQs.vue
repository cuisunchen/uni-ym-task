<template>
	<view class="answerQsPage page">
		<view class="wrap">
			<view class="qs flex">
				<text class="flex-shrink label">问题: </text>
				<text class="flex1">{{qsInfo.problem}}</text>
			</view>
			<view class="answer flex flex-between align-center">
				<text class="label">您选择的答案是</text>
				<text class="as">{{selectedVal}}</text>
			</view>
			<picker-view class="picker-view" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
				<picker-view-column>
						<view class="item flex all-center" v-for="(item) in selects" :key="item">{{item}}</view>
				</picker-view-column>
			</picker-view>
		</view>
		<view class="btns flex">
			<button class="back flex all-center" type="primary" @click="goBackHome">返回首页</button>
			<button class="submit flex1 flex all-center" type="primary" :disabled="submitLoading" :loading="submitLoading" @click="submit">提交</button>
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: [0],
				selects:['请选择'],
				selectedVal:'',
				visible: true,
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`,
				adId:'',
				qsInfo:{},
				submitLoading:false,
				dataObj:{},
				dataIndex:null
			}
		},
		onLoad(option) {
			this.dataObj = JSON.parse(decodeURIComponent(option.param))
			this.dataObj.clickNum++
			this.dataIndex = option.index
			this.from  = option.from
			this.adId = this.dataObj.id
			this.getChooseList()
		},
		methods: {
			submit(){
				if(!this.selectedVal){
					uni.showToast({
						 title: '请选择答案再提交',
						 icon: 'none',
						 duration: 2000,
						 position: 'bottom'
					})
					return
				}
				this.submitLoading = true
				let param = {
					homeAdId : this.adId,
					reply: this.selectedVal
				}
				this.$request('/api/view/replyQA','post',param).then(res => {
						this.submitLoading = false
						this.dataObj.tags = '已读'
						if(res.code == 200){
							if(res.data.isFinish){
								this.dataObj.status = '已完成'
							}
							if(res.data.isTrue){
								this.dataObj.userGet = '已得'
								uni.showToast({
									 title: '回答正确,您将获得收益'+res.data.money+'元,请前往[我的]页面查看收益详情',
									 icon: 'none',
									 duration: 2000,
									 position: 'bottom'
								})
						  }
						}else if(res.code == 500){
							if(res.data.isTrue != null && !res.data.isTrue){
									this.dataObj.userGet = '未得'
							 }
							 if(res.data.isFinish){
								 this.dataObj.status = '已完成'
									uni.showToast({
										 title: '此广告已完成,不能再回答',
										 icon: 'none',
										 duration: 2000,
										 position: 'bottom'
									})
							 }
							 if(res.data.message == '已回答'){
									uni.showToast({
										 title: '您已回答过,不能再回答',
										 icon: 'none',
										 duration: 2000,
										 position: 'bottom'
									})
							 }else if(res.data.message == '已下架'){
									uni.showToast({
										 title: '此广告已下架,不能再回答',
										 icon: 'none',
										 duration: 2000,
										 position: 'bottom'
									})
							 } 
						}else if(res.code == 999){
							uni.showToast({
								 title: res.msg + ',不能再回答',
								 icon: 'none',
								 duration: 2000,
								 position: 'bottom'
							})
						}
						let paras = {'data':this.dataObj,'index':this.dataIndex}
						uni.$emit('send',paras)
				})
			},
			getChooseList(){
				 let param = {
						homeAdId : this.adId
				 }
				 this.$request('/api/view/homeAdInfo','post',param).then(res =>{
					 this.qsInfo = res.data
					 this.selects.push(...res.data.answers)
				 })
			},
			goBackHome(){
				if(this.from && this.from == 'easyEarn'){
					uni.switchTab({
						url: '../../tabBar/easyEarn/easyEarn'
					})
				}else{
					uni.navigateTo({
						url: '../../tabBar/home/home'
					})
				}
			},
			bindChange (e) {
				const val = e.detail.value
				this.selectedVal = this.selects[val[0]]
			}
		}
	}
</script>

<style>
	page{
		height: 100%;
		background-color: #fff;
	}
</style>
<style lang="scss" scoped>
.answerQsPage{
	padding: 0 30rpx;
	
	.wrap{
		margin-top: 30rpx;
		padding: 20rpx;
		border-radius: 10rpx;
		background-color: #f6f6f6;
		.qs{
			color: #20a320;
			line-height: 36rpx;
			margin-bottom: 20rpx;
			.label{
				margin-right: 8rpx;
			}
		}
		.answer{
			height: 80rpx;
			padding: 0 20rpx;
			margin-bottom: 20rpx;
			background-color: #fff;
			border-radius: 10rpx;
			.label{
				color: #999;
			}
			.as{
				color: #4395ff;
			}
		}
		.picker-view{
			height: 130px;
			background-color: #fff;
			border-radius: 10rpx;
		}
	}
	.btns{
		margin-top: 80rpx;
		button{
			color: #fff;
			height: 100rpx;
			font-size: 28rpx;
			margin: 0;
		}
		.back{
			width: 220rpx;
			margin-right: 20rpx;
			background-color: #000;
		}
		.submit{
			background-color: #D4BA88;
		}
	}
}
</style>
