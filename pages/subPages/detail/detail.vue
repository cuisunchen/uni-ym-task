<template>
	<view class="detail">
		<!-- <view class="back flex all-center" @click="goBack">
			<uni-icons type="arrowleft" color="#d5d5d5" size="22"></uni-icons>
		</view> -->
		
		
		<uni-fab :pattern="pattern" title="回答"
            :content="content"
            :horizontal="horizontal"
            :vertical="vertical"
            :direction="direction"
            @trigger="trigger"></uni-fab>
		<view class="webviewBox" v-if="dataObj.webViewShow">
			<web-view :src="dataObj.bigImg"></web-view>	
		</view>		
		<movable-area scale-area  v-else>
				<movable-view class="movable-view" direction="all" @scale="onScale" scale="true" scale-min="0.5" scale-max="4" :scale-value="scaleValue">
						<!-- <image src="图片路径" mode="aspectFill"></image> -->
						<view class="imgWrap" ref="imgWrap" :style="{height: boxHeight + 'px',width:'100%'}">
							<image class="img" :src="dataObj.bigImg" mode="aspectFill" @load="imgLoad" @dblclick="dblclick"></image>
						</view>
						
				</movable-view>
		</movable-area>
		
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue" 
	import uniFab from "@/components/uni-fab/uni-fab.vue"
	export default {
		components:{uniIcons,uniFab},
		data() {
			return {
				horizontal: 'right',
				vertical: 'bottom',
				direction: 'vertical',
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#f4ea2a',
					buttonColor: '#007AFF'
				},
				content: [
					{
						iconPath: '/static/apply-sel.png',
						selectedIconPath: '/static/apply-sel-fill.png',
						text: '申诉',
						active: false
					},
					{
						iconPath: '/static/sc-sel.png',
						selectedIconPath: '/static/sc-sel-fill.png',
						text: '收藏',
						active: false
					},
					{
						iconPath: '/static/answer.png',
						selectedIconPath: '/static/answer-fill.png',
						text: '回答问题',
						active: false
					}
				],
				dataObj:{},
				type:'',
				scaleValue: 1,
				boxHeight: 200
			}
		},
		onLoad(option) {
			
			this.dataObj = JSON.parse(decodeURIComponent(option.param))
			if(this.dataObj.bigImg.indexOf('jpg') < 0){
				this.dataObj.webViewShow = true
			}else{
				this.dataObj.webViewShow = false
			}
			this.type = option.type || ''
			
			this.boxHeight = uni.getSystemInfoSync().windowHeight
			// uni.getSystemInfo({
			// 	success(data) {
					
			// 		this.$nextTick(()=>{
			// 			this.boxHeight = data.windowHeight
			// 		})
			// 	}
			// })
		},
		methods: {
			onScale(){},
			dblclick() {
				if (this.scaleValue != 1) {
					this.scaleValue = 1;
				}
			},
			onPageStart(){
				uni.showLoading({
					title:'加载中'
				})
			},
			onPageFinish(){
				uni.hideLoading()
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			trigger(res){
				if(res.index !== 2){
					res.item.active = !res.item.active
				}
				
				if(res.index == 2){
					uni.navigateTo({
						url: '../answerQs/answerQs?id=' + encodeURIComponent(this.dataObj.id)
					})
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.detail{
	width: 100%;
	height: 100%;
	.img{
		width: 100%;
	}
	.back{
		position: fixed;
		left: 40rpx;
		top: 100rpx;
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
		background-color: rgba(0, 0, 0, .3);;
		z-index: 9;
	}
	movable-view {
		display: flex;
		// align-items: center;
		justify-content: center;
		width: 100%;
		height:100%;
		overflow-y: scroll;
		pointer-events: auto;
	}
	
	movable-area {
		height: 100%;
		width: 100%;
		position:fixed;
		overflow-y: scroll;
		pointer-events: none;
	}
		
	movable-view image{
		width:100%;
	}
}
</style>
