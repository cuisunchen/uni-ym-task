import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import {request,uploadRequest,unencryp} from './common/utils/request.js'
import {showToast,navigateTo} from 'common/utils/tools.js'
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
Vue.component('mescroll-body', MescrollBody)

import uView from "uview-ui";
Vue.use(uView);

import G_show_modal from '@/components/G_show_modal/g_show_modal.js'
Vue.use(G_show_modal)

import {checkQS,checkGL,checkPublic,checkRecommend} from 'common/utils/validate.js'
Vue.prototype.checkQS = checkQS
Vue.prototype.checkGL = checkGL
Vue.prototype.checkPublic = checkPublic
Vue.prototype.checkRecommend = checkRecommend

Vue.config.productionTip = false

Vue.prototype.$unencryp = unencryp

Vue.prototype.$request = request
Vue.prototype.$upload = uploadRequest

Vue.prototype.showToast = showToast
Vue.prototype.navigateTo = navigateTo

App.mpType = 'app'

const app = new Vue({
	...App,store
})
app.$mount()
