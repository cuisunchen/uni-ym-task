<template>
	<view class="newerWelfare flex-column">
		<view class="back flex all-center" @click="goBack">
			<u-icon class="uicon" name="arrow-left" size="40" color="#000"></u-icon>
		</view>
		<image class="img" :src="imgUrl || '../../../static/newHand.png'" mode="widthFix" @load="imgLoad"></image>
		<view class="btnsWrap flex1 flex-column justifu-center">
			<view class="btns flex">
				<button type="default" class="look flex all-center" @click="goHome">我再看看</button>
				<button type="default" class="goPt flex1 flex all-center" @click="goPt">朕去拼团</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				imgUrl:'',
				snapUpId:''
			}
		},
		onShow() {
			this.getData()
		},
		methods:{
			goPt(){
				let param = {
					"addressId": 0,
					"attributeValue": 0,
					"id": this.snapUpId
				}
				this.$request('/snap/purchase','post',param).then(res => {
					if(res.code == 200){
						this.userPayAd(res.data.id)
					}else{
						this.showToast(res.msg)
					}
				})
			},
			getData(){
				uni.showLoading({
					title:'加载中...'
				})
				this.$request('/api/activity/newcomerActivities','post',{}).then(res => {
					uni.hideLoading()
					if(res.code == 200){
						this.imgUrl = res.data.imageUrl
						this.snapUpId = res.data.snapUpId
						uni.showLoading({
							title:'内容加载中...'
						})
					}else{
						this.showToast(res.msg)
					}
				})
			},
			userPayAd(id){
				this.$request('/api/pay/userPayAd','post',{homeAdId: id}).then(res => {
					if(res.code == 200){
						uni.requestPayment({
							provider: 'alipay',
							orderInfo: res.data, //微信、支付宝订单数据
							success: (res) => {
								let rawdata = JSON.parse(res.rawdata)
								if(rawdata.resultStatus == '9000'){
									uni.showModal({
										title:'恭喜您,订单支付成功!',
										content:'如有疑问,请联系客服',
										showCancel:false,
										success: () => {
											uni.reLaunch({
												url:'../../tabBar/goodsHome/goodsHome' 
											})
										}
									})
								}else
								if(rawdata.resultStatus == '8000'){
									this.showToast('订单处理中,请稍等片刻!')
								}else
								if(rawdata.resultStatus == '4000'){
									this.showToast('订单支付失败')
								}else
								if(rawdata.resultStatus == '6002'){
									this.showToast('网络连接出错')
								}
							},
							fail: (err)=> {
								uni.showModal({
									title:'很遗憾,订单支付失败!',
									content:'如有疑问,请联系客服',
									showCancel:false,
									success: (res)=> {
										if (res.confirm) {
											this.cancelPurchase(id)
										}
									}
								})
							}
						});
					}
				})
			},
			imgLoad(){
				uni.hideLoading()
			},
			goHome(){
				uni.reLaunch({
					url:'../../tabBar/goodsHome/goodsHome'
				})
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.newerWelfare{
	height: 100%;
	.back{
		position: fixed;
		top: 90rpx;
		left: 40rpx;
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
		background-color: #fff;
		z-index: 999;
		.uicon{
			margin-left: -6rpx;
		}
	}
	.img{
		width: 100%;
	}
	.btnsWrap{
	}
	.btns{
		height: 80rpx;
		padding: 0 20rpx;
		.look{
			color: #ff787b;
			width: 200rpx;
			margin-right: 20rpx;
			background-color: #fadbe8;
		}
		.goPt{
			color: #fff;
			background-color: #ff516a;
		}
	}
}
</style>
