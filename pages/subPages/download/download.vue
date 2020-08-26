<template>
	<view class="downloadPage page" id="_poster">
		<view class="topTit flex all-center">您的好友邀请您加入 - 今日友米</view>
		<view class="contentWrap" id="contentWrap">
			<view class="userInfo flex">
				<image class="img" src="../../../static/place/fang@2x.png" mode=""></image>
				<view class="wrap">
					<view class="phone">{{userInfo.nickName.slice(0,3) + '****' + userInfo.nickName.slice(-4)}}</view>
					<view class="text flex all-center">向你推荐</view>
				</view>
			</view>
			
			<image class="shareImg" src="../../../static/other/shareImg.png" mode="widthFix"></image>
			<view class="bot flex">
				<view class="leftCon flex1">
					<view class="title">今日友米</view>
					<view class="desc">让你足不出户,轻松有财</view>
					<view class="injoin">微信小程序搜索"米圈日记"</view>
					<view class="injoin">或扫描右方二维码即可加入</view>
				</view>
				<view class="code flex all-center">
					<image :src="qrcode" mode="aspectFill"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//  二维码组件配置
				statusBarHeight: 0,
				base64:null,
				val:'',
				size:240,
				background:'#ffffff',
				foreground:'#000000',
				pdground: '#000000',
				icon:'../../../static/appLogo.png',
				iconsize: 25,
				lv: 3,
				onval: true,
				loadMake: true,
				
				testNum : 1,
				userInfo: {},
				qrcode:'',
				codeShow: false,
			}
		},
		onLoad() { 
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			this.val = 'https://www.guangyi009.com/mp/mp?agentCode=' + this.userInfo.agentCode;
			let systemInfo = uni.getSystemInfo({
				success:(data) =>{
					this.statusBarHeight = data.statusBarHeight + 45
				}
			})
			this.getpic()
		},
		onNavigationBarButtonTap() {
			this.toImage();
		},
		methods: {
			getpic(){
				uni.request({
					url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential',
					 data: {
						 appid: 'wx65ce2486390a10b3', // 小程序appid
						 secret: '72a0c2867712bcae6089e3cf46482fa9' // 小程序秘钥
					 },
					 success:(res)=> {
						uni.request({
							 url: 'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=' + res.data.access_token,
							 method: 'POST',
							 responseType:"arraybuffer",
							 data: {
								 'path': "/pages/index/main?agentCode=" + this.userInfo.agentCode,
								 "width": 430
							 },
							 success:(res)=> {
								 if (res.statusCode == 200) {
									 const arrayBuffer = new Uint8Array(res.data)
									 let data = uni.arrayBufferToBase64(arrayBuffer);
									 this.qrcode = 'data:image/jpeg;base64,' + data
								 } 
							 }
						 })
					 }
				})
			},
			toImage() {
					/* 获取屏幕信息 */
					let ws = this.$mp.page.$getAppWebview();
					let bitmap = new plus.nativeObj.Bitmap('downloadPage');
						// 将webview内容绘制到Bitmap对象中
						ws.draw( bitmap,
							(e)=> {
								/* 获取base64 */
								// this.test= bitmap.toBase64Data();
								/* 加载base64编码 */
								bitmap.loadBase64Data(bitmap.toBase64Data(),
									() => {
										let timeStamp = new Date().getTime()
										/* 保存图片 */
										bitmap.save('_doc/share' + timeStamp + '.jpg',{},
											async (i)=>{
												uni.saveImageToPhotosAlbum({
													filePath: i.target,
													success: ()=> {
														/* 清除 */
														bitmap.clear();
														this.showToast('下载成功,请到相册中查看')
													},
													fail(e) {
														this.showToast('下载失败,请联系系统管理员')
													}
												});
											},
											(e) => {
												this.showToast('下载失败,请联系系统管理员' + JSON.stringify(e))
												console.log('保存图片失败：' + JSON.stringify(e));
											}
										);
									},
									() => {
										console.log('加载Base64图片数据失败：' + JSON.stringify(e));
									}
								);
							},
							(e) => {
								console.log('截屏绘制图片失败：' + JSON.stringify(e));
							},
							{
								check: true, // 设置为检测白屏
								clip: { top: this.statusBarHeight +'px', left: '0px', height:'100%', width: '100%' } // 设置截屏区域
							},
						)
			}
		}
	}
</script>

<style lang="scss" scoped>
.downloadPage{
	height: 100%;
	padding-top: 40rpx;
	overflow-y: scroll;
	position: relative;
	background-color: #95ae84;
	.topTit{
		height: 80rpx;
		margin: 0 30rpx;
		font-size: 28rpx;
		color: #333;
		border-radius: 8rpx;
		background-color: #FFFFFF;
	}
	.contentWrap{
		height: 100%;
		overflow-y: scroll;
		-webkit-overflow-scrolling:touch
	}
	.test{
		color: red;
	}
	.userInfo{
		padding: 50rpx 30rpx 0 30rpx;
		.img{
			width: 120rpx;
			height: 120rpx;
			border-radius: 10rpx;
			margin-right: 20rpx;
		}
		.wrap{
			.phone{
				color: #fff;
				font-size: 32rpx;
				font-weight: bold;
				margin: 10rpx;
			}
			.text{
				width: 140rpx;
				height: 40rpx;
				color: #FFFFFF;
				font-size: 26rpx;
				background-color: orange;
				border-radius: 6rpx;
			}
		}
	}
	.shareImg{
		width: 100%;
		margin: 20rpx 0;
	}
	.bot{
		margin: 0 16rpx;
		padding: 30rpx ;
		border-radius: 10rpx;
		background-color: #fff;
		.leftCon{
			>view{
				text-align: center;
			}
			.title{
				font-size: 38rpx;
				line-height: 70rpx;
			}
			.desc{
				color: #666;
				margin-bottom: 20rpx;
			}
			.injoin{
				color: red;
				line-height: 60rpx;
			}
		}
		.code{
			width: 250rpx;
			height: 250rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>
