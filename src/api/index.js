import axios from 'axios';
import VueAxios from 'vue-axios'
import Vue from 'vue'
Vue.use(axios, VueAxios);
import { Indicator } from 'mint-ui';
import store from '../vuex/store'
axios.interceptors.request.use(
  config => {
    Indicator.open('加载中...');
    if (store.state.auth.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers['zsnice-token'] = store.state.auth.token;
    }
    return config;
  }
);
axios.interceptors.response.use(
  response => {
    Indicator.close();
    return response;
  },
  error => {
    Indicator.close();
    if (error.response) {
      if (error.response.status === 403 || error.response.status === 401) {
        alert(error.response.data.error);
        store.commit("LOGOUT_USER");
        store.dispatch("localLogin");
      }
    }
    return Promise.reject(error.response.data);  // 返回接口返回的错误信息
  }
);

let base = "http://api.zsnice.cn";  //正式库
// let base = "http://localhost:7001"; //测试库
// let base = "http://192.168.2.112:7001"; //测试库

let Api = {
  host: base,
  userInfo: function () {
    return axios.post(base + '/api/v1/userInfo');
  },

  authUserOpenId: function () { //获取openid，access_token, ticket
    return axios.get(base + '/auth/openid');
  },
  sendError: function (params) {
    return axios.post(base + '/api/v1/error', params);
  },

  //新闻
  getBannerAll: function () {
    return axios.get(base + "/api/v1/banner/all");
  },
  getNews: function (params) {
    return axios.get(base + "/api/v1/news", { params: params });
  },
  detailNews: function (id) {
    return axios.get(base + "/api/v1/news/" + id);
  },

  //滚动信息
  getRollAll: function () {
    return axios.get(base + "/api/v1/roll/all");
  },

  //视频
  getVideo: function (params) {
    return axios.get(base + "/api/v1/video", { params: params });
  },
  detailVideo: function (videoId, userId) { //获取所选好人好事
    return axios.get(base + "/api/v1/videoDetail?videoId=" + videoId + "&userId=" + userId);
  },
  addVideoLookCount: function (id) {
    return axios.post(base + '/api/v1/video/lookcount', { videoId: id })
  },
  videoComment: function (params) {
    return axios.post(base + '/api/v1/videoComment', params);
  },
  createVideoReport: function (params) {
    return axios.post(base + '/api/v1/videoReport', params);
  },

  //好事
  getNices: function (params) {
    return axios.get(base + "/api/v1/nices", { params: params });
  },
  nicePraised: function (id) { //点赞
    return axios.post(base + `/api/v1/nices/praise/` + id);
  },
  niceComment: function (params) { //发表评论
    return axios.post(base + '/api/v1/nicesComment', params);
  },
  // detailNices:function (id) { //获取所选好人好事
  //   return axios.get(base+"/api/v1/nices/"+id);
  // },
  detailNices: function (niceId, userId) { //获取所选好人好事
    return axios.get(base + "/api/v1/nicesDetail?nicesId=" + niceId + "&userId=" + userId);
  },
  getAllNices_titles: function () {
    return axios.get(base + "/api/v1/nicesTitles/all");
  },
  getAllNices_type: function () { //获取全部类型
    return axios.get(base + "/api/v1/nicesType/all");
  },
  createNice: function (params) {
    return axios.post(base + "/api/v1/nices", params);
  },
  updateNice: function (id, params) {
    return axios.put(base + "/api/v1/nices/" + id, params);
  },
  removeNice: function (id) {
    return axios.delete(base + "/api/v1/nices/" + id);
  },

  checkHasIndexNicesId: function (id) { //查询上一次查看的好事是否还存在
    return axios.get(base + "/api/v1/nicesIndex?nicesId=" + id);
  },
  checkHasIndexNewsId: function (id) { //查询上一次查看的新闻是否还存在
    return axios.get(base + "/api/v1/newsIndex?newsId=" + id);
  },
  checkHasIndexVideoId: function (id) { //查询上一次查看的视频是否还存在
    return axios.get(base + "/api/v1/videoIndex?videoId=" + id);
  },


  getTown: function () {
    return axios.get(base + "/api/v1/towns");
  },
  getCommunity: function () {
    return axios.get(base + '/api/v1/communitys/all');
  },
  getCommunitys: function (params) {
    return axios.get(base + '/api/v1/communitys', { params: params });
  },
  detailCommunitys: function (id) {
    return axios.get(base + '/api/v1/communitys/' + id);
  },
  joinCommunitys: function (params) {
    return axios.post(base + '/api/v1/communitys/join', params);
  },
  getNicesRank: function (params) {
    return axios.get(base + '/api/v1/rank/user', { params: params });
  },
  getCommunityRank: function (params) {
    return axios.get(base + '/api/v1/rank/community', { params: params });
  },
  singleUpload: function (params) {
    return axios.post(base + `/api/v1/upload/image`, params)
  },
  userIntegral: function (id, params) {
    return axios.get(base + `/api/v1/user/integral/` + id, { params: params })
  },

  createNiceReport: function (params) {
    return axios.post(base + '/api/v1/nicesreport', params);
  },
  getCompany: function (params) {
    return axios.get(base + '/api/v1/company', { params: params });
  },
  detailCompany: function (id) {
    return axios.get(base + '/api/v1/company/' + id);
  },

  //商城
  getMerchantInfo: function (params) {
    return axios.get(base + '/api/v1/merchantInfo', { params: params });
  },
  getMerchant: function (params) {
    return axios.get(base + '/api/v1/merchant', { params: params });
  },
  getMerchant_goods: function (params) { //获取商品
    return axios.get(base + '/api/v1/merchantGoods', { params: params });
  },
  getMerchant_goodsDetail: function (merchant_id, id) { //获取商品
    return axios.get(base + '/api/v1/merchantGoodsDetail?audit_id=' + id + '&merchant_id=' + merchant_id + '&user_id=' + store.state.auth.user.id);
  },

  //已购商品
  getUserPurchased: function (params) {
    return axios.get(base + '/api/v1/userPurchased', { params: params });
  },
  createUserPurchased: function (params) {
    return axios.post(base + '/api/v1/userPurchased', params);
  },
};


export default Api;
