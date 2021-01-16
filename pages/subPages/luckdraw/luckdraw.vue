<template>
	<view class="luckdraw page">
		<view class="userInfo">
			 <view class="layout"></view>
			 <image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581324711206&di=f05b3780acdebb599875a7f494333155&imgtype=0&src=http%3A%2F%2Ffinance.gog.cn%2Fpic%2F003%2F034%2F112%2F00303411233_42c474b3.jpg" alt="" srcset=""></image>
		</view>
		<view class="content">
			 <view class="text">每邀请一位好友,可抽奖一次</view>
			 <view class="text" style="margin-top: 20rpx">最高奖励 <text class="money">500</text> 元</view>
			 <view class="text" style="margin-top: 40rpx">剩余抽奖次数: <text class="num">{{LuckyDrawNum}}</text> 次</view>
			 
			 <view class="drawBox">
					<view class="title">随机点击一个</view>
					<view class="itemWrap" id="itemWrap" ref="itemWrap">
						 <view class="row flex" v-for="(item,index) in row" :key="index">
								<view class="item flex1 flex all-center">
									 <text class="flex all-center" v-if="item[0] == 500 && !isClick" :style="{'background-color': (rowIndex == index && columnIndex == 0) ? '#000' : '#FF3B30'}" @click="chooseLuck(index,0)">{{item[0]}}</text>
									 <text class="flex all-center" v-else-if="item[0] < 500 && item[0] >= 200 && !isClick" :style="{'background-color': (rowIndex == index && columnIndex == 0) ? '#000' : '#E7932E'}" @click="chooseLuck(index,0)">{{item[0]}}</text>
									 <text class="flex all-center" v-else-if="item[0] < 200 && item[0] >= 100 && !isClick" :style="{'background-color': (rowIndex == index && columnIndex == 0) ? '#000' : '#358CBD'}" @click="chooseLuck(index,0)">{{item[0]}}</text>
									 <text class="flex all-center" v-else-if="item[0] < 100 && item[0] >= 10 && !isClick" :style="{'background-color': (rowIndex == index && columnIndex == 0) ? '#000' : '#4CAFA3'}" @click="chooseLuck(index,0)">{{item[0]}}</text>
									 <text class="flex all-center" v-else-if="item[0] < 10 && !isClick" :style="{'background-color': (rowIndex == index && columnIndex == 0) ? '#000' : '#dac49b'}" @click="chooseLuck(index,0)">{{item[0]}}</text>
									 <text class="flex all-center" v-else :style="{'background-color': (rowIndex == index && columnIndex == 0) ? '#000' : '#D4BA88'}" @click="chooseLuck(index,0)">{{item[0]}}</text>
								</view>
								<view class="item flex1 flex all-center">
									 <text class="flex all-center" v-if="item[1] == 500 && !isClick" :style="{'background-color': (rowIndex == index && columnIndex == 1) ? '#000' : '#FF3B30'}" @click="chooseLuck(index,1)">{{item[1]}}</text>
									 <text class="flex all-center" v-else-if="item[1] < 500 && item[1] >= 200 && !isClick" :style="{'background-color': (rowIndex == index && columnIndex == 1) ? '#000' : '#E7932E'}" @click="chooseLuck(index,1)">{{item[1]}}</text>
									 <text class="flex all-center" v-else-if="item[1] < 200 && item[1] >= 100 && !isClick" :style="{'background-color': (rowIndex == index && columnIndex == 1) ? '#000' : '#358CBD'}" @click="chooseLuck(index,1)">{{item[1]}}</text>
									 <text class="flex all-center" v-else-if="item[1] < 100 && item[1] >= 10 && !isClick" :style="{'background-color': (rowIndex == index && columnIndex == 1) ? '#000' : '#4CAFA3'}" @click="chooseLuck(index,1)">{{item[1]}}</text>
									 <text class="flex all-center" v-else-if="item[1] < 10 && !isClick" :style="{'background-color': (rowIndex == index && columnIndex == 1) ? '#000' : '#dac49b'}" @click="chooseLuck(index,1)">{{item[1]}}</text>
									 <text class="flex all-center" v-else :style="{'background-color': (rowIndex == index && columnIndex == 1) ? '#000' : '#D4BA88'}" @click="chooseLuck(index,1)">{{item[1]}}</text>
								</view>
								<view class="item flex1 flex all-center">
									 <text class="flex all-center" v-if="item[2] == 500 && !isClick" :style="{'background-color': (rowIndex == index && columnIndex == 2) ? '#000' : '#FF3B30'}" @click="chooseLuck(index,2)">{{item[2]}}</text>
									 <text class="flex all-center" v-else-if="item[2] < 500 && item[2] >= 200 && !isClick" :style="{'background-color': (rowIndex == index && columnIndex == 2) ? '#000' : '#E7932E'}" @click="chooseLuck(index,2)">{{item[2]}}</text>
									 <text class="flex all-center" v-else-if="item[2] < 200 && item[2] >= 100 && !isClick" :style="{'background-color': (rowIndex == index && columnIndex == 2) ? '#000' : '#358CBD'}" @click="chooseLuck(index,2)">{{item[2]}}</text>
									 <text class="flex all-center" v-else-if="item[2] < 100 && item[2] >= 10 && !isClick" :style="{'background-color': (rowIndex == index && columnIndex == 2) ? '#000' : '#4CAFA3'}" @click="chooseLuck(index,2)">{{item[2]}}</text>
									 <text class="flex all-center" v-else-if="item[2] < 10 && !isClick" :style="{'background-color': (rowIndex == index && columnIndex == 2) ? '#000' : '#dac49b'}" @click="chooseLuck(index,2)">{{item[2]}}</text>
									 <text class="flex all-center" v-else :style="{'background-color': (rowIndex == index && columnIndex == 2) ? '#000' : '#D4BA88'}" @click="chooseLuck(index,2)">{{item[2]}}</text>
								</view>
								<view class="item flex1 flex all-center">
									 <text class="flex all-center" v-if="item[3] == 500 && !isClick" :style="{'background-color': (rowIndex == index && columnIndex == 3) ? '#000' : '#FF3B30'}" @click="chooseLuck(index,3)">{{item[3]}}</text>
									 <text class="flex all-center" v-else-if="item[3] < 500 && item[3] >= 200 && !isClick" :style="{'background-color': (rowIndex == index && columnIndex == 3) ? '#000' : '#E7932E'}" @click="chooseLuck(index,3)">{{item[3]}}</text>
									 <text class="flex all-center" v-else-if="item[3] < 200 && item[3] >= 100 && !isClick" :style="{'background-color': (rowIndex == index && columnIndex == 3) ? '#000' : '#358CBD'}" @click="chooseLuck(index,3)">{{item[3]}}</text>
									 <text class="flex all-center" v-else-if="item[3] < 100 && item[3] >= 10 && !isClick" :style="{'background-color': (rowIndex == index && columnIndex == 3) ? '#000' : '#4CAFA3'}" @click="chooseLuck(index,3)">{{item[3]}}</text>
									 <text class="flex all-center" v-else-if="item[3] < 10 && !isClick" :style="{'background-color': (rowIndex == index && columnIndex == 3) ? '#000' : '#dac49b'}" @click="chooseLuck(index,3)">{{item[3]}}</text>
									 <text class="flex all-center" v-else :style="{'background-color': (rowIndex == index && columnIndex == 3) ? '#000' : '#D4BA88'}" @click="chooseLuck(index,3)">{{item[3]}}</text>
								</view>
								<view class="item flex1 flex all-center">
									 <text class="flex all-center" v-if="item[4] == 500 && !isClick" :style="{'background-color': (rowIndex == index && columnIndex == 4) ? '#000' : '#FF3B30'}" @click="chooseLuck(index,4)">{{item[4]}}</text>
									 <text class="flex all-center" v-else-if="item[4] < 500 && item[4] >= 200 && !isClick" :style="{'background-color': (rowIndex == index && columnIndex == 4) ? '#000' : '#E7932E'}" @click="chooseLuck(index,4)">{{item[4]}}</text>
									 <text class="flex all-center" v-else-if="item[4] < 200 && item[4] >= 100 && !isClick" :style="{'background-color': (rowIndex == index && columnIndex == 4) ? '#000' : '#358CBD'}" @click="chooseLuck(index,4)">{{item[4]}}</text>
									 <text class="flex all-center" v-else-if="item[4] < 100 && item[4] >= 10 && !isClick" :style="{'background-color': (rowIndex == index && columnIndex == 4) ? '#000' : '#4CAFA3'}" @click="chooseLuck(index,4)">{{item[4]}}</text>
									 <text class="flex all-center" v-else-if="item[4] < 10 && !isClick" :style="{'background-color': (rowIndex == index && columnIndex == 4) ? '#000' : '#dac49b'}" @click="chooseLuck(index,4)">{{item[4]}}</text>
									 <text class="flex all-center" v-else :style="{'background-color': (rowIndex == index && columnIndex == 4) ? '#000' : '#D4BA88'}" @click="chooseLuck(index,4)">{{item[4]}}</text>
								</view>
						 </view>
					</view>
			 </view>

			 <view class="btns flex">
					<button open-type="share" class='share flex1' @click="goShare">邀请好友</button>
					<button class='drawBtn flex1' @click='onceAgain'>再抽一次</button>
			 </view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				LuckyDrawNum: 0,
				default:[
					[1,2,3,4,5],
					[6,7,8,9,10],
					[11,12,13,14,15],
					[16,17,18,19,20],
					[21,22,23,24,25],
					[26,27,28,29,30],
					[31,32,33,34,35],
					[36,37,38,39,40],
				],
				row:[],
				allArr:[
					[ "500", "0.12", "0.58", "0.21", "0.22"],
					[ "150", "1.08", "50.08", "0.5", "200"],
					[ "0.18", "0.45", "0.2", "0.16", "20"],
					[ "0.55", "5", "80", "0.1",  "0.5"],
					[ "0.1", "0.88", "0.8", "100", "0.5"],
					[ "0.24", "0.2", "0.16", "0.8", "0.32"],
					[ "0.6", "0.5", "5", "0.66", "60"],
					[ "10", "5", "0.9", "0.89", "0.54"],
				],
				newArr:[],
				isClick: true,
				rowIndex: null,
				columnIndex: null,
				userInfo:{}
			}
		},
		onShow () {
			this.row = this.default  
			let arr = this.randomArray(this.allArr)
			//  打乱数据
			for (const item of arr) {
				 let child = this.randomArray(item)
				 this.newArr.push(child)
			}
			this.getLuckDrawTimes() 
		},
		methods: {
			getLuckDrawTimes(){
				this.$request('/api/getLuckyDrawInfo','',{}).then(res=>{
					if(res.code == 200){
						this.LuckyDrawNum = res.data.LuckyDrawNum
					}
				})
			},
			chooseLuck(rowIndex,columnIndex){   
				if(this.LuckyDrawNum == 0){
					uni.showModal({
						title:'提示',
						showCancel:false,
						content:'抽奖次数为0, 可去分享应用, 再来试试手气'
					})
					return
				}
				 if(!this.isClick){
						return
				 }
				 
				 uni.showLoading({
				 	title:'加载中,请稍后...'
				 })
				 this.$request('/api/luckyDraw','post',{}).then(res => {
					 uni.hideLoading()
					 if(res.code == 200){
						 this.rowIndex = rowIndex
						 this.columnIndex = columnIndex
						 this.newArr = []
						 let arr = this.randomArray(this.allArr)
						 for (const item of arr) {
						 	 let child = this.randomArray(item)
						 	 this.newArr.push(child)
						 }
						 this.row = this.newArr
						 this.isClick = false
						 this.row[rowIndex][columnIndex] = res.data
						 this.showToast(`恭喜您获得${res.data}元`)
						 this.getLuckDrawTimes() 
					 }else{
						 this.showToast(res.msg,'none',3000)
					 }
				 })
			},
			onceAgain(){
				 this.isClick = true
				 this.rowIndex = null
				 this.columnIndex = null
				 this.row = this.default
			},
			createRandom(){
				 return Math.floor(Math.random() * 13)
			},
			randomArray (arr){
				 return arr.sort(() => Math.random() - 0.5);
			},
			goShare(){
				uni.navigateTo({
					url:'../../subPages/share/share'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.luckdraw{
	position: relative;
	height: 100%;
	overflow-y: auto;
	background-color: #fff;
	.userInfo{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		z-index: 8;
		height: 400rpx;
		.layout{
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 9;
			background-color: rgba(0,0,0,.5);
		}
		image{
			width: 100%;
			height: 100%;
			z-index: 0;
		}
	}
	.content{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		z-index: 9;
		padding: 60rpx 30rpx 0;
		.text{
			color: #fff;
			font-size: 28rpx;
			.money{
				color: #D4BA88;
				font-size: 36rpx;
			}
			.num{
				color: rgb(223, 4, 4);
				font-size: 40rpx;
				font-weight: 700;
			}
		}
		.drawBox{
			margin-top: 50rpx;
			padding: 0 10rpx;
			background-color: #e3e3e3;
			border-radius: 10rpx;
			.title{
				color: #333;
				font-weight: 600;
				text-align: center;
				font-size: 32rpx;
				line-height: 80rpx;
			}
			.itemWrap{
				padding-bottom: 20rpx;
				.row{
					margin-bottom: 4px;
					&:last-child{
						margin-bottom: 0;
					}
					.item{
						color: #fff;
						height: 100rpx;
						margin-right: 4px;
						background-color: #D4BA88;
						&:last-child{
							margin-right: 0;
						}
						text{
							width: 100%;
							height: 100%;
						}
				  }
				}
			}
		}
		.btns{
			margin: 40rpx 0;
			>button{
				font-size: 32rpx;
				color: #fff;
				border-radius: 6rpx;
			}
			.share{
				margin-right: 30rpx;
				background-color: #B4C386;
			}
			.drawBtn{
				background-color: #83CCC4;
			}
		}
	}
}
</style>
