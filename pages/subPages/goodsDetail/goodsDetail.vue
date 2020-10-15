<template>
	<view class="goodsDetail flex-column">
		<view class="back flex all-center" @click="goBack">
			<u-icon class="uicon" name="arrow-left" size="40" color="#000"></u-icon>
		</view>
		<view class="main flex1">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="700" circular>
				<swiper-item v-for="swiper in detailInfo.topImages">
					<u-image class="img" swidth="100%" height="100%" :src="swiper" :lazy-load="true" :fade="true">
						<u-loading slot="loading"></u-loading>
						<view slot="error" style="font-size: 26rpx;">加载失败</view>
					</u-image>
				</swiper-item>
			</swiper>
			<!-- 商品详情页红色横幅区域 -->
			<view class="banner flex-column flex-between">
				<view class="line1 flex align-center">
					<text class="label">拼团价</text>
					<text class="unit">￥</text>
					<text class="price">{{detailInfo.discountPrice}}</text>
					<view class="hisPrice">
						<text>￥{{detailInfo.marketPrice}}</text>
						<view class="verticalLine"></view>
					</view>
				</view>
				<view class="line2 flex align-center">
						<text class="label">未拼中可获得红包奖励</text>
						<image class="hbImg" src="../../../static/hb.png" mode=""></image>
						<text class="unit">￥</text>
						<text class="price">{{detailInfo.failPrice}}</text>
					</view>
			</view>
			<!-- 商品title和尺寸 -->
			<view class="goodsInfo">
				<view class="goodsTit">{{detailInfo.title}}</view>
				<view class="sizeSelect flex flex-between align-center" v-if="detailInfo.attributeName" @click="openSize">
					<view class="label flex align-center">
						<text class="la">您已选:</text>
						<text class="laTxt">{{detailInfo.attributeName}}</text>
						<text>{{attributeValue}}</text>
					</view>
					<u-icon name="more-dot-fill"></u-icon>
				</view>
			</view>
			<!-- 历史成团 -->
			<view class="hisGroup">
				<view class="title flex align-center">
					<u-icon name="clock" color="#ff0000" size="36"></u-icon>
					<text class="titLabel">历史成团:</text>
					<text class="num">{{detailInfo.historicalVolume}}</text>
				</view>
				<view class="rule flex all-center">
					<image class="ruleImg" :src="ruleImg" mode="widthFix"></image>
				</view>
				<view class="desc flex align-center">
					<text class="label">未拼中预付款立即原路退还,并奖励</text>
					<text class="money">{{detailInfo.failPrice}}</text>
					<text class="unit">元</text>
				</view>
			</view>
			<!-- 刚刚成功拼团 -->
			<view class="ptNow flex-column">
				<u-cell-item title="他们刚刚成功参与拼团" :title-style="{color: '#000',fontSize: '28rpx',boderColor:'#ff0000'}" value="查看拼团成员" @click="goMemberList" />
				<view class="wrap flex flex-between align-center">
					<swiper class="userSwiper flex1" :vertical="true" :autoplay="true" :circular="true" :interval="3000" :duration="700">
						<swiper-item v-for="mem in memberList" v-if="memberList.length > 0">
							<view class="userInfo flex flex-between align-center">
								<view class="left flex align-center">
									<image class="userImg" :src="mem.avatar" mode=""></image>
									<text class="tel">{{mem.phone}}</text>
								</view>
							</view>
						</swiper-item>
						<swiper-item v-for="mem in 2" v-if="memberList.length == 0">
							<view class="userInfo flex flex-between align-center">
								<view class="left flex align-center">
									<image class="userImg" src="../../../static/other/ste@2x.png" mode=""></image>
									<text class="tel">欢迎您参与此次拼团</text>
								</view>
							</view>
						</swiper-item>
					</swiper>
					<view class="right flex align-center">
						<text>还差</text>
						<text class="num">12</text>
						<text>人成团</text>
					</view>
				</view>
			</view>
			<!-- 参与拼团流程 -->
			<view class="pt-step">
				<view class="title flex align-center">参与拼团流程</view>
				<view class="content">
					<image src="../../../static/liu01@2x.png" mode="widthFix"></image>
				</view>
			</view>
			<!-- 详情说明 -->
			<view class="detailDesc flex-column">
				<view class="title flex align-center">商品详情说明</view>
				<u-image class="goodsImg" v-for="img in detailInfo.contentImages" :src="img" mode="widthFix" :lazy-load="true">
					<u-loading slot="loading"></u-loading>
					<view slot="error" style="font-size: 34rpx;">加载失败</view>
				</u-image>
			</view>
			
			<u-divider color="#999" :half-width="50" bg-color="#f6f6f6" margin-top="30" margin-bottom="30">我也是有底线的</u-divider>
		</view>
		<uni-popup ref="popup" type="bottom">
			<good-size-choose :lists="detailInfo.attributeValues" :data-index="attributeIndex" @change="sizeChange"></good-size-choose>
		</uni-popup>
		
		<view class="footer flex">
			<view class="collection" @tap="collect">
				<view v-if="detailInfo.collect" class="flex-column flex-shrink all-center">
					<u-icon class="uicon" name="star-fill" size="40" color="#ff0000"></u-icon>
					<text class="colleted">已收藏</text>
				</view>
				<view v-else class="flex-column flex-shrink all-center">
					<u-icon class="uicon" name="star" size="40" color="#999"></u-icon>
					<text>收藏</text>
				</view>
				
			</view>
			<view class="pt flex1 flex all-center" @click="goPt">马上拼团</view>
		</view>
	</view>
</template>

<script>
	import goodSizeChoose from '@/components/good-size-choose/good-size-choose.vue'
	export default {
		components:{
			goodSizeChoose
		},
		data() {
			return {
				ruleImg:'../../../static/pt2.png',
				goodsId:'',
				detailInfo:{},
				memberList:[],
				defaultList:[], //  没有成员拼团显示的数据
				timer:null,
				collectType: null,
				attributeValue:'',
				attributeIndex:0,
				groupType:'',
			}
		},
		onUnload() {
			clearInterval(this.timer)
		},
		onLoad(opt) {
			this.groupType = opt.groupType
			switch (opt.groupType){
				case '2':
					this.ruleImg = '../../../static/pt2.png'
					break;
				case '10':
					this.ruleImg = '../../../static/pt10.png'
					break;
				case '50':
					this.ruleImg = '../../../static/pt50.png'
					break;
				case '100':
					this.ruleImg = '../../../static/pt100.png'
					break;
			}
			this.goodsId = opt.id
			this.getDetail(opt.id)
			this.getMemberList(opt.id)
			
			this.timer = setInterval(()=>{
				this.getMemberList(opt.id)
			},10000)
		},
		methods:{
			collect(){   //  截流处理
				this.$u.throttle(this.collection, 1500)
			},
			async collection(){
				uni.showLoading({
					title:'加载中'
				})
				let result = await this.getCollectRes()
				if(result.code == 200){
					this.detailInfo.collect = !this.detailInfo.collect
				}else{
					this.showToast(result.msg)
				}
			},
			getCollectRes(){
				return new Promise((resolve, reject) => {
					this.$unencryp('/snap/collectSnapUp','post',{id:this.goodsId, type: this.detailInfo.collect ? 1: 0}).then(res => {
						if(res.code == 200){
							resolve(res)
						}else{
							reject(res)
						}
					})
				})
			},
			getMemberList(id){
				this.$unencryp('/snap/getSnapUpPlays','post',{id}).then(res => {
					if(res.code == 200){
						this.memberList = res.data
					}else{
						this.showToast(res.msg)
					}
				})
			},
			getDetail(id){
				this.$unencryp('/snap/getSnapUpInfo','post',{id}).then(res => {
					if(res.code == 200){
						this.detailInfo = res.data
						this.attributeValue = res.data.attributeValues[0]
						this.collectType = res.data.collect
					}else{
						this.showToast(res.msg)
					}
				})
			},
			goMemberList(){
				uni.navigateTo({
					url: '../ptMemberList/ptMemberList?lists=' + this.memberList + '&groupType=' + this.groupType
				})
			},
			openSize(){
				this.$refs.popup.open()
			},
			sizeChange(e){
				this.attributeValue = e.value
				this.attributeIndex = e.index
				this.$refs.popup.close()
			},
			goPt(){
				let param = {
					price: this.detailInfo.discountPrice,
					failPrice: this.detailInfo.failPrice,
					goodsTitle: this.detailInfo.title,
					goodsImg: this.detailInfo.topImages[0],
					attributeValue: this.attributeValue,
					id: this.detailInfo.id
				}
				uni.setStorage({
					key:'addr',
					data:{
						tel: this.detailInfo.shippingAddress.phone,
						addr: this.detailInfo.shippingAddress.addressInfo,
						addressId: this.detailInfo.shippingAddress.id,
					}
				})
				uni.navigateTo({
					url:'../confirmPT/confirmPT?param=' + JSON.stringify(param)
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
.goodsDetail{
	height: 100%;
	background-color: #f6f6f6;
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
	.main{
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
	}
	.swiper{
		width: 750upx;
		height: 750upx;
		.img{
			width: 100%;
			height: 100%;
		}
	}
	.banner{
		color: #fff;
		height: 150rpx;
		padding: 0 30rpx;
		background: url(../../../static/bg02@2x.jpg) no-repeat;
		 background-size: cover;
		.line1{
			margin-top: 20rpx;
			.unit{
				margin-left: 20rpx;
				font-size: 26rpx;
			}
			.price{
				color: #fff;
				font-size: 36rpx;
				font-weight: bold;
			}
			.hisPrice{
				color: #e3e3e3;
				position: relative;
				margin-left: 30rpx;
				.verticalLine{
					position: absolute;
					left: 0;
					right: 0;
					bottom: 14rpx;
					height: 1rpx;
					background-color: #999;
				}
			}
		}
		.line2{
			margin-bottom: 20rpx;
			.label{
				font-size: 28rpx;
				font-weight: bold;
			}
			.unit{
				margin: 0 6rpx 0 2rpx;
				font-size: 26rpx;
			}
			.hbImg{
				display: block;
				width: 40rpx;
				height: 40rpx;
				margin-left: 8rpx;
			}
			.price{
				font-size: 32rpx;
			}
		}
	}
	.goodsInfo{
		background-color: #fff;
		.goodsTit{
			font-size: 28rpx;
			font-weight: bold;
			padding: 20rpx 30rpx;
		}
		.sizeSelect{
			height: 90rpx;
			padding: 0 30rpx;
			.label{
				.laTxt{
					margin-right: 10rpx;
				}
				.la{
					color: #2979FF;
					margin-right: 10rpx;
				}
			}
		}
	}
	.hisGroup{
		padding: 0 30rpx;
		margin: 16rpx 0;
		background-color: #fff;
		.title{
			height: 80rpx;
			font-size: 30rpx;
			.titLabel{
				margin: 0 10rpx;
			}
			.num{
				font-size: 32rpx;
			}
		}
		.rule{
			border-radius: 10rpx;
			background-color: #fee1e9;
			.ruleImg{
				width: 100%;
			}
		}
		.desc{
			height: 80rpx;
			.money{
				color: #18B566;
				font-size: 38rpx;
				font-weight: bold;
				margin: 0 8rpx;
			}
			.unit{
				color: #18B566;
			}
		}
	}
	.ptNow{
		background-color: #fff;
		.wrap{
			padding: 0 30rpx;
			border-top: 1rpx solid #f6f6f6;
			.right{
				.num{
					font-size: 38rpx;
					color: #ff0000;
					color: #ff0000;
					margin: 0 6rpx;
				}
			}
		}
		.userSwiper{
			height: 100rpx;
		}
		.userInfo{
			height: 100rpx;
			
			.userImg{
				width: 50rpx;
				height: 50rpx;
				margin-right: 20rpx;
			}
		}
	}
	.pt-step{
		margin-top: 20rpx;
		padding: 0 30rpx 10rpx;
		background-color: #fff;
		.title{
			height: 80rpx;
			border-bottom: 1rpx solid #f6f6f6;
		}
		.content{
			padding: 0 40rpx;
		}
	}
	.detailDesc{
		margin-top: 20rpx;
		background-color: #fff;
		.title{
			font-size: 30rpx;
			height: 80rpx;
			padding: 0 30rpx;
		}
		.goodsImg{
			width: 100%;
		}
	}
	.footer{
		height: 90rpx;
		.collection{
			color: #666;
			width: 180rpx;
			background-color: #fff;
			.colleted{
				color: #ff0000;
			}
		}
		.pt{
			color: #fff;
			background-color: #ff0000;
		}
	}
}
</style>
