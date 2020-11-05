<template>
	<view class="issueQSPage">
		<view class="info flex align-center">
			<view class="peoples box">
				<text class="label">用户总数:</text>
				<text class="num"> {{totalPeople}}人</text>
			</view>
			<view class="priceBox box"> 
				<text class="label">费用说明:</text>
				<text class="price"> {{unitPrice}} 元/条</text>
			</view>
		</view>
		
		<view class="formWrap">
			<view class="uplaodTitImgBox box">
				<issue-upload-card class="uploadCard" title="问答" width-height-rate="1:1" @choose="chooseTitImg"></issue-upload-card>
				<view class="conText flex align-center">
					<view class="label">标题:</view>
					<input class="flex1 input" type="text" maxlength="80" v-model.trim="form.title" placeholder-class="holderClass" placeholder="请输入标题" />
				</view>
			</view>
			
			<issue-con-img-upload-card class="uplaodConImgBox" v-model="netUrl" @choose="chooseConImg"></issue-con-img-upload-card>
			
			<view class="inputBox">
				<form-input label="请您提问:" v-model="form.problem"></form-input>
				<form-input class="rightAnswer" label="正确答案:" v-model="form.trueAnswer"></form-input>
				<form-input label="错误答案:" v-model="form.falseAnswer"></form-input>
			</view>
			
			<view class="cellBox">
				<issue-form-cell class="cell" label="发布类型:" :desc="issueType" desc-color="#51a3f0" @click="showIssueType"></issue-form-cell>
				<issue-form-cell class="cell" label="发布位置:" :desc="pickerText" desc-color="red" @click="openLevel"></issue-form-cell>
			</view>
			
			<issue-form-cell class="cell hobby" label="发布兴趣:" :desc="checked_hobbys_name?checked_hobbys_name:'默认全选'" desc-color="#999" @click="goHobbyPage"></issue-form-cell>
			
			<view class="cellBox">
				<issue-form-cell class="cell" label="发布时间:" :is-time="true" @choose="chooseTime"></issue-form-cell>
				<issue-form-cell class="cell" label="发布条数:" :issue-type="issueType" :issue-num='minNumber' v-model="form.releasesNumber" :is-icon-show="false"></issue-form-cell>
			</view>
			
			<view class="tip">
				<view class="">说明:</view>  
				1.发布的条数,系统会发送给平台所有符合条件的用户,同一用户只能回答一次,消耗一条有效条数;
				2.假如今天发布条数没有用完,第二天会接着发布,直到发布条数用完为止;
				3.发布条数用完后,当天凌晨下架;
				4.请先预览效果再确认提交,如因上传失误产生的损失,由商户自己承担
			</view>
			
			<view class="btns flex">
				<view class="preview flex all-center" @click="goPreview">预览效果</view>
				<button type="default" class="flex1 flex all-center" @click="submit">确认提交-支付宝</button>
			</view>
			
			<view class="xy flex all-center" @click="goXY">商户协议,点击查看,确认提交默认遵守协议</view>
		</view>
		
		<level-linkage ref="levelLinkage"
		            :pickerValueDefault="pickerValueDefault" 
		            :allData="levelData"
		            @onConfirm="onConfirm" themeColor='#007AFF'></level-linkage>
								
		<uni-popup ref="popup" type="bottom">
			<view class="popupWrap">
				<view class="top">
					<view class="tit flex all-center">选择发布类型</view>
					<view class="desc flex all-center">根据发布类型,选择发布位置</view>
				</view>
				<view class="item flex all-center" data-index="1" @click="chooseLocation($event)">全国</view>
				<view class="item flex all-center" data-index="2" @click="chooseLocation($event)">同城</view>
				<view class="item flex all-center" data-index="3" @click="chooseLocation($event)">附近</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import issueUploadCard from '@/components/issue-upload-card/issue-upload-card.vue'
	import issueConImgUploadCard from '@/components/issue-conImg-upload-card/issue-conImg-upload-card.vue'
	import formInput from "@/components/form-input/form-input.vue"
	import issueFormCell from '@/components/issue-form-cell/issue-form-cell.vue'
	import levelLinkage from "@/components/three-level-linkage/linkage.nvue"
	import citysData from '../../../common/utils/citys.js'
	import popup from '@/components/uni-popup/uni-popup.vue'
	import { mapGetters, mapMutations } from 'vuex'
	import { keepTwoDecimalFull } from '@/common/utils/tools.js'
	export default {
		components: {issueUploadCard,issueConImgUploadCard,formInput,issueFormCell,levelLinkage,popup},
		data() {
			return {
				netUrl:'',
				form:{
					title:'',
					homeTopImgUrl:'',
					homeBigImgUrl: '',
					problem: '',
					trueAnswer: '',
					falseAnswer: '',
					cityCode: '0',
					releaseTime: '',
					releasesNumber: '',
					interest: 0,
					rangeType: 1,
					address:''
				},
				issueType:'全国',
				pickerValueDefault: [0, 0, 0],   // 这里控制显示3级联动或是2级联动
				pickerText: '全国',
				levelData:[],
				totalPeople: 0,
				unitPrice: '',
				minNumber: 1,
			}
		},
		computed: {
			...mapGetters([
				'checked_hobbys_id',
				'checked_hobbys_name'
			]),
		},
		onLoad() {
			this.levelData = citysData
			this.getReleasePrice()
			
		},
		onUnload() {
			this.set_hobby_isCheckAll(false)
			this.set_checked_hobbys_id('')
			this.set_checked_hobbys_name('')
		},
		methods: {
			...mapMutations({
				set_hobby_isCheckAll: 'SET_HOBBY_ISCHECKALL',
				set_checked_hobbys_id: 'SET_CHECKED_HOBBYS_ID',
				set_checked_hobbys_name:'SET_CHECKED_HOBBYS_NAME'
			}),
			initForm(){
				this.netUrl = ''
				this.form = {
					title:'',
					homeTopImgUrl:'',
					homeBigImgUrl: '',
					problem: '',
					trueAnswer: '',
					falseAnswer: '',
					cityCode: '0',
					releaseTime: '',
					releasesNumber: '',
					interest: 0,
					rangeType: 1,
				}
				this.issueType = '全国'
				this.pickerText = '全国'
			},
			submit(){
				this.form.interest = 0
				if(this.netUrl){
					let url  = this.netUrl.split('?')[0]
					var strRegex = "((http[s]{0,1}|ftp)://[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)|(www.[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)"
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
				
				let res = this.checkQS(this.form)
				if(!res){
					return
				}
				uni.showLoading({
					title:'加载中'
				})
				this.submitRequest()
			},
			submitRequest(){
				this.$request('/api/questions','post',encodeURIComponent(JSON.stringify(this.form))).then(res => {
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
						    	this.set_checked_hobbys_id('')
						    	this.set_checked_hobbys_name('')
						    	this.set_hobby_isCheckAll(false)
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
						    		showCancel:false
						    	})
						    }
						});
					}
				})
			},
			chooseLocation(e){
				uni.showLoading({
					title:'加载中'
				})
				this.form.rangeType = e.target.dataset.index
				if(this.form.rangeType == 1){
					this.issueType = '全国'
					this.pickerText = '全国'
					this.form.cityCode = '0'
				}else if(this.form.rangeType == 2){
					this.issueType = '同城'
					this.pickerText = '请选择'
					this.form.cityCode = ''
					this.pickerValueDefault = [0,0]
				}else if(this.form.rangeType == 3){
					this.issueType = '附近'
					this.pickerText = '请选择'
					this.form.cityCode = ''
					this.pickerValueDefault = [0,0,0]
				}
				this.$refs.popup.close()
				this.getReleasePrice(e.target.dataset.index)
			},
			showIssueType(){
				this.$refs.popup.open()
			},
			openLevel() {
				if(this.form.rangeType == 1){
					uni.showToast({
						title:'发布类型为同城/附近,可选择发布位置',
						icon: 'none'
					})
					return
				}
					this.$refs.levelLinkage.open();
			},
			onConfirm(e) {
					// e 确认后选中的数据
				this.pickerText = e.name
				
				if(this.form.rangeType == 1){
					this.form.cityCode = '0'
					this.form.address = '全国'
				}else if(this.form.rangeType == 2){
					this.form.address = e.name.replace(/-/g,' ')
					this.form.cityCode = e.secondPick.code.slice(0,4)
				}else if(this.form.rangeType == 3){
					this.form.address = e.name.replace(/-/g,' ')
					this.form.cityCode = e.thirdPick.code
				}
			},
			chooseTime(time){
				this.form.releaseTime = time
			},
			chooseConImg(url){
				this.form.homeBigImgUrl = url
			},
			chooseTitImg(url){
				this.form.homeTopImgUrl = url
			},
			goHobbyPage(){
				uni.navigateTo({
					url:'../../subPages/interest/interest?issue='+ true
				})
			},
			goXY(){
				uni.navigateTo({
					url:'../../subPages/xy-middle-page/xy-middle-page?url=' + encodeURIComponent('http://inc.guangyi009.com/platformXY.html')
				})
			},
			goPreview(){
				let obj = {
					homeTopImgUrl: this.form.homeTopImgUrl,
					title: this.form.title,
					homeBigImgUrl:this.netUrl || this.form.homeBigImgUrl,
					bigImg: this.netUrl || this.form.homeBigImgUrl,
					tags: '未读',
					rangeType:'全国',
					status: '未完成',
					userGet:'未得',
					price:this.unitPrice,
					clickNum: 0,
				}
				let res = this.checkQS(obj)
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
					url:'../examples/qs-example-page/qs-example-page?type=preview&pageData='+ encodeURIComponent(JSON.stringify(obj))
				})
			},
			getReleasePrice(rangType = 1){
				let param = {
					"homeAdType": 8,
					"rangType": rangType
				}
				this.$request('/api/releasePrice','post',param).then(res=>{
					uni.hideLoading()
					if(res.code == 200){
						this.totalPeople = res.data.peopleTotal
						this.unitPrice = res.data.adUnitPrice
						this.minNumber = res.data.minNumber
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.issueQSPage{
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
		.box{
			padding: 30rpx;
			border-radius: 10rpx;
			background-color: #fff;
			.uploadCard{
				padding-bottom: 30rpx;
				border-bottom: 1rpx solid #eee;
			}
		}
		.uplaodTitImgBox{
			.conText{
				margin-top: 30rpx;
				.label{
					color: #666;
				}
				.flex1{
					padding: 0 10rpx;
					margin-left: 10rpx;
				}
			}
		}
		.uplaodConImgBox{
			margin-top: 30rpx;
			padding: 30rpx;
			border-radius: 10rpx;
			background-color: #fff;
		}
		.inputBox{
			padding: 30rpx;
			margin-top: 30rpx;
			border-radius: 10rpx;
			background-color: #fff;
			.rightAnswer{
				margin: 30rpx 0;
			}
		}
		.cell{
			&.hobby{
				margin-top: 30rpx;
				background-color: #fff;
			}
		}
		.cellBox{
			margin-top: 30rpx;
			.cell{
				background-color: #fff;
				margin-bottom: 1rpx;
				&.hobby{
					background-color: #fff;
				}
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
				border-color: #FFA200;
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
	.popupWrap{
		width: calc(100% - 40rpx);
		margin: 0 auto 20rpx;
		border-radius: 20rpx;
		background-color: #fff;
		.top{
			color: #999;
			font-size: 24rpx;
			padding: 26rpx 0;
			.tit{
				font-weight: bold;
			}
			.desc{
				margin: 20rpx 0 10rpx;
			}
		}
		
		.item{
			color: red;
			font-size: 32rpx;
			height: 80rpx;
			border-top: 1rpx solid #cdcdcd;
		}
	}
} 
</style>
