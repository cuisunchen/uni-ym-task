<template>
	<view class="bar flex">
		<view class="item flex1 flex-column align-center" v-for="(item,index) in barList" @click="itemClick(item,index)">
			<image class="img" :src="item.img" mode=""></image>
			<text class="title">{{item.title}}</text>
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
							img:'../../../static/biaoqing.png',
							title:'我的订单'
						},
						{
							img:'../../../static/lipin.png',
							title:'我参与的'
						},
						{
							img:'../../../static/jishiben.png',
							title:'我拼团中'
						},
						{
							img:'../../../static/qiche.png',
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
	
	.title{
		font-size: 24rpx;
		line-height: 20rpx;
	}
</style>
