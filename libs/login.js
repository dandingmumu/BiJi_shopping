import store from "@/store/index.js"
import Cache from '@/utils/cache.js'
import {  Debounce } from '@/utils/validate.js'

import { isWeixin } from '@/utils/utils.js'

import {
	LOGIN_STATUS,
	USER_INFO,
	EXPIRES_TIME,
	STATE_R_KEY
} from '@/config/cache';

// import Routine from '@/libs/routine';


function prePage() {
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 1];
	// #ifndef APP-PLUS
	return prePage.route;
	// #endif
	// #ifdef APP-PLUS
	return prePage.$page.fullPath;
	// #endif
}

export const toLogin = Debounce(_toLogin, 800)

function _toLogin(push, pathLogin) {
	// #ifdef H5
	if (isWeixin()) {
		if (!uni.getStorageSync('authIng')) {
			store.commit("LOGOUT");
		}
	} else {
		store.commit("LOGOUT");
	}
	// #endif
	// #ifndef H5
	store.commit("LOGOUT");
	// #endif
	let path = prePage();

	// #ifdef H5
	path = location.pathname + location.search;
	// #endif

	if (!pathLogin) pathLogin = '/page/users/index'
	Cache.set('login_back_url', path);
	
	// #ifdef H5
	if (isWeixin()) {
		let urlData = location.pathname + location.search
		if (urlData.indexOf('?') !== -1) {
			urlData += '&go_longin=1';
		} else {
			urlData += '?go_longin=1';
		}
		uni.navigateTo({
			url: '/pages/users/index',
		});

	} else {
		uni.navigateTo({
			url: '/pages/users/index'
		})
	}
	// #endif
}
