import {
    LOGIN_SUCCESS,
    USERINFO_SUCCESS,
    USERINFO_FAILURE,
    LOGOUT_USER,
    UPDATE_USER_SUCCESS,
    CHANGE_COMMUNITY,
    SET_TRUENAME,
    SET_PHONE,
    UPDATE_USER_INTERGRAL,
    SAVE_NEWSID,
    SAVE_NICESID,
    SAVE_VIDEOID,
    CLEAR_NEWSID,
    CLEAR_NICESID,
    CLEAR_VIDEOID,
    SAVE_NICE_EDIT,
    CLEAR_NICE_EDIT,
    DEDUCTION_INTEGRAL,
} from '../types'

import wx from 'weixin-js-sdk'
import store from '../../vuex/store'
import Vue from 'vue'
import Api from "../../api/index"

const state = {
    token: localStorage.zsnicetoken || null,
    // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEwLCJpYXQiOjE0OTQ2NzY0MTV9.2tBFmrjOWc7CAm9A1Y2rST-_3i3-3oe84QRBHdWhdXE",
    // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIxMiwiaWF0IjoxNTAyNzY2NjM5fQ.KjlNddjYqYMVSxDLPUr5SscyEFwngUj2It8zI0ifE-8"
    user: null,
    newsId: null,
    nicesId: null,
    videoId: null,
    share_title: null,
    share_desc: null,
    nonceStr_str: null,
    timestamp_str: null,
    nices: {},
};

const mutations = {
    [LOGIN_SUCCESS](state, action) {
        state.token = action.token;
    },
    [USERINFO_SUCCESS](state, action) {
        state.user = action.user;
    },
    [USERINFO_FAILURE](state, action) {
        state.user = null
    },
    [LOGOUT_USER](state, action) {
        localStorage.removeItem("zsnicetoken");
        state.user = null;
        state.token = null;
    },
    [UPDATE_USER_SUCCESS](state, action) {
        state.user = action.user
    },
    [CHANGE_COMMUNITY](state, action) {
        state.user.community_id = action.id;
    },
    [SET_TRUENAME](state, action) {
        state.user.truename = action.truename
    },
    [SET_PHONE](state, action) {
        state.user.phone = action.phone
    },
    [UPDATE_USER_INTERGRAL](state, action) {
        state.user.integral = parseInt(state.user.integral) + parseInt(action.integral);
    },
    [SAVE_NEWSID](state, action) { //缓存好人新闻所选项
        state.newsId = action;
    },
    [SAVE_NICESID](state, action) { //缓存好人好事所选项
        state.nicesId = action;
    },
    [SAVE_VIDEOID](state, action) { //缓存视频所选项
        state.videoId = action;
    },
    [SAVE_NICE_EDIT](state, action) {
        state.nices = action;
    },
    [CLEAR_NEWSID](state) { //清除好人新闻所选项
        state.newsId = null;
    },
    [CLEAR_NICESID](state) { //清除好人好事所选项
        state.nicesId = null;
    },
    [CLEAR_VIDEOID](state) { //清除视频所选项
        state.videoId = null;
    },
    [CLEAR_NICE_EDIT](state) {
        state.nices = {};
    },
    [DEDUCTION_INTEGRAL](state, action){ //扣减用户积分
        state.user.integral -= action;
    }
};

export default {
    state,
    mutations,
}