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
					<view class="total"><text>总收益: {{userInfo.countAmount}}元</text></view>
					<view class=""><text>已提现: {{userInfo.withdrawalAmount}}元</text></view>
				</view>
			</view>
			
			<view class="withdrawalMoneys">
				<view class="title">可提现金额</view>
				<view class="types flex flex-between">
					<button class="flex1 flex all-center" v-for="(item,index) in amountLimit" :key="index" @click="amountClick(item,index)"
									:class="{active: withdrawalIndex == index,meddle: index == 1}" type="primary" plain="true">{{item}}元</button>
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
						<radio value=""  :checked="withdrawalTypeIndex == 1"/>
					</label>
					<button class="flex all-center" type="primary" plain="true" @click="goSetPage('ali')">{{aliPayInfo.realName?'已设置':'前往设置'}}</button>
				</view>
			</view>
			
			<view class="tip">
				<view class="title">注意事项</view>
				<view class="item flex align-center"><text class="dot"></text><text class="flex1">提现账号只能绑定一次,如需更改,请联系客服</text></view>
				<view class="item flex align-center"><text class="dot"></text><text class="flex1">申请提现后,1个工作日内平台审核到账</text></view>
				<view class="item flex align-center"><text class="dot"></text><text class="flex1">手续费:提现金额的5%</text></view>
				<view class="item flex align-center"><text class="dot"></text><text class="flex1">如有违规操作,或异常账号,平台拒绝提现</text></view>
			</view>
			
			<view class="btnBox">
				<button type="default" class="flex all-center" :loading="btnLoading" :disabled="btnLoading" @click="applyWithdraw">申请提现</button>
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
				withdrawalAmount: null,    //  提现的金额
				btnLoading: false,
				dateLimit:[],
				userInfo:{}
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
			applyWithdraw(){
				if(this.withdrawalTypeIndex == 0){
					this.showToast('暂时不支持微信在线提现,请选择支付宝提现')
					return
				}
				this.btnLoading = true
				let param = {
					"payName": this.withdrawalTypeIndex == 0 ? 'weChat' : 'aliPay',
					"withdrawAmount": this.withdrawalAmount
				}
				this.$request('/api/applyWithdraw','post',param).then(res => {
					this.btnLoading = false
					if(res.code == 200){
						uni.showModal({
							title:'提示',
							showCancel:false,
							content:'您的申请已提交成功,我们将会在1-3个工作日内审核发放到账,请留意账单信息'
						})
					}else{
						this.showToast(res.msg)
					}
				})
			},
			amountClick(item,index){
				this.withdrawalAmount = item
				this.withdrawalIndex = index
			},
			withdrawInfo(){
				this.$request('/api/withdrawInfo','get',{}).then(res => {
					if(res.code == 200){
						this.dateLimit = res.data.dateLimit
						this.amountLimit = res.data.amountLimit;
						this.withdrawalAmount = this.amountLimit[0]
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
				margin-top: 50rpx;
				.label{
					margin-bottom: 20rpx;
				}
				.num{
					font-size: 36rpx;
					margin-left: 40rpx;
					font-weight: bold;
				}
			}
			.other{
				margin-top: 30rpx;
				>view{
					text-align: right;
					text{
						display: inline-block;
						width: 50%;
						text-align: left;
						border-radius: 4rpx;
						background-color: rgba(0,0,0, .3);
					}
				}
				.total{
					margin-bottom: 10rpx;
				}
			}
		}
		.withdrawalMoneys{
			margin-top: 20rpx;
			padding: 20rpx;
			background-color: #fff;
			.types{
				>button{
					font-size: 28rpx;
					height: 80rpx;
					color: #B4C386;
					&.active{
						color: #fff;
						background-color: #B4C386;
					}
				}
				.meddle{
					margin: 0 20rpx;
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
