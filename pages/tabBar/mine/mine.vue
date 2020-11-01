<template>
	<view class="minePage">	
		<image class="img" src="../../../static/mineBg.jpeg" mode="aspectFill"></image>
		<view class="main">
			<view class="avatar" @click="chooseImg">
				<image :src="userInfo.avatarUrl" mode="aspectFill"></image>
			</view>
			
			<view class="userInfoBox">
				<view class="admin">{{userInfo.nickName}}</view>
				<view class="level" @click="goSubPage('rebate')">
					<text>LV{{userInfo.vipLevel}}</text> - 等级返利规则
				</view>
				<view class="moneyBox flex">
					<view class="todayInto flex1" @click="goSubPage('todayProfit')">
						<view class="tit">今日收益</view>
						<view class="num" >{{userInfo.todayAmount}}</view>
					</view>
					<view class="wallet flex1" @click="goSubPage('totalProfit')">
						<view class="tit">全部收益</view>
						<view class="num">{{userInfo.countAmount}}</view>
					</view>
					<view class="withdrawal flex1" @click="goSubPage('withdrawal')">
						<view class="tit">账户余额<text class="drawal">(去提现)</text></view>
						<view class="num">{{userInfo.userSurplus}}</view>
					</view>
				</view>
			</view>
			
			<view class="cells">
				<cell icon-path="../../../static/xiaox.png" title="当前用户人数:" :desc="String(userInfo.countPeople)" desc-color="red" desc-size="20" right-text="立即发布" border-bottom-color="transparent" :is-icon-show="false" @click="goIssuePage"></cell>
				
				<view class="group1">
					<cell icon-path="../../../static/fx1.png" title="分享应用" desc="- 提高会员等级" @click="goSubPage('share')"></cell>
					<cell icon-path="../../../static/cj.png" title="好运抽奖" desc="- 最高奖励500元" @click="goSubPage('luckdraw')"></cell>
					<cell icon-path="../../../static/ss.png" title="每日签到" desc="- 连续7日,最高奖励100元"  border-bottom-color="transparent" @click="signIn"></cell>
				</view>
				
				<view class="group2">
					<cell icon-path="../../../static/tz.png" title="我的消息" :desc-color="userInfo.unreadNum > 0?'red': ''" :desc="userInfo.unreadNum == 0 ? '- 未有新的消息' :`- 您有${userInfo.unreadNum}条未读消息` " @click="goSubPage('myMessage')"></cell>
					<cell icon-path="../../../static/fk.png" title="问题反馈" desc="- 有问题就告诉我们" @click="goSubPage('feedBack')"></cell>
					<cell icon-path="../../../static/sc.png" title="我的收藏" desc="- 收藏感兴趣的东西" @click="goSubPage('collectionAD')"></cell>
					<cell icon-path="../../../static/sz.png" title="偏好设置" desc="- 官网、小程序、兴趣等" border-bottom-color="transparent" @click="goSubPage('setting')"></cell>
					
				</view>
			</view>
			<view class="spaceBox"></view>
		</view>
	</view>
</template>

<script>
	import cell from '@/components/cell/cell.vue'
	export default {
		data() {
			return {
				userInfo:{}
			}
		},
		onLoad() {
			uni.showLoading({
				title:'加载中'
			})
			this.getUserInfo()
		},
		onPullDownRefresh() {
			this.getUserInfo()
		},
		methods: {
			goSubPage(path){
				console.log(path)
				if(path == 'myMessage'){
					uni.navigateTo({
						url:'../../subPages/myMessage/myMessage'
					})
					return
				}
				uni.navigateTo({
					url:`../../subPages/${path}/${path}`
				})
			},
			goIssuePage(){
				uni.navigateTo({
					url:'../../issuePages/business-platform/business-platform'
				})
			},
			refresh(){
				uni.showLoading({
					title:'加载中'
				})
				this.getUserInfo()
			},
			getUserInfo(){
				this.$request('/api/userInfo','get',{}).then(res => {
					if(res.code == 200){
						uni.hideLoading()
						this.userInfo = res.data
						this.userInfo.nickName = res.data.nickName.substring(0,3) + '****' + res.data.nickName.substr(-4)
						uni.stopPullDownRefresh();
						uni.setStorage({
						    key: 'userInfo',
						    data: JSON.stringify(res.data)
						});
					}else{
						this.showToast(res.msg)
					}
				})
			},
			chooseImg(){
				uni.chooseImage({
					chooseImage: 1,
					success:(res)=>{
						let imgFiles = res.tempFilePaths[0]
						this.$upload('/image/upload',imgFiles).then(res=>{
							this.$request('/api/updateUserAvatar','post',{avatarUrl: res.data}).then(result=>{
								if(res.code == 200){
									this.showToast('修改成功')
									this.getUserInfo()
								}else{
									this.showToast(res.msg)
								}
							})
						})
					}
				})
			},
			signIn(){
				this.$request('/api/userSignIn','',{}).then(res => {
					if(res.code == 200){
						let content = ''
						if(res.data.getMoney > 0){
							content = '恭喜您,连续第'+ res.data.signDay + '天签到成功,获得奖励' + res.data.getMoney + '元'
						}else{
							content = '恭喜您,连续第'+ res.data.signDay + '天签到成功'
						}
						uni.showToast({
							title:content,
							icon:'none',
							duration:4000
						})
					}else{
						this.showToast(res.msg)
					}
				})
			}
		},
		comments:{cell}
	}
</script>

<style lang="scss" scoped>
.minePage{
	height: 100%;
	background-color: #f6f6f6;
	.lists{
		/deep/ .uni-scroll-view-content{
			height: calc(100% + 100rpx);
			.refresh-moudle{
				height: 100%;
				.down-tip{
					height: 50px;
				}
			}
		}
	}
	.img{
		width: 100%;
	}
	.main{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 100rpx;
		z-index: 9;
		.avatar{
			width: 150rpx;
			height: 150rpx;
			/* #ifdef APP-PLUS */
			margin: 30rpx auto 0;
			/* #endif */
			/* #ifdef H5 */
			margin: 100rpx auto 0;
			/* #endif */
			
			background-color: #999;
			border-radius: 10rpx;
			image{
				width: 100%;
				height: 100%;
				border-radius: 10rpx;
			}
		}
		.userInfoBox{
			margin: 60rpx 30rpx 0;
			padding: 40rpx 30rpx;
			background-color: #fff;
			border-radius: 10rpx;
			box-shadow: 
								6rpx 6rpx 6rpx 6rpx rgba(0,0,0,0.2), 
								6rpx -6rpx 6rpx 6rpx rgba(0,0,0,0.2), 
								-6rpx 6rpx 6rpx 6rpx rgba(0,0,0,0.2),
								6rpx 6rpx 6rpx 6rpx rgba(0,0,0,0.2);
			>view{
				text-align: center;
				&.admin{
					font-size: 36rpx;
					font-weight: bold;
				}
				&.level{
					font-size: 28rpx;
					color: #5856D6;
					line-height: 50rpx;
					margin-bottom: 16rpx;
					text{
						font-weight: bold;
					}
				}
			}
			.moneyBox{
				padding-top: 30rpx;
				border-top: 1rpx solid #eee;
				>view{
					view{
						font-size: 28rpx;
						text-align: center;
						&.tit{
							color: #999;
							line-height: 60rpx;
							.drawal{
								font-size: 24rpx;
							}
						}
					}
					.num{
						font-weight: bold;
					}
					&.todayInto{
						.num{
							color: #50A839
						}
					}
					&.wallet{
						.num{
							color: #F39631
						}
					}
					&.withdrawal{
						.num{
							color: #1B4AFB
						}
					}
				}
			}
		}
		.cells{
			margin-top: 40rpx;
			padding: 0 30rpx;
		}
		.group1{
			margin: 30rpx 0;
		}
		.group1, .group2{
			background-color: #fff;
			border-radius: 15rpx;
			overflow: hidden;
		}
	}
	.spaceBox{
		/* #ifdef H5 */
		height: 200rpx;
		/* #endif */
		/* #ifdef APP-PLUS */
		height: 100rpx;
		/* #endif */
	}
}
</style>