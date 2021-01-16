<template>
	<view class="goodsDetail flex-column" v-if="!pageHide">
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
					<text class="num">{{detailInfo.fakeDataBasic + detailInfo.historicalVolume}}</text>
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
					<swiper class="userSwiper flex1" :vertical="true" :autoplay="false" :circular="true" :interval="3000" :duration="700">
						<swiper-item class="swiperItem" v-for="(mem,index) in memberList" :key="index" v-if="memberList.length > 0 && memberList.length < groupType">
							<view class="userInfo flex flex-between align-center">
								<view class="left flex align-center">
									<image class="userImg" :src="mem.avatar" mode=""></image>	
									<text class="tel">{{mem.phone}}</text>
								</view>
							</view>
						</swiper-item>
						<swiper-item v-for="mem in 2" v-if="memberList.length == 0 || memberList.length >= groupType">
							<view class="userInfo flex flex-between align-center">
								<view class="left flex align-center">
									<image class="userImg" src="../../../static/timg01@2x.png" mode=""></image>
									<text class="tel">欢迎您参与新的拼团</text>
								</view>
							</view>
						</swiper-item>
					</swiper>
					<view class="right flex align-center">
						<text>还差</text>
						<text class="num">{{detailInfo.snapUpPeopleMax - (detailInfo.snapUpPeople == detailInfo.snapUpPeopleMax ? 0 : detailInfo.snapUpPeople)}}</text>
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
			<good-size-choose :details="detailInfo" :lists="detailInfo.attributeValues" :data-index="attributeIndex" @change="sizeChange"></good-size-choose>
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
	import socketUrl from '@/common/utils/socketConfig.js'
	export default {
		components:{
			goodSizeChoose
		},
		data() {
			return {
				pageHide: false,  // 控制当商品下载时,让页面显示空白
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
				socketTask: null,
				// 确保websocket是打开状态
				timeout: 10000, // 1分钟
				timeoutObj: null,
			}
		},
		onUnload() {
			clearInterval(this.timeoutObj);
			this.timeoutObj = null
			clearInterval(this.timer)
			this.closeSocket() 
		},
		onHide() {
			clearInterval(this.timeoutObj);
			this.timeoutObj = null
			clearInterval(this.timer)
			this.closeSocket() 
		},
		onShow() {
			let ids = [this.goodsId]
			this.connectSocketInit(ids)
		},
		onPullDownRefresh() {
			this.getMemberList('refresh')
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
				case '20':
					this.ruleImg = '../../../static/pt20.png'
					break;
				case '30':
					this.ruleImg = '../../../static/pt30.png'
					break;
			}
			this.goodsId = opt.id
			this.getDetail(this.goodsId)
			this.getMemberList()
		},
		methods:{
			connectSocketInit(ids) {
				this.socketTask = uni.connectSocket({
					url: socketUrl,
					success(data) {
						console.log("websocket连接成功");
					},
					fail(err) {
						uni.showLoading({
							title:'数据加载失败,重连中...' 
						})
					}
				});
				// 消息的发送和接收必须在正常连接打开中,才能发送或接收【否则会失败】
				this.socketTask.onOpen((res) => {
					let obj = {
						"type":0,
						"snapUpId":ids,
					}
					this.socketTask.send({
						data: JSON.stringify(obj),
						async success() {
							console.log("消息发送成功");
						},
					});
					this.socketTask.onMessage((res) => {
						// console.log(res.data); 
						this.getMessage(res.data)
						this.reset(obj); 
					});
				})
				// 这里仅是事件监听【如果socket关闭了会执行】
				this.socketTask.onClose(() => {
					console.log("已经被关闭了")
				})
			},
			getMessage(data){
				if(JSON.parse(data).length){
					this.detailInfo.snapUpPeople = JSON.parse(data)[0].players.length
				}
			},
			closeSocket() {
				this.timeoutObj = null
				clearInterval(this.timeoutObj);
				if(this.socketTask){
					this.socketTask.close({
						success(res) {
							console.log("关闭成功", res)
						},
						fail(err) {
							console.log("关闭失败", err)
						}
					})
				}
			},
			// 检测心跳reset
			reset (obj) {
				clearInterval(this.timeoutObj);
				this.start(obj); // 启动心跳
			},
			// 启动心跳 start 
			start (obj) {
				this.timeoutObj = setInterval(()=>{
					this.socketTask.send({
						data: JSON.stringify(obj),
						success:()=> {
							console.log("消息发送成功");
						},
						fail:(err)=> {
							this.connectSocketInit();
						}
					});
				}, this.timeout);
			},
			
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
					this.$request('/snap/collectSnapUp','post',{id:this.goodsId, type: this.detailInfo.collect ? 1: 0}).then(res => {
						if(res.code == 200){
							resolve(res)
						}else{
							reject(res)
						}
					})
				})
			},
			getMemberList(type){
				this.$request('/snap/getSnapUpPlays','post',{id:this.goodsId}).then(res => {
					if(type == 'refresh'){
						setTimeout(()=> {
							uni.stopPullDownRefresh();
						}, 1000);
					}
					if(res.code == 200){
						this.memberList = res.data
					}else{
						this.showToast(res.msg)
					}
				})
			},
			getDetail(id){
				uni.showLoading({
					title:'加载中...'
				})
				this.$request('/snap/getSnapUpInfo','post',{id}).then(res => {
					uni.hideLoading()
					if(res.code == 200){
						this.detailInfo = res.data
						this.collectType = res.data.collect
					}else{
						this.showToast(res.msg,'none',1500)
						if(res.code == 999){
							this.pageHide = true
							setTimeout(()=>{
								uni.navigateBack()
							},1500)
						}
					}
				})
			},
			goMemberList(){
				uni.navigateTo({
					url: '../ptMemberList/ptMemberList?id=' + this.goodsId + '&groupType=' + this.groupType
				})
			},
			openSize(){
				this.$refs.popup.open()
			},
			sizeChange(e){
				this.attributeValue = e.value
				this.attributeIndex = e.index
				console.log(this.attributeValue)
				this.$refs.popup.close()
			},
			goPt(){
				let param = {
					price: this.detailInfo.discountPrice,
					failPrice: this.detailInfo.failPrice,
					goodsTitle: this.detailInfo.title,
					goodsImg: this.detailInfo.topImages[0],
					attributeValue: this.attributeValue,
					id: this.detailInfo.id,
					attributeName: this.detailInfo.attributeName,
					attributeValues: this.detailInfo.attributeValues
				}
				uni.setStorage({
					key:'addr',
					data:{
						name: this.detailInfo.shippingAddress.name,
						tel: this.detailInfo.shippingAddress.phone,
						addr: this.detailInfo.shippingAddress.addressInfo,
						addressId: this.detailInfo.shippingAddress.id
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
		padding-bottom: 90rpx;
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
			.swiperItem{
				background-color: #fff;
			}
		}
		.userInfo{
			height: 100rpx;
			.userImg{
				width: 50rpx;
				height: 50rpx;
				margin-right: 20rpx;
				border-radius: 6rpx;
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
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
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
