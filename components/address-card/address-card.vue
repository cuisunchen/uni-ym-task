<template>
	<view class="addressCard flex-column">
		<view class="infoBox">
			<view class="info">
				<text class="name">崔孙晨</text><text>13728760372</text>
			</view>
			<view class="addr">广东省深圳市龙华区</view>
		</view>
		<view class="handleBox flex flex-between align-center">
			<label class="flex align-center"><radio class="radio" :value="item.id" :checked="false" color="#ff0000" /><text class="label">默认地址</text></label>
			<view class="right flex align-center">
				<view class="edit flex align-center" @click="goSubpage('address')">
					<uni-icons type="compose" size="18"></uni-icons><text class="label">编辑</text>
				</view>
				<view class="delete flex align-center" @click="deleteItem">
					<uni-icons type="trash"></uni-icons><text class="label">删除</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			dataObj:{
				// #ifdef APP-PLUS
				type: String,
				// #endif
				// #ifdef H5
				type: Object,
				// #endif
				default () {
					return {}
				}
			}
		},
		data(){
			return{
				value:'',
				item:{}
			}
		},
		created() {
			// #ifdef APP-PLUS
			this.item=JSON.parse(this.dataObj)
			// #endif
			// #ifdef H5
			this.item=this.dataObj
			// #endif
			
		},
		methods:{
			goSubpage(){
				uni.navigateTo({
					url:'../../pages/subPages/addAddress/addAddress?param=' + this.item
				})
			},
			deleteItem(){
				console.log('删除地址')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.addressCard{
		background-color: #fff;
		.infoBox{
			padding: 25rpx 30rpx;
			border-bottom: 1rpx solid #f6f6f6;
			.name{
				margin-right: 20rpx;
			}
			.addr{
				color: #666;
				line-height: 20rpx;
				margin-top: 16rpx;
			}
		}
		.handleBox{
			padding: 16rpx 30rpx 16rpx 25rpx;
			.radio{
				transform:scale(0.7)
			}
			.label{
				color: #666;
			}
			.right{
				.edit{
					margin-right: 30rpx;
				}
				.label{
					margin-left: 6rpx;
				}
			}
		}
	}
</style>
