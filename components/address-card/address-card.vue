<template>
	<view class="addressCard flex-column">
		<view class="infoBox flex">
			<view class="wrap flex1">
				<view class="info">
					<text class="name">{{item.name}}</text><text>{{item.phone}}</text>
				</view>
				<view class="addr">{{item.newAddr}}</view>
			</view>
			<image v-if="item.default" class="addrImg" src="../../static/dizhi@2x.png" mode=""></image>
		</view>
		<view class="handleBox flex flex-between align-center">
			<view class="flex align-center" @click="changeAddr">
				<radio class="radio" :checked="item.default" color="#ff0000" />
				<text class="label">默认地址</text>
			</view>
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
			},
			hasDefault:{
				type: Boolean,
				default () {
					return true
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
			changeAddr(){
				this.$emit('change')
			},
			goSubpage(){
				this.$emit('click')
			},
			deleteItem(){
				this.$emit('delete')
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
		.addrImg{
			width: 70rpx;
			height: 70rpx;
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
