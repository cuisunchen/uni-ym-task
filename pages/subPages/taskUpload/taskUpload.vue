<template>
	<view class="taskUploadPage">
		<view class="types flex align-center">
			<text class="label">类型:</text>
			<view class="typeItem flex1 flex flex-between">
				<button class="mini-btn" type="default" size="mini">二维码</button>
				<button class="mini-btn" type="default" size="mini">二维码</button>
				<button class="mini-btn" type="default" size="mini">二维码</button>
				<button class="mini-btn" type="default" size="mini">二维码</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.taskUploadPage{
	height: 100%;
	background-color: #fff;
	.types{
		padding: 20rpx 30rpx;
		border-bottom: 1rpx solid #f6f6f6;
		.label{
			margin-right: 20rpx;
		}
		.typeItem{
			button{
				flex: 1;
				color: #999;
				margin-right: 20rpx;
				padding: 0 20rpx;
				background-color: #fff;
				&::after{
					border-color: #666;
				}
				&:last-child{
					margin: 0;
				}
			}
		}
	}
	
}
</style>
