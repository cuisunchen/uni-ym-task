<template>
	<view class="totalProfitDay">
		<view class="title flex flex-between">
			<text class="date">{{dateStr}}</text>
			<text class="money">总金额: {{totalMoney}}元</text>
		</view>
		<view class="lists">
			<view class="dayItem flex flex-between" v-for="(item,index) in lists" :key="index">
				<text class="day">{{item.date}}日</text>
				<text class="money">+ {{item.money}}元 </text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists:[],
			  totalMoney:'',
			  dateStr:'2020-06'
			}
		},
		onLoad(option) { //option为object类型，会序列化上个页面传递的参数
			this.totalMoney = option.totalMoney
			this.getLists(option.date)
		},
		methods: {
			getLists(param){
				 uni.showLoading({
						title: '加载中',
				 })
				 let year = new Date().getFullYear()
				 let day = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1): new Date().getMonth()+1
				 let nowDate = year + '-' + day

				 let userInfo = JSON.parse(uni.getStorageSync('userInfo'))
				 this.$request('/api/view/monthMakeMoney','post',{data: param}).then(res => {
						uni.hideLoading()
						if(res.code == 200){
							 this.dateStr = res.data.month
							 if(nowDate == this.dateStr){
									let date = new Date().getDate()
									this.lists = res.data.list.splice(0,date)
									this.lists[this.lists.length-1].money = userInfo.todayAmount
							 }else{
									this.lists = res.data.list
							 }
						}
				 })
			},
		}
	}
</script>

<style lang="scss" scoped>
.totalProfitDay{
	.title{
		padding: 0 30rpx;
		line-height: 80rpx;
		background-color: #4b4848;
		position: sticky;
		top: 0;
		.date{
			color: #fff;
			font-size: 30rpx;
		}
		.money{
			font-size: 28rpx;
			color: rgb(180, 154, 115)
		}
	}
 .lists{
		padding: 0 30rpx 40rpx;
		.dayItem{
			font-size: 28rpx;
			line-height: 80rpx;
			border-bottom: 1px solid #e6e6e6;
			&:last-child{
				border-bottom: none;
			}
			.day{
				color: #666;
			}
			.money{
				color: #2e9737
			}
		}
	}
}
</style>
