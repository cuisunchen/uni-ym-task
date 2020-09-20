<template>
	<view class="homeSearch">
		<view class="title">热门搜索</view>
		<view class="tags">
			<u-tag text="化妆品" mode="dark" bg-color="yellow"/>
			<u-tag text="家电" mode="dark" bg-color="#007AFF"/>
			<u-tag text="床上用品" mode="dark" bg-color="#ff0000"/>
			<u-tag text="手机" mode="dark" bg-color="#ff0000"/>
			<u-tag text="皮鞋" mode="dark" bg-color="#ff0000"/>
			<u-tag text="手表" mode="dark" bg-color="#ff0000"/>
			<u-tag text="食品" mode="dark" bg-color="#ff0000"/>
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
.homeSearch{
	padding: 30rpx;
	.title{
		margin-bottom: 16rpx;
		// color: #007AFF;
	}
	.tags{
		.u-tag{
			margin-right: 16rpx;
			margin-bottom: 16rpx;
		}
	}
}
</style>
