<template>
	<view class="taskCell flex align-center" @click="itemClick">
		<view class="star flex flex-start"><text v-if="isIconShow">*</text></view>
		<view class="title" :class="{'flex1':type !== 'input'}">{{title}}</view>
		<view class="inputWrap flex align-center" :class="{'flex1':type == 'input'}" v-if="type == 'input'">
			<input class="inputBox" type="text" value="" :placeholder="placeholder" placeholder-class="holderClass" />
		</view>
		<view class="handle flex align-center" v-else>
			<text class="des">{{desc}}</text>
			<uni-icons v-if="isIconShow" type="arrowright" color="#999" size="18"></uni-icons>
		</view>
		
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		components:{uniIcons},
		props:{
			link:{
				type: String,
				default:''
			},
			type:{
				type: String,
				default:''
			},
			placeholder:{
				type: String,
				default:'请输入'
			},
			descSize:{
				type: String,
				default(){
					return '12'
				}
			},
			isIconShow:{
				type: Boolean,
				default(){
					return true
				}
			},
			bgColor:{
				type: String,
				default(){
					return '#fff'
				}
			},
			height:{
				type: Number,
				default(){
					return 80
				}
			},
			iconPath:{
				type: String,
				default(){
					return ''
				}
			},
			title:{
				type: String,
				default(){
					return '任务分类: '
				}
			},
			desc:{
				type: String,
				default(){
					return '未选择'
				}
			},
			descColor:{
				type: String,
				default(){
					return '#D4BA88'
				}
			},
			rightText:{
				type: String,
				default(){
					return ''
				}
			},
			borderBottomColor:{
				type: String,
				default(){
					return '#eee'
				}
			},
		},
		data() {
			return {
				
			};
		},
		created() {
			
		},
		methods:{
			itemClick(){
				uni.navigateTo({
					url:this.link
				})
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.taskCell{
		height: 100rpx;
		font-size: 28rpx;
		padding: 0 16rpx 0 30rpx;
		background-color: #fff;
		.star{
			color: red;
			width: 14rpx;
			font-size: 32rpx;
			margin-right: 14rpx;
			font-weight: bold;
			margin-top: 8rpx;
		}
		.title{
			color: #333;
		}
		.handle{
			.des{
				color: #999;
			}
		}
		.inputWrap{
			padding: 0 10rpx 0 30rpx;
			.inputBox{
				width: 100%;
			}
		}
	}
</style>
