// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import infiniteScroll from 'vue-infinite-scroll'
import Vue2Filters from 'vue2-filters'
import store from './vuex/store'
import we_config from './vuex/we_config.js'


Vue.use(require('vue-wechat-title'));
Vue.use(infiniteScroll);
Vue.use(Vue2Filters)

Vue.filter('moment', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm';
  return moment(value).format(formatString);
});

router.beforeEach((to, from, next) => { //to:目标，from：来源
  if (!store.state.auth.token) { //第一次登录，没有token
    store.dispatch("localLogin", to.fullPath);
  } else {
    if (!store.state.auth.user) { //登录过，第二次登录
      Api.userInfo().then((response) => {
        if (response.status === 200) {
          store.commit("USERINFO_SUCCESS", { user: response.data.user });
          next();
        }
      });
    } else {
      next();
    }
  }
});

router.afterEach((data) => { //在router完成后调用微信config
  var router_name = data.path.split('/')[1];
  if (router_name == 'videoDetail' ||
    router_name == 'newsDetail' ||
    router_name == 'niceDetail') {
    Vue.prototype.we_config();
  } else {
    localStorage.removeItem('share_data');
  }
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
