
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/tabBar/goodsHome/goodsHome","pages/subPages/coverPage/coverPage","pages/tabBar/home/home","pages/tabBar/mine/mine","pages/issuePages/choose-ad-type/choose-ad-type","pages/issuePages/business-platform/business-platform","pages/tabBar/goodluck/goodluck","pages/tabBar/friends/friends","pages/subPages/detail/detail","pages/subPages/answerQs/answerQs","pages/subPages/rebate/rebate","pages/subPages/todayProfit/todayProfit","pages/subPages/totalProfit/totalProfit","pages/subPages/totalProfit-day/totalProfit-day","pages/subPages/share/share","pages/subPages/download/download","pages/subPages/luckdraw/luckdraw","pages/subPages/myMessage/myMessage","pages/subPages/collectionAD/collectionAD","pages/subPages/setting/setting","pages/subPages/feedBack/feedBack","pages/subPages/addReply/addReply","pages/subPages/appendReply/appendReply","pages/subPages/addFeedback/addFeedback","pages/subPages/login/login","pages/subPages/details/details","pages/subPages/interest/interest","pages/issuePages/managePublicPage/managePublicPage","pages/issuePages/msgCenter/msgCenter","pages/issuePages/qsFeedback/qsFeedback","pages/issuePages/issueKnow/issueKnow","pages/issuePages/issueQS/issueQS","pages/issuePages/issueGL/issueGL","pages/issuePages/issue-public-page/issue-public-page","pages/issuePages/issue-time-list/issue-time-list","pages/issuePages/recommend-choose-page/recommend-choose-page","pages/issuePages/examples/qs-example-page/qs-example-page","pages/issuePages/examples/gl-example-page/gl-example-page","pages/issuePages/examples/swiper-example-page/swiper-example-page","pages/issuePages/examples/recommend-example-page/recommend-example-page","pages/issuePages/examples/cover-example-page/cover-example-page","pages/issuePages/examples/dialog-example-page/dialog-example-page","pages/issuePages/issue-know-detail/issue-know-detail","pages/issuePages/order-detail/order-detail","pages/issuePages/order-detail/order-detail-QSGL","pages/subPages/xy-middle-page/xy-middle-page","pages/subPages/withdrawal/withdrawal","pages/subPages/setAccount/setAccount","pages/subPages/withdrawalRecord/withdrawalRecord","pages/issuePages/issueRecommend/issueRecommend","pages/subPages/appeal/appeal","pages/subPages/taskDetail/taskDetail","pages/issuePages/issueTask/issueTask","pages/subPages/taskType/taskType","pages/subPages/taskName/taskName","pages/subPages/taskRequirement/taskRequirement","pages/subPages/taskUpload/taskUpload","pages/subPages/taskStep/taskStep","pages/subPages/taskVoucher/taskVoucher","pages/subPages/taskCollectInfo/taskCollectInfo","pages/subPages/myOrder/myOrder","pages/subPages/watchMore/watchMore","pages/subPages/goodsPublicPage/goodsPublicPage","pages/subPages/pinTuanIng/pinTuanIng","pages/subPages/homeSearch/homeSearch","pages/subPages/ptReward/ptReward","pages/subPages/goodsDetail/goodsDetail","pages/subPages/ptMemberList/ptMemberList","pages/subPages/orderDetail/orderDetail","pages/subPages/confirmPT/confirmPT","pages/subPages/addressList/addressList","pages/subPages/addAddress/addAddress","pages/subPages/refundRecord/refundRecord","pages/subPages/HM-search/HM-search","pages/tabBar/easyEarn/easyEarn"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"今日友米","navigationBarBackgroundColor":"#2c405a","backgroundColor":"#f6f6f6"},"tabBar":{"color":"#7A7E83","selectedColor":"#333333","borderStyle":"black","backgroundColor":"#F8F8F8","list":[{"pagePath":"pages/tabBar/goodsHome/goodsHome","iconPath":"static/home@2x.png","selectedIconPath":"static/home_fill@2x.png","text":"首页"},{"pagePath":"pages/tabBar/easyEarn/easyEarn","iconPath":"static/luck@2x.png","selectedIconPath":"static/luck_fill@2x.png","text":"易赚"},{"pagePath":"pages/tabBar/friends/friends","iconPath":"static/group.png","selectedIconPath":"static/group_fill.png","text":"米圈"},{"pagePath":"pages/tabBar/mine/mine","iconPath":"static/people@2x.png","selectedIconPath":"static/people_fill@2x.png","text":"我的"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"今日友米","compilerVersion":"2.9.3","entryPagePath":"pages/tabBar/goodsHome/goodsHome","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/tabBar/goodsHome/goodsHome","meta":{"isQuit":true,"isNVue":true,"isTabBar":true},"window":{"navigationBarTitleText":"首页","bounce":"none","titleNView":false}},{"path":"/pages/subPages/coverPage/coverPage","meta":{},"window":{"bounce":"vertical","titleNView":false}},{"path":"/pages/tabBar/home/home","meta":{"isNVue":true},"window":{"navigationBarTitleText":"问答","bounce":"none","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/tabBar/mine/mine","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","enablePullDownRefresh":true,"bounce":"none","titleNView":false}},{"path":"/pages/issuePages/choose-ad-type/choose-ad-type","meta":{},"window":{"navigationBarTitleText":"选择发布广告类型","bounce":"vertical","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/issuePages/business-platform/business-platform","meta":{},"window":{"navigationBarTitleText":"商户平台","bounce":"vertical","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/tabBar/goodluck/goodluck","meta":{"isNVue":true},"window":{"navigationBarTitleText":"好运","bounce":"none","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/tabBar/friends/friends","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"米圈","enablePullDownRefresh":true,"bounce":"none","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/subPages/detail/detail","meta":{},"window":{"navigationBarTitleText":"详情","bounce":"vertical","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/subPages/answerQs/answerQs","meta":{},"window":{"navigationBarTitleText":"回答问题","bounce":"vertical","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/subPages/rebate/rebate","meta":{},"window":{"navigationBarTitleText":"返利规则","bounce":"vertical","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/subPages/todayProfit/todayProfit","meta":{},"window":{"navigationBarTitleText":"今日收益","bounce":"vertical","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/subPages/totalProfit/totalProfit","meta":{},"window":{"navigationBarTitleText":"全部收益","bounce":"vertical","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/subPages/totalProfit-day/totalProfit-day","meta":{},"window":{"navigationBarTitleText":"每日收益","bounce":"vertical","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/subPages/share/share","meta":{},"window":{"navigationBarTitleText":"分享应用","bounce":"vertical","titleNView":{"backgroundColor":"#2C405A","buttons":[{"text":"分享","fontSize":"14","width":"70px"}]}}},{"path":"/pages/subPages/download/download","meta":{},"window":{"navigationBarTitleText":"您的专属宣传页","bounce":"none","titleNView":{"backgroundColor":"#2C405A","buttons":[{"text":"下载","fontSize":"14","width":"70px"}]}}},{"path":"/pages/subPages/luckdraw/luckdraw","meta":{},"window":{"navigationBarTitleText":"抽奖","bounce":"vertical","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/subPages/myMessage/myMessage","meta":{"isNVue":true},"window":{"navigationBarTitleText":"用户消息","bounce":"none","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/subPages/collectionAD/collectionAD","meta":{"isNVue":true},"window":{"navigationBarTitleText":"收藏","bounce":"none","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/subPages/setting/setting","meta":{},"window":{"navigationBarTitleText":"设置","bounce":"vertical","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/subPages/feedBack/feedBack","meta":{},"window":{"navigationBarTitleText":"我的问题","bounce":"none","titleNView":{"backgroundColor":"#2C405A","buttons":[{"text":"新增反馈","fontSize":"14","width":"90px"}]}}},{"path":"/pages/subPages/addReply/addReply","meta":{},"window":{"navigationBarTitleText":"问题回复","bounce":"vertical","titleNView":{"backgroundColor":"#2C405A","buttons":[{"text":"追加回复","fontSize":"14","width":"90px"}]}}},{"path":"/pages/subPages/appendReply/appendReply","meta":{},"window":{"navigationBarTitleText":"追加回复","bounce":"vertical","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/subPages/addFeedback/addFeedback","meta":{},"window":{"navigationBarTitleText":"问题反馈","bounce":"vertical","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/subPages/login/login","meta":{},"window":{"navigationBarTitleText":"登录","bounce":"vertical","titleNView":false}},{"path":"/pages/subPages/details/details","meta":{"isNVue":true},"window":{"navigationBarTitleText":"详情","navigationBarTextStyle":"black","bounce":"vertical","titleNView":false}},{"path":"/pages/subPages/interest/interest","meta":{},"window":{"navigationBarTitleText":"选择兴趣","bounce":"vertical","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/issuePages/managePublicPage/managePublicPage","meta":{},"window":{}},{"path":"/pages/issuePages/msgCenter/msgCenter","meta":{},"window":{"navigationBarTitleText":"商户消息","bounce":"none","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/issuePages/qsFeedback/qsFeedback","meta":{},"window":{}},{"path":"/pages/issuePages/issueKnow/issueKnow","meta":{},"window":{"navigationBarTitleText":"须知详情","bounce":"vertical","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/issuePages/issueQS/issueQS","meta":{},"window":{"navigationBarTitleText":"问答型","bounce":"vertical","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/issuePages/issueGL/issueGL","meta":{},"window":{"navigationBarTitleText":"好运型","bounce":"vertical","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/issuePages/issue-public-page/issue-public-page","meta":{},"window":{"bounce":"vertical","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/issuePages/issue-time-list/issue-time-list","meta":{},"window":{"navigationBarTitleText":"可发布时间","bounce":"vertical","titleNView":{"backgroundColor":"#2C405A","buttons":[{"text":"确定","fontSize":"14","width":"70px"}]}}},{"path":"/pages/issuePages/recommend-choose-page/recommend-choose-page","meta":{},"window":{"navigationBarTitleText":"发布推荐型广告","bounce":"vertical","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/issuePages/examples/qs-example-page/qs-example-page","meta":{},"window":{"navigationBarTitleText":"问答型示例","bounce":"vertical","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/issuePages/examples/gl-example-page/gl-example-page","meta":{},"window":{"navigationBarTitleText":"好运型示例","bounce":"vertical","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/issuePages/examples/swiper-example-page/swiper-example-page","meta":{},"window":{"navigationBarTitleText":"轮播型示例","bounce":"vertical","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/issuePages/examples/recommend-example-page/recommend-example-page","meta":{},"window":{"navigationBarTitleText":"推荐型示例","bounce":"vertical","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/issuePages/examples/cover-example-page/cover-example-page","meta":{},"window":{"navigationBarTitleText":"封面型示例","bounce":"vertical","titleNView":false}},{"path":"/pages/issuePages/examples/dialog-example-page/dialog-example-page","meta":{},"window":{"navigationBarTitleText":"弹框型示例","bounce":"vertical","titleNView":{"backgroundColor":"#2C405A","buttons":[{"text":"了解更多","fontSize":"14","width":"90px"}]}}},{"path":"/pages/issuePages/issue-know-detail/issue-know-detail","meta":{},"window":{"navigationBarTitleText":"须知详情","bounce":"vertical","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/issuePages/order-detail/order-detail","meta":{},"window":{"navigationBarTitleText":"订单详情","bounce":"vertical","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/issuePages/order-detail/order-detail-QSGL","meta":{},"window":{"navigationBarTitleText":"订单详情","bounce":"vertical","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/subPages/xy-middle-page/xy-middle-page","meta":{},"window":{}},{"path":"/pages/subPages/withdrawal/withdrawal","meta":{},"window":{"navigationBarTitleText":"提现","bounce":"vertical","titleNView":{"backgroundColor":"#2C405A","buttons":[{"text":"记录","fontSize":"14","width":"70px"}]}}},{"path":"/pages/subPages/setAccount/setAccount","meta":{},"window":{"bounce":"vertical","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/subPages/withdrawalRecord/withdrawalRecord","meta":{},"window":{"navigationBarTitleText":"提现记录","bounce":"none","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/issuePages/issueRecommend/issueRecommend","meta":{},"window":{"bounce":"none","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/subPages/appeal/appeal","meta":{},"window":{"navigationBarTitleText":"申诉","bounce":"none","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/subPages/taskDetail/taskDetail","meta":{"isNVue":true},"window":{"navigationBarTitleText":"任务详情","bounce":"none","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/issuePages/issueTask/issueTask","meta":{},"window":{"navigationBarTitleText":"发布任务","bounce":"none","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/subPages/taskType/taskType","meta":{},"window":{"navigationBarTitleText":"任务类型","bounce":"none","titleNView":{"backgroundColor":"#2C405A","buttons":[{"text":"确定","fontSize":"14","width":"70px"}]}}},{"path":"/pages/subPages/taskName/taskName","meta":{},"window":{"navigationBarTitleText":"任务名称","bounce":"none","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/subPages/taskRequirement/taskRequirement","meta":{},"window":{"navigationBarTitleText":"任务要求","bounce":"none","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/subPages/taskUpload/taskUpload","meta":{},"window":{"navigationBarTitleText":"设置任务打开方式","bounce":"none","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/subPages/taskStep/taskStep","meta":{},"window":{"navigationBarTitleText":"任务步骤","bounce":"none","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/subPages/taskVoucher/taskVoucher","meta":{},"window":{"navigationBarTitleText":"用户截图凭证","bounce":"none","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/subPages/taskCollectInfo/taskCollectInfo","meta":{},"window":{"navigationBarTitleText":"用户信息","bounce":"none","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/subPages/myOrder/myOrder","meta":{"isNVue":true},"window":{"navigationBarTitleText":"我的订单","enablePullDownRefresh":false,"bounce":"none","titleNView":{"backgroundColor":"#2C405A","buttons":[{"text":"退款记录","fontSize":"14","width":"80px"}]}}},{"path":"/pages/subPages/watchMore/watchMore","meta":{"isNVue":true},"window":{"navigationBarTitleText":"拼团","enablePullDownRefresh":false,"bounce":"none","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/subPages/goodsPublicPage/goodsPublicPage","meta":{"isNVue":true},"window":{"navigationBarTitleText":"我的拼团","enablePullDownRefresh":false,"bounce":"none","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/subPages/pinTuanIng/pinTuanIng","meta":{"isNVue":true},"window":{"navigationBarTitleText":"拼团中","enablePullDownRefresh":false,"bounce":"none","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/subPages/homeSearch/homeSearch","meta":{},"window":{"navigationBarTitleText":"我的","bounce":"none","titleNView":{"searchInput":{"align":"left","backgroundColor":"#eee","borderRadius":"5px","placeholder":"请输入您所需商品","placeholderColor":"#ccc"}}}},{"path":"/pages/subPages/ptReward/ptReward","meta":{"isNVue":true},"window":{"navigationBarTitleText":"拼团奖励","enablePullDownRefresh":false,"bounce":"none","titleNView":{"backgroundColor":"#2C405A","buttons":[{"text":"分享","fontSize":"14","width":"60px"}]}}},{"path":"/pages/subPages/goodsDetail/goodsDetail","meta":{},"window":{"navigationBarTitleText":"详情","navigationBarTextStyle":"black","enablePullDownRefresh":true,"bounce":"vertical","titleNView":false}},{"path":"/pages/subPages/ptMemberList/ptMemberList","meta":{"isNVue":true},"window":{"navigationBarTitleText":"拼团成员","bounce":"none","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/subPages/orderDetail/orderDetail","meta":{},"window":{"navigationBarTitleText":"订单详情","bounce":"none","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/subPages/confirmPT/confirmPT","meta":{},"window":{"navigationBarTitleText":"确认拼团","bounce":"none","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/subPages/addressList/addressList","meta":{},"window":{"navigationBarTitleText":"收货地址","bounce":"none","titleNView":{"backgroundColor":"#2C405A","buttons":[{"text":"添加地址","fontSize":"14","width":"100px"}]}}},{"path":"/pages/subPages/addAddress/addAddress","meta":{},"window":{"navigationBarTitleText":"添加收货地址","bounce":"none","titleNView":{"backgroundColor":"#2C405A","buttons":[{"text":"保存","fontSize":"14","width":"60px"}]}}},{"path":"/pages/subPages/refundRecord/refundRecord","meta":{"isNVue":true},"window":{"navigationBarTitleText":"退款记录","bounce":"none","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/subPages/HM-search/HM-search","meta":{},"window":{"navigationBarTitleText":"搜索","bounce":"none","titleNView":{"backgroundColor":"#2C405A"}}},{"path":"/pages/tabBar/easyEarn/easyEarn","meta":{"isQuit":true,"isNVue":true,"isTabBar":true},"window":{"navigationBarTitleText":"易赚","bounce":"none","titleNView":{"backgroundColor":"#2C405A"}}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
