<template>
	<view class="bar flex">
		<view class="item flex1 flex-column align-center" v-for="(item,index) in barList" @click="itemClick(item,index)">
			<image class="img" :class="{joinImg:index == 1}" :src="item.img" mode="scaleToFill"></image>
			<view class="titleBox">
				<text class="title">{{item.title}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			barList: {
				type: Array,
				default(){
					return [
						{
							img:'../../../static/jishiben.png',
							title:'我的订单'
						},
						{
							img:'../../../static/jinritemai.png',
							title:'我参与的'
						},
						{
							img:'../../../static/biaoqing.png',
							title:'我拼团中'
						},
						{
							img:'../../../static/lipin.png',
							title:'拼团奖励'
						}
					]
				}
			}
		},
		data(){
			return{
				
			}
		},
		methods:{
			itemClick(data,index){
				// if(index == 3){
				// 	uni.navigateTo({
				// 		url:'../../issuePages/issueTask/issueTask'
				// 	})
				// 	return
				// }
				this.$emit('click',data,index)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.bar{
		flex-direction: row;
		padding: 30rpx 0;
		margin: 10rpx 20rpx 30rpx;
		background-color: #fff;
	}
	.img{
		width: 98rpx;
		height: 82rpx;
		margin-bottom: 20rpx;
	}
	.joinImg{
		width: 88rpx;
	}
	.title{
		font-size: 26rpx;
		line-height: 22rpx;
	}
</style>
