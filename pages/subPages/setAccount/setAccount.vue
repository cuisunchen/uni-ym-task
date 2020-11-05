<template>
	<view class="setAccountPage">
		<view class="formBox">
			<view class="account">
				<view class="label">{{type=='wechat'?'微信':'支付宝'}}账号</view>
				<input type="text" placeholder-class="holderClass" :disabled="isNoInput" v-model="form.account" placeholder="请输入提现账号" />
				<view class="desc">请谨慎填写,提交后不能再更改</view>
			</view>
			
			<view class="name">
				<view class="label">{{type=='wechat'?'微信':'支付宝'}}姓名</view>
				<input type="text" placeholder-class="holderClass" :disabled="isNoInput" v-model="form.name" placeholder="请输入真实姓名" />
			</view>
		</view>
		
		<button type="default" class="submit flex all-center" :class="{disabled:isNoInput || disabled}" 
					:disabled="isNoInput || disabled" @click="submit">提交</button>
		
		<view class="tip">
			<view class="title">温馨提示:</view>
			<view class="con">1. 为了您的资金安全,每个提现账号只能绑定一个友米账号</view>
			<view class="con">2. 请仔细核对您的账号信息,如果因为信息填写错误导致转账失败或转给他人,责任自负</view>
			<view class="con">3. 若存在不正当获得赏金行为(违规提交,多方提交,多账号提交等),平台有权对赏金追回,并视违规程度进行惩罚,甚至封号</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:'',
				form:{
					account:'',
					name:''
				},
				isNoInput: false,
				aliPayInfo:{},
				weChatInfo:{}
			}
		},
		computed:{
			disabled(){
				return (this.form.account && this.form.name) ? false : true
			}
		},
		onLoad(opt) {
			this.type = opt.type
			
			
			if(opt.type == 'wechat'){
				this.weChatInfo = JSON.parse(decodeURIComponent(opt.weChatInfo))
				this.form.account = this.weChatInfo.account
				this.form.name = this.weChatInfo.realName
				uni.setNavigationBarTitle({
				　　title:'设置微信账号'
				})
				if(this.weChatInfo.realName){
					this.isNoInput = true
				}else{
					this.isNoInput = false
				}
			}else{
				this.aliPayInfo = JSON.parse(decodeURIComponent(opt.aliPayInfo))
				this.form.account = this.aliPayInfo.account
				this.form.name = this.aliPayInfo.realName
				uni.setNavigationBarTitle({
				　　title:'设置支付宝账号'
				})
				if(this.aliPayInfo.realName){
					this.isNoInput = true
				}else{
					this.isNoInput = false
				}
			}
		},
		methods: {
			submit(){
				let param = {
					"account": this.form.account,
					"actualName": this.form.name,
					"typeId": this.type == 'wechat' ? 2 : 1   //  1为支付宝   2 为微信
				}
				this.$request('/api/bindCashOut','post',param).then(res => {
					if(res.code ==200){
						this.showToast('设置成功')
						uni.navigateBack({
							delta:1
						})
					}else{
						this.showToast(res.msg)
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.setAccountPage{
	padding: 24rpx 30rpx;
	.formBox{
		padding: 16rpx;
		border-radius: 10rpx;
		background-color: #fff;
		.account, .name{
			margin-bottom: 10rpx;
		}
		
		.label{
			color: #333;
			line-height: 60rpx;
		}
		input{
			height: 80rpx;
			font-size: 26rpx;
			border-radius: 10rpx;
			padding: 0 10rpx;
			border: 1rpx solid #e6e3e9;
		}
		.desc{
			color: #bfbcc0;
			font-size: 26rpx;
			margin-top: 6rpx; 
			line-height: 40rpx;
		}
	}
	.submit{
		height: 80rpx;
		color: #fff;
		margin: 50rpx 0 20rpx;
		background-color: green;
		&.disabled{
			background-color: #999;
		}
	}
	.tip{
		.title{
			line-height: 60rpx;
		}
		.con{
			color: #999;
			margin-bottom: 6rpx;
			&:last-child{
				margin-bottom: 0;
			}
		}
	}
}
</style>
