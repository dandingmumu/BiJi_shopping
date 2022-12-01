import {
	LOGIN_STATUS,
	USER_INFO,
	UID
} from '@/config/cache'

import Cache from '@/utils/cache.js'

const state = {
	token: Cache.get(LOGIN_STATUS) || false,
	userInfo: {},
	uid: Cache.get(UID) || 0,
}

const mutations = {
	SETPHONESTATUS(state,val){
		state.phoneStatus = val;
	},
	LOGIN(state, opt) {
		state.token = opt.token;
		Cache.set(LOGIN_STATUS, opt.token, opt.time);
	},
	SETUID(state,val){
		state.uid = val;
		Cache.set(UID, val);
	},
	UPDATE_LOGIN(state, token) {
		state.token = token;
	},
	LOGOUT(state) {
		state.token = false;
		state.uid = 0
		// Cache.clear(LOGIN_STATUS);
		// Cache.clear(UID);
	},
	BACKGROUND_COLOR(state, color) {
		state.color = color;
		document.body.style.backgroundColor = color;
	},
	UPDATE_USERINFO(state, val) {
		state.userInfo = val;
		Cache.set(USER_INFO, val);
	},
	OPEN_HOME(state) {
		state.homeActive = true;
	},
	CLOSE_HOME(state) {
		state.homeActive = false;
	},
	FOOT_UPLOAD(state,data){
		state.pageFooter = data
	}
}

export default {
	// namespaced: true,
	state,
	mutations
}