<template>
	<view class="chooseADTypeCard">
		<view class="con flex" @click="itemClick">
			<view class="type flex all-center" :style="{backgroundColor: bgColor}">{{type}}</view>
			<view class="info">
				<view class="tit">{{title}}</view>
				<view class="desc">{{desc}}</view>
			</view>
		</view>
		<view class="btn flex all-center" @click="btnClick">查看示例</view>
	</view>
</template>
<script>
	export default {
		props:{
			bgColor:{
				type: String,
				default(){
					return ''
				}
			},
			type:{
				type: String,
				default(){
					return ''
				}
			},
			title:{
				type: String,
				default(){
					return ''
				}
			},
			desc:{
				type: String,
				default(){
					return ''
				}
			}
	  },
		data() {
			return {
				item:{}
			}
		},
		created() {
			
		},
		methods: {
			itemClick(){
				this.$emit('click')
			},
			btnClick(){
				this.$emit('btn-click')
			}
		}
	}
</script>

<style lang="scss" scoped>
.chooseADTypeCard{
	padding: 20rpx;
	border-radius: 6rpx;
	background-color: #fff;
	.con{
		margin-bottom: 20rpx;
		.type{
			width: 80rpx;
			height: 80rpx;
			color: #fff;
			font-size: 46rpx;
			margin-right: 20rpx;
			font-weight: bold;
			border-radius: 10rpx;
			background-color: blue;
		}
		.info{
			.tit{
				font-weight: bold;
				color: #000;
			}
			.desc{
				color: orange;
			}
		}
	}
	.btn{
		height: 60rpx;
		color: #666;
		border-radius: 6rpx;
		background-color: #d3d3d3;
	}
}
</style>
