<template>
	<view class="formInput flex align-center">
		<text class="label">{{label}}</text>
		<input type="text" class="flex1 input" :value="value" @input="inputFun($event)"
　　　　　　 placeholder-class="holderClass" placeholder="请输入问题,要求简单明了" />
	</view>
</template>

<script>
	export default {
		props:{
			label:{
				type: String,
				default(){
					return ''
				}
			},
			value:{
				type: String,
				default(){
					return ''
				}
			}
		},
		data() {
			return {
				// value:''
			};
		},
		created() {
			
		},
		methods:{
			inputFun(e){
				this.$emit('input',e.detail.value)
			}
		}
	}
</script>

<style lang="scss" scoped>
.formInput{
	.label{
		color: #666;
	}
	.flex1{
		height: 80rpx;
		padding: 0 14rpx;
		margin-left: 14rpx;
	}
}
</style>
