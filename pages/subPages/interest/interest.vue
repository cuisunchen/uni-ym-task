<template>
	<view class="interest">
		<view class="con flex1">
			 <view class="title">选择感兴趣的内容</view>
			 <view class="desc">根据兴趣推荐内容,以后可以随时更改</view>
			 <view class="hobbys flex flex-between">
					<view class="lineItem flex" v-for="(item,index) in hobbyList" :key="index">
						<interestCard :class="{'hasChild1': item.length == 1,'hasChild2': item.length == 2}"
																:data-obj="item" @click="itemClick(item,index)"/> 
					</view>
			 </view>
		</view>
		<view class="btnBox flex">
			<button class="allChoose" type="default" @click="chooseNone" v-if="hobby_isCheckAll">全不选</button>
			<button class="allChoose" type="default" @click="chooseAll" v-else>全选</button>
			
			<button class="flex1" type="primary" @click="confirm">确定</button>
		</view>
	</view>
</template>

<script>
	import interestCard from "@/components/interest-card/interest-card.vue"
	import { mapGetters, mapMutations } from 'vuex'
	export default {
		components:{interestCard},
		data() {
			return {
				hobbyList:[],
				isCheckAll: false,
				checkedList:[],
				hobbysId:[],
				isIssue: null,
				interestLength:null   //  所有兴趣的个数
			}
		},
		computed: {
			...mapGetters([
				'hobby_isCheckAll',
				'checked_hobbys_id',
				'checked_hobbys_name'
			]),
		},
		onLoad(opt) {
			this.choosedInterest = JSON.parse(uni.getStorageSync('userInfo')).interestId
			this.isEdit = opt.isEdit
			this.hobbysId = this.choosedInterest ? this.choosedInterest.split(',') : []
			if(opt.issue){
				this.isIssue = true
				this.hobbysId = this.checked_hobbys_id ? this.checked_hobbys_id.split(',') : [];
				this.checkedList = this.checked_hobbys_name ? this.checked_hobbys_name.split(',') : []
			}
			uni.showLoading({
				title:"加载中"
			}) 	
			this.getHobbyList(opt.hobbys)
			
		},
		onUnload() {
			this.set_hobby_isCheckAll(false)
			if(!this.isIssue){
				this.set_checked_hobbys_name('')
				this.set_checked_hobbys_id('')
			}
		},
		methods: {
			...mapMutations({
					set_hobby_isCheckAll: 'SET_HOBBY_ISCHECKALL',
					set_checked_hobbys_id: 'SET_CHECKED_HOBBYS_ID',
					set_checked_hobbys_name:'SET_CHECKED_HOBBYS_NAME'
			}),
			itemClick(item,index){
				if(!this.hobbysId.includes(String(item.id))){
					this.hobbysId.push(String(item.id))
					if(this.interestLength == this.hobbysId.length){
						this.set_hobby_isCheckAll(true)
					}
				}else{
					let index = this.hobbysId.indexOf(String(item.id))
					this.hobbysId.splice(index, 1)
					if(this.interestLength !== this.hobbysId.length){
						this.set_hobby_isCheckAll(false)
					}
				}
				
				if(this.isIssue){
					if(!this.checkedList.includes(item.name)){
						this.checkedList.splice(index,0,item.name)
					}else{
						let index = this.checkedList.indexOf(item.name)
						this.checkedList.splice(index, 1)
					}
				}
			},
			chooseNone(){
				this.set_hobby_isCheckAll(false)
				this.hobbyList.map(item => {
					item.isChecked = false
					return item
				})
				this.checkedList = []
				this.hobbysId = []
				this.set_checked_hobbys_name('')
				this.set_checked_hobbys_id('')
			},
			chooseAll(){
				this.checkedList = []
				this.hobbysId = []
				if(this.hobby_isCheckAll){
					this.set_hobby_isCheckAll(false)
				}else{
					this.set_hobby_isCheckAll(true)
					let hobbysId = []
					for (let item of this.hobbyList) {
						this.checkedList.push(item.name)
						this.hobbysId.push(item.id)
					}
					
				}
			},
			confirm(){
				this.set_checked_hobbys_name(this.checkedList.toString())
				this.set_checked_hobbys_id(this.hobbysId.toString())
				if(!this.isIssue){
					this.setUserInterest()
				}
				uni.navigateBack({
					delta:1
				})
			},
			setUserInterest(){
				this.$request('/api/setUserInterest','post',{'integerId': this.hobbysId}).then(res=>{
					if(res.code == 200){
						this.showToast('设置成功')
						this.getUserInfo()
					}
				})
			},
			getHobbyList(hobbys){
				this.$request('/api/getAllInterest','get',{}).then(res => {
					uni.hideLoading()
					if(res.code == 200){
						if(this.hobbysId.length == res.data.length){
							this.set_hobby_isCheckAll(true)
						}
						this.interestLength = res.data.length
						res.data.map(item => {
							if(this.isIssue && this.checked_hobbys_id.length == 0){
								this.checkedList.push(item.name)
								this.hobbysId.push(String(item.id))
							}
							
							if(this.hobbysId.includes(String(item.id))){
								item.isChecked = true
							}else{
								item.isChecked = false
							}
							
							return item
						})
						this.set_checked_hobbys_name(this.checkedList.toString())
						this.set_checked_hobbys_id(this.hobbysId.toString())
						this.hobbyList = res.data
					}else{
						this.showToast(res.msg)
					}
				})
			},
			getUserInfo(){
				this.$request('/api/userInfo','get',{}).then(res => {
					uni.setStorage({
					    key: 'userInfo',
					    data: JSON.stringify(res.data)
					});
				})
			},
		}
	}
</script>

<style>
	page{
		background-color: #fff;
	}
</style>
<style lang="scss" scoped>
.interest{
	height: 100%;
	.title{
		font-size: 34rpx;
		text-align: center;
		margin-top: 50rpx;
	}
	.desc{
		color: #666;
		font-size: 26rpx;
		text-align: center;
		margin: 20rpx 20rpx 50rpx;
	}
	.hobbys{
		flex-flow: row wrap;
		margin-top: 20rpx;
		padding: 0 30rpx 150rpx;
		.lineItem{
			margin-bottom: 20rpx;
			flex-flow: row wrap;
			.hasChild1{
				&:last-child{
					margin-right: 66.666%;
				}
			}
			.hasChild2{
				&:last-child{
					margin-right: 33.333%;
				}
			}
			.flex1{
				img{
					width: 200rpx;
					height: 200rpx;
					margin: 0 auto;
					border-radius: 14rpx;
				}
				.title{
					font-size: 28rpx;
					text-align: center;
					line-height: 50rpx;
				}
			}
		}
	}
	.con{
		overflow-y: scroll;
	}
	.btnBox{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		height: 80rpx;
		padding: 20rpx 50rpx;
		background-color: #fff;
		.allChoose{
			width: 150rpx;
			margin-right: 30rpx;
			background-color: #B4C386;
		}
		button{
			height: 70rpx;
			color: #fff;
			font-size: 28rpx;
			border-radius: 40rpx;
			background-color: #83CCC4
		}
	}
}
</style>
