<template>
	<view class="homePage page flex-column" :class="{disabled: is_update_app}">
		<view class="recommendBox">
			<recommend-list :data-obj="recommendList" @click="goDetail"></recommend-list>
		</view>
		
		<view class="qsList flex1">
			<view class="title flex align-center">
				<text class="tit">问答接单</text>
				<text style="font-size:12px; color: #666;margin-left: 10px">- 简单选择即可</text>
			</view>
			<scroll-view class="listWrap" scroll-y>
				<home-list-item v-for="(item,index) in questions" :key="item.id" :data-obj="item" @click="qsDetail(item,index)"></home-list-item>
				<uni-load-more v-if="pullupLoadingType == 'loading'" :status="pullupLoadingType"></uni-load-more>
			</scroll-view>
			<div class="nodata flex-column align-center" v-if="questions.length == 0">
				<image class="img" src="../../../static/noData.png" mode="scaleToFill"></image>
				<view class="desc">暂无数据</view>
			</div>
		</view>
		<!-- #ifdef APP-PLUS -->
		<mUpdateAppTip @updateClose="updateClose" :update_title="update_title" :is_forced_update="is_forced_update" :update_des="update_des" :update_type="update_type" :update_url="update_url" :is_update_app="is_update_app"></mUpdateAppTip>
		<!-- #endif -->
		
		<view class="dialoagAD" v-if="isAlertImgShow">
			<view class="wrap flex-column all-center">
				<image :src="dialogObj.titleImg" mode="aspectFit" @click="goDetail(dialogObj)"></image>
				<uni-icons class="closeBtn" type="close" color="#fff" size="32" @click="closeAlertImg"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	import specialBanner from "@/components/EtherealWheat-banner/specialBanner.vue"
	import homeListItem from "@/components/home-list-item/home-list-item.vue"
	import recommendList from "@/components/recommend-list/recommend-list.vue"
	import ygcRefresh from '@/components/ygc-refresh/ygc-refresh.vue';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import uniIcons from "@/components/uni-icons/uni-icons.vue" 
	import mUpdateAppTip from '@/components/maozai-update/updateAppTip.vue'
	export default {
		components: {specialBanner,homeListItem,recommendList,ygcRefresh,uniLoadMore,uniIcons,mUpdateAppTip},
		data() {
			return {
				recomendItemHeight: '',
				swiperIndex:0,
				bannerList: [],
				swiperConfig: {
					indicatorDots: false,
					indicatorColor: 'rgba(255, 255, 255, .4)',
					indicatorActiveColor: 'rgba(255, 255, 255, 1)',
					autoplay: true,
					interval: 4000,
					duration: 300,
					circular: true,
					previousMargin: '58rpx',
					nextMargin: '58rpx'
				},
				recommendList:[],
				questions:[],
				pullupLoadingType:'more',
				param:{
					"cityCode": "",
					"pageSize": 10,
					"pagesNum": 1
				},
				isAlertImgShow: false,
				dialogObj: {},
				
				version: '',
				update_type:1,//0是热更新，1整包更新
				update_url:'',//更新的地址
				update_title:'发现新的版本，请点击升级',
				update_des:[],
				is_update_app:false,
				is_forced_update:false,//是否强制升级
			}
		},
		onShow() {
			 // #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, widgetInfo => {
				this.version = widgetInfo.version;
				this.getCheckVersion()
			});
			// #endif
			uni.$on('send', e =>{
				this.$set(this.questions,e.index,e.data)
			})
		},
		onUnload() {
			 uni.$off('send'); 
		},
		onLoad(){
			let userInfo = uni.getStorageSync('userInfo')
			if(!userInfo){return}
			uni.showLoading({
				title:'加载中'
			})
			this.param.cityCode = uni.getStorageSync('location')? JSON.parse(uni.getStorageSync('location')).adcode : '440306'
			this.getDatas()
			this.getRecommendData()  
		},
		onPullDownRefresh() {
			
			this.refresh()
		},
		onReachBottom(){  //上拉触底函数
			this.infiniteScroll()
		},
		methods: {
			getCheckVersion(){
				let param = {
					"clientName": "android",
					"version": this.version
				}
				this.$request('/api/checkVersion','post',param).then(res => {
					// 这里需要返回app下载链接
					if(res.code == 200){
						let downloadTxt = '';
						this.update_des = []   
						if(this.version == res.data.version ){return}
						if(this.version != res.data.version && res.data.forceUpdate == 'false'){
							this.update_type = 0
							downloadTxt = `版本号${res.data.version}精彩不容错过, 请及时更新!`
							this.update_des.push(downloadTxt)
						}else
						if(this.version != res.data.version && res.data.forceUpdate == 'true'){
							this.update_type = 0
							this.is_forced_update = true
							downloadTxt = `版本号${res.data.version}最新版本才能正常使用, 请及时更新!`
							this.update_des.push(downloadTxt)
							uni.hideTabBar()
							this.update_url = res.data.downloadLink
							this.updateApp()
							return
						}else{
							this.getAlertData()
							return
						}
						// this.updateApp()
						//  缓存非强制更新下载弹框弹出时的时间   保证2个小时弹出一次
						let storageDate = uni.getStorageSync('updateDate')
						let nowDate = new Date().getTime()
						let spaceTime = Math.floor((nowDate-storageDate)/1000/60/60)
						if(storageDate){
							if(spaceTime > 2 || spaceTime == 2){ // 每次弹出后更新缓存时间,清除缓存中弹框状态
								this.update_url = res.data.downloadLink
								this.updateApp()
								wx.setStorage({
									key: 'updateDate',
									data: nowDate
								})
							}
						}else{
							this.update_url = res.data.downloadLink
							this.updateApp()
							wx.setStorage({
								key: 'updateDate',
								data: nowDate
							})
						}
					}else{
						this.showToast(res.msg)
					}
				})
			},
			//app取消更新
			updateClose(e) {
				if(e){
					this.showToast(e)
					return
				}
				this.is_update_app = false;
				//  一下是更新弹框出现时禁止下拉刷新
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];  
				const currentWebview = page.$getAppWebview();
				currentWebview.setStyle({  
				  pullToRefresh: {  
				    support: !this.is_update_app,  
				    style: plus.os.name === 'Android' ? 'circle' : 'default'  
				  }  
				}); 
				uni.showTabBar()
			},
			updateApp() {
				// #ifdef APP-PLUS  
				plus.runtime.getProperty(plus.runtime.appid, widgetInfo => {
						//传当前的版本号和appid与后台校验是否返回新的信息
						// {
						//  version: widgetInfo.version,  //  应用版本号
						//  appid: plus.runtime.appid
						// }

						//我这里直接模拟后台传回来的值
						// this.update_type = 0//0是热更新，1整包更新
						// this.update_url = 'http://www.guangyi009.com/apk/app-release.apk'//更新的地址
						this.is_update_app = true,///是否强制更新，不能关闭
						this.update_title = '发现新的版本，请点击升级'
						
						//  一下是更新弹框出现时禁止下拉刷新
						const pages = getCurrentPages();
						const page = pages[pages.length - 1];  
						const currentWebview = page.$getAppWebview();
						currentWebview.setStyle({  
						  pullToRefresh: {  
						    support: !this.is_update_app,  
						    style: plus.os.name === 'Android' ? 'circle' : 'default'  
						  }  
						});  
						// this.update_des = []
				});
				// #endif
			},
			closeAlertImg(){
				this.isAlertImgShow = false
			},
			userClick(item,index){
				let param = {homeAdId : item.id}
				this.$request('/api/userClick','post',param).then(res => {
					if(res.code != 200){
						this.showToast(res.msg || res.data)
						return
					}
					item.clickNum ++
					this.$set(this.questions,index,item)
				})
			},
			getDatas(type){
				this.$request('/api/view/homeAdList','post',this.param).then(res => {
					uni.hideLoading()
					uni.stopPullDownRefresh();
					if(res.code == 200){
						if(type == 'loadmore'){
							this.questions.push(...res.data.homeAdList)
						}else{
							this.questions = res.data.homeAdList
						}
						if(res.data.sumPage == this.param.pagesNum || res.data.sumPage < this.param.pagesNum){
							this.pullupLoadingType = 'noMore'
						}else{
							this.pullupLoadingType = 'more'
						}
					}else{
						this.showToast(res.msg)
					}
				},err =>{
					console.log(err)
				})
			},
			getAlertData(){ 
				let param = {
					"homeType": 3
				}
				this.$request('/api/view/getAlertOrCover','post',param).then(res => {
					if(res.code == 200){
						if(this.is_update_app){return}
						if(Object.keys(res.data).length>0){
							let storageDate = uni.getStorageSync('date')
							let nowDate = new Date().getTime()
							let spaceTime = Math.floor((nowDate-storageDate)/1000/60/60)
							if(storageDate){
								if(spaceTime > 1 || spaceTime == 1){ // 每次弹出后更新缓存时间,清除缓存中弹框状态
									this.isAlertImgShow = true;
									wx.setStorage({
										key: 'date',
										data: nowDate
									})
								}
							}else{
								this.isAlertImgShow = true;
								wx.setStorage({
									key: 'date',
									data: nowDate
								})
							}
							this.dialogObj = res.data
						}
					}else{
						this.showToast(res.msg)
					}
				})
			},
			getRecommendData(){
				this.$request('/api/view/homeAdImg','get',{}).then(res => {
					if(res.code == 200){
						this.bannerList = res.data.carousel.map(item=>{
							item.picture = item.imgUrl
							item.bigImg = item.jumpUrl
							return item
						})
						this.recommendList = res.data.todayRecommend
					}else{
						this.showToast(res.msg)
					}
				})
			},
			qsDetail(data,index){
				var strRegex = "((http[s]{0,1}|ftp)://[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)|(www.[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)";
				let re=new RegExp(strRegex);
				if (!re.test(data.bigImg)) {
					this.showToast('详情页地址有误,请联系客服')
					return
				}
				this.userClick(data,index)
				uni.navigateTo({
					url: '../../subPages/details/details?param='+ encodeURIComponent(JSON.stringify(data)) + '&type=question&index='+index
				})
			},
			goDetail(data){
				if(!data.homeBigImgUrl && !data.bigImg && !data.contentImg){return}
				uni.showLoading({
					title: '将前往详情页面',
					duration: 2000,
					mask: true
				})
				data.bigImg = data.homeBigImgUrl || data.jumpUrl || data.contentImg
				var strRegex = "((http[s]{0,1}|ftp)://[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)|(www.[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)";
				let re=new RegExp(strRegex);
				if (!re.test(data.bigImg)) {
					this.showToast('详情页地址有误,请联系客服')
					return
				}
				uni.navigateTo({
					url: "../../subPages/details/details?param=" + encodeURIComponent(JSON.stringify(data))
				})
			},
			refresh() {
				if(this.is_update_app){
					// uni.stopPullDownRefresh();
					return
				}
				this.questions=[]
				this.param.pageSize = 10
				this.param.pagesNum = 1
				uni.showLoading({
					title:'加载中'
				})
				this.pullupLoadingType == 'more'
				this.getDatas('refresh')
			},
			infiniteScroll() {
				if(this.questions.length == 0){return}
				if(this.param.pagesNum < 5 && this.pullupLoadingType == 'noMore'){
					uni.showModal({
						title:'提示',
						content:'等级不足,邀请好友提升等级,可展示更多广告,获取更多收益!',
						confirmText:'去分享',
						success: (res)=> {
							if (res.confirm) {
									uni.navigateTo({
										url:'../../subPages/download/download'
									})
							}
						}
					})
					return
				}
				if(this.pullupLoadingType == 'noMore'){return}
				
				this.param.pagesNum ++
				this.pullupLoadingType = 'loading'
				uni.showLoading({
					title:'加载中'
				})
				this.getDatas('loadmore')
			},
		},
	}
</script>

<style>
	page{
		height: 100%;
		background-color: #eee;
	}
</style>
<style lang="scss" scoped>
.homePage{
	height: 100%;
	&.disabled{
		overflow: hidden;
	}
	.lists{
		/deep/ .uni-scroll-view-content{
			height: calc(100% + 100rpx);
			.refresh-moudle{
				height: 100%;
				display: flex;
				flex-direction: column;
			}
		}
	}
	.recommendBox{
		background-color: #fff;
	}
	.qsList{
		margin-top: 20rpx;
		padding: 0 20rpx;
		background-color: #fff;
		.listWrap{
			.listItem{
				&:last-child{
					border-bottom: none;
				}
			}
		}
		.title{
			line-height: 80rpx;
			position: sticky;
			top: 0;
			z-index: 9;
			background-color: #fff;
			.tit{
				font-size: 32rpx;
			}
		}
		.nodata{
			 margin-top: 100rpx;
			 background-color: #fff;
			 .img{
					width: 150rpx;
					height: 150rpx;
			 }
			 .desc{
					color: #999;
			 }
		}
	}
	.dialoagAD{
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 10;
		background-color: rgba(0,0,0, .5);
		.wrap{
			position: relative; 
			left: 50%; 
			top: 50%; 
			width: 90%; 
			height: auto; 
			transform:translate(-50%,-50%);
			image{
				width: 600rpx;
				height: 600rpx;
				border-radius: 10rpx;
			}
			.closeBtn{
				margin-top: 40rpx;
			}
		}
	}
}
</style>
