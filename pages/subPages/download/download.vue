<template>
	<view class="downloadPage page flex-column align-center" id="_poster">
		<view class="imgBox flex all-center">
			<image class="bgImg" src="../../../static/other/shareBg.png" mode="heightFix"></image>
		</view>
		<view class="codeBox flex all-center">
			<view class="code flex all-center">
				<image :src="qrcode" @load="imgOnloag" mode="aspectFill"></image>
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
			uni.showLoading({
				title:'加载中 ...'
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
									 setTimeout(()=> {
									 	const arrayBuffer = new Uint8Array(res.data)
									 	let data = uni.arrayBufferToBase64(arrayBuffer);
									 	this.qrcode = 'data:image/jpeg;base64,' + data
									 }, 0);
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
									}
								);
							},
							() => {
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
			},
			imgOnloag(e){
				uni.hideLoading()
			}
		}
	}
</script>

<style lang="scss" scoped>
.downloadPage{
	height: 100%;
	overflow-y: scroll;
	position: relative;
	background-color: #35b72a;
	.imgBox{
		flex: 10;
		width: 100%;
		// background-color: #ff0000;
		.bgImg{
			height: 100%;
		}
	}
	.codeBox{
		flex: 5;
		background-color: #35b72a;
		.code{
			width: 250rpx;
			height: 284.5rpx;
			// margin-bottom: 200rpx;
			border-radius: 10rpx;
			// background-color: #FF0000;
			image{
				width: 250rpx;
				height: 284.5rpx;
				border-radius: 10rpx;
			}
		}
	}
}
</style>
