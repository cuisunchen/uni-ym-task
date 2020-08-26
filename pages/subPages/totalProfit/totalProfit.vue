<template>
	<view class="totalProfit">
		<view class="info">
			<image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581347358171&di=ec957d316e45f80a3bebe31095c9864e&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171121%2Fcf0400672fe944719a18957b6feff952.jpeg" 
					 mode="aspectFill"></image>
			<view class="infoCon">
				<view class="text">全部收益(元)</view>
				<view class="nums flex flex-between align-center"><text class="rank">排名: {{info.userOrder}}名</text><text class="total">{{info.sumMoney}}</text></view>
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
					userOrder:'10012',
					sumMoney: '0.26'
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
		image{
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
			z-index: 0
		}
		.infoCon{
			position: absolute;
			left: 0;
			top: 60rpx;
			right: 0;
			z-index: 1;
			padding: 0 30rpx;
			color: #fff;
			font-size: 28rpx;
			.text{
				text-align: right;
			}
			.nums{
				margin-top: 20rpx;
				.total{
					font-size: 32rpx;
					font-weight: 700;
				}
				.rank{
					padding: 6rpx 10rpx;
					line-height: 28rpx;
					border-radius: 8rpx;
					background-color: rgba(68, 66, 66, 0.5)
				}
			}
		}
	}
	.content{
		position: absolute;
		top: 180rpx;
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
