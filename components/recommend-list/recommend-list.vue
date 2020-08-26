<template>
	<view class="recomendBox">
		<view class="title" v-if="isTitleShow">今日推荐</view>
		<view class="listWrap flex">
			<view v-for="(item,index) in renderList" :key="index" class="list-item flex1" @click="itemClick(item)">
				<image :src="item.homeTopImgUrl" mode="aspectFill" :style="{height:recomendItemHeight+'px'}"></image>
				<view class="tit" :style="{'text-align':!item.homeBigImgUrl?'center':''}">{{item.title}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			isTitleShow:{
				type: Boolean,
				default () {
					return true
				}
			},
			dataObj:{
				// #ifdef APP-PLUS
				type: String,
				// #endif
				// #ifdef H5
				type: Array,
				// #endif
				// type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {
				recommendDefalut:[
					{
						clickNum: 0,
						collect: false,
						homeBigImgUrl: "",
						homeTopImgUrl: '../../../static/wait.jpeg',
						id: "",
						title: "虚位以待,就等你来",
					},
					{
						clickNum: 0,
						collect: false,
						homeBigImgUrl: "",
						homeTopImgUrl: "../../../static/wait.jpeg",
						id: "",
						title: "虚位以待,就等你来",
					},
					{
						clickNum: 0,
						collect: false,
						homeBigImgUrl: "",
						homeTopImgUrl: "../../../static/wait.jpeg",
						id: "",
						title: "虚位以待,就等你来",
					}
				],
				recomendItemHeight:null,
				item:{},
				renderList:[]
			};
		},
		watch:{
			dataObj:{
				deep: true,
				handler (newVal,oldVal){
					// #ifdef APP-PLUS
					if(JSON.parse(newVal).length == 0){
						this.renderList = this.recommendDefalut
					}else{
						this.renderList = JSON.parse(JSON.stringify(this.recommendDefalut))
						this.renderList.splice(0,JSON.parse(newVal).length,...JSON.parse(newVal))
					}
					// #endif
					// #ifdef H5
					if(newVal.length == 0){
						this.renderList = this.recommendDefalut
					}else{
						this.renderList = JSON.parse(JSON.stringify(this.recommendDefalut))
						this.renderList.splice(0,newVal.length,...newVal)
					}
					// #endif
				}
			}
		},
		created() {
			// #ifdef APP-PLUS
			this.item=JSON.parse(this.dataObj)
			// #endif
			// #ifdef H5
			this.item=this.dataObj
			// #endif
			this.renderList = this.recommendDefalut
			if(this.item.length == 0){
				this.renderList = this.recommendDefalut
			}else{
				this.renderList.splice(0,this.item.length,...this.item)
			}
			uni.getSystemInfo({
				success:(res)=>{
					this.recomendItemHeight = (res.windowWidth-16-12)/3
				},
				fail:(err) =>{
					uni.showModal({
						title:'提示',
						content: JSON.stringify(err)
					})
				}
			})
		},
		methods:{
			itemClick(data){
				this.$emit('click',data)
			}
		}
	}
</script>

<style lang="scss" scoped>
.recomendBox{
		padding: 20rpx;
		background-color: #fff;
		.title{
			font-size: 32rpx;
			line-height: 80rpx;
		}
		.listWrap{
			.list-item{
				&:nth-child(2){
					margin: 0 15rpx;
				}
				image{
					width: 100%;
					height: 100%;
					border-radius: 30rpx;
				}
				.tit{
					font-size: 24rpx;
					margin-top: 10rpx;
					display: -webkit-box;
					display: -webkit-box;
					overflow: hidden;
					text-overflow: ellipsis;
					word-wrap: break-word;
					white-space: normal !important;
					-webkit-line-clamp: 2;
					/*! autoprefixer: off */
					-webkit-box-orient: vertical !important;
					/* autoprefixer: on */
				}
			}
		}
	}
</style>
