<template>
	<view class="taskTypeCard flex-column">
		<label class="infoWrap flex">
			<view class="iconBox">
				<image class="img" :src="item.imgUrl ? item.imgUrl: '../../static/place/fang@2x.png'" alt="" srcset=""></image>
			</view>
			<view class="info flex1 flex-column flex-between">
				<view class="title">{{item.title}}</view>
				<view class="unit flex">
					<text class="label">最低单价:</text>
					<text class="price">{{item.price}}</text>
				</view>
			</view>
			<view class="checkWrap flex all-center">
				<checkbox class="checkBox" value="r1" color="#4CD964"/>
			</view>
			
		</label>
		<view class="desc">{{item.desc}}</view>
	</view>
</template>

<script>
	export default{
		props:{
			dataObj:{
				// #ifdef APP-PLUS
				type: String,
				// #endif
				// #ifdef H5
				type: Object,
				// #endif
				default () {
					return {}
				}
			},
		},
		data(){
			return{
				item:{}
			}
		},
		created() {
			// #ifdef APP-PLUS
			this.item=JSON.parse(this.dataObj)
			// #endif
			// #ifdef H5
			this.item=this.dataObj
			// #endif
		},
		methods:{
			
		}
	}
	
</script>

<style lang="scss" scoped>
	.taskTypeCard{
		padding: 20rpx;
		border-radius: 10rpx;
		background-color: #fff;
		.infoWrap{
			margin-bottom: 10rpx;
			.iconBox{
				width: 100rpx;
				height: 100rpx;
				background-color: #e6e6e6;
				border-radius: 8rpx;
				.img{
					width: 100%;
					height: 100%;
					border-radius: 8rpx;
				}
			}
			.info{
				padding: 0 14rpx;
				.title{
					font-size: 30rpx;
					color: #000;
					line-height: 44rpx;
				}
				.unit{
					line-height: 40rpx;
					.label{
						color: #666;
						margin-right: 10rpx;
					}
					.price{
						color: orange;
					}
				}
			}
			.checkBox{
				// position: absolute;
				// top: 10rpx;
				// right: 10rpx;
				/deep/ .uni-checkbox-input{
					display: flex;
					align-items: center;
					justify-content: center;
					width: 40rpx;
					height: 40rpx;
					margin-right:0;
					border-radius: 50%;
					background-color: #fff;
					&.uni-checkbox-input-checked{
						border-color: rgb(76, 217, 100);
						background-color: #fff;
						&:hover{
							border-color: rgb(76, 217, 100);
						}
						&::before{
							content: ' ';
							font-size: 16px;
							width: 26rpx;
							height: 26rpx;
							display: block;
							border-radius: 50%;
							background-color: #4cd964;
						}
					}
					&::before{
						font-size: 16px;
					}
					&:hover{
						border-color: #d1d1d1;
					}
				}
			}
		}
		.desc{
			line-height: 50rpx;
			border-radius: 6rpx;
			padding: 0 10rpx;
			background-color: rgba(209,209,209, .3);
		}
	}
</style>
