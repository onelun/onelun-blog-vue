/**
 * Created by xiangsongtao on 16/7/30.
 * Description: 状态存储
 */
import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import {
  SET_LOGIN_STATUS,
  SET_SHOW_BIGADMIN_STATUS,
  SET_LOADING_STATUS
} from './mutation-types';
// vuex模块
// 告诉 vue “使用” vuex
Vue.use(Vuex);

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  actions,
  // 全局state状态
  state: {
    isLogin: false, // 是否登录
    isShowBigAdmin: false,
    isLoading: false // 是否在刷新中
  },
  // 全局突变事件处理
  mutations: {
    // 设置我的社交弹出组件的img
    [SET_LOGIN_STATUS] (state, status) {
      state.isLogin = !!status;
    },
    [SET_SHOW_BIGADMIN_STATUS] (state, status) {
      state.isShowBigAdmin = !!status;
    },
    [SET_LOADING_STATUS] (state, status) {
      state.isLoading = !!status;
    }

  }
});
