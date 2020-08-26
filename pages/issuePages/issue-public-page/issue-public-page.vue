<template>
	<view class="issuePublicPage" id="test">
		<view class="info flex align-center">
			<view class="peoples box">
				<text class="label">用户总数:</text>
				<text class="num"> {{totalPeople}}人</text>
			</view>
			<view class="priceBox box"> 
				<text class="label">费用说明:</text>
				<text class="price"> {{unitPrice}} 元/天</text>
			</view>
		</view>
		
		<view class="formWrap">
			<issue-upload-card class="uploadCard" :type="rowType" :title="imgTit" :is-clear="topImgClear"
						:width-height-rate="widthHeightRate" @choose="chooseTitImg"></issue-upload-card>
						
			<issue-con-img-upload-card class="uplaodConImgBox" v-model="netUrl" :is-clear="conImgClear" @choose="chooseConImg"></issue-con-img-upload-card>
								
			<issue-form-cell class="cell issuTime" label="发布时间:" :page-url="true" desc-color="#999"
								:desc="chooseDays.length == 0 ? '请选择' : '您共选择了' + chooseDays.length + '天'"
								@click="goTimePage" :is-time="false"></issue-form-cell>
													
			<view class="tip">
				<view class="">说明:</view>  
				1.平台审核时间: 早9:00-晚9:00,请在这个时间段内提交审核,其他时间段提交审核的订单,次日内审核,请知悉;
				2.请先预览效果再确认提交,如因上传失误产生的损失,由商户自己承担;
			</view>
			
			<view class="btns flex">
				<view class="preview flex all-center" @click="goPreview">预览效果</view>
				<button type="default" class="flex1 flex all-center" @click="submit">确认提交-支付宝</button>
			</view>
			
			<view class="xy flex all-center" @click="goXY">商户协议,点击查看,确认提交默认遵守协议</view>
		</view>
	</view>
</template>

<script>
	import issueUploadCard from '@/components/issue-upload-card/issue-upload-card.vue'
	import issueConImgUploadCard from '@/components/issue-conImg-upload-card/issue-conImg-upload-card.vue'
	import issueFormCell from '@/components/issue-form-cell/issue-form-cell.vue'
	import { mapGetters, mapMutations } from 'vuex'
	export default {
		components:{issueUploadCard,issueConImgUploadCard,issueFormCell},
		data() {
			return {
				netUrl:'',
				imgTit:'轮播',
				totalPeople:null,
				unitPrice:'',
				form:{
					"homeTopImgUrl": "",
					"homeBigImgUrl": "",
					"releaseTimes":this.chooseDays || [],
					"homeType": 0,
				},
				pageType:'',
				pickerText: '全国',
				widthHeightRate: '2:1',
				rowType:'',
				previewUrl:'',
				topImgClear: false,
				conImgClear: false,
			}
		},
		computed: {
			...mapGetters([
				'chooseDays'
			]),
		},
		onLoad(opt) {
			this.pageType = opt.type
			switch (opt.type){
				case 'swiper':
					uni.setNavigationBarTitle({
					　　title:'发布轮播图'
					})
					this.imgTit = '轮播'
					this.form.homeType = 1
					this.widthHeightRate = '2:1'
					this.rowType = 'row2'
					this.previewUrl = '../examples/swiper-example-page/swiper-example-page'
					break;
				case 'cover':
					uni.setNavigationBarTitle({
					　　title:'发布封面图'
					})
					this.imgTit = '封面'
					this.form.homeType = 2
					this.widthHeightRate = '2:3'
					this.rowType = 'column'
					this.previewUrl = '../examples/cover-example-page/cover-example-page'
					break;
				case 'dialog':
					uni.setNavigationBarTitle({
					　　title:'发布弹框图'
					})
					this.imgTit = '弹框'
					this.form.homeType = 3
					this.widthHeightRate = '1:1'
					this.rowType = ''
					this.previewUrl = '../examples/dialog-example-page/dialog-example-page'
					break;
			}
			
			this.getReleasePrice()
		},
		onUnload() {
			this.set_chooseDays([])
		},
		methods: {
			...mapMutations({
				set_chooseDays: 'SET_CHOOSEDAYS',
			}),
			initForm(){
				this.netUrl = ''
				this.form = {
					"homeTopImgUrl": "",
					"homeBigImgUrl": "",
					"homeType": 0,
					"releaseTimes":this.chooseDays || [],
				}
				this.topImgClear = false
				this.conImgClear = false
				this.pickerText = '全国'
			},
			submit(){
				if(this.netUrl){
					let url  = this.netUrl.split('?')[0]
					var strRegex = "((http[s]{0,1}|ftp)://[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)|(www.[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)";
					let re=new RegExp(strRegex);
					if(!url.toLowerCase().includes('http') && !url.toLowerCase().includes('https')){
						this.showToast('网址需要包括http或者https协议头')
						return
					}else
					if (!re.test(url.toLowerCase())) {
						this.showToast('内容网址格式不规范,请重新填写')
						return
					}
					this.form.homeBigImgUrl = this.netUrl
				}
				this.form.releaseTimes = this.chooseDays.map(item => item.date + ' 00:00:00')
				let res = this.checkPublic(this.form)
				if(!res){
					return
				}
				uni.showLoading({
					title:'加载中'
				})
				this.submitRequest()
			},
			submitRequest(){
				this.$request('/api/release','post',encodeURIComponent(JSON.stringify(this.form))).then(res => {
					uni.hideLoading()
					if(res.code == 200){
						if(uni.getSystemInfoSync().platform == 'android'){
							uni.showModal({
								title:"是否确定支付",
								content:`需支付金额: ${res.data.amount}元`,
								confirmText:'残忍拒绝',
								cancelText:'朕去支付',
								success:(re) => {
									if(re.cancel){
										this.userPayAd(res.data.homeAdId)
									} else if (res.confirm) {
										console.log('用户点击取消');
									}
								}
							})
							return
						}
						uni.showModal({
							title:"是否确定支付",
							content:`需支付金额: ${res.data.amount}元`,
							cancelText:'残忍拒绝',
							confirmText:'朕去支付',
							success:(re) => {
								if(re.confirm){
									this.userPayAd(res.data.homeAdId)
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						})
					}else{
						this.showToast(res.msg)
					}
				})
			},
			userPayAd(id){
				this.$request('/api/pay/userPayAd','post',{homeAdId: id}).then(res => {
					if(res.code == 200){
						uni.requestPayment({
						    provider: 'alipay',
						    orderInfo: res.data, //微信、支付宝订单数据
						    success: (res) => {
									let rawdata = JSON.parse(res.rawdata)
						    	this.topImgClear = true
						    	this.conImgClear = true
						    	this.set_chooseDays([])
									if(rawdata.resultStatus == '9000'){
										uni.showModal({
											title:'恭喜您,订单支付成功!',
											content:'如有疑问,请联系客服',
											showCancel:false,
											success: () => {
												uni.navigateBack({
													delta:1
												})
											}
										})
									}else
									if(rawdata.resultStatus == '8000'){
										this.showToast('订单处理中,请稍等片刻!')
									}else
									if(rawdata.resultStatus == '4000'){
										this.showToast('订单支付失败')
									}else
									if(rawdata.resultStatus == '6002'){
										this.showToast('网络连接出错')
									}
						    },
						    fail: (err)=> {
						    	uni.showModal({
						    		title:'很遗憾,订单支付失败!',
						    		content:'如有疑问,请联系客服',
						    		showCancel:false,
						    		// success: () => {
						    		// 	uni.navigateBack({
						    		// 		delta:1
						    		// 	})
						    		// }
						    	})
						    }
						});
					}
				})
			},

			onConfirm(e) {
					// e 确认后选中的数据
					this.pickerText = e.name
					this.cityCode = e.firstPick.code
			},
			goTimePage(){
				let url = ''
				let param = {
					totalPeople: this.totalPeople,
					unitPrice: this.unitPrice,
					homeType:this.form.homeType,
					cityCode: 0
				}
				if(this.chooseDays.length > 0){
					url = '../issue-time-list/issue-time-list?isEdit=true&param='+encodeURIComponent(JSON.stringify(param))
				}else{
					url = '../issue-time-list/issue-time-list?isEdit=false&param='+encodeURIComponent(JSON.stringify(param))
				}
				uni.navigateTo({
					url
				})
			},
			chooseConImg(url){
				this.form.homeBigImgUrl = url
			},
			chooseTitImg(url){
				this.form.homeTopImgUrl = url
			},
			goPreview(){
				let obj = {
					homeTopImgUrl: this.form.homeTopImgUrl,
					homeBigImgUrl: this.netUrl || this.form.homeBigImgUrl,
					bigImg: this.netUrl || this.form.homeBigImgUrl,
				}
				let res = this.checkPublic(obj)
				if(!res){
					return
				}
				if(this.netUrl){
					var strRegex = "((http[s]{0,1}|ftp)://[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)|(www.[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)";
					let re=new RegExp(strRegex);
					if (!re.test(this.netUrl)) {
						this.showToast('内容网址格式不规范,请重新填写')
						return
					}
				}
				uni.navigateTo({
					url: this.previewUrl + '?type=preview&pageData='+ encodeURIComponent(JSON.stringify(obj))
				})
			},
			getReleasePrice(){
				let param = {
					"homeAdType": this.form.homeType,
					"rangType": 1
				}
				this.$request('/api/releasePrice','post',param).then(res=>{
					if(res.code == 200){
						this.totalPeople = res.data.peopleTotal
						this.unitPrice = res.data.initialPrice
					}
				})
			},
			goXY(){
				uni.navigateTo({
					url:'../../subPages/xy-middle-page/xy-middle-page?url=' + encodeURIComponent('http://inc.guangyi009.com/platformXY.html')
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.issuePublicPage{
	padding-bottom: 80rpx;
	.info{
		height: 80rpx;
		padding: 0 30rpx;
		background-color: #FFFFFF;
		.peoples{
			margin-right: 40rpx;
		}
		.box{
			.num{
				color: green;
				margin-left: 14rpx;
			}
			.price{
				color: red;
				margin-left: 14rpx;
			}
		}
	}
	
	.formWrap{
		padding: 30rpx;
		.uploadCard{
			padding: 30rpx;
			border-radius: 10rpx;
			background-color: #fff;
		}
		.uplaodConImgBox{
			margin-top: 30rpx;
			margin-bottom: 30rpx;
			padding: 30rpx;
			border-radius: 10rpx;
			background-color: #fff;
		}
		.cell{
			background-color: #fff;
			border-radius: 10rpx;
			margin-top: 30rpx;
			&.issuTime{
				margin-top: 1rpx;
			}
		}
		
		.tip{
			color: #fff;
			margin-top: 30rpx;
			padding: 20rpx 30rpx;
			border-radius: 10rpx;
			background-color: rgba(0,0,0, .7);
		}
		.btns{
			color: #fff;
			font-size: 28rpx;
			margin: 30rpx 0;
			.preview{
				width: 200rpx;
				margin-right: 18rpx;
				border-radius: 6rpx;
				background-color: rgba(0,0,0, .7);
			}
			.flex1{
				color: #fff;
				height: 80rpx;
				font-size: 28rpx;
				border-radius: 6rpx;
				background-color: rgb(206,177,120);
				border-color: rgb(206,177,120);
			}
		}
		.xy{
			color: #51a3f0;
			height: 40rpx;
			line-height: 40rpx;
			font-size: 22rpx;
			border-radius: 20rpx;
			background-color: #fff;
		}
	}
}
</style>
