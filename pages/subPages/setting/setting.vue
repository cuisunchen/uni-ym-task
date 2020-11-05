<template>
	<view class="settingPage page">
		<view class="cellsWrap">
			<cell icon-path="../../../static/gw.png" title="当前版本" :desc="version" :is-icon-show="false"></cell>
			<cell v-for="(item,index) in lists" :key="index" :icon-path="item.iconUrl"  :desc-color="item.color"
					:title="item.title" :desc="item.desc" :is-icon-show="item.isIconShow" @click="itemClick(item)"></cell>
		</view>
		
		<view class="btn">
			<button type="default" class="logout" @click="logout">退出登录</button>
		</view>
	</view>
</template>
<script>
	import cell from '@/components/cell/cell.vue'
	import { mapGetters } from 'vuex'
	export default {
		comments:{cell},
		data() {
			return {
				version:"",
				lists:[
					// {
					// 	 iconUrl: '../../../static/gw.png',
					// 	 title: '官网',
					// 	 color: '',
					// 	 isIconShow: false,
					// 	 copyText:'',
					// 	 desc: '- http://www.guangyi009.com'
					// },
					{
						 iconUrl: '../../../static/xcx.png',
						 title: '小程序',
						 color: 'red',
						 isIconShow: false,
						 copyText:'',
						 desc: '- 小程序搜索米圈日记'
					},{
						 iconUrl: '../../../static/gw1.png',
						 title: '官方微信',
						 color: '',
						 isIconShow: false,
						 copyText:'',
						 desc: '- youmi'
					},{
						 iconUrl: '../../../static/xq.png',
						 title: '设置兴趣',
						 color: '',
						 isIconShow: true,
						 desc: '- 根据兴趣推送广告'
					}
			  ]
			}
		},
		computed: {
			...mapGetters([
				'checked_hobbys_id',
				'checked_hobbys_name'
			]),
		},
		onLoad() {
			// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, widgetInfo => {
				this.version = widgetInfo.version;
			});
			// #endif
			this.getInfo()
		},
		methods: {
			itemClick(e){
				if(e.title == '设置兴趣'){
					uni.navigateTo({
						url:'../interest/interest'
					})
					return
				}
				uni.setClipboardData({
					data: e.copyText,
					success: () =>{
						this.showToast('复制成功')
					}
				});
			},
			getInfo(){
				 this.$request('/api/view/appInfo','get',{}).then(res=>{
						if(res.code == 200){
							 this.lists[0].desc = '- 微信小程序搜索"' + res.data.xiaoChengXu + '"'
							 this.lists[0].copyText = res.data.xiaoChengXu
							 this.lists[1].desc = '- ' + res.data.guanWechat
							 this.lists[1].copyText = res.data.guanWechat
							 this.lists[2].desc = '- 根据兴趣推送广告'
							 this.lists[2].copyText = res.data.guanWechat
						}
				 })
			},
			logout(){
				this.$request('/api/loginOut','',{}).then(res=>{
					if(res.code == 200){
						uni.removeStorageSync('token');
						uni.removeStorageSync('userInfo');
						uni.reLaunch({
							url: '../login/login'
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.settingPage{
	padding: 30rpx;
	.cellsWrap{
		border-radius: 10rpx;
		background-color: #fff;
	}
	.btn{
		margin-top: 80rpx;
		button{
			color: #fff;
			height: 80rpx;
			font-size: 32rpx;
			background-color: rgb(206,177,120);
		}
	}
}
</style>
