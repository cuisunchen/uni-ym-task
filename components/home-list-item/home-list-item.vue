<template>
	<view class="listItem flex" @click="goPage">
		<view class="left flex all-center">
			<image :src="item.homeTopImgUrl" lazy-load :class="{'defaultImgClass': !item.homeTopImgUrl}" mode="aspectFill"></image>
		</view>
		<view class="right flex1">
			<view class="tit">{{item.title}}</view>
			<view class="texts">
				<!-- <uni-tag text="标签" size="small"></uni-tag> -->
				<text class="unread" v-if="item.tags">{{item.tags}}</text>
				<text class="sameCity">{{item.rangeType}}</text>
				<text class="hobby">兴趣</text>
				<text class="available" v-if="item.userGet">{{item.userGet}}</text>
				<text class="unFinish">{{item.status}}</text>
			</view>
			<view class="stytus flex flex-end">
				<text>点击量: </text> <text class="time flex align-center">{{item.clickNum}}</text>
				<text>收入(元): </text> 
				<text class="money">{{item.price}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		props: {
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
			}
		},
		watch:{
			dataObj(val){
				// #ifdef APP-PLUS
				this.item=JSON.parse(val)
				// #endif
				// #ifdef H5
				this.item=val
				// #endif
			},
		},
		data() {
			return {
				item:{}
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
			goPage(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss" scoped>
.listItem{
	padding: 26rpx 0;
	border-bottom: 1rpx solid #e3e3e3;
	.left{
		width: 160rpx;
		height: 160rpx;
		color: #fff;
		font-size: 34rpx;
		border-radius: 12rpx;
		overflow: hidden;
		image{
			width: 100%;
			height: 100%;
			&.defaultImgClass{
				width: 30%;
				height: 30%;
				background: url(../../static/loadding.gif) no-repeat;
				background-size: cover;
			}
		}
	}
	.right{
	  height: 160rpx;
	  padding-left: 30rpx;
	  .tit{
	    height: 76rpx;
	    font-size: 26rpx;
	    color: #333;
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
	  .texts{
	    margin: 6rpx 0 10rpx;
	    text{
	      display: inline-flex;
	      font-size: 20rpx;
	      color: #fff;
	      margin-right: 16rpx;
	      padding: 4rpx 10rpx;
	      border-radius: 6rpx;
	      &:last-child{
	        margin-right: 0
	      }
	    }
	    .unread{
	      background-color: #AAAAAA;
	    }
	    .nearby{
	      background-color: #E7932E;
	    }
	    .sameCity{
	      background-color: #4CAFA3;
	    }
	    .country{
	      background-color: #FF3B30;
	    }
	    .hobby{
	      background-color: #358CBD;
	    }
	    .available{
	      background-color: #699E11;
	    }
	    .unFinish{
	      background-color: #D4BA88;
	    }
	  }
	  .stytus{
	    align-items: flex-end;
	    .time{
	      margin:0 30rpx 0 6rpx;
	      color: red;
	    }
	    .money{
	      font-size: 38rpx;
	      line-height: 36rpx;
	      margin-left: 6rpx;
	      color: rgb(10, 173, 10);
	    }
	  }
	}
}
</style>
