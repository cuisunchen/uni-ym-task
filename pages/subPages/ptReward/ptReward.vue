<template>
	<view class="ptReward">
		<ygc-refresh class="freshBox"
		    @onRefresh="onrefresh" 
		    @scrolltolower="onpullingdown"
		    :pullupLoadingType="pullupLoadingType">
				<view class="head">
					<image class="topBg" src="../../../static/mineBg.jpeg" mode="aspectFill"></image>
					<view class="grayBg"></view>
					<view class="info">
						<view class="ptLabel">拼团奖励总额(元)</view>
						<view class="totalMoney">1296.08</view>
					</view>
					<view class="desc">拼团奖励总额,为您实际收到的奖励总额(可随时提现),是总额奖励的2/3,剩余1/3返给您的上家,快去分享吧 ~~~</view>
				</view>
				<view class="detailTit flex flex-between align-center">
					<text class="detailTitLabel">奖励明细</text>
					<view class="datePicker flex align-center" @click="showPicker">
						<text class="selectedDate">2020-09 获得奖励 2946.08元</text>
						<uni-icons type="arrowright" size="16" color="#999"></uni-icons>
					</view>
				</view>
		    <view v-for="(item,index) in 50" :key="index" class="item flex align-center flex-between">
		     	<view class="itemLeft flex-column">
		     		<view class="line1 flex align-center">
		     			<text class="itemtit">拼团奖励</text>
		     			<view class="moneyBox flex align-center">
		     				<text class="moneyNum">12.08</text>
		     				<text class="moneyUnit">元</text>
		     			</view>
		     		</view>
		     		<text class="itemDate">2020-09-04 07:00:06</text>
		     	</view>
		     	<view class="itemRight flex">
		     		<text class="earnMoney">+ 8.05</text>
		     		<image class="hbImg" src="../../../static/hb.png" mode=""></image>
		     	</view>
		    </view>
		</ygc-refresh>
		<u-picker mode="multiSelector" v-model="pickShow"  :default-selector='[0, 1]' :range="multiSelector"></u-picker>
	</view>
</template>
	
<script>
	import ygcRefresh from '@/components/ygc-refresh/ygc-refresh.vue';
	export default {
		components: {ygcRefresh},
		data() {
			return {
				pickShow: false,
				multiSelector: [
					[1, 2, 3], 
					[4, 5, 6]
				],
				pullupLoadingType: 'more'
			}
		},
		mounted() {
		},
		methods: {
			onrefresh(){
				 this.showLoading = 'show'
					setTimeout(res=>{
							// 模拟网路请求
							this.num=4;
							this.showLoading = 'hide'
					},2000)
			},
			onpullingdown(e){
				console.log(123121)
			},
			showPicker(){
				this.pickShow = true
			},
			bindChange: function (e) {
					const val = e.detail.value
					this.year = this.years[val[0]]
					this.month = this.months[val[1]]
					this.day = this.days[val[2]]
			}
		}
	}
</script>
	
<style lang="scss" scoped>
	.ptReward{
		height: 100%;
		.freshBox{
			height: 100%;
		}
		.head{
			position: relative;
			height: 320rpx;
			padding: 30rpx;
			overflow: hidden;
			.grayBg{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 380rpx;
				z-index:8;
				background-color: rgba(0, 0, 0, 0.3);
			}
			.topBg{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 380rpx;
				z-index:7;
			}
			.info{
				position: relative;
				z-index: 9;
				.ptLabel{
					color: #fff;
					font-size: 28rpx;
					margin: 40rpx 0 20rpx;
				}
				.totalMoney{
					color: #fff;
					font-size: 44rpx;
					font-weight: bold;
				}
			}
			.desc{
				color: #fff;
				font-size: 26rpx;
				padding: 20rpx;
				margin-top: 50rpx;
				line-height: 36rpx;
				border-radius: 10rpx;
				background-color: rgba(0, 0, 0, 0.3);
				position: relative;
				z-index: 9;
			}
		}
	}
	.detailTit{
		height: 90rpx;
		padding: 0 30rpx;
		margin-bottom: 1rpx;
		background-color: #FFFFFF;
		.detailTitLabel{
			color: #000000;
			font-size: 28rpx;
		}
		.datePicker{
			height: 50rpx;
			padding: 0 10rpx;
			border-radius: 6rpx;
			.selectedDate{
				color: #333;
				font-size: 26rpx;
				margin: 0 6rpx;
			}
		}
	}
	
	.item{
		padding: 20rpx;
		background-color: #fff;
		margin-bottom: 1rpx;
		.itemtit{
			font-size: 28rpx;
		}
		.moneyNum{
			color: orange;
			font-size: 32rpx;
			font-weight: bold;
			margin: 0 6rpx;
		}
		.moneyUnit{
			color: orange;
			font-size: 28rpx;
		}
		.itemDate{
			color: #999;
			font-size: 24rpx;
			margin-top: 10rpx;
		}
		.earnMoney{
			color: #18B566;
			font-weight: bold;
			margin-right: 6rpx;
		}
	}
	
	.hbImg{
		width: 40rpx;
		height: 40rpx;
	}
</style>
