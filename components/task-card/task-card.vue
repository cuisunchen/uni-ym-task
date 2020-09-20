<template>
	<view class="taskCardWrap flex">
		<image class="userImg" src="../../static/pic1.jpeg" mode=""></image> 
		<!-- <image class="userImg" src="../../static/appLogo.png" mode=""></image> -->
		<view class="content flex1 flex-column flex-between">
			<text class="title ellipsis_two">根据任务获取任务接单列表务接单列表根据任务获取任务接单列表务接单列表</text>
			<text class="desc">0人已赚</text>
			<view class="tags flex"><uni-tag class="tag" text="浏览任务" size="small" type="default"></uni-tag></view>
		</view>
		<view class="infos flex-column flex-between">
			<text class="empty"></text>
			<text class="money">赏0.00元</text>
			<text class="sheng">剩 1 名额</text>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.taskCardWrap{
		padding: 29rpx;
	}
	.userImg{
		width: 150rpx;
		height: 150rpx;
	}
	.content{
		padding: 0 14rpx;
		.uni-tag{
			background-color: #e3e3e3;
			padding: 0 10rpx;
			/deep/ .uni-tag-text--small{
				font-size: 28rpx;
			}
		}
	}
	.title{
		color: #333;
		font-size: 26rpx;
		line-height: 32rpx;
	}
	.desc{
		font-size: 24rpx;
	}
	.infos{
		// width: 150rpx;
		// height: 150rpx;
	}
	.empty{
		height: 10rpx;
	}
	.money{
		font-size: 32rpx;
		text-align: right;
		font-weight: 600;
	}
	.sheng{
		font-size: 28rpx;
		text-align: right;
	}
</style>
