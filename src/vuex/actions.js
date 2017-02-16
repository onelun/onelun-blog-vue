
import * as types from './mutation-types';

// -------------------------全局---------------------------
/**
 * 设置是否登录
 * */
export const setLoginState = function ({commit}, status) {
  commit(types.SET_LOGIN_STATUS, status);
};
/**
 * 更改后台管理页面是否展开显示
 * */
export const setShowBigAdminStatus = function ({commit}, status) {
  commit(types.SET_SHOW_BIGADMIN_STATUS, status);
};

/**
 * 更改loading状态
 * @param commit
 * @param status
 */
export const setLoadingStatus = function ({commit}, status) {
  commit(types.SET_LOADING_STATUS, status);
};

/**
 * 更改播放器状态
 * @param commit
 * @param status
 */
export const setLockMusicStatus = function ({commit}, status) {
  commit(types.SET_LOCK_MUSIC_STATUS, status);
};
