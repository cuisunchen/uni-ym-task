<template>
	<view class="goodSizeChoose flex-column">
		<view class="goodsInfo flex-shrink flex">
			<u-image width="200" height="200" border-radius="10" class="goodsImg flex-shrink" src="@/static/other/sfe@2x.png"></u-image>
			<view class="info flex-column flex-end">
				<view class="title ellipsis_two">男士内裤礼盒装真冰丝无痕OMGIM向欧盟尴尬吗青年平角裤大码四角内裤莫代尔码四角内裤莫代尔</view>
				<view class="rewardBox flex align-center">
					<text class="priceSymbol">￥</text>
					<text class="price">0.30</text>
					<text class="label">未拼中奖励红包:</text>
					<text class="reward">0.20</text>
				</view>
			</view>
		</view>	
		<view class="tabs flex">
			<view class="tab">尺寸</view>
		</view>
		<scroll-view class="lists flex1" scroll-y>
			<radio-group class="group" @change="radioChange">
				<label class="cell flex align-center flex-between" v-for="(item, index) in lists" :key="index">
					<view>{{item.name}}</view>
					<view>
							<radio :value="item.value" :checked="index === current" color="#18B566"/>
					</view>
				</label>
			</radio-group>
		</scroll-view >
		<view class="handleBox">
			<u-button :custom-style="customStyle" :hair-line="false">确定</u-button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				customStyle:{
					'background-color':'#f6f6f6',
					'border-color': '#f6f6f6'
				},
				lists: [
					{
							value: 'USA',
							name: 'L'
					},
					{
							value: 'CHN',
							name: 'XL',
							checked: 'true'
					},
					{
							value: 'BRA',
							name: 'XXL'
					},
					{
							value: 'JPN',
							name: 'XXXL'
					}
				],
				current: 0
			}
		},
		onLoad() {
			
		},
		methods:{
			change(){},
			radioChange(evt) {
					for (let i = 0; i < this.lists.length; i++) {
							if (this.lists[i].value === evt.target.value) {
									this.current = i;
									break;
							}
					}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goodSizeChoose{
		height: 900rpx;
		background-color: #fff;
		.goodsInfo{
			height: 200rpx;
			padding: 0 30rpx;
			margin-top: -50rpx;
			.info{
				margin-left: 20rpx;
				.title{
					
				}
				.rewardBox{
					margin-top: 10rpx;
					.priceSymbol{
						font-size: 32rpx;
					}
					.price{
						font-size: 32rpx;
					}
					.label{
						color: #999;
						margin: 0 10rpx 0 16rpx;
					}
					.reward{
						color: #18B566;
						font-size: 32rpx;
					}
				}
			}
		}
		.tabs{
			padding: 0 30rpx;
			margin-top: 30rpx;
			border-bottom: 1rpx solid #f6f6f6;
			.tab{
				color: #333;
				font-size: 28rpx;
				line-height: 50rpx;
				border-bottom: 4rpx solid #333;
			}
		}
		.lists{
			overflow-y: scroll;
			// padding: 0 30rpx;
			-webkit-overflow-scrolling: touch;
			.group{
				margin: 0 30rpx;
			}
			.cell{
				height: 90rpx;
				border-bottom: 1rpx solid #f6f6f6;
			}
		}
		.handleBox{
			padding: 10rpx 30rpx;
			border-top: 1rpx solid #f6f6f6;
		}
	}
</style>
