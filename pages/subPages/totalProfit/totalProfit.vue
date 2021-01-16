<template>
	<view class="totalProfit">
		<view class="info">
			<view class="topBg">
				 <view class="layout"></view>
				 <image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581347358171&di=ec957d316e45f80a3bebe31095c9864e&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171121%2Fcf0400672fe944719a18957b6feff952.jpeg"
				 		 mode="aspectFill"></image>
			</view>
			
			<view class="infoCon">
				<view class="text">全部收益(元)</view>
				<view class="nums flex flex-between align-center">
					<view class="">
						<text class="total">{{info.sumMoney}}</text> 
						<text class="freezeReward">+ 冻结: {{info.freezeReward}}</text> 
					</view>
					<text class="rank">排名: {{info.userOrder}}名</text>
				</view>
				<view class="desc">提示: 冻结金额主要为活动期间您的拉新奖励,新人成功拼团,可立即解冻(拉新抽奖和新人返利一直有效,均不会被冻结)</view>
			</view>
		</view>
		<view class="content">
			<view class="main">
				<view class="yearItem" v-for="(item, _index) in lists" :key="item.parentId">
					<view class="title flex flex-between">
						<text class="year">{{item.year}}</text>
						<text class="profit">总金额: {{item.money}}元</text>
					</view>
					<view class="list">
						<view class="monthItem flex flex-between" 
							 v-for="(child, index) in item.monthsData" :key="child.childId"
							 @click="goDayProfit(item,child)">
							<text class="month">{{child.month}}月</text>
							<text class="money">+ {{child.money}}元 <i-icon type="enter" color="#666" size="20" /></text>
						</view>
					</view>
				</view>
			 </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{
					userOrder:'',
					sumMoney: ''
				},
				lists:[
					{
						money: "0.26",
						year: "2020",
						months:{'06': "0.26"},
						monthsData:[
							{childId:"child06",money:'0.26',month:"06"}
						],
						parentId:"parent0",
					}
				],
			}
		},
		created() {
			this.info.freezeReward = JSON.parse(uni.getStorageSync('userInfo')).freezeReward
		},
		onLoad(opt){
			this.totalMoney = opt.totalMoney
			this.getLists(opt.date)
	  },
		methods: {
			getLists(param){
				 uni.showLoading({
						title: '加载中',
				 })
				 this.$request('/api/view/allMakeMoney','get',{}).then(res=>{
						uni.hideLoading()
						if(res.code == 200){
							 this.info.sumMoney = res.data.sumMoney
							 this.info.userOrder = res.data.userOrder
							 this.lists = res.data.dateList.map((item,index) => {
									item.monthsData = []
									item.parentId = 'parent'+ index
									for (const child in item.months) {
										 let obj = {}
										 obj.childId = 'child'+ child
										 obj.month = child
										 obj.money = item.months[child]
										 item.monthsData.push(obj)
									}
									item.monthsData = item.monthsData.sort((item1,item2) =>{
										 return item2.month - item1.month
									})
									return item
							 })
						}
				 })
			},
			goDayProfit(parent,child){
				 uni.navigateTo({
						url: '../totalProfit-day/totalProfit-day?date=' + parent.year + '-' + child.month + "&totalMoney=" + child.money
				 })
			},
		}
	}
</script>

<style lang="scss" scoped>
.totalProfit{
	position: relative;
	height: 100%;
	.info{
		position: relative;
		height: 260rpx;
		background-color: #1d91da;
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
				position: absolute;
				left: 0;
				top: 0;
				z-index: 0
			}
		}
		// image{
		// 	width: 100%;
		// 	height: 100%;
		// 	position: absolute;
		// 	left: 0;
		// 	top: 0;
		// 	z-index: 0
		// }
		.infoCon{
			position: absolute;
			left: 0;
			top: 60rpx;
			right: 0;
			z-index: 8;
			padding: 0 30rpx;
			color: #fff;
			font-size: 28rpx;
			.nums{
				margin-top: 20rpx;
				.total{
					font-size: 32rpx;
					font-weight: 700;
					margin-right: 10rpx;
				}
				.rank{
					padding: 6rpx 10rpx;
					line-height: 28rpx;
					border-radius: 8rpx;
					background-color: rgba(68, 66, 66, 0.5)
				}
			}
			.desc{
				color: yellow;
				font-size: 24rpx;
				margin-top: 10rpx;
			}
		}
	}
	.content{
		position: absolute;
		top: 240rpx;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
		padding: 40rpx 30rpx;
		overflow-y: scroll;
		.main{
			height: 100%;
			border-radius: 20rpx;
			overflow-y: scroll;
			background-color: #fff;
			box-shadow: 0rpx -4rpx 16rpx 0px #bdbcbc,   /*上边阴影  红色*/
								 -4rpx 0rpx 16rpx 0rpx #bdbcbc,   /*左边阴影  绿色*/
								 4rpx 0rpx 16rpx 0rpx #bdbcbc,    /*右边阴影  蓝色*/
								 0rpx 4rpx 16rpx 0rpx #bdbcbc;    /*下边阴影  黄色*/
			.yearItem{
				.title{
					color: #fff;
					font-size: 32rpx;
					line-height: 80rpx;
					padding: 0 30rpx;
					background-color: #4b4848;
					.profit{
						font-size: 28rpx;
						color: rgb(180, 154, 115)
					}
				}
				.list{
					padding: 0 30rpx;
					.monthItem{
						font-size: 28rpx;
						line-height: 80rpx;
						border-bottom: 1px solid #e6e6e6;
						&:last-child{
							 border-bottom: none;
						}
						.month{
							 color: #666;
						}
						.money{
							 color: #2e9737
						}
					}
	      }
	    }
	  }
	}
}
</style>
