<template>
	<view class="addRplyPage">
		<view class="questionBox">
			 <view class="tit">
					<text class="tag">您的问题</text>
					<text class="time">{{itemObj.createTime}}</text>
			 </view>
			 <view class="question">{{itemObj.content}}</view>
		</view>
		
		<view class="replys">
			 <view class="item" v-for="(item,index) in replyList" :key="index">
					<view class="tit flex flex-between"><text class="label" :style="{color: item.tags=='平台回复' ? 'burlywood' :'#aee148'}">{{item.tags}}:</text><text class="time">{{item.createTime}}</text></view>
					<view class="con">{{item.content}}</view>
			 </view>
		</view>
	</view>
</template>
<script>
	export default {
		components:{},
		data() {
			return {
				itemObj:{},
				replyList:[],
				typeId: 0
			}
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url:'../appendReply/appendReply?id=' + encodeURIComponent(this.itemObj.id) + "&typeId=" + this.typeId
			})
		},
		onShow() {
			uni.showLoading({
				title:'加载中'
			})
			this.getFeedbackDetail()
		},
		onLoad(option) {
		  this.itemObj = JSON.parse(decodeURIComponent(option.param));
			this.typeId = option.typeId || 0
		},
		methods: {
			getFeedbackDetail(){
				this.$request('/api/getFeedbackById','post',{id:this.itemObj.id}).then(res => {
					uni.hideLoading()
					if(res.code == 200){
						this.mainQs = res.data[0]
						res.data.shift()
						this.replyList = res.data
					}else{
						res.msg ? this.showToast(res.msg) :''
					}
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #fff;
	}
</style>
<style lang="scss" scoped>
.addRplyPage{
	height: 100%;
	background-color: #eee;
	   .questionBox{
	      padding: 30rpx 20rpx 20rpx;
	      margin-bottom: 20rpx;
	      background-color: #fff;
	      .tit{
	         .tag{
	            color: #fff;
	            font-size: 24rpx;
	            padding: 0 10rpx;
	            margin-right: 16rpx;
	            border-radius: 6rpx;
	            background-color: rgb(252, 22, 102);
	         }
	         .time{
	            color: #666;
	         }
	      }
	      .question{
	         color: #000;
	         font-size: 28rpx;
	         margin-top: 14rpx;
	         margin-bottom: 10rpx;
	      }
	   }
	   .replys{
	      margin-top: 20rpx;
	      margin-bottom: 140rpx;
	      padding: 0 30rpx;
	      background-color: #fff;
	      .item{
	         padding: 20rpx 0;
	         border-bottom: 1rpx solid #eee;
	         &:last-child{
	            border: none;
	         }
	         .tit{
	            font-size: 26rpx;
	            .label{
	               color: rgb(174, 225, 72);
	               &.myReply{
	                  color: rgb(87, 226, 250);
	               }
	            }
	            .time{
	               color: #e3e3e3;
	            }
	         }
	         .con{
	            color: #333;
	            font-size: 28rpx;
	            margin-top: 10rpx;
	         }
	      }
	   }
}
</style>
