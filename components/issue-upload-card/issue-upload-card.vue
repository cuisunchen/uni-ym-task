<template>
	<view class="issueUploadCard flex">
		<view class="chooseImgBox flex all-center" :class="{'row2':type == 'row2','row3':type == 'row3','column': type == 'column'}" @click="chooseImg">
			<uni-icons class="uniIcons" type="plusempty" size="30" color="#999" v-if="!imgUrl"></uni-icons>
			<image :src="imgUrl" mode="aspectFill" v-else></image>
		</view>
		<view class="con flex-column justifu-center">
			<view class="title">上传{{title}}图片</view>
			<view class="percent">图片宽高比{{widthHeightRate}}适宜</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons'
	export default {
		components:{
			uniIcons
		},
		props:{
			isClear:{
				type: Boolean,
				default(){
					return false
				}
			},
			type:{
				type: String,
				default(){
					//  'row' 为横向 长大于款  column为竖向,高大于宽 square为正方形
					return 'square'
				}
			},
			title:{
				type: String,
				default(){
					return ''
				}
			},
			widthHeightRate:{
				type: String,
				default(){
					return '1:1'
				}
			}
		},
		data() {
			return {
				imgUrl:''
			};
		},
		watch:{
			isClear(val){
				if(val){
					this.imgUrl = ''
				}
			}
		},
		created() {
			
		},
		methods:{
			chooseImg(){
				uni.chooseImage({
					count: 1,
					success: res => {
						const tempFilePaths = res.tempFilePaths;
						uni.showLoading({
							title:'图片上传中'
						});
						this.$upload('/image/upload',tempFilePaths[0]).then(res => {
							uni.hideLoading();
							if(res.code=="200"){
								this.imgUrl = res.data;
								this.$emit('choose',this.imgUrl)
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.issueUploadCard{
	.chooseImgBox{
		width: 150rpx;
		height: 150rpx;
		border-radius: 6rpx;
		overflow: hidden;
		background-color: #eee;
		image{
			width: 100%;
			height: 100%;
		}
		&.row2{
			width: 300rpx;
		}
		&.row3{
			width: 300rpx;
			height: 100rpx;
		}
		&.column{
			height: 225rpx;
		}
	}
	.con{
		margin-left: 20rpx;
		.title{
			color: #000;
			font-size: 28rpx;
		}
		.percent{
			color: #666;
			font-size: 26rpx;
		}
	}
}
</style>
