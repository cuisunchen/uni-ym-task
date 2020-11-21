<template>
	<view class="confirmPT flex-column">
		<view class="main flex1">
			<view class="geterInfo flex" @click="goAddress">
				<image class="addrImg" src="../../../static/dizhi@2x.png" mode=""></image>
				<view class="con flex-column flex1">
					<view class="name">
						<text class="label">{{info.name?info.name:'收货者姓名'}}</text>
						<text class="phoneNum">{{info.tel || '手机号'}}</text>
					</view>
					<view class="addr">{{info.addr || '地址'}}</view>
				</view>
				<u-icon name="arrow-right" size="32" color="#666"></u-icon>
			</view>
			
			<view class="orderInfo">
				<view class="goodsInfo flex">
					<view class="goodsImg flex-shrink">
						<image class="img" :src="info.goodsImg" mode=""></image>
					</view>
					<view class="content flex1 flex-column flex-between">
						<view class="title ellipsis_two">{{info.goodsTitle}}</view>
						<view class="tags">
							<u-tag class="tag" text="免运费" color="#ff0000" bg-color="#ffeeec" mode="light" size="mini" border-color="transparent"/>
							<u-tag class="tag" text="数量: 1" color="#ff0000" bg-color="#ffeeec" mode="light" size="mini" border-color="transparent"/>
							<u-tag v-if="info.attributeName" class="tag" :text="info.attributeName + ':' + info.attributeValue" color="#ff0000" bg-color="#ffeeec" mode="light" size="mini" border-color="transparent"/>
						</view>
						<view class="price flex flex-end align-center">
							<text class="label">单价:</text>
							<text class="value">{{info.price}}元</text>
						</view>
					</view>
				</view>
				<view class="totalPrice flex flex-end align-center">
					<text class="label">合计:</text>
					<text class="value">{{info.price}}元</text>
				</view>
				<view class="reward flex flex-end align-center">
					<text class="label">未拼中奖励:</text>
					<text class="value">{{info.failPrice}}元</text>
					<image class="hb" src="../../../static/hb.png" mode=""></image>
				</view>
			</view>
			
			<view class="payTypes">
				<radio-group>
					<label class="ratioLabel" v-for="(item, index) in items" :key="item.value">
						<view class="wrap">
							<view class="title flex align-center">
								<image class="payIcon" src="../../../static/ali.png" mode=""></image>
								<view class="flex1">{{item.name}}</view>
								<radio class="radio" :value="item.value" :checked="index === current" color="#ff0000"/>
							</view>
							<view class="desc">
								<view class="line flex">
									<text class="symbol flex flex-shrink justifu-center">*</text>
									<text class="txt">未拼中,您的拼团总金额将立即原路返回到您的支付宝; 未拼中的奖励将返回到您的平台账单中,可随时提现,请注意查收~ ~ ~</text>
								</view>
								<view class="line flex">
									<text class="symbol flex flex-shrink justifu-center">*</text>
									<text class="txt">拼中发货,可在12小时内取消发货</text>
								</view>
							</view>
						</view>
					</label>
				</radio-group>
			</view>
		</view>
		
		<view class="payBox flex align-center">
			<view class="totalMoney flex1 flex align-center flex-end">
				<text class="label">合计:</text>
				<text class="symbol">￥</text>
				<text class="money">{{info.price}}</text>
			</view>
			<u-button class="confirmBtn" type="error" @click="confirmPay">确认支付</u-button>
		</view>
	</view>
</template>

<script>
	import {unencryp} from '../../../common/utils/request.js'
	export default {
		data() {
			return {
				items: [{
								value: 'USA',
								name: '支付宝支付'
						}
				],
				current: 0,
				info:{}
			}
		},
		onShow(){
			let addr = uni.getStorageSync('addr')
			if(addr.addr){
				addr.addr = addr.addr.replace(/-/g,'').replace(/~/,'')
				this.info = {...this.info,...addr}
			}
			uni.$once('addrInfo',(data) => {
					setTimeout(()=>{
						this.info = data
					},0)
			})
		},
		onLoad(opt) {
			this.info = JSON.parse(opt.param)
		},
		methods:{
			confirmPay(){
				if(!this.info.addressId){
					this.showToast('请先选择收货地址')
					return
				}
				let param = {
					"addressId": this.info.addressId,
					"attributeValue": this.info.attributeValue,
					"id": this.info.id
				}
				this.$request('/snap/purchase','post',param).then(res => {
					if(res.code == 200){
						this.userPayAd(res.data.id)
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
											uni.navigateBack({
												delta:1
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
			cancelPurchase(id){
				unencryp('/snap/cancelPurchase','post',{id})
			},
			goAddress(){
				uni.navigateTo({
					url:'../addressList/addressList?addressId=' + this.info.addressId + '&addrInfo=' + encodeURIComponent(JSON.stringify(this.info))
				})
			}
		}
	}
</script>

<style lang="scss">
.confirmPT{
	height: 100%;
	.main{
		padding: 20rpx;
		.geterInfo{
			padding: 20rpx;
			border-radius: 10rpx;
			background-color: #fff;
			.addrImg{
				width: 90rpx;
				height: 90rpx;
			}
			.con{
				.name{
					.label{
						color: #000;
						font-size: 32rpx;
						margin-right: 20rpx;
					}
					.phoneNum{
						color: #666;
					}
				}
				.addr{
					color: #666;
				}
			}
		}
		.orderInfo{
			padding: 20rpx;
			border-radius: 10rpx;
			margin-top: 20rpx;
			background-color: #fff;
			.goodsInfo{
				padding-bottom: 20rpx;
				border-bottom: 1rpx solid #f6f6f6;
				.goodsImg{
					width: 180rpx;
					height: 180rpx;
					border-radius: 10rpx;
					overflow: hidden;
					background-color: #000;
					.img{
						width: 100%;
						height: 100%;
					}
				}
				.content{
					margin-left: 20rpx;
					.title{
						line-height: 36rpx;
					}
					.tags{
						margin-top: 16rpx;
						.tag{
							margin-right: 10rpx;
						}
					}
					
				}
			}
			.price, .totalPrice, .reward{
				font-size: 24rpx;
				.label{
					font-size: 22rpx;
					color: #666;
				}
				.value{
					color: #ff0000;
					font-size: 28rpx;
					margin-left: 10rpx;
				}
			}
			.totalPrice{
				margin: 20rpx 0;
				.value{
					font-size: 32rpx;
				}
			}
			.reward{
				.hb{
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
		.payTypes{
			padding: 20rpx;
			border-radius: 10rpx;
			margin-top: 20rpx;
			background-color: #fff;
			.ratioLabel{
				.title{
					.payIcon{
						width: 55rpx;
						height: 55rpx;
						margin-right: 10rpx;
					}
					.radio{
						transform:scale(0.7)
					}
				}
				.desc{
					.symbol{
						width: 60rpx;
						font-size: 32rpx;
						color: #ff0000;
					}
					.txt{
						color: #999;
					}
				}
			}
		}
		.ptTime{
			padding: 20rpx;
			border-radius: 10rpx;
			margin-top: 20rpx;
			background-color: #fff;
			.title{
				.payIcon{
					width: 70rpx;
					height: 70rpx;
					margin-right: -5rpx;
					position: relative;
					left: -5rpx;
				}
				.desc{
					color: #FF0000;
					margin-left: 15rpx;
				}
			}
			.desc{
				.symbol{
					width: 60rpx;
					font-size: 32rpx;
					color: #ff0000;
				}
				.txt{
					color: #999;
				}
			}
			
		}
	}
	
	.payBox{
		padding: 15rpx 30rpx;
		background-color: #fff;
		.label{
			font-size: 32rpx;
			font-weight: bold;
			margin-right: 10rpx;
		}
		.money{
			color: #FF0000;
			font-size: 32rpx;
			font-weight: bold;
			margin-right: 30rpx;
		}
	}
}
</style>
