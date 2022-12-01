import App from './App'

import store from './store'

// 1. 引入你需要的组件
import Vant from 'vant'
// 2. 引入组件样式
import 'vant/lib/index.css'

import Auth from '@/libs/wechat.js'
import Cache from '@/utils/cache.js'
import Tools from '@/utils/tools.js'
import { parseQuery } from "@/utils/utils.js"
import { SPREAD } from '@/config/cache'

let query = parseQuery(),
	urlSpread = query["spread"];

if (urlSpread !== undefined) {
	var spread = Cache.get(SPREAD);
	urlSpread = parseInt(urlSpread);
	if (!Number.isNaN(urlSpread) && spread !== urlSpread) {
		Cache.set("spread", urlSpread || 0);
	} else if (spread === 0 || typeof spread !== "number") {
		Cache.set("spread", urlSpread || 0);
	}
}


// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false

App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3 | H5
import {
	createSSRApp
} from 'vue'

export function createApp() {
	const app = createSSRApp(App).use(Vant)
	
	app.use(store)
	
	app.config.globalProperties.$wechat = Auth
	app.config.globalProperties.$Cache = Cache
	app.config.globalProperties.$Tools = Tools
	
	return {
		app
	}
}
// #endif
