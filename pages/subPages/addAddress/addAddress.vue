<template>
	<view class="addAddress">
		<view class="top">
			<view class="item">
				<view class="left">收货人</view>
				<input type="text" v-model="info.name" placeholder-class="line" placeholder="请填写收货人姓名" />
			</view>
			<view class="item">
				<view class="left">手机号码</view>
				<input type="number" maxlength="11" v-model="info.phone" placeholder-class="line" placeholder="请填写收货人手机号" />
			</view>
			<view class="item" @tap="showRegionPicker">
				<view class="left">所在地区</view>
				<input disabled type="text" v-model="info.area" placeholder-class="line" placeholder="省市区县、乡镇等" />
			</view>
			<view class="item address">
				<view class="left">详细地址</view>
				<textarea type="text" v-model="info.addressInfo" placeholder-class="line" placeholder="街道、楼牌等" />
			</view>
		</view>
		<u-picker mode="region" ref="uPicker" v-model="show" v-if="areaCode.length>0" :area-code='areaCode' @confirm="addressConfirm" />	
	</view>
</template>

<script>
	import province from '../../../uview-ui/libs/util/province.js'
	import cityData from '../../../uview-ui/libs/util/city.js'
	import areaData from '../../../uview-ui/libs/util/area.js'
	export default {
		data() {
			return {
				show: false,
				info:{
					"address": "",
					"addressInfo": "",
					"id": null,
					"name": "",
					"phone": "",
					"area":''
				},
				areaCode:["12", "1201", "120101"]
			}
		},
		onNavigationBarButtonTap() {
			if(!(/^1[3456789]\d{9}$/.test(this.info.phone))){
				this.showToast('手机号码输入有误','none',2000)
				return
			}else if(!this.info.area){
				this.showToast('请选择所在区域','none',2000)
				return
			}else if(!this.info.addressInfo){
				this.showToast('请填写详细地址','none',2000)
				return
			}
			delete this.info.area
			console.log(this.info)
			this.$request('/snap/addDeliveryAddress','post',encodeURIComponent(JSON.stringify(this.info))).then(res => {
				console.log(res)
				if(res.code == 200){
					if(this.info.id){
						this.showToast('修改成功')
					}else{
						this.showToast('添加成功')
					}
					setTimeout(()=>{
						uni.navigateBack({
							delta: 1
						})
					},1500)
				}else{
					this.showToast(res.msg)
				}
			})
		},
		onLoad(opt) {
			if(opt.data){
				this.info = JSON.parse(opt.data)
				let areaStr = JSON.parse(opt.data).addressInfo.split('~')[0].split('-')
				// 将省市区转换成code
				this.areaCode[0] = province.find(item => item.label == areaStr[0]).value
				let isOut = false
				for (let citys of cityData) {
					for (let city of citys) {
						if(city.label == areaStr[1]){
							console.log(city.value)
							city.value.substring(2)
							this.areaCode[1] = this.areaCode[0] + city.value.substring(2)
							isOut = true
							break
						}
					}
					if(isOut){break}
				}
				
				let isOut2 = false
				for (let areas of areaData) {
					for (let area of areas) {
						for (let item of area) {
							if(item.label == areaStr[2]){
								this.areaCode[2] = item.value
								isOut2 = true
								break
							}
						}
						if(isOut2){break}
					}
					if(isOut2){break}
				}
				console.log(this.areaCode)
				// 将破折号替换为字符串
				this.info.area = JSON.parse(opt.data).addressInfo.split('~')[0].replace(/-/g,'')
				this.info.addressInfo = JSON.parse(opt.data).addressInfo.split('~')[1]   //  详细地址  手动输入的地址
			}
		},
		methods:{
			addressConfirm(e){
				this.info.area = e.province.label + e.city.label + e.area.label
				this.info.address = e.province.label + '-' + e.city.label + '-' + e.area.label + '~'
			},
			showRegionPicker() {
				this.show = true;
			}
		}
	}
</script>

<style lang="scss" scoped>
/deep/ .line {
	color: $u-light-color;
	font-size: 28rpx;
}
.addAddress{
	.top {
		background-color: #ffffff;
		border-top: solid 2rpx $u-border-color;
		padding: 22rpx;
		.item {
			display: flex;
			font-size: 28rpx;
			line-height: 100rpx;
			align-items: center;
			border-bottom: solid 2rpx $u-border-color;
			.left {
				width: 180rpx;
			}
			input {
				text-align: left;
			}
		}
		.address {
			padding: 20rpx 0;
			textarea {
				height: 150rpx;
				background-color: #f7f7f7;
				line-height: 60rpx;
				margin: 40rpx auto;
				padding: 20rpx;
				font-size: 28rpx;
			}
		}
	}
}
</style>
