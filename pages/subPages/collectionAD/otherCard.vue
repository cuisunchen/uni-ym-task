<template>
	<view class="card flex-column align-center" @click="itemClick">
		<image class="img" :src="item.titleImg" mode="aspectFill"></image>
		<view class="time">发布时间: {{item.releaseTime}}</view>
	</view>
</template>

<script>
	export default {
		props: {
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
		watch:{
			dataObj(val){
				// #ifdef APP-PLUS
				this.item=JSON.parse(val)
				// #endif
				// #ifdef H5
				this.item=val
				// #endif
			},
		},
		data() {
			return {
				item:{}
			};
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
			itemClick(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss" scoped>
.card{
	margin-bottom: 30rpx;
	background-color: #fff;
	.img{
		width: 330rpx;
		height: 330rpx;
		background-color: #eee;
	}
	.time{
		line-height: 80rpx;
	}
}
</style>
