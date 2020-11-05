<template>
	 <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
		<view class="page-swiper">
			<special-banner :banner-list="bannerList" :swiper-config="swiperConfig" 
				:hasDesc="false" :scaleX="bannerList.length > 2 ? '1.1591': '1.2436'"
				@click="goDetail" />
		</view>
		<bar class="bar" @click="barClick"></bar>
		<view class="listsWrap">
			<view class="listTit flex">
				<text class="tit">任务分类</text>
				<text class="level">LV1</text>
				<text class="desc"> - 提交任务即可</text>
			</view>
			<view class="listBox" v-for="item in 10" @click="goTaskDetail(item.taskId)">
				<taskCard class="taskCard" :dataObj="item"></taskCard>
			</view>
		</view>
	</mescroll-body>
</template>

<script>
	import specialBanner from "@/components/EtherealWheat-banner/specialBanner.vue"
	import urlConfig from '@/common/utils/config.js'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import mySwiper from './mySwiper.vue'
	import bar from './bar.nvue'
	import { mapMutations } from 'vuex'
	import { getRsaCode } from '@/common/utils/rsa.js'
	import taskCard from '@/components/task-card/task-card.vue'
	
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components:{bar,mySwiper,specialBanner,taskCard},
		data() {
			return {
				bannerList:[],
				isGoodsEdit: false  ,// 是否加载编辑后的数据
				param: {
					"pageNum": 1, 
					"pageSize": 10,
					"taskType": 0
				},
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
			}
		},
		onLoad(){
			this.getDatas() 
		},
		methods: {
			...mapMutations({
					setTaskId: 'SET_TASKID' 
			}),
			async getDatas(){
				let taskRes= await this.getDatasRequest(this.param);
				let crouselRes = await this.getRecommendData()
				if(crouselRes.code == 200){
					this.bannerList = crouselRes.data.carousel.map(item=>{
						item.picture = item.imgUrl
						item.bigImg = item.jumpUrl
						return item
					})
				}else{
					uni.showToast({
						title:crouselRes.msg,
						icon:'none',
						duration:3000
					})
				}
				if(taskRes.code == 200){
					this.taskLists = taskRes.data.taskAdList
				}else{
					uni.showToast({
						title:taskRes.msg,
						icon:'none',
						duration:3000
					})
				}
			},
			getRecommendData(data={}){
				return new Promise((resolve, reject) => {
					let token = uni.getStorageSync('token')
					const headers = {}
					headers['Authorization'] =  token ? 'Bearer ' + token : '',
					headers['Content-Type']= 'application/json;charset=utf-8' 
					let param = Object.keys(data).length > 0 ? getRsaCode(JSON.stringify(data)) : data
						uni.request({
							url: urlConfig + '/api/view/homeAdImg',
							method: 'get',
							data: Object.keys(data).length > 0 ? { params: param } : data,
							dataType: 'json',
							header: headers,
							success: (res) => {
								uni.hideLoading()
								if ((res.data.code && res.data.code == 200) || res.data.code == 999 
										|| res.data.code == 500|| res.data.code == 555) {
									resolve(res.data)
								} else {
									if(res.data.code == 502 || res.data.code == 501 || res.data.code == 503){
										uni.showToast({
											icon:'none',
											title: res.data.msg,
											duration: 2000,
										}); 
										setTimeout(()=>{
											uni.reLaunch({
												url: '/pages/subPages/login/login'
											});
										},2000)
										uni.removeStorageSync('token');
										uni.removeStorageSync('userInfo');
									}else{
										uni.showToast({
											icon:'none',
											title: res.data.msg,
											duration: 2000 
										});
									}
								}
							},
							fail: (err) => {
								reject('err')
							}
						});
				})
			},
			getDatasRequest(data={}){
				return new Promise((resolve, reject) => {
					let token = uni.getStorageSync('token')
					const headers = {}
					headers['Authorization'] =  token ? 'Bearer ' + token : '',
					headers['Content-Type']= 'application/json;charset=utf-8' 
					
					let param = Object.keys(data).length > 0 ? getRsaCode(JSON.stringify(data)) : data;
					// console.log(param)
						uni.request({
							url: urlConfig + '/newTask/getHomeTask',
							method: 'post',
							data: Object.keys(data).length > 0 ? { params: param } : data,
							// data: data,
							dataType: 'json',
							header: headers,
							success: (res) => {
								// console.log(res)
								uni.hideLoading()
								if ((res.data.code && res.data.code == 200) || res.data.code == 999 
										|| res.data.code == 500|| res.data.code == 555) {
									resolve(res.data)
								} else {
									if(res.data.code == 502 || res.data.code == 501 || res.data.code == 503){
										uni.showToast({
											icon:'none',
											title: res.data.msg,
											duration: 2000,
										}); 
										setTimeout(()=>{
											uni.reLaunch({
												url: '/pages/subPages/login/login'
											});
										},2000)
										uni.removeStorageSync('token');
										uni.removeStorageSync('userInfo');
									}else{
										uni.showToast({
											icon:'none',
											title: res.data.msg,
											duration: 2000 
										});
									}
								}
							},
							fail: (err) => {
									reject('err')
							}
						});
				})
			},
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
			goTaskDetail(id){
				this.setTaskId(id)
				uni.navigateTo({
					url:'../../subPages/taskDetail/taskDetail' 
				})
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				//联网加载数据
				// this.apiGoods(page.num, page.size, this.isGoodsEdit).then(curPageData=>{
				// 	//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
				// 	//mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;

				// 	//方法一(推荐): 后台接口有返回列表的总页数 totalPage
				// 	//this.mescroll.endByPage(curPageData.length, totalPage); //必传参数(当前页的数据个数, 总页数)

				// 	//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
				// 	//this.mescroll.endBySize(curPageData.length, totalSize); //必传参数(当前页的数据个数, 总数据量)

				// 	//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
				// 	//this.mescroll.endSuccess(curPageData.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)

				// 	//方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据
				// 	this.mescroll.endSuccess(curPageData.length);

				// 	//设置列表数据
				// 	if(page.num == 1) this.goods = []; //如果是第一页需手动制空列表
				// 	this.goods=this.goods.concat(curPageData); //追加新数据
				// }).catch(()=>{
				// 	//联网失败, 结束加载
				// 	this.mescroll.endErr();
				// })
			},
			barClick(data){
				uni.navigateTo({
					url:'../../subPages/totalTaskPage/totalTaskPage'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.listsWrap{
	padding: 0 20rpx;
	.listTit{
		.tit{
			color: #000;
			font-size: .28rpx;
		}
	}
	.listBox{
		background-color: #fff;
		margin-bottom: 20rpx;
	}
}

</style>
