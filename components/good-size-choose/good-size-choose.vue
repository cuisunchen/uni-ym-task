<template>
	<view class="goodSizeChoose flex-column">
		<view class="goodsInfo flex-shrink flex">
			<u-image width="200" height="200" border-radius="10" class="goodsImg flex-shrink" :src="details.topImages[0]"></u-image>
			<view class="info flex-column flex-end">
				<view class="title ellipsis_two">{{details.title}}</view>
				<view class="rewardBox flex align-center">
					<text class="priceSymbol">￥</text>
					<text class="price">{{details.discountPrice}}</text>
					<text class="label">未拼中奖励红包:</text>
					<text class="reward">{{details.failPrice}}</text>
				</view>
			</view>
		</view>	
		<view class="tabs flex">
			<view class="tab">尺寸</view>
		</view>
		<scroll-view class="lists flex1" scroll-y>
			<radio-group class="group" @change="radioChange">
				<label class="cell flex align-center flex-between" v-for="(item, index) in details.attributeValues" :key="index">
					<view>{{item}}</view>
					<view>
							<radio :value="item" :index="index" :checked="index === current" color="#18B566"/>
					</view>
				</label>
			</radio-group>
		</scroll-view >
		<view class="handleBox">
			<u-button :custom-style="customStyle" :hair-line="false" @click="confirm">确定</u-button>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			lists:{
				type: Array,
				default(){
					return []
				}
			},
			details:{
				type: Object,
				default(){
					return {}
				}
			},
			dataIndex:{
				// #ifdef APP-PLUS
				type: String,
				// #endif
				// #ifdef H5
				type: Number,
				// #endif
				default () {
					return 0
				}
			}
		},
		data(){
			return{
				customStyle:{
					'color': '#ffffff',
					'background-color':'#2C405A',
					'border-color': '#2C405A'
				},
				current: 0,
				value: ''
			}
		},
		created() {
			this.value = this.lists[0]
			// #ifdef APP-PLUS
			this.current=Number(this.dataIndex)
			// #endif
			// #ifdef H5
			this.current=this.dataIndex
			// #endif
		},
		methods:{
			confirm(){
				this.$emit('change',{value:this.value,index:this.current})
			},
			radioChange(evt) {
				this.value = evt.target.value
				for (let i = 0; i < this.lists.length-1; i++) {
					if (this.lists[i] === evt.target.value) {
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
					font-size: 28rpx;
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
