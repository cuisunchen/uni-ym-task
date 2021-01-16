let socketUrl = ''
if(process.env.NODE_ENV === 'development'){
	socketUrl = 'ws://122.51.59.106:9638/webSocket'
	// socketUrl = 'ws://42.194.210.167:9638/webSocket'
}else{
	socketUrl = 'ws://42.194.210.167:9638/webSocket'
}

export default socketUrl