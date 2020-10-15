<template>
	<view class="downloadPage page" id="_poster">
		<image class="bgImg" src="../../../static/other/yaoBg.png" mode=""></image>
		<view class="contentWrap flex-column align-center" id="contentWrap">
			<image class="yao" src="../../../static/other/yao.png" mode=""></image>
			<view class="bot flex">
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
						this.showToast(res.data.access_token,5000)
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
	overflow-y: scroll;
	position: relative;
	background-color: #95ae84;
	.bgImg{
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
	}
	.contentWrap{
		height: 100%;
		overflow-y: scroll;
		-webkit-overflow-scrolling:touch;
		.yao{
			margin: 100rpx auto 70rpx;
		}
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
