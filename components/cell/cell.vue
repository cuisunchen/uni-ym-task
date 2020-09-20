<template>
	<view class="cellWrap flex" :style="{backgroundColor: bgColor,'borderBottomColor':borderBottomColor}" @click="itemClick">
		<view class="ltBox flex all-center">
			<image class="userImg" :src="iconPath" mode=""></image>
		</view>
		<view class="cterBox flex1 flex align-center">
			<view class="title">{{title}}</view>
			<view class="desc" :style="{color: descColor || '#D4BA88',fontSize: descSize+'px'}">{{desc}}</view>
		</view>
		<view class="rtBox flex align-center">
			<uni-icons v-if="isIconShow" type="arrowright" color="#999" size="18"></uni-icons>
			<text class="des" v-if="!isIconShow && rightText.length > 0">{{rightText}}</text>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue" 
	export default {
		components:{uniIcons},
		props:{
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
					return ''
				}
			},
			desc:{
				type: String,
				default(){
					return ''
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
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss" scoped>
.cellWrap{
	border-radius: 8rpx;
	border-style: solid;
	border-width: 1rpx;
	/* #ifndef APP-NVUE */
	border-top: none;
	border-left: none;
	border-right: none;
	/* #endif */
	padding: 5rpx 0;
}
	.ltBox{
		width: 110rpx;
		height: 110rpx;
	}
	.userImg{
		width: 60rpx;
		height: 60rpx;
	}
	.cterBox{
		
	}
	.title{
		font-size: 30rpx;
	}
	.desc{
		margin-left: 10rpx;
	}
	.rtBox{
		padding-right: 30rpx;
		
	}
	.des{
		color: #51a3f0;
		font-weight: bold;
	}

</style>
