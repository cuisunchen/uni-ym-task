<template>
	<view class="addressList">
		<address-card class="card" v-for="(item,index) in lists" :key="index" :data-obj="item"></address-card>
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
				lists:[
					{
						id:'p001',
						name:'崔损车',
						tel:'13728769372',
						address:'清湖地铁'
					},
					{
						id:'p002',
						name:'崔损车1',
						tel:'13728769372',
						address:'清湖地铁'
					}
				]
			}
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url:'../addAddress/addAddress'
			})
		},
		methods:{
			
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
