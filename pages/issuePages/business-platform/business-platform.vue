<template>
	<view class="issueHomePage flex-column">
		<view class="contentWrap flex1">
			<view class="bgImgBox">
				<image class="img" src="../../../static/mineBg.jpeg" mode="aspectFill"></image>
				<view class="layout"></view>
				<view class="con">
					<view class="dc">今日平台共发布 {{info.peopleCount}} 条广告</view>
					<view class="dc">快去看看你的同城附近有没有广告订单</view>
					
					<view class="noticeBox flex">
						<view class="img">
							<image src="../../../static/xiaox.png" mode=""></image>
						</view>
						<view class="notice flex1 flex">
							<uni-notice-bar v-if="info.broadcast" scrollable="true" color="#666" background-color="#eee" 
													:speed="info.broadcast.length>50?70:100" :text="info.broadcast"></uni-notice-bar>
						</view>
					</view>
				</view>
			</view>
			
			<view class="wrap">
				<ym-grid class="orderManage" title="订单管理" :column="3">
					<ym-grid-item  v-for="(item,index) in renderManage" :key="index" :data-obj="item" @click="itemClick(item)"></ym-grid-item>
				</ym-grid>
				
				<ym-grid class="orderManage" title="消息/问题/须知" :column="3">
					<ym-grid-item  v-for="(item,index) in renderOthers" :key="index" :data-obj="item" @click="itemClick(item)"></ym-grid-item>
				</ym-grid>
			</view>
		</view>
		
		<view class="issueBtnBox flex all-center">
			<view class="issueBtn flex1 flex all-center" @click="goIssuePage">发布广告</view>
		</view>
	</view>
</template>

<script>
	import ymGrid from "@/components/ym-grid/ym-grid.vue"
	import ymGridItem from "@/components/ym-grid-item/ym-grid-item.vue"
	export default {
		components: {ymGrid,ymGridItem},
		data() {
			return {
				info:{
					broadcast:'搞活动, 做推广, 试试今日友米, 用户量大, 发布费用低, 只要会拍照即可发布广告, 全国/同城/同县所有用户展示, 低至3元, 快来试试吧!'
				},
				manageData:[
					{iconPath:'../../../static/qb.png',pageTitle:"待审核",status:'待审核',nums:'0',desc:'等待人工审核',url:'../managePublicPage/managePublicPage'},
					{iconPath:'../../../static/tu01.png',pageTitle:'发布',status:'发布',nums:'0',desc:'待发布/正在展示',url:'../managePublicPage/managePublicPage'},
					{iconPath:'../../../static/gw1.png',pageTitle:'已完成',status:'已完成',nums:'0',desc:'已经完成的广告',url:'../managePublicPage/managePublicPage'},
					{iconPath:'../../../static/ss.png',pageTitle:'已驳回',status:'已驳回',nums:'0',desc:'广告审核不通过',url:'../managePublicPage/managePublicPage'},
					{iconPath:'../../../static/tu03.png',pageTitle:'未付款',status:'未付款',nums:'0',desc:'未支付成功',url:'../managePublicPage/managePublicPage'},
					{iconPath:'../../../static/tel.png',pageTitle:'其他',status:'其他',nums:'0',desc:'过期被下架',url:'../managePublicPage/managePublicPage'},
				],
				renderManage:[],
				othersData:[
					{iconPath:'../../../static/tz.png',pageTitle:'消息中心',status:'消息中心',nums:'0',desc:'系统/订单消息',url:'../msgCenter/msgCenter'},
					{iconPath:'../../../static/fk.png',pageTitle:'问题反馈',status:'问题反馈',nums:'0',desc:'有问题告诉我们',url:'../../subPages/feedBack/feedBack'},
					{iconPath:'../../../static/tu02.png',pageTitle:'发布须知',status:'发布须知',nums:'0',desc:'发布广告前看看',url:'../issueKnow/issueKnow'},
				],
				renderOthers:[]
			}
		},
		onShow() {
			uni.showLoading({
				title:'加载中'
			})
			this.getBusinessInfo()
		},
		methods: {
			getBusinessInfo(){
				this.$request('/api/find/merchant','',{}).then(res => {
					uni.hideLoading()
					if(res.code == 200){
						this.info = res.data
						this.info.nickName = res.data.nickName.substring(0,3) + '****' + res.data.nickName.substr(-4)
						this.manageData.map(item => {
							if(item.pageTitle == "待审核"){
								item.nums = res.data.unreviewedNum
							}else if(item.pageTitle == "发布"){
								item.nums = res.data.passedNum
							}else if(item.pageTitle == "已完成"){
								item.nums = res.data.completedNum
							}else if(item.pageTitle == "已驳回"){
								item.nums = res.data.notPassedNum
							}else if(item.pageTitle == "未付款"){
								item.nums = res.data.notPayNum
							}else if(item.pageTitle == "其他"){
								item.nums = res.data.violationNum
							}
						})
						this.renderManage = this.manageData
						
						this.othersData.map(item => {
							if(item.pageTitle == "消息中心"){
								item.nums = res.data.messageNum
							}else if(item.pageTitle == "问题反馈"){
								item.nums = 0
							}else if(item.pageTitle == "发布须知"){
								item.nums = 3
							}
						})
						this.renderOthers = this.othersData
					}
				})
			},
			itemClick(item){
				uni.navigateTo({
					url: item.url + '?title=' + item.pageTitle
				})
			},
			goIssuePage(){
				uni.navigateTo({
					url: '../choose-ad-type/choose-ad-type'
				})
			},
		}
	}
</script>

<style>
	page{
		background-color: #fff;
	}
</style>
<style lang="scss" scoped>
.issueHomePage{
	height: 100%;
	position: relative;
	.contentWrap{
		overflow-y: scroll;
	}
	.bgImgBox{
		width: 100%;
		height: 260rpx;
		position: relative;
		.img{
			width: 100%;
			height: 260rpx;
		}
		.layout{
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: rgba(0, 0, 0, .2);
		}
		.con{
			position: absolute;
			top: 0;
			bottom: 0;
			left: 20rpx;
			right: 20rpx;
			.dc{
				color: #f2f2f2;
				font-size: 28rpx;
				margin-top:20rpx;
				&:first-child{
					margin-top: 60rpx;
				}
			}
			.noticeBox{
				background-color: #eee;
				padding: 6rpx 0;
				font-size: 28rpx;
				margin-top: 40rpx;
				border-radius: 10rpx;
				.img{
					width: 70rpx;
					height: 70rpx;
					margin-left: 4rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				/deep/ .uni-noticebar{
					font-size: 24rpx;
					padding: 0 8rpx;
					margin-bottom: 0;
				}
			}
		}
	}
	
	.wrap{
		margin-top: 50rpx;
		padding: 0 20rpx 40rpx;
		
		.orderManage{
			margin-top: 30rpx;
		}
	}

	.issueBtnBox{
		height: 100rpx;
		padding: 0 26rpx;
		background-color: #fff;
		border-top: 1rpx solid #eee;
		.issueBtn{
			height: 80rpx;
			color: #fff;
			background-color: #B4C386;
		}
	}
}
</style>
