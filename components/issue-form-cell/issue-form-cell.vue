<template>
	<view class="issueFormCell flex align-center" :class="{'flex-between':!desc && !isTime && pageUrl}" @click="itemClick">
		<view class="label">{{label}}</view>
		<view class="desc flex1 ellipsis_one" :style="{color:descColor}" v-if="desc">{{desc}}</view>
		<input class="flex1" v-if="!desc && !isTime && !pageUrl" type="number" :value="value" 
						placeholder-class="inputHold" :placeholder="placeholderTxt"  @input="inputFun($event)"/>
		<ruiDatePicker v-if="isTime" class="flex1 picker"
			fields="minute"
			start="2010-00-00 00:00"
			end="2030-12-30 23:59"
			:value="dateValue"
			@change="bindChange"
			@cancel="bindCancel"
		></ruiDatePicker>
		<uni-icons class="iconBox flex flex-end" type="arrowright" size="18" color="#b7b4b9" v-if="isIconShow" ></uni-icons>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons'
	import ruiDatePicker from '@/components/rattenking-dtpicker/rattenking-dtpicker.vue';
	export default {
		components:{
			uniIcons,ruiDatePicker
		},
		props:{
			value:{
				type: String,
				default(){
					return ''
				}
			},
			pageUrl:{
				type: Boolean,
				default(){
					return false
				}
			},
			issueNum:{
				type: Number,
				default(){
					return 1
				}
			},
			label:{
				type: String,
				default(){
					return ''
				}
			},
			desc:{
				type: String,
				default(){
					return ''
				}
			},
			issueType:{
				type: String,
				default(){
					return ''
				}
			},
			descColor:{
				type: String,
				default(){
					return ''
				}
			},
			isIconShow:{
				type: Boolean,
				default(){
					return true
				}
			},
			isTime:{
				type: Boolean,
				default(){
					return false
				}
			}
		},
		
		data() {
			return {
				imgUrl:'',
				dateValue:'',
			};
		},
		computed:{
			placeholderTxt(){
				return  this.issueType + '发布,最少发布'+ this.issueNum +'条'
			}
		},
		
		methods:{
			itemClick(){
				this.$emit('click')
			},
			inputFun(e){
				this.$emit('input',e.detail.value)
			},
			bindChange(e){
				let time = e + ":00"
				this.$emit('choose',time)
			},
			bindCancel(e){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.issueFormCell{
	height: 80rpx;
	line-height: 80rpx;
	padding: 0 10rpx 0 30rpx;
	border-radius: 10rpx;
	.picker{
		border: none;
		color: green;
		padding: 0;
	}
	.label{
		margin-right: 20rpx;
	}
	.flex1{
		font-size: 26rpx!important;
	}
	.iconBox{
		width: 60rpx;
	}
	.inputHold{
		color: #999;
	}
}
</style>
