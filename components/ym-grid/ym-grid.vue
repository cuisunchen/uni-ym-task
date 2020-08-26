<template>
	<view class="ymGrid" :style="{backgroundColor: backgroundColor}">
		<view class="title">{{title}}</view>
		<view class="gridList flex" :class="column == 3 ? 'grid-item-3' : 'grid-item-4'">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			title:{
				type: String,
				default(){
					return '默认标题'
				}
			},
			backgroundColor:{
				type: String,
				default(){
					return '#eee'
				}
			},
			column:{
				type: Number,
				default(){
					return 4
				}
			}
		},
		data() {
			return {
				
			}
		},
		onLoad() {
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.ymGrid{
		border-radius: 10rpx;
		padding: 0 20rpx 30rpx;
		.title{
			line-height: 80rpx;
			font-size: 28rpx;
		}
		.gridList{
			flex-wrap: wrap;
		}
		.grid-item-3,.grid-item-4{
			/deep/ .ymGridItem{
				box-sizing: border-box;
				width: calc(100% / 3);
				border-bottom: 2upx solid #eee;
				border-right: 2upx solid #eee;
				text-align: center;
			}
		}
		.grid-item-3{
			/deep/ .ymGridItem:nth-child(3n + 3){
				border-right: none;
			}
		}
		.grid-item-4{
			/deep/ .ymGridItem{
				width: calc(100% / 4);
			}
			/deep/ .ymGridItem:nth-child(4n + 4){
				border-right: none;
			}
		}
	}
</style>
