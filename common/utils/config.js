let baseUrl = ""

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    baseUrl = 'https://test.guangyi009.com'
		// baseUrl = 'https://www.guangyi009.com'
}else{
	baseUrl = 'https://test.guangyi009.com'
    // 生产环境
    // baseUrl = 'https://www.guangyi009.com'
}

export default baseUrl