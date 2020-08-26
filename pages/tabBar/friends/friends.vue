<template>
	<view class="friendEarnPage page flex-column">
		<view class="top">
			<view class="friendsNum">您邀请到{{myInfo.friend}}位好友</view>
			<view class="profitBox flex align-center">
				<uni-tag :text="myInfo.le" size="small" type="error"></uni-tag>
				<text class="profit">
					 今日共给您带来收益:{{myInfo.friendAmount}}元
				</text>
			</view>
		</view>
		
		<view class="rankingBox">
			<view class="rankingWrap">
				<view class="rank">昨日收益排名 <text>NO1</text></view>
				<view class="userInfo flex align-center">
					 <image class="img" src="../../../static/huangguan@2x.png" alt="" srcset=""></image>
					 <text class="mobile">{{noOneInfo.topPhone}}</text>
					 <text class="tag">LV.{{noOneInfo.level || 5}}</text>
				</view>
				<view class="con flex">
					 <view class="friendsNum flex align-center"><text>好友数量:</text> <text class="num">{{noOneInfo.friendNum}}人</text></view>
					 <view class="income flex align-center" >
							<text>收益金额:</text> <text class="num">{{noOneInfo.makeMoney || '-'}}元</text>
					 </view>
				</view>
				<view class="shareBox flex">
					<view class="img">
						<image src="../../../static/xiaox.png" mode=""></image>
					</view>
					<view class="notice flex1">
						<uni-notice-bar scrollable="true" :speed="50" text="分享应用邀请好友,好友每天的收益,您都有对应的返利,为您当日的米圈收益~~~"></uni-notice-bar>
					</view>
					<view class="shareBtn" @click="goShare">去分享</view>
				</view>
			</view>
		</view>
		
		<view class="main flex1">
			<view class="title flex flex-between">
				<text>- 今日米圈收益明细</text> 
				<text class="rateTxt">当前返利比: <text class="rate">{{myInfo.rebackRate}}%</text></text>
			</view>
			
			<view class="lists">
				<view class="item flex align-center" v-for="(item,index) in friendsList" :key='index'>
					 <view class="index flex all-center">{{index+1}}</view>
					 <view class="flex1">
							<friendListItem :data-obj="item"/> 
					 </view>
				</view>
				<view class="nodata flex-column align-center" v-if="friendsList.length == 0">
					<image class="img" src="../../../static/noData.png" mode="scaleToFill"></image>
					<view class="desc">暂无数据</view>
				</view>
			</view>
		</view>	
	</view>
</template>

<script>
	import friendListItem from '@/components/friends-list-item/friends-list-item.vue'
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	import uniTag from '@/components/uni-tag/uni-tag.vue'
	import ygcRefresh from '@/components/ygc-refresh/ygc-refresh.vue';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		data() {
			return {
				friendsList:[],
				isNoData:false,
				myInfo:{},
				noOneInfo:{}
			}
		},
		created() {
			uni.showLoading({
				title:'加载中'
			})
			this.getDatas()
		},
		onPullDownRefresh() {
			this.refresh()
		},
		methods: {
			getDatas(){
				Promise.all([this.getNoOneInfo(),this.getFriendList()]).then(res =>{
					uni.hideLoading()
					uni.stopPullDownRefresh();
					this.noOneInfo = res[0]
					this.friendsList = res[1].friendList
					this.myInfo = res[1].userInfo
					if(res[1].userInfo.level == 1){
						 this.myInfo.rebackRate = 25
					}else if(res[1].userInfo.level == 2){
						 this.myInfo.rebackRate = 30
					}else if(res[1].userInfo.level == 3){
						 this.myInfo.rebackRate = 35
					}else if(res[1].userInfo.level == 4){
						 this.myInfo.rebackRate = 40
					}else if(res[1].userInfo.level == 5){
						 this.myInfo.rebackRate = 50
					}
					this.myInfo.le = 'LV.'+ res[1].userInfo.level
				})
			},
			getNoOneInfo(){
				return new Promise((resolve,reject) => {
					this.$request('/api/view/friendTopUser','get',{}).then(res => {
						if(res.code == 200){
							resolve(res.data)
						}else{
							this.showToast(res.msg)
						}
					},err =>{
						reject(err)
					})
				})
			},
			getFriendList(){
				return new Promise((resolve,reject) => {
					this.$request('/api/view/friendList','get',{}).then(res => {
						if(res.code == 200){
							resolve(res.data)
						}else{
							this.showToast(res.msg)
						}
					},err =>{
						reject(err)
					})
				})
			},
			refresh(){
				uni.showLoading({
					title:'加载中'
				})
				this.getDatas()
			},
			goShare(){
				uni.navigateTo({
					url:'../../subPages/share/share'
				})
			},
		},
		components:{friendListItem,uniTag,uniNoticeBar,ygcRefresh,uniLoadMore}
	}
</script>

<style lang="scss" scoped>
.friendEarnPage{
	height: 100%;
	.lists{
		/deep/ .uni-scroll-view-content{
			height: calc(100% + 100rpx);
			.refresh-moudle{
				height: 100%;
				display: flex;
				flex-direction: column;
				.down-tip{
					height: 100rpx;
				}
			}
		}
	}
	.top{
		height: 100rpx;
		background-color: #000;
		position: relative;
		.friendsNum{
			 display: inline-block;
			 color: #fff;
			 padding: 0 6rpx;
			 background-color: #B4C386
		}
		.profitBox{
			 position: absolute;
			 right: 20rpx;
			 bottom: 20rpx;
			 .i-tags{
					margin-right: 10rpx
			 }
			 .profit{
					font-size: 28rpx;
					color: rgb(206,177,120);
			 }
			 /deep/ .uni-tag--small{
					height: 14px;
					padding: 0px 4px;
					line-height: 14px;
					margin-right: 10rpx;
			 }
		}
	}
	.rankingBox{
		padding: 20rpx;
		background-color: #eee;
		.rankingWrap{
			padding: 20rpx;
			background-color: #fff;
			border-radius: 10rpx;
			.rank{
				color: #333;
				font-size: 28rpx;
				line-height: 70rpx;
				border-radius: 10rpx;
				padding: 0 18rpx;
				margin-bottom: 20rpx;
				background-color: rgb(248, 242, 234);
				text{
					color: red;
					font-weight: 700;
					margin-left: 10rpx;
				}
			}
			.userInfo{
				.img{
					width: 60rpx;
					height: 60rpx;
				}
				.mobile{
					font-size: 32rpx;
					margin: 0 20rpx;
					color: rgb(233, 203, 165)
				}
				.tag{
					display: inline-block;
					color: #fff;
					padding: 0 10rpx;
					border-radius: 8rpx;
					background-color: rgb(233, 203, 165)
				}
			}
			.con{
				margin-top: 10rpx;
				>view{
					display: inline-block;
					color: #666;
					line-height: 60rpx;
					font-size: 28rpx;
					.num{
						 margin-left: 10rpx;
					}
				}
				.friendsNum{
					margin-right: 30rpx;
					.num{
						 color: blue
					}
				}
				.income{
						.num{
							 color: green
						}
				 }
			}
			.shareBox{
				background-color: #eee;
				padding: 6rpx 0;
				font-size: 28rpx;
				.img{
					width: 50rpx;
					height: 50rpx;
					margin-right: 6rpx;
					image{
						width: 100%;
						height: 100%;
						// margin: 0 16rpx;
					}
				}
				/deep/ .uni-noticebar{
					font-size: 24rpx;
					height: 100%;
					padding: 0 8rpx;
					margin-bottom: 0;
				}
				.shareBtn{
					display: inline-block;
					color: #fff;
					width: 100rpx;
					height: 50rpx;
					text-align: center;
					margin: 0 6rpx;
					line-height: 50rpx;
					background-color: #333
				 }
			}
		}
	}
	.main{
		background-color: #fff;
		.title{
			color: #333;
			font-size: 28rpx;
			line-height: 80rpx;
			padding: 0 20rpx;
			letter-spacing: 1px;
			border-bottom: 1px solid #eee;
			.rateTxt{
				font-size: 24rpx;
				color: #666;
				.rate{
					color: #feae19;
					font-size: 32rpx;
					font-weight: bold;
				}
			}
			
		}
		.nodata{
			margin-top: 100rpx;
			.img{
				width: 150rpx;
				height: 150rpx;
			}
			.desc{
				color: #999;
			}
		}
		.lists{
			padding: 0 30rpx;
			.item{
				padding: 20rpx 0;
				border-bottom: 1px solid #eee;
				.index{
					font-size: 28rpx;
					color: #666;
				}
			}
		}
	}
}
</style>
