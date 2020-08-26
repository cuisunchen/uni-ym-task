import {showToast} from './tools.js' 
const validate = {
	checkQS: (obj)=>{
		for(let [key,value] of Object.entries(obj)){
			if(key == 'homeTopImgUrl'){
				if(!value){
					showToast('请上传问答图片')
					return false
					break
				}else{
					continue
				}
			}else
			if(key == 'title'){
				if(!value){
					showToast('请填写标题')
					return false
					break
				}else{
					continue
				}
			}else
			if(key == 'homeBigImgUrl'){
				if(!value){
					showToast('请填写内容图片或者网址,网址优先')
					return false
					break
				}else{
					continue
				}
			}else
			if(key == 'problem'){
				if(!value){
					showToast('请填写您要提的问题')
					return false
					break
				}else{
					continue
				}
			}else
			if(key == 'trueAnswer'){
				if(!value){
					showToast('请填写正确答案')
					return false
					break
				}else{
					continue
				}
			}else
			if(key == 'falseAnswer'){
				if(!value){
					showToast('请填写错误答案')
					return false
					break
				}else{
					continue
				}
			}else
			if(key == 'cityCode'){
				if(!value){
					showToast('请选择发布位置')
					return false
					break
				}else{
					continue
				}
			}else
			if(key == 'releaseTime'){
				if(!value){
					showToast('请选择发布时间')
					return false
					break
				}else{
					continue
				}
			}else
			if(key == 'releasesNumber' && !value){
				if(!value){
					showToast('请填写发布条数')
					return false
					break
				}else{
					continue
				}
			}
			return true
		}
	},
	checkGL: (obj)=>{
		for(let [key,value] of Object.entries(obj)){
			if(key == 'homeTopImgUrl'){
				if(!value){
					showToast('请上传标题图片')
					return false
					break
				}else{
					continue
				}
			}else
			if(key == 'title'){
				if(!value){
					showToast('请填写标题')
					return false
					break
				}else{
					continue
				}
			}else
			if(key == 'homeBigImgUrl'){
				if(!value){
					showToast('请填写内容图片或者网址,网址优先')
					return false
					break
				}else{
					continue
				}
			}else
			if(key == 'releaseTime'){
				if(!value){
					showToast('请选择发布时间')
					return false
					break
				}else{
					continue
				}
			}else
			if(key == 'releasesNumber'){
				if(!value){
					showToast('请填写发布总数')
					return false
					break
				}else{
					continue
				}
			}else
			if(key == 'maxPrize'){
				if(!value){
					showToast('请输入最大奖励金额')
					return false
					break
				}else{
					continue
				}
			}else
			if(key == 'maxNum'){
				if(!value){
					showToast('请输入最大奖励数量')
					return false
					break
				}else{
					continue
				}
			}else
			if(key == 'minPrize'){
				if(!value){
					showToast('请输入最低奖励金额')
					return false
					break
				}else{
					continue
				}
			}else
			if(key == 'minNum'){
				if(!value){
					showToast('请输入最低奖励数量')
					return false
					break
				}else{
					continue
				}
			}else
			if(key == 'cityCode'){
				if(value == ''){
					showToast('请选择发布位置')
					return false
					break
				}else{
					continue
				}
			}
			return true
		}
	},
	checkPublic: (obj)=>{
		let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
		let type = routes[routes.length - 1].options.type
		for(let [key,value] of Object.entries(obj)){
			if(key == 'homeTopImgUrl'){
				if(!value){
					let toastTxt = ''
					if(type){
						if(type == 'swiper'){
							toastTxt = '请上传轮播图片'
						}else if(type == 'cover'){
							toastTxt = '请上传封面图片'
						}else if(type == 'dialog'){
							toastTxt = '请上传弹框图片'
						}else{
							toastTxt = '请上传推荐图片'
						}
					}
					showToast(toastTxt)
					return false
					break
				}else{
					continue
				}
			}else
			if(key == 'homeBigImgUrl'){
				if(!value.toLowerCase()){
					showToast('请填写内容图片或者网址,网址优先')
					return false
					break
				}else{
					continue
				}
			}else
			if(key == 'releaseTimes'){
				if(!value.length){
					showToast('请选择发布时间')
					return false
					break
				}else{
					continue
				}
			}
			return true
		}
	},
	checkRecommend: (obj)=>{
		for(let [key,value] of Object.entries(obj)){
			if(key == 'title'){
				if(!value){
					showToast('请填写标题')
					return false
					break
				}else{
					continue
				}
			}else
			if(key == 'homeTopImgUrl'){
				if(!value){
					showToast('请上传推荐图片')
					return false
					break
				}else{
					continue
				}
			}else
			if(key == 'homeBigImgUrl'){
				if(!value){
					showToast('请填写内容图片或者网址,网址优先')
					return false
					break
				}else{
					continue
				}
			}else
			if(key == 'cityCode'){
				if(value && value.length<0){
					showToast('请选择发布位置')
					return false
					break
				}else{
					continue
				}
			}
			if(key == 'releaseTimes'){
				if(!value.length){
					showToast('请选择发布时间')
					return false
					break
				}else{
					continue
				}
			}
			return true
		}
	}
}



module.exports = validate