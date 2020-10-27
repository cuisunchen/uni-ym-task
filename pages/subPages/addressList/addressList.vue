<template>
	<view class="addressList">
		<address-card class="card" v-for="(item,index) in lists" :key="index" :data-obj="item" :has-default="addressId ? false : true"
			@click="goEdit(item)" @change="addrChange(item)" @delete="deleteAddr(item)"></address-card>
		<view class="nodata flex-column align-center" v-if="false">
				<image class="img" src="../../../static/noData.png" mode="scaleToFill"></image>
				<view class="desc">亲,这里还空空如也哦~~~</view>
		</view>
	</view>
</template>

<script>
	import addressCard from '../../../components/address-card/address-card.vue'
	export default {
		components:{addressCard},
		data() {
			return {
				lists:[],
				addressId:''
			}
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url:'../addAddress/addAddress'
			})
		},
		onShow() {
			this.lists = []
			this.getAddrList() 
		},
		onLoad(opt) {
			if(opt.addressId){
				this.addressId = opt.addressId
			}
		},
		methods:{
			deleteAddr(item){
				if(item.default){
					this.showToast('默认地址不能删除','none',2000)
					return
				}
				uni.showLoading({
					title:'请求连接中...'
				})
				this.$unencryp('/snap/editDeliveryAddress','post',{"id": item.id,"type": 1}).then(res => {
					if(res.code == 200){
						this.lists = []
						this.getAddrList()
					}else{
						this.showToast(res.msg)
					}
				})
			},
			addrChange(item){
				uni.showLoading({
					title:'请求连接中...'
				})
				this.$unencryp('/snap/editDeliveryAddress','post',{"id": item.id,"type": 0}).then(res => {
					if(res.code == 200){
						this.lists = []
						uni.setStorage({
							key:'addr',
							data:{
								name: item.name,
								tel: item.phone,
								addr: item.addressInfo,
								addressId: item.id,
							}
						})
						this.getAddrList()
					}else{
						this.showToast(res.msg)
					}
				})
			},
			goEdit(item){
				uni.navigateTo({
					url:'../addAddress/addAddress?data=' + JSON.stringify(item)
				})
			},
			getAddrList(){
				uni.showLoading({
					title:'数据加载中...'
				})
				this.$unencryp('/snap/getDeliveryAddressList','get',{}).then(res => {
					if(res.code == 200){
						this.lists = res.data.map(item => {
							item.newAddr = item.addressInfo.replace(/-/g,'').replace(/~/,'')
							return item
						})
						console.log(this.lists)
					}else{
						this.showToast(res.msg)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

.addressList{
	.card{
		margin-bottom: 20rpx;
	}
	.nodata{
		 margin-top: 300rpx;
		 .img{
				width: 300rpx;
				height: 300rpx;
		 }
		 .desc{
				color: #bcb9bd;
				font-size: 32rpx;
		 }
	}
}
</style>
