<template>
	<view class="interestCard flex1 flex-column justify-center" @click="itemClick">
		<view class="wrap flex justifu-center">
			<view class="box">
				<label class="radio">
					<image :src="item.imgUrl ? item.imgUrl : '../../../static/place/fang@2x.png'" alt="" srcset=""></image>
					<checkbox class="checkBox" value="r1" v-if="hobby_isCheckAll" :checked="hobby_isCheckAll" color="#4CD964"/>
					<checkbox class="checkBox" value="r1" v-else :checked="item.isChecked" color="#4CD964"/>
				</label>
			</view>
		</view>
		<p class="title">{{item.name}}</p>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue" 
	import { mapGetters, mapMutations } from 'vuex'
	export default {
		components:{uniIcons},
		props:{
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
			},
		},
		watch:{
			dataObj(val){
				// #ifdef APP-PLUS
				this.item=JSON.parse(this.dataObj)
				// #endif
				// #ifdef H5
				this.item=this.dataObj
				// #endif
			}
		},
		computed: {
			...mapGetters([
				'hobby_isCheckAll'
			]),
		},
		data() {
			return {
				item:{},
				defaultImg:''
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
.interestCard{
	.wrap{
		position: relative;
		text-align: center;
		.box{
			width: 200rpx;
			height: 200rpx;
			position: relative;
			image{
				width: 100%;
				height: 100%;
				margin: 0 auto;
				border-radius: 14rpx;
			}
			.checkBox{
				position: absolute;
				top: 10rpx;
				right: 10rpx;
				/deep/ .uni-checkbox-input{
					width: 40rpx;
					height: 40rpx;
					margin-right:0;
					border-radius: 50%;
					background-color: #fff;
					&.uni-checkbox-input-checked{
						border-color: rgb(76, 217, 100);
						background-color: #fff;
						&:hover{
							border-color: rgb(76, 217, 100);
						}
					}
					&::before{
						font-size: 36rpx;
					}
					&:hover{
						border-color: #d1d1d1;
					}
				}
			}
		}
	}
	
	.title{
		font-size: 28rpx;
		text-align: center;
		line-height: 50rpx;
	}
	
}
</style>
