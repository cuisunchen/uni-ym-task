<template>
	<view class="chooseADTypePage">
		<view class="setImg">
			<swiper class="swiper" :autoplay="true" :interval="4000" :duration="500" circular>
					<swiper-item v-for="(item,index) in topPics" :key="index">
							<image :src="item.imgUrl" mode="aspectFill" @click="goDetail(item)"></image>
					</swiper-item>
			</swiper>
		</view>
		
		<view class="adItems">
			<view class="wrap flex flex-between">
				<choose-ad-type-card class="card" type="问" title="问答型" desc="低至10元/天" bg-color="#f5387a" 
										@click="itemClick('issueQS')" @btn-click="btnClick('qs-example-page')">
				</choose-ad-type-card>
				<choose-ad-type-card class="card" type="运" title="好运型" desc="低至3元/天" bg-color="gold" 
										@click="itemClick('issueGL')" @btn-click="btnClick('gl-example-page')">
				</choose-ad-type-card>
			</view>
			<view class="wrap flex flex-between">
				<choose-ad-type-card class="card" type="荐" title="推荐型" desc="低至3元/天" bg-color="crimson" 
									@click="itemClick('recommend-choose-page','recommend')" 
									@btn-click="btnClick('recommend-example-page')">
				</choose-ad-type-card>
				<choose-ad-type-card class="card" type="轮" title="轮播型" desc="低于0.01元/人" bg-color="teal" 
									@click="itemClick('issue-public-page','swiper')"
									@btn-click="btnClick('swiper-example-page')">
				</choose-ad-type-card>
			</view>
			<view class="wrap flex flex-between">
				<choose-ad-type-card class="card" type="封" title="封面型" desc="低于0.01元/人" bg-color="steelblue" 
									@click="itemClick('issue-public-page','cover')"
									@btn-click="btnClick('cover-example-page')">
				</choose-ad-type-card>
				<choose-ad-type-card class="card" type="弹" title="弹框型" desc="低于0.01元/人" bg-color="slateblue" 
									@click="itemClick('issue-public-page','dialog')"
									@btn-click="btnClick('dialog-example-page')">
				</choose-ad-type-card>
			</view>
		</view>
	</view>
</template>

<script>
	import chooseAdTypeCard from '../../../components/choose-ad-type-card/choose-ad-type-card.vue'
	export default {
		components:{chooseAdTypeCard},
		data() {
			return {
				topPics:[]
			}
		},
		onLoad() {
			this.getImgs()
		},
		methods: {
			getImgs(){
				this.$request('/api/releaseType','get',{}).then(res => {
					if(res.code == 200){
						this.topPics = res.data.topImage
					}
				})
			},
			goDetail(data){
				data.contentImg = data.jumpUrl
				uni.navigateTo({
					url: '../issue-know-detail/issue-know-detail?param='+ encodeURIComponent(JSON.stringify(data))
				})
			},
			itemClick(url,type){
				if(type){
					uni.navigateTo({
						url:`../${url}/${url}?type=${type}`
					})
				}else{
					uni.navigateTo({
						url:`../${url}/${url}`
					})
				}
			},
			btnClick(url){
				uni.navigateTo({
					url: `../examples/${url}/${url}`
				})
			}
		}
	}
</script>

<style>
page{
	background-color: #eee;
}
</style>
<style lang="scss" scoped>
.chooseADTypePage{
	padding: 30rpx;
	.setImg{
		height: 200rpx;
		.swiper{
			height: 100%;
			image{
				width: 100%;
				height: 100%;
				border-radius: 10rpx;
			}
		}
	}
	.adItems{
		margin-top: 40rpx;
		.wrap{
			margin-bottom: 30rpx;
			.card{
				width: 50%;
				&:first-child{
					margin-right: 30rpx;
				}
			}
		}
	}
}
</style>
