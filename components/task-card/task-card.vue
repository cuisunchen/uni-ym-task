<template>
	<view class="taskCard row">
		<image class="userImg" src="../../static/appLogo.png" mode=""></image>
		<!-- <image class="userImg" src="../../static/appLogo.png" mode=""></image> -->
		<view class="content flex1">
			<view class="title">根据任务获取任务接单列表</view>
			<view class="desc">0人已赚</view>
			<view class="tags"><uni-tag text="浏览任务" size="small" type="default"></uni-tag></view>
		</view>
		<view class="infos">
			<text class="empty"></text>
			<text class="money">赏 0.00 元</text>
			<text class="sheng">剩 1 名额</text>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.taskCard{
	}
	.userImg{
		width: 150rpx;
		height: 150rpx;
	}
	.infos{
		width: 150rpx;
		height: 150rpx;
	}
</style>
