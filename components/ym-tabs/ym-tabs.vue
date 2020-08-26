<template>
	<view class="ymTabs">
		<scroll-view class="tabBox" scroll-x :scroll-left="scrollLeft">
			<view class="tabWrap flex">
				<view class="tabItem" @click="changeTab(index)"
					:class="{'curentTb': currentIndex == index,'flex1 flex all-center': item.length < 4}" 
					v-for="(tab,index) in item" :key="index">
					<text :id="'tabItem-' + index">{{tab}}</text>
					</view>
			</view>
			<view class="tabLine" :style="{width: tabLineWidth+'px',left: tabLineLeft+'px'}"></view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props:{
			dataObj:{
				// #ifdef APP-PLUS
				type: String,
				// #endif
				// #ifdef H5
				type: Array,
				// #endif
				default(){
					return []
				}
			},
			tabIndex:{
				type: Number,
				default(){
					return 0
				}
			}
		},
		watch:{
			tabIndex(val){
				this.currentIndex = val
				this.$nextTick(()=>{
					const query = uni.createSelectorQuery().in(this);
					let className = '#tabItem-'+val
					query.select(className).boundingClientRect(data => {
						this.tabLineWidth = data.width
						this.tabLineLeft = data.left
					}).exec();
				})
			}
		},
		data() {
			return {
				item:[],
				scrollLeft: 0,
				currentIndex:0,
				tabLineWidth: 0,
				tabLineLeft:0,
				screenWidth:0,
			};
		},
		created() {
			// #ifdef APP-PLUS
			this.item=JSON.parse(this.dataObj)
			// #endif
			// #ifdef H5
			this.item=this.dataObj
			// #endif
			uni.getSystemInfo({
				success:(res)=>{
					this.screenWidth = res.windowWidth
				},
				fail:(err) =>{
					uni.showModal({
						title:'提示',
						content: JSON.stringify(err)
					})
				}
			})
			this.$nextTick(()=>{
				const query = uni.createSelectorQuery().in(this);
				let className = '#tabItem-0'
				query.select(className).boundingClientRect(data => {
					this.tabLineWidth = data.width
					this.tabLineLeft = data.left
				}).exec();
			})
		},
		methods:{
			changeTab(i){
				this.currentIndex = i
				const query = uni.createSelectorQuery().in(this);
				let className = '#tabItem-'+i
				query.select(className).boundingClientRect(data => {
					this.tabLineWidth = data.width
					this.tabLineLeft = data.left
					if(data.left > this.screenWidth/2){
						if(data.right == 0){
							return
						}
						this.scrollLeft = (this.screenWidth-data.width)/2
					}else{
						if(data.right == 0){
							return
						}
						this.scrollLeft = (this.screenWidth-data.width)/2
						
					}
				}).exec();
				this.$emit('change',i)
			}
		}
	}
</script>

<style lang="scss" scoped>
.ymTabs{
	height: 100rpx;
	background-color: #fff;
	border-bottom: 1rpx solid #e3e3e3;
	position: relative;
	.tabWrap{
		.tabItem{
			color: #666;
			font-size: 32rpx;
			line-height: 100rpx;
			margin: 0 20rpx;
			white-space: nowrap;
			&.curentTb{
				color: #000;
				animation: descAnimation .3s ease 1;
				-webkit-animation: descAnimation .3s ease 1;
			}
		}
	}
	.tabLine{
		position: absolute;
		left: 0;
		bottom: 0;
		width: 150rpx;
		height: 4rpx;
		background-color: #000;
		transition: all .3s ease-in-out;
	}
}
</style>
