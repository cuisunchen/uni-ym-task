import urlConfig from './config.js'
import { getRsaCode,deRsaCode } from './rsa'

const headers = {}
let encodeArr = [
   '/api/view/replyQA', '/api/view/lotteryGL', '/api/luckyDraw','/api/userSignIn',
   '/api/questions', '/api/goodLuck', '/api/recommend', '/api/release','/api/applyWithdraw'
]

const request = (url, method='post', data, hasToken="true") => {
		let token = uni.getStorageSync('token')
		if(hasToken){
			headers['Authorization'] =  token ? 'Bearer ' + token : '',
			headers['Content-Type']= 'application/json;charset=utf-8'
		}else{
			headers['Authorization'] = '',
			headers['Content-Type']= 'application/json;charset=utf-8'
		} 
    let param = Object.keys(data).length > 0 ? getRsaCode(JSON.stringify(data)) : data;
		if(url == '/api/recommend' || url == '/api/goodLuck' || url == '/api/questions' || url == '/api/release'){
			param = Object.keys(data).length > 0 ? getRsaCode(data) : data;
		}
		let promise = new Promise((resolve, reject)=> {
				return uni.request({
						url: urlConfig + url,
						method,
						data: Object.keys(data).length > 0 ? { params: param } : data,
						dataType: 'json',
						header: headers
				}).then(res => {
					uni.hideLoading()
					
					if (encodeArr.includes(url)){
						 let data = JSON.parse(deRsaCode(res[1].data))
						 resolve(data)
						 return
					}
					if ((res[1].data.code && res[1].data.code == 200) || res[1].data.code == 999 
							|| res[1].data.code == 500|| res[1].data.code == 555) {
						resolve(res[1].data)
					} else {
						if(res[1].data.code == 502 || res[1].data.code == 501 || res[1].data.code == 503){
							uni.showToast({
								icon:'none',
								title: res[1].data.msg,
								duration: 2000 
							}); 
							// uni.clearStorage()
							uni.removeStorageSync('token');
							uni.removeStorageSync('userInfo');
							uni.reLaunch({
								url: '/pages/subPages/login/login'
							});
							return false
						}else{
							uni.showToast({
								icon:'none',
								title: res[1].data.msg,
								duration: 2000 
							});
						}
					}
				}).catch(parmas => {
					console.log('错误')
					uni.showToast({
						title:'连接失败,请检查网络是否正常',
						icon: 'none'
					})
		　　　　reject(response)
		　　})
		})
		return promise	
 } 
 
const uploadRequest = (url,file) => {
	let token = uni.getStorageSync('token')
	let promise = new Promise((resolve, reject) => {
	 return uni.uploadFile({
						url: urlConfig + url,
						filePath: file,
						name: 'file',
						header:{
							Authorization: token ? 'Bearer ' + token : ''
						},
						success: (res) => {
							const data = JSON.parse(res.data);
							if ((data.code && data.code == 200) || data.code == 999 || data.code == 500) {
								resolve(data)
							} else {
								if(data.code == 502 || data.code == 501){
									uni.showToast({
										icon:'none',
										title: data.msg,
										duration: 2000 
									}); 
									uni.clearStorage()
									uni.reLaunch({
										url: '/pages/subPages/login/login'
									});
									return false
								}
							}
							resolve(res)
						},
						fail:(err) =>{
							reject(err)
							// uni.hideLoading();
							this.showToast("图片上传失败，请联系开发！")
						}
					})
	})
	return promise	
}

const unencryp = (url, method='post', data, hasToken="true") => {
	let token = uni.getStorageSync('token')
	if(hasToken){
		headers['Authorization'] =  token ? 'Bearer ' + token : '',
		headers['Content-Type']= 'application/json;charset=utf-8'
	}else{
		headers['Authorization'] = '',
		headers['Content-Type']= 'application/json;charset=utf-8'
	}
	let promise = new Promise((resolve, reject)=> {
			return uni.request({
					url: urlConfig + url,
					method,
					data,
					dataType: 'json',
					header: headers
			}).then(res => {
				uni.hideLoading()
				if (encodeArr.includes(url)){
					 let data = res[1].data
					 resolve(data)
					 return
				}
				if ((res[1].data.code && res[1].data.code == 200) || res[1].data.code == 999 
						|| res[1].data.code == 500|| res[1].data.code == 555) {
					resolve(res[1].data)
				} else {
					if(res[1].data.code == 502 || res[1].data.code == 501 || res[1].data.code == 503){
						uni.showToast({
							icon:'none',
							title: res[1].data.msg,
							duration: 2000 
						}); 
						// uni.clearStorage()
						uni.removeStorageSync('token');
						uni.removeStorageSync('userInfo');
						uni.reLaunch({
							url: '/pages/subPages/login/login'
						});
						return false
					}else{
						uni.showToast({
							icon:'none',
							title: res[1].data.msg,
							duration: 2000 
						});
					}
				}
			}).catch(parmas => {
				console.log('错误')
				uni.showToast({
					title:'连接失败,请检查网络是否正常',
					icon: 'none'
				})
	　　　　reject(response)
	　　})
	})
	return promise	
}

module.exports = {
	request,
	uploadRequest,
	unencryp
} 
