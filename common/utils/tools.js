export const showToast = (text,icon="none",duration=2000)=>{
	uni.showToast({
		title:text,
		icon,
		duration
	})
}

export const navigateTo = (url)=>{
	uni.navigateTo({
		url
	})
}

//  处理类似2/9的小数太长  toFixed(2)无法完全保留两位小数的情况
export const keepTwoDecimalFull = (num) =>{  
		var result = parseFloat(num);  
		if (isNaN(result)) {  
				alert('传递参数错误，请检查！');  
				return false;  
		}  
		result = Math.round(num * 100) / 100;  
		var s_x = result.toString(); //将数字转换为字符串
		
		var pos_decimal = s_x.indexOf('.'); //小数点的索引值
		

		// 当整数时，pos_decimal=-1 自动补0  
		if (pos_decimal < 0) {  
				pos_decimal = s_x.length;  
				s_x += '.';  
		}
 
			// 当数字的长度< 小数点索引+2时，补0  
			while (s_x.length <= pos_decimal + 2) {  
					s_x += '0';  
			}  
			return s_x;  
 }