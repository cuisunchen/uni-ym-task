<template>
	<view class="issueGLPage">
		<view class="info flex align-center">
			<view class="peoples box">
				<text class="label">用户总数:</text>
				<text class="num"> {{totalPeople}}人</text>
			</view>
			<view class="priceBox box"> 
				<text class="label">费用说明:</text>
				<text class="price"> 用户奖励</text>
			</view>
		</view>
		
		<view class="formWrap">
			<view class="uplaodTitImgBox box">
				<view class="conText flex align-center">
					<view class="label">标题:</view>
					<input class="flex1 input" type="text" maxlength="80" v-model="form.title" placeholder-class="holderClass" placeholder="请输入标题" />
				</view>
				<issue-upload-card class="uploadCard" type="row3" title="标题" 
							width-height-rate="3:1" @choose="chooseTitImg"></issue-upload-card>
			</view>
			
			<issue-con-img-upload-card class="uplaodConImgBox" v-model="netUrl" @choose="chooseConImg"></issue-con-img-upload-card>
			
			<view class="cellBox">
				<issue-form-cell class="cell" label="发布类型:" :desc="issueType" desc-color="#51a3f0" @click="showIssueType"></issue-form-cell>
				<issue-form-cell class="cell" label="发布位置:" :desc="pickerText" desc-color="red" @click="openLevel"></issue-form-cell>
			</view>
			
			<view class="cellBox">
				<issue-form-cell class="cell hobby" label="发布兴趣:"  @click="goHobbyPage"
										:desc="checked_hobbys_name?checked_hobbys_name:'默认全选'"
										desc-color="#999"></issue-form-cell>
				<issue-form-cell class="cell" label="发布时间:" :is-time="true" @choose="chooseTime"></issue-form-cell>
			</view>
			
			<view class="cellBox">
				<issue-form-cell class="cell" label="发布总数:" :issue-type="issueType" :issue-num='minNumber' v-model="form.releasesNumber" :is-icon-show="false"></issue-form-cell>
				<view class="rewardBox flex">
					<view class="reward flex1 flex align-center">
						<text class="label flex-shrink">最大奖励:</text>
						<view class="inputBox">
							<input type="number" v-model="form.maxPrize" :placeholder="prizeObj.maxReward" placeholder-class="inputHold"/>
						</view>
					</view>
					
					<view class="reward flex1 flex align-center">
						<text class="label flex-shrink">数量:</text>
						<view class="inputBox">
							<input type="number" v-model="form.maxNum" :placeholder="prizeObj.maxNum" placeholder-class="inputHold"/>
						</view>
					</view>
				</view>
				<view class="rewardBox flex">
					<view class="reward flex1 flex align-center">
						<text class="label flex-shrink">最低奖励:</text>
						<view class="inputBox">
							<input type="number" v-model="form.minPrize" :placeholder="prizeObj.minReward" placeholder-class="inputHold"/>
						</view>
					</view>
					
					<view class="reward flex1 flex align-center">
						<text class="label flex-shrink">数量:</text>
						<view class="inputBox">
							<input type="number" v-model="form.minNum" :placeholder="prizeObj.minNum" placeholder-class="inputHold"/>
						</view>
					</view>
				</view>
			</view>
			
			<view class="currentRate flex all-center" :class="{green: rate > 20}">
				<uni-icons class="iconBox flex flex-end" :type="rate > 20 ? 'checkbox-filled' : 'clear'" size="22" :color="rate > 20 ? 'green': 'red'" ></uni-icons>
				<text class="rate flex all-center">当前中奖率{{ rate || 0}}%</text>
			</view>
			
			<view class="tip">
				<view class="">说明:</view>  
				1.发布总数,包括了中奖条数,中奖率不得低于20%;
				2.系统会发送给平台符合条件的所有用户,同一用户只能抽奖一次,消耗一条有效条数;
				3.假如今天发布总数没有用完,第二天会接着发布,直到发布总数用完为止;
				4.发布总数用完后,当天凌晨下架;
				5.请先预览效果再确认提交,如因上传失误产生的损失,由商户自己承担
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
	import issueFormCell from '@/components/issue-form-cell/issue-form-cell.vue'
	import levelLinkage from "@/components/three-level-linkage/linkage.nvue"
	import citysData from '../../../common/utils/citys.js'
	import popup from '@/components/uni-popup/uni-popup.vue'
	import {showToast,keepTwoDecimalFull} from 'common/utils/tools.js'
	import { mapGetters, mapMutations } from 'vuex'
	export default {
		components:{issueUploadCard,issueConImgUploadCard,issueFormCell,
								levelLinkage,popup,
		},
		data() {
			return {
				netUrl:'',
				form:{
					title: "",
					homeTopImgUrl: "",
					homeBigImgUrl: "",
					releasesNumber: '',
					maxPrize: null,
					maxNum: null,
					minPrize: null,
					minNum:null,
					releaseTime: "",
					
					cityCode: '0',
					releasesPrice: "",
					interest: 0,
					rangeType: 1,
				},
				issueType:'全国',
				pickerValueDefault: [0, 0, 0],   // 这里控制显示3级联动或是2级联动
				pickerText: '全国',
				levelData:[],
				totalPeople: null,
				minNumber: 3,
				prizeObj:{
					maxReward: '',
					maxNum: null,
					minReward:'',
					minNum:''
				}
			}
		},
		computed: {
			...mapGetters([
				'checked_hobbys_id',
				'checked_hobbys_name'
			]),
			rate(){
				return keepTwoDecimalFull(( ( ( (Number(this.form.maxNum) + Number(this.form.minNum)) / Number(this.form.releasesNumber) ) || 0 ) *100).toFixed(2))
			}
		},
		onUnload() {
			this.set_hobby_isCheckAll(false)
			this.set_checked_hobbys_id('')
			this.set_checked_hobbys_name('')
		},
		onLoad(opt) {
			this.levelData = citysData
			this.getReleasePrice()
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
					title: "",
					homeTopImgUrl: "",
					homeBigImgUrl: "",
					releasesNumber: '',
					maxPrize: null,
					maxNum: null,
					minPrize: null,
					minNum:null,
					releaseTime: "",
					
					cityCode: '0',
					releasesPrice: "",
					interest: 0,
					rangeType: 1,
				}
				this.issueType = '全国'
				this.pickerText = '全国'
			},
			getReleasePrice(rangType = 1){
				let param = {
					"homeAdType": 9,
					"rangType": rangType
				}
				this.$request('/api/releasePrice','post',param).then(res=>{
					uni.hideLoading()
					if(res.code == 200){
						this.prizeObj.maxReward = `最低${res.data.qmaxPrice}元`
						this.prizeObj.maxNum = `数量(最低${res.data.qmaxNum})`
						this.prizeObj.minReward = `最低${res.data.qminPrice}元`
						this.prizeObj.minNum = `数量(最低${res.data.qminNum})`
						this.totalPeople = res.data.peopleTotal
						this.minNumber = res.data.minNumber
					}
				})
			},
			submit(){
				this.form.interest = 0
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
				let param = Object.assign({},this.form,this.prize)
				let res = this.checkGL(param)
				if(!res){
					return
				}
				this.submitRequest()
			},
			submitRequest(){
				let {cityCode,homeBigImgUrl,homeTopImgUrl,interest,rangeType,releaseTime,releasesNumber,
						title,maxNum,maxPrize,minPrize,minNum,address} = this.form
				let param = {
					cityCode,
					homeBigImgUrl,
					homeTopImgUrl,
					interest:0, 
					rangeType,
					releaseTime,
					releasesNumber,
					title,
					releasesPrice: [
						 maxPrize*100,,,,
						 minPrize*100
					].toString(),
					releasesNums: [
						 maxNum,,,,
						 minNum
					].toString()
				}
				uni.showLoading({
					title:'加载中'
				})
				this.$request('/api/goodLuck','post',encodeURIComponent(JSON.stringify(param))).then(res => {
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
										showCancel:false,
										// success: () => {
										// 	uni.navigateBack({
										// 		delta:1
										// 	})
										// }
									})
									console.log('fail:' + JSON.stringify(err));
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
				}else if(this.form.rangeType == 2){
					this.form.cityCode = e.secondPick.code.slice(0,4)
				}else if(this.form.rangeType == 3){
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
					title:this.form.title,
					homeTopImgUrl:this.form.homeTopImgUrl,
					homeBigImgUrl:this.netUrl || this.form.homeBigImgUrl,
					releasesNumber: this.form.releasesNumber,
					maxPrize: this.form.maxPrize,
					maxNum: this.form.maxNum,
					minPrize: this.form.minPrize,
					minNum:this.form.minNum,
					titleImg:this.form.homeTopImgUrl,
					
					maxReward:this.form.maxPrize,
					tags:'未读',
					status:'未完成',
					clickNum: 0,
					probability:this.rate,
					bigImg:this.netUrl || this.form.homeBigImgUrl,
				}
				let res = this.checkGL(obj)
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
					url:'../examples/gl-example-page/gl-example-page?type=preview&pageData='+ encodeURIComponent(JSON.stringify(obj))
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.issueGLPage{
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
		}
		.uplaodTitImgBox{
			.conText{
				margin-bottom: 30rpx;
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
			.rewardBox{
				height: 80rpx;
				padding: 0 30rpx;
				margin-bottom: 1rpx;
				background-color: #fff;
				border-radius: 10rpx;
				&:last-child{
					margin-bottom: 0;
				}
				.reward{
					.inputBox{
						margin-left: 16rpx;
					}
				}
				.inputHold{
					color: #999;
					font-size: 24rpx;
				}
			}
		}
		.currentRate{
			margin: 20rpx 0;
			&.green{
				.rate{
					background-color: green;
				}
			}
			.rate{
				color: #fff;
				height: 40rpx;
				line-height: 40rpx;
				font-size: 28rpx;
				margin-left: 20rpx;
				margin-top: -4rpx;
				padding: 0 10rpx;
				border-radius: 6rpx;
				background-color: red;
			}
		}
		
		.tip{
			color: #fff;
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
