<template>
	<view class="issueConImgUploadCard flex-column">
		<view class="wrap flex">
			<view class="chooseImgBox flex all-center" @click="chooseImg">
				<uni-icons type="plusempty" size="30" color="#999" v-if="!imgUrl"></uni-icons>
				<image :src="imgUrl" mode="aspectFill" v-else></image>
			</view>
			<view class="con flex1 flex align-center">
				<view class="text">或</view>
				<input type="text" class="flex1 input" placeholder-class="holderClass" :value="value" 
								@input="inputFun($event)" placeholder="请填写网址" />
			</view>
		</view>
		
		<view class="conText">
			<view class="title">上传内容图片和内容网址</view>
			<view class="desc">如内容图片和网址都填写,网址优先</view>
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
			value:{
				type: String,
				default(){
					return ''
				}
			}
		},
		data() {
			return {
				imgUrl:'',
				netUrl:''
			};
		},
		watch:{
			isClear(val){
				if(val){
					this.imgUrl = '',
					this.value = ''
				}
			}
		},
		created() {
			
		},
		methods:{
			inputFun(e){
				this.$emit('input',e.detail.value)
			},
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
.issueConImgUploadCard{
	.chooseImgBox{
		width: 150rpx;
		height: 225rpx;
		border-radius: 6rpx;
		overflow: hidden;
		background-color: #eee;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.con{
		.text{
			width: 60rpx;
			color: rgb(206,177,120);
			text-align: center;
		}
		input{
			height: 80rpx;
			border-radius: 10rpx;
			padding: 0 10rpx;
			border: 1rpx solid #eee;
		}
	}
	.conText{
		margin-top: 30rpx;
		padding-top: 30rpx;
		border-top: 1rpx solid #eee;
		.title{
			color: #000;
			font-size: 28rpx;
		}
		.desc{
			color: #999;
			font-size: 26rpx;
		}
	}
}
</style>
