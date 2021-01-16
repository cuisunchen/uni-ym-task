<template>
	<view class="loginPage flex justifu-center">
		<view class="loginBox">
			<view class="loginWrap">
				<view class="tab flex">
					<view class="wechatLogin flex1 flex all-center" :class="{active: currentTab == 0}" @click="tabChange(0)">登录码登录</view>
					<!-- <view class="codeLogin flex1 flex all-center" :class="{active: currentTab == 1}" @click="tabChange(1)">手机验证码登录</view> -->
				</view>
				
				<swiper class="swiper" :current="currentTab" @change="swiperChange">
					<swiper-item>
							<view class="swiper-item">
								<input class="uni-input" maxlength="11" type="number" v-model="form.phone" placeholder-class="inputHolder" placeholder="请输入手机号" />
								<input class="uni-input" minlength="6" maxlength="18"  password   v-model="form.password" placeholder-class="inputHolder" placeholder="请输入6-18位登录码"/>
								<button class="loginBtn flex all-center" :class="{disabled:loading1}" type="default" :disabled="loading1" :loading="loading1" @click="pwdLogin">登录</button>
							</view>
					</swiper-item>
					<!-- <swiper-item>
							<view class="swiper-item">
								<input class="uni-input" type="number" maxlength="11" v-model="form.phone" placeholder-class="inputHolder" placeholder="请输入手机号" />
								<view class="box flex">
									<input class="uni-input flex1" type="number" maxlength="6" v-model="form.smsCode" @input="hideKeyboard" placeholder-class="inputHolder" placeholder="请输入验证码" />
									<button class="codeBtn" :class="{disabled:loading3}" type="primary" :disabled="loading3" @click="sendSmsCode">{{btnTxt}}</button>
								</view>
								<button class="loginBtn flex all-center" :class="{disabled:loading2}" type="default" :loading="loading2" :disabled="loading2" @click="login">登录</button>
							</view>
					</swiper-item> -->
				</swiper>
			</view>
			
			<view class="wrap">
				<view>小程序极易分享推广,获取更多好友,提高收益</view>
				<view>推荐使用登录码登录</view>
			</view>
		</view>
		<view class="tip" v-if="currentTab == 0">
			<view class="label">登录码登录步骤:</view>
			<view class="step">
				<view class="con">1. 微信小程序搜索“米圈日记”,授权登录(必须授权登录,如已授权,可跳过)</view>
				<view class="con">2. 在小程序 我的-设置登录码 页面中,设置登录码即可</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		components:{},
		data() {
			return {
				currentTab: 0,
				loading1: false,
				loading2: false,
				loading3: false,
				btnTxt:'获取验证码',
				form:{
					"agentCode": "",
					"password": "",
					"phone": "",
					"smsCode": ""
				},
				time: 60
			}
		},
		onLoad() {
			this.form.phone = uni.getStorageSync('phone') || ''
		},
		methods: {
			swiperChange(e){
				this.currentTab = e.detail.current
			},
			pwdLogin(){
				if(!this.form.phone){
					uni.showToast({
						title: '请输入手机号',
						duration: 2000,
						position: 'top'
					})
					return
				}else
				if(!(/^1[3456789]\d{9}$/.test(this.form.phone))){ 
				 uni.showToast({
				 	title: '手机号格式错误',
					duration: 2000,
					position: 'top'
				 })
				 return
				}
				if(!this.form.password){
					uni.showToast({
						title: '请输入登录码',
						duration: 2000,
						position: 'top'
					})
					return
				}
				this.loading1 = true;
				this.$request('/api/pwdLogin','post',this.form,false).then(res => {
					this.loading1 = false;
					
					if(res.code == 200){
						uni.setStorage({
							key: 'token',
							data: res.data,
							success:()=> {
								this.getUserInfo()
							}
						})
						uni.setStorage({
							key: 'phone',
							data: this.form.phone
						})
					}else{
						this.showToast(res.msg)
					}
				})
			},
			login(){
				if(!this.form.phone){
					this.showToast('请输入手机号')
					return
				}else if(!this.form.smsCode){
					this.showToast('请输入验证码')
					return
				}
				this.loading2 = true;
				this.$request('/api/smsLogin','post',this.form,false).then(res => {
					this.loading2 = false;
					if(res.code == 200){
						uni.setStorage({
							key: 'token',
							data: res.data,
							success:()=> {
								this.getUserInfo()
							}
						})
					}else{
						this.showToast(res.msg)
					}
				})
			},
			sendSmsCode(){
				if(!this.form.phone){
					this.showToast('请输入手机号')
					return
				}
				this.loading3 = true
				this.$request('/api/sendSmsCode','post',{phone:this.form.phone}).then(res => {
					this.loading3 = false
					if(res.code == 200){
						this.time = 60
						
						let timer = setInterval(()=>{
							if(this.time == 0){
								this.btnTxt = '获取验证码'
								clearInterval(timer)
								return
							}
							this.time--
							this.btnTxt = this.time + 's'
						},1000)
					}else{
						uni.showToast({
							title:res.msg,
							icon: 'none'
						})
						this.showToast(res.msg)
					}
				})
			},
			getUserInfo(){
				this.$request('/api/userInfo','get',{}).then(res => {
					uni.setStorage({
					    key: 'userInfo',
					    data: JSON.stringify(res.data),
					    success: () => {
								uni.reLaunch({
									url:'../coverPage/coverPage'
								})
					    }
					});
				})
			},
			hideKeyboard(event) {
				if (event.target.value.length === '6') {
						uni.hideKeyboard();
				}
			},
			tabChange(i){
				this.currentTab = i
			}
		}
	}
</script>

<style>
	page{
		background-color: #52a4bd;
	}
</style>
<style lang="scss" scoped>
.loginPage{
	height: 100%;
	position: relative;
	.loginBox{
		width: 88%;
		
		margin-top: 300rpx;
		.loginWrap{
			height: 460rpx;
			background-color: #fff;
			overflow: hidden;
			border-radius: 20rpx;
			box-shadow:
								-6rpx -6rpx 28rpx 6rpx rgba(110, 109, 109,0.2), 
								6rpx -6rpx 28rpx 6rpx rgba(110, 109, 109,0.2), 
								-6rpx 6rpx 28rpx 6rpx rgba(110, 109, 109,0.2),
								6rpx 6rpx 28rpx 6rpx rgba(110, 109, 109,0.2);
			.tab{
				color: #666;
				height: 80rpx;
				font-size: 28rpx;
				font-weight: bold;
				background-color: #eee;
				.active{
					color: #52a4bd;
					background-color: #fff;
				}
			}
			.swiper{
				height: 100%;
				.swiper-item{
					padding: 30rpx;
					.uni-input{
						color: #333;
						height: 80rpx;
						line-height: 40rpx;
						border-radius: 10rpx;
						margin-bottom: 30rpx;
						padding: 0 16rpx;
						border: 1rpx solid #999;
						&:last-child{
							margin-bottom: 0;
						}
					}
					.inputHolder{
						font-size: 24rpx;
					}
					.loginBtn{
						color: #fff;
						height: 80rpx;
						margin-top: 30rpx;
						background-color: #52a4bd;
					}
					.disabled{
						background-color: rgba(82, 164, 189, .7)!important;
					}
					.box{
						.uni-input{
							margin-bottom: 0;
						}
						button{
							color: #fff;
							width: 246rpx;
							font-size: 26rpx;
							line-height: 80rpx;
							margin-left: 30rpx;
							background-color: #52a4bd;
							&::after{
								border: none;
							}
						}
					}
				}
			}
		}
		.wrap{
			color: #fff;
			margin-top: 50rpx;
			padding: 16rpx 0;
			border-radius: 10rpx;
			background-color: #333;
			>view{
				text-align: center;
			}
		}
	}
	.tip{
		position: absolute;
		bottom: 20rpx;
		left: 30rpx;
		right: 30rpx;
		color: #fff;
		padding: 20rpx;
		.label{
			color: red;
			font-size: 28rpx;
			line-height: 70rpx;
		}
		.con{
			margin-bottom: 10rpx;
		}
	}
}
</style>
