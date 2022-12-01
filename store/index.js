import { createStore } from "vuex"
import getters from "./getters"

import app from './modules/app.js'

const debug = process.env.NODE_ENV !== "production"

const store = createStore({
  modules: {
	  app
  },
  getters,
  strict: debug
})

export default store
