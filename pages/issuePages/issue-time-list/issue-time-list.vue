<template>
	<view class="issueTimeList flex-column">
		<view class="info">
			<view class="title flex all-center">{{tag}}每天最多发布{{maxNum}}条,以确保曝光率</view>
			<view class="con flex">
				<view class="left flex1">
					<view class=""><text class="label">发布类型: </text><text class="result">{{issuType}}</text></view>
					<view class=""><text class="label">发布费用: </text><text class="result money">{{param.unitPrice}}元/天</text></view>
				</view>
				<view class="right flex1">
					<view class=""><text class="label">曝光类型: </text><text class="result">{{param.rangeName || '全国'}}</text></view>
					<view class=""><text class="label">曝光人数: </text><text class="result peoples">{{param.totalPeople}}人</text></view>
				</view>
			</view>
		</view>
		
		<view class="noticeBox flex flex">
			<view class="label">
				建议:
			</view>
			<view class="notice flex1">
				<uni-notice-bar scrollable="true" color="#666" background-color="#fff"
										:speed="broadcast.length>50?70:100" :text="broadcast"></uni-notice-bar>
			</view>
		</view>
		
		<view class="list flex1">
			<view class="titleBox flex align-center"><text class="title">可发布时间</text> <text class="desc">一个月,可多选,提前预定,价格更优</text></view>
			<view class="wrap">
				<label class="item flex align-center radio" v-for="(item,index) in lists" :key="index" @click="itemClick(item,index)">
					<view class="index flex all-center">{{item.index}}</view>
					<view class="date flex1">{{item.date}}</view>
					<checkbox class="checkBox" value="r1" :checked="item.isChecked" color="#4CD964"/>
				</label>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				tag:'',
				issuType:'',
				rangeType:'全国',
				maxNum: 1,
				broadcast:'如果当天时间已不可选, 可选择发布问答型广告或好运型广告, 问答和好运广告数量不限, 价格便宜, 且曝光度更高, 用户点击查看率更高',
				lists:[],
				chooseDaysList:[],
				isEdit: 'false',
				param:{}
			}
		},
		computed: {
			...mapGetters([
				'chooseDays'
			]),
		},
		onLoad(opt) {
			this.isEdit = opt.isEdit
			this.param = JSON.parse(decodeURIComponent(opt.param))
			switch (this.param.homeType){
				case 1:
					this.tag = '轮播图'
					this.issuType = '轮播型'
					this.maxNum = 3
					break;
				case 2:
					this.tag = '封面图'
					this.issuType = '封面型'
					this.maxNum = 1
					break;
				case 3:
					this.tag = '弹框型'
					this.issuType = '弹框型'
					this.maxNum = 1
					break;
				case 4: 
					this.tag = '推荐型'
					this.issuType = '首页-今日推荐'
					this.maxNum = 3
					break;
				case 5:
						this.tag = '推荐型'
						this.issuType = '好运-全国推荐'
						this.maxNum = 3
						break;
				case 6:
						this.tag = '推荐型'
						this.issuType = '好运-同城推荐'
						this.rangeType = '同城'
						this.maxNum = 3
						break;
				case 7:
						this.tag = '推荐型'
						this.issuType = '好运-附近推荐'
						this.rangeType = '附近(同县/区)'
						this.maxNum = 3
						break;
			}
			if(this.chooseDays.length > 0){
				this.chooseDaysList = this.chooseDays
			}
			uni.showLoading({
				title:'加载中...'
			})
			this.getTimeList()
		},
		onNavigationBarButtonTap() {
			this.set_chooseDays(this.chooseDaysList)
			uni.navigateBack({
				delta:1
			})
		},
		methods: {
			...mapMutations({
					set_chooseDays: 'SET_CHOOSEDAYS',
			}),
			itemClick(item,index){
				if(this.isEdit == 'false'){
					item.isChecked = true
					this.chooseDaysList.push(item)
				}else{
					for (var i = 0; i < this.chooseDaysList.length; i++) {
						if(this.chooseDaysList[i].index == item.index){
							this.chooseDaysList.splice(i,1)
							return
						}
					}
					item.isChecked = true
					this.chooseDaysList.push(item)
				}
			},
			getTimeList(){
				let param = {
					"cityCode": this.param.cityCode,
					"homeType": this.param.homeType
				}
				this.$request('/api/releaseFreeTime','post',param).then(res => {
					uni.hideLoading()
					if(res.code == 200){
						this.lists = res.data.map(item => {
							let obj = {}
							let arr = item.split('-')
							obj.index = arr[arr.length-1]
							obj.isChecked = false
							obj.date = item
							if(this.chooseDays){
								for (let day of this.chooseDays) {
									if(obj.index == day.index){
										obj.isChecked = true
									}
								}
							}
							return obj
						})
					}else{
						this.showToast(res.msg)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.issueTimeList{
	height: 100%;
	.info{
		flex-shrink: 0;
		margin: 20rpx;
		border-radius: 10rpx;
		overflow: hidden;
		background-color: #fff;
		.title{
			color: #fff;
			height: 80rpx;
			font-weight: bold;
			background-color: green;
		}
		.con{
			padding: 20rpx 30rpx;
			.flex1{
				>view{
					&:first-child{
						margin-bottom: 10rpx;
					}
				}
				.label{
					color: #999;
					margin-right: 16rpx;
				}
				.result{
					color: #000;
					font-weight: bold;
				}
				.money{
					color: red;
				}
				.peoples{
					color: blue;
				}
			}
			.left{
				margin-right: 20rpx;
			}
		}
		
	}
	.noticeBox{
		flex-shrink: 0;
		background-color: #fff;
		padding: 16rpx 0;
		margin: 0 20rpx;
		font-size: 28rpx;
		margin-bottom: 20rpx;
		border-radius: 10rpx;
		.label{
			color: blue;
			line-height: 18px;
			margin-left: 30rpx;
		}
		/deep/ .uni-noticebar{
			font-size: 24rpx;
			height: 100%;
			padding: 0 8rpx;
			margin-bottom: 0;
		}
	}
	.list{
		background-color: #fff;
		.titleBox{
			height: 80rpx;
			padding-left: 30rpx;
			.title{
				color: #333;
				font-size: 28rpx;
				font-weight: bold;
			}
			.desc{
				color: #999;
				font-size: 24rpx;
			}
		}
		.wrap{
			padding-left: 24rpx;
			border-top: 1rpx solid #eee;
			.item{
				height: 90rpx;
				padding-right: 30rpx;
				border-bottom: 1rpx solid #eee;
				&:last-child{
					border-bottom: 0;
				}
				.index{
					width: 40rpx;
					height: 40rpx;
					line-height: 40rpx;
					color: #fff;
					margin-right: 20rpx;
					border-radius: 6rpx;
					background-color: green;
				}
				.date{
					line-height: 40rpx;
				}
				/deep/ .uni-checkbox-input{
					width: 36rpx;
					height: 36rpx;
					margin-right:0;
					border-radius: 50%;
					background-color: transparent;
					&::before{
						font-size: 36rpx;
					}
					&:hover{
						border-color: green;
					}
					&.uni-checkbox-input-checked{
						border-color: green;
					}
				}
			}
		}
	}
}
</style>
