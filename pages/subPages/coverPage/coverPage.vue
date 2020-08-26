<template>
	<view class="coverPage flex-column">
		<view class="timer flex all-center" v-if="showTimer" @click="goHome">
			<text class="text">{{timeNum}} 跳过</text>
		</view>
		<view class="imgBox">
			<image class="img" :src="dataObj.titleImg" @load="imgLoad" mode="aspectFill" @click="goDetail"></image>
		</view>
		<view class="logoBox flex all-center">
			<image class="img" src="../../../static/tip02@2x.png" mode="aspectFill"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataObj:{},
				timer: null,
				timeNum: 5,
				showTimer: false
			}
		},
		onShow() {
			let token = uni.getStorageSync('token')
			if(!token){
				uni.reLaunch({
					url:'pages/subPages/login/login'
				})
				return
			}
			uni.showLoading({
				title:'加载中...'
			})
			this.getAlertData()
		},
		onHide() {
			uni.hideToast()
			if(this.timer){
				clearInterval(this.timer)
				this.timer = null
			}
		},
		onUnload() {
			uni.hideToast()
			if(this.timer){
				clearInterval(this.timer)
				this.timer = null
			}
			
		},
		methods: {
			imgLoad(){
				uni.hideLoading()
				clearInterval(this.timer)
				this.timer = setInterval(() => {
					this.timeNum --
					if(this.timeNum == -1){
						 this.showTimer = false
						 this.timer = null
						 uni.reLaunch({
								url:'../../tabBar/newHome/newHome'
						 })
						 clearInterval(this.timer)
					}
				}, 1000);
			},
			goHome(){
				uni.reLaunch({
					url:'../../tabBar/newHome/newHome'
				})
			},
			goDetail(){
				uni.showLoading({
					title: '将前往详情页面',
					duration: 2000,
					mask: true
				})
				this.dataObj.bigImg = this.dataObj.homeBigImgUrl || this.dataObj.jumpUrl || this.dataObj.contentImg
				let strRegex = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*([\?&]\w+=\w*)*$/
				let re=new RegExp(strRegex);
				if (!re.test(this.dataObj.bigImg)) {
					this.showToast('详情页地址有误,请联系客服')
					return
				}
				uni.navigateTo({
					url:'../details/details?param=' + encodeURIComponent(JSON.stringify(this.dataObj)) + '&type=cover'
				})
			},
			getAlertData(){
				let param = {
					"cityCode": "",
					"homeType": 2
				}
				param.cityCode = uni.getStorageSync('location') ? JSON.parse(uni.getStorageSync('location')).adcode : ''

				this.$request('/api/view/getAlertOrCover','post',param).then(res => {
					uni.hideLoading()
					if(res.code == 200 && res.data.titleImg){
						this.showTimer = true
						this.dataObj = res.data
						uni.showLoading({
							title:'加载中'
						})
					}else{
						uni.navigateTo({
							url:'../../tabBar/newHome/newHome'
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.coverPage{
	height: 100%;
	.timer{
		position: fixed;
		right: 45rpx;
		top: 100rpx;
		width: 120rpx;
		height: 50rpx;
		border-radius: 25rpx;
		z-index: 99;
		background-color: #edf1fd;
		.text{
			font-size: 26rpx;
			color: #999;
		}
	}
	
	.imgBox{
		flex: 3;
		flex-basis: 400rpx;
		background-color: #999;
		background: url(../../../static/place/fengPlace@2x.png) no-repeat;
		background-size: 100% 100%;
		.img{
			width: 100%;
			height: 100%;
		}
	}
	.logoBox{
		flex: 1;
		flex-basis: 80rpx;
		.img{
			width: 400rpx;
			height: 100rpx;
		}
	}
}
</style>
