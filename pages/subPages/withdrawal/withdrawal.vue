<template>
	<view class="withdrawalPage">
		<view class="topBg">
			 <view class="layout"></view>
			 <image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581324711206&di=f05b3780acdebb599875a7f494333155&imgtype=0&src=http%3A%2F%2Ffinance.gog.cn%2Fpic%2F003%2F034%2F112%2F00303411233_42c474b3.jpg" mode="aspectFill"></image>
		</view>
		<view class="main">
			<view class="info">
				<view class="balance">
					<view class="label">账户余额(元)</view>
					<view class="num">{{userInfo.userSurplus}}</view>
				</view>
				<view class="other flex-column flex-end">
					<view class=""><text>总收益: {{userInfo.countAmount}}元</text></view>
					<view class="withdrawn"><text>已提现: {{userInfo.withdrawalAmount}}元</text></view>
					<view class=""><text>已冻结: {{userInfo.freezeReward}}元</text></view>
				</view>
			</view>
			
			<view class="withdrawalMoneys flex align-center">
				<view class="withdrawalMoneysWrap flex1 flex align-center">
					<view class="labelBox flex flex-shrink align-center">
						<text class="title">提现金额 :</text>
					</view>
					<view class="moneyBox flex1 flex align-center">
						<input class="inputBox flex1" ref='input' maxlength="11" confirm-type="done" v-model="withdrawalAmount"
								placeholder-class="holderClass" type="number" placeholder="请输入整数提现金额,最低2元" 
								@input="keyChange"/>
					</view>
				</view>
			</view>
			
			<view class="withdrawalTypes">
				<view class="title">提现方式</view>
				<view class="withdrawalItem flex">
					<label class="uni-list-cell uni-list-cell-pd wrap flex1 flex align-center" @click="chooseType(0)">
						<image src="../../../static/weixin.png" mode=""></image>
						<text class="label flex1">微信</text>
						<radio value="" :checked="withdrawalTypeIndex == 0"/>
					</label>
					<button class="flex all-center" type="primary" plain="true" @click="goSetPage('wechat')">{{weChatInfo.realName?'已设置':'前往设置'}}</button>
				</view>
				<view class="withdrawalItem flex">
					<label class="uni-list-cell uni-list-cell-pd wrap flex1 flex align-center" @click="chooseType(1)">
						<image src="../../../static/ali.png" mode=""></image>
						<view class="label flex1 flex align-center">支付宝<image src="../../../static/recom.png" mode=""></image></view>
						<radio value="" :checked="withdrawalTypeIndex == 1"/>
					</label>
					<button class="flex all-center" type="primary" plain="true" @click="goSetPage('ali')">{{aliPayInfo.realName?'已设置':'前往设置'}}</button>
				</view>
			</view>
			
			<view class="tip">
				<view class="title">注意事项</view>
				<view class="item flex align-center"><text class="dot"></text><text class="flex1">提现账号只能绑定一次,如需更改,请联系客服</text></view>
				<view class="item flex align-center"><text class="dot"></text><text class="flex1">已冻结:为您拉新奖励,活动期间,好友参与拼团,可立即解冻</text></view>
				<view class="item flex align-center"><text class="dot"></text><text class="flex1">提现金额不高于20元秒到账,高于20元1个工作日内审核到账</text></view>
				<view class="item flex align-center"><text class="dot"></text><text class="flex1">低于20元未能及时到账,请检查支付宝账号是否填写正确</text></view>
				<view class="item flex align-center"><text class="dot"></text><text class="flex1">每天提现上限为5次,超过5次提现需次日到账</text></view>
				<view class="item flex align-center"><text class="dot"></text><text class="flex1">手续费:提现金额的5%</text></view>
				<view class="item flex align-center"><text class="dot"></text><text class="flex1">如有违规操作,或异常账号,平台拒绝提现</text></view>
			</view>
			
			<view class="btnBox">
				<button type="default" class="flex all-center" :loading="btnLoading" :disabled="btnLoading" @click="withdraw">申请提现</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				withdrawalIndex: 0,
				withdrawalTypeIndex: 1,
				amountLimit:[],
				weChatInfo:{      //  传给账号设置页面的参数
					account:'',
					name:''
				},
				aliPayInfo:{      //  传给账号设置页面的参数
					account:'',
					name:''
				},
				withdrawalAmount: '',    //  提现的金额
				btnLoading: false,
				dateLimit:[],
				userInfo:{},
				value: '',
				showKeyboard: false
			}
		},
		onShow() {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			this.withdrawInfo()
		},
		onNavigationBarButtonTap() {
			this.navigateTo('../withdrawalRecord/withdrawalRecord')
		},
		methods: {
			keyChange(e){
				if(e.detail.value.includes('.')){
					setTimeout(()=>{
						this.withdrawalAmount = e.detail.value.replace('.','')
					},200)
				}else{
					this.withdrawalAmount=e.detail.value.replace(/[^\d]/g,'');
				}
			},
			withdraw(){
				this.$u.throttle(this.applyWithdraw, 1500)
			},
			applyWithdraw(){
				if(this.withdrawalTypeIndex == 0){
					this.showToast('暂时不支持微信在线提现,请选择支付宝提现')
					return
				}
				if(!this.withdrawalAmount){
					this.showToast('请输入提现金额,最低2元')
					return
				}else
				if(this.withdrawalAmount < 2){
					this.showToast('最低提现金额不能低于2元')
					return
				}
				this.btnLoading = true
				let param = {
					"payName": this.withdrawalTypeIndex == 0 ? 'weChat' : 'aliPay',
					"withdrawAmount": this.withdrawalAmount
				}
				this.$request('/api/applyWithdraw','post',param).then(res => {
					this.btnLoading = false
					console.log(res)
					if(res.code == 200){
						if(this.withdrawalAmount > 20){
							uni.showModal({
								title:'提现申请成功',
								showCancel:false,
								content:`提现金额${this.withdrawalAmount}元,我们会尽快审核!`
							})
						}else{
							uni.showModal({
								title:'提现申请成功',
								showCancel:false,
								content:`提现金额${this.withdrawalAmount}元已到账,去支付宝里看看吧!`
							})
						}
						this.withdrawalAmount = ''
						this.getUserInfo()
					}else{
						this.showToast(res.msg)
					}
				})
			},
			getUserInfo(){
				this.$request('/api/userInfo','get',{}).then(res => {
					if(res.code == 200){
						uni.hideLoading()
						this.userInfo = res.data
						uni.setStorage({
						    key: 'userInfo',
						    data: JSON.stringify(res.data)
						});
					}else{
						this.showToast(res.msg)
					}
				})
			},
			withdrawInfo(){
				this.$request('/api/withdrawInfo','get',{}).then(res => {
					if(res.code == 200){
						// this.dateLimit = res.data.dateLimit
						// this.amountLimit = res.data.amountLimit;
						// this.withdrawalAmount = this.amountLimit[0]
						if(Object.entries(res.data.aliPay)){
							this.isNoInput = true
							this.aliPayInfo = res.data.aliPay
						}
						if(Object.entries(res.data.weChat)){
							this.isNoInput = true
							this.weChatInfo = res.data.weChat
						}
					}
				})
			},
			chooseType(i){
				this.withdrawalTypeIndex = i
			},
			goSetPage(type){
				this.navigateTo('../setAccount/setAccount?type='+type + '&aliPayInfo=' + encodeURIComponent(JSON.stringify(this.aliPayInfo)) + '&weChatInfo=' + encodeURIComponent(JSON.stringify(this.weChatInfo)))
			}
		}
	}
</script>

<style>
	page{
		background-color: #eee;
	}
</style>
<style lang="scss" scoped>
.withdrawalPage{
	position: relative;
	height: 100%;
	overflow-y: auto;
	/deep/ uni-button{
		border-color: #B4C386;
	}
	.topBg{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		z-index: 7;
		height: 300rpx;
		.layout{
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			z-index: 8;
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,.3);
		}
		image{
			width: 100%;
			height: 100%;
			z-index: 0;
		}
	}
	.main{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		z-index: 99;
		>view .title{
			font-size: 32rpx;
			margin-bottom: 20rpx;
		}
		.info{
			color: #fff;
			padding: 0 30rpx;
			height: 300rpx;
			overflow: hidden;
			.balance{
				margin-top: 40rpx;
				.label{
					margin-bottom: 10rpx;
				}
				.num{
					font-size: 36rpx;
					margin-left: 40rpx;
					font-weight: bold;
				}
			}
			.other{
				>view{
					text-align: right;
					text{
						display: inline-block;
						width: 45%;
						text-align: left;
						border-radius: 4rpx;
						background-color: rgba(0,0,0, .3);
					}
				}
				.withdrawn{
					margin: 10rpx 0;
				}
			}
		}
		.withdrawalMoneys{
			margin-top: 20rpx;
			padding: 20rpx;
			background-color: #fff;
			.withdrawalMoneysWrap{
				border-radius: 10rpx;
				background-color: #eee;
			}
			.labelBox{
				height: 80rpx;
				padding: 0 20rpx;
				.title{
					font-size: 28rpx;
					margin-bottom: 0;
				}
			}
			.moneyBox{
				height: 80rpx;
				.inputBox{
					font-size: 28rpx;
					height: 80rpx;
					padding-right: 20rpx;
				}
			}
		}
		.withdrawalTypes{
			margin-top: 20rpx;
			padding: 20rpx;
			background-color: #fff;
			.withdrawalItem{
				margin-bottom: 4rpx;
				&:last-child{
					margin-bottom: 0;
				}
				.wrap{
					padding: 0 10rpx;
					margin-right: 20rpx;
					background-color: #eee;
					image{
						width: 70rpx;
						height: 70rpx;
						margin-right: 20rpx;
					}
					.label{
						image{
							margin-left: 4rpx;
						}
					}
					/deep/ .uni-radio-input{
						width: 36rpx;
						height: 36rpx;
						&.uni-radio-input-checked{
							background-color: #B4C386!important;
							border-color: #B4C386!important;
							&::before{
								font-size: 32rpx;
							}
						}
					}
				}
				button{
					width: 170rpx;
					height: 80rpx;
					color: #fff;
					font-size: 26rpx;
					background-color: #B4C386;
				}
			}
		}
		.tip{
			margin-top: 20rpx;
			padding: 20rpx;
			background-color: #fff;
			.item{
				color: #999999;
				margin-bottom: 10rpx;
				&:last-child{
					margin-bottom: 0;
				}
				.dot{
					display: inline-block;
					width: 16rpx;
					height: 16rpx;
					border-radius: 50%;
					margin-right: 14rpx;
					background-color: #eee;
				}
			}
		}
		.btnBox{
			padding: 40rpx;
			button{
				width: 100%;
				height: 100rpx;
				color: #fff;
				font-size: 34rpx;
				background-color: #B4C386;
			}
		}
	}
}

</style>
