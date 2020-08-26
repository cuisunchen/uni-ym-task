<template>
	<view class="rebatePage page">
	      <view class="userInfo">
	         <view class="layout"></view>
	         <image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581324711206&di=f05b3780acdebb599875a7f494333155&imgtype=0&src=http%3A%2F%2Ffinance.gog.cn%2Fpic%2F003%2F034%2F112%2F00303411233_42c474b3.jpg" alt="" srcset=""></image>
	      </view>
	      <view class="content">
	         <view class="infos">
	            <view class="text">当前等级</view>
	            <view class="num flex align-center">LV{{mineInfo.level}} 
	               <text class="nickName" v-if="mineInfo.level == 1">青铜</text>
	               <text class="nickName" v-if="mineInfo.level == 2">白银</text>
	               <text class="nickName" v-if="mineInfo.level == 3">黄金</text>
	               <text class="nickName" v-if="mineInfo.level == 4">钻石</text>
	               <text class="nickName" v-if="mineInfo.level == 5">王者</text>
	            </view>
	            <view class="todayRank">当前好友人数: {{mineInfo.friend}}人</view>
	         </view>
	         <view class="levels">
	            <view class="levelTitle flex flex-between">
	               <view class="label">用户等级</view>
	               <view class="label">好友人数</view>
	               <view class="label">返利比</view>
	            </view>
	            <view class="lists">
	               <view class="item flex flex-between" v-for="(item,index) in levels" :key="index">
	                  <view class="level label">{{item.level}}</view>
	                  <view class="num label">{{item.num}}</view>
	                  <view class="rate label">{{item.rate}}</view>
	               </view>
	            </view>
	         </view>
	
	         <view class="levelPromote">
	            <view class="title">等级提高策略</view>
	            <view class="promote flex" v-for="(item, index) in promote" :key="index">
	               <view class="index flex all-center">{{index+1}}</view>
	               <view class="con">
	                  <view class="title">{{item.title}}</view>
	                  <view class="desc">{{item.desc}}</view>
	               </view>
	            </view>
	         </view>
	         <view class="recommend">
	            <view class="title">推荐分享</view>
	            <view class="tags">
	               <text class="tag" v-for="(item,index) in tags" :key="index" :style="{backgroundColor:item.color}">
	                  {{item.text}}
	               </text>
	            </view>
	         </view>
	         <view class="explain">
	            <view class="title">使用说明</view>
	            <view class="text">
	               通过您的分享,成为平台的新用户,新用户由始至终只会是您有一个人的好友,即使该用户通过其他渠道下载
	               使用此应用.好友为终身制好友,一旦成为您的好友,以后不能更改! 越早分享,可获得更多好友,好友越多,
	               等级越高,越多人给您挣钱,返利比例越大,您甚至不用做任何事,每天都有一定收益,还等什么,快去分享吧!
	            </view>
	         </view>
	         <button open-type="share" class='share' @click="goShare">一键分享</button>
	      </view>
	   </view>
</template>

<script>
	export default {
		data() {
			return {
			         levels:[
			            {level: 'LV1',num: '0-2人',rate: '25%'},
			            {level: 'LV2',num: '3-10人',rate: '30%'},
			            {level: 'LV3',num: '11-30人',rate: '35%'},
			            {level: 'LV4',num: '31-60人',rate: '40%'},
			            {level: 'LV5',num: '60人以上',rate: '50%'},
			         ],
			         promote:[
			            {title:'分享给好友',desc:'好友每天挣钱的同时,给您带来收益返利'},
			            {title:'分享给陌生人',desc:'陌生人也能每天给您返利'}
			         ],
			         tags:[
			            {text:'微信小程序-最便捷',color:'blue'},
			            {text:'微信好友',color:'#89e864'},
			            {text:'家人群',color:'#999'},
			            {text:'兴趣群',color:'#666'},
			            {text:'朋友群',color:'#e86464'},
			            {text:'面对面分享',color:'#d45f65'},
			            {text:'微博分享二维码',color:'gray'},
			         ],
			         mineInfo:{},
			      }
		},
		onLoad() {
			this.getFriendList()
		},
		methods: {
			getFriendList(){
				this.$request('/api/view/friendList','get',{}).then(res => {
					if(res.code == 200){
						this.mineInfo = res.data.userInfo
					}
				})
			},
			goShare(){
				uni.navigateTo({
					url:'../download/download'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.rebatePage{
   height: 100%;
   background-color: rgb(250, 246, 242);
	 position: relative;
   .userInfo{
      position: relative;
      height: 400rpx;
      .layout{
         position: absolute;
         left: 0;
         right: 0;
         top: 0;
         width: 100%;
         height: 100%;
         background-color: rgba(0,0,0,.3);
      }
      image{
         width: 100%;
         height: 100%;
         z-index: 0;
      }
   }
   .content{
      position: absolute;
			top: 0;
      z-index: 9;
      padding: 0 40rpx;
      .infos{
         height: 240rpx;
         overflow: hidden;
         color: #fff;
         z-index: 1;
         position: relative;
         .text{
            font-size: 32rpx;
            margin-top: 50rpx;
         }
         .num{
            font-weight: 700;
            font-size: 42rpx;
            margin-top: 30rpx;
            padding-left: 60rpx;
            .nickName{
               height: 32rpx;
               line-height: 32rpx;
               font-size: 24rpx;
               padding: 0 6rpx;
               border-radius: 4rpx;
               margin-left: 20rpx;
               background-color: turquoise;
            }
         }
         .todayRank{
            position: absolute;
            bottom: 0;
            right: 40rpx;
            display: inline-block;
            font-size: 28rpx;
            padding: 0 12rpx;
            border-radius: 8rpx;
            background-color: rgba(0,0,0, .5)
         }
      }
      .levels{
         margin-top: 60rpx;
         padding: 0 20rpx 20rpx 20rpx;
         border-radius: 10rpx;
         background-color: #fff;
         .levelTitle, .lists .item{
            .label{
               width: 160rpx;
               font-size: 32rpx;
               line-height: 80rpx;
               text-align: center;
            }
         }
         .lists{
            .item{
               height: 80rpx;
               background-color: #f3f3f3;
               border-bottom: 1rpx solid #fff;
               .level{
                  color: rgb(146,126,226);
               }
               .num{
                  color: rgb(62,189,175);
               }
               .rate{
                  color: rgb(82,167,2);
               }
               &:last-child{
                  border-bottom: none;
                  .level{
                     font-weight: bold;
                     color: red;
                  }
                  .num{
                     font-weight: bold;
                     color:red
                  }
                  .rate{
                     font-weight: bold;
                     color: rgb(82,167,2);
                  }
               }
            }
         }
      }
      .levelPromote{
         margin-top: 60rpx;
         padding: 0 20rpx 20rpx 20rpx;
         border-radius: 10rpx;
         background-color: #fff;
         >.title{
            color: rgb(98, 159, 240);
            font-size: 32rpx;
            line-height: 80rpx;
         }
         .promote{
            margin-bottom: 20rpx;
            padding: 20rpx;
            background-color: #f3f3f3;
            &:last-child{
               margin-bottom: 0;
            }
            .index{
               width: 80rpx;
               height: 80rpx;
               color: #fff;
               font-size: 44rpx;
               background-color: #D4BA88;
               border-radius: 8rpx;
            }
            .con{
               margin-left: 20rpx;
               .title{
                  color: #666;
                  font-size: 28rpx;
               }
               .desc{
                  color: #999;
                  font-size: 24rpx;
               }
            }
         }
      }
      .recommend{
         margin-top: 60rpx;
         padding: 0 20rpx 20rpx 20rpx;
         border-radius: 10rpx;
         background-color: #fff;
         >.title{
            color: rgb(98, 159, 240);
            font-size: 32rpx;
            line-height: 80rpx;
         }
         .tag{
            display: inline-block;
            color: #fff;
            margin-right: 20rpx;
            margin-bottom: 20rpx;
            padding: 0 4rpx;
            border-radius: 5rpx;
         }
      }
      .explain{
         margin-top: 60rpx;
         padding: 0 20rpx 20rpx 20rpx;
         border-radius: 10rpx;
         background-color: #fff;
         >.title{
            color: rgb(98, 159, 240);
            font-size: 32rpx;
            line-height: 80rpx;
         }
         .text{
            color: #999;
            font-size: 28rpx;
            line-height: 40rpx;
            padding: 30rpx 10rpx;
            background-color: #f3f3f3;
         }
      }
      .share{
         color: #fff;
         font-size: 32rpx;
         height: 80rpx;
         margin: 30rpx 0 50rpx;
         background-color: #D4BA88;
      }
   }
}
</style>
