<template>
	<view class="issueTaskPage">
		<task-cell class="taskType" title="任务类型:" desc="未选择" link="../../../pages/subPages/taskType/taskType"></task-cell>
		
		<view class="taskInfo">
			<task-cell class="taskName" title="任务名称:" desc="未填写" link="../../../pages/subPages/taskName/taskName"></task-cell>
			<task-cell class="taskRequireMent" title="任务要求:" desc="未填写" link="../../../pages/subPages/taskRequirement/taskRequirement"></task-cell>
		</view>
		
		<view class="taskStep">
			<task-cell class="taskName" title="上传二维码/链接/文本" desc="未填写" link="../../../pages/subPages/taskUpload/taskUpload"></task-cell>
			<task-cell class="setStep" title="设置任务步骤(选填)" desc="未填写" link="../../../pages/subPages/taskStep/taskStep"></task-cell>
			<task-cell class="taskVoucher" :is-icon-show="false" title="用户截图凭证" desc="未填写" link="../../../pages/subPages/taskVoucher/taskVoucher"></task-cell>
		</view>
		
		<task-cell class="taskType" :is-icon-show="false" title="收集用户信息:" desc="不收集" link="../../../pages/subPages/taskCollectInfo/taskCollectInfo"></task-cell>
		
		<view class="taskInfo">
			<task-cell class="taskUnit" type="input" title="任务单价:" placeholder="请输入任务单价"></task-cell>
			<task-cell class="taskNum" type="input" title="任务总数:" placeholder="任务发布数量≥1"></task-cell>
		</view>
		
		<view class="tips">
			<view class="tit">温馨提示:</view>
			<view class="text">1. 用户提交任务后,请在24小时内审核完毕,超期系统会自动审核通过,资金不得追回</view>
			<view class="text text2">2. 重复发布相同任务,用户会重复做该任务,如不允许重复领取,您可选择增加任务数量</view>
			<view class="text">3. 不同任务类型,任务单价不同;单价越高,越受欢迎,排名越高;单价2/3为用户所得,剩余部分按比例返给上级好友</view>
		</view>
		
		<view class="moneyBox">
			<view class="money flex flex-end">
				<!-- <view class="flex flex-end"></view> -->
				<text class="label flex">预付金额(元):</text> <text class="mon">0.00</text>
			</view>
			<view class="comput flex flex-end">(预付金额 = 任务单价 * 任务总数 * 1.1)</view>
		</view>
	</view>
</template>

<script>
	import taskCell from '../../../components/taskCell/task-cell.vue'
	export default {
		components:{taskCell},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.issueTaskPage{
	padding-bottom: 100rpx;
	.taskType{
		margin-top: 20rpx;
	}
	.taskInfo{
		margin: 20rpx 0;
		.taskName{
			margin-bottom: 1rpx;
		}
		.taskUnit{
			margin-bottom: 1rpx;
		}
	}
	.taskStep{
		.setStep{
			margin: 1rpx 0;
		}
	}
	.tips{
		padding: 0 30rpx;
		.tit{
			color: orange;
			margin-bottom: 10rpx;
		}
		.text{
			color: #666;
		}
		.text2{
			margin: 10rpx 0;
		}
	}
	.moneyBox{
		padding: 0 30rpx;
		margin-top: 80rpx;
		.money{
			vertical-align: bottom;
			.label{
				align-items: flex-end;
				margin-right: 10rpx;
			}
			.mon{
				color: red;
				font-size: 48rpx;
				line-height: 48rpx;
			}
		}
		.comput{
			color: #999;
		}
	}
}
</style>
