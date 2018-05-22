// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import infiniteScroll from 'vue-infinite-scroll'
import Vue2Filters from 'vue2-filters'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Snotify, { SnotifyPosition } from 'vue-snotify';
import fundebug from 'fundebug-javascript'

import 'swiper/dist/css/swiper.css'
import api from './api/index'

import store from './vuex/store'

import filter from './filter'//引入过滤器
Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key])
})


Vue.use(Snotify,{position: SnotifyPosition.rightBottom});//toast组件
Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.use(require('vue-wechat-title'));
Vue.use(infiniteScroll);
Vue.use(Vue2Filters)

Vue.prototype.api=api;//挂载api接口


/*  fundebug 前端 监控  开始   https://www.fundebug.com/  */
fundebug.apikey = "c8fdfcc8e825f57a4f1b955ff6e64e79444773916362dd4f3e4052ae5a585158";
function formatComponentName(vm) {
  if (vm.$root === vm) return 'root';

  var name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name;
  return (name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '');

}
Vue.config.errorHandler = function(err, vm, info) {
  if(process.env.NODE_ENV === 'production'){
    var componentName = formatComponentName(vm);
    var propsData = vm.$options && vm.$options.propsData;

    fundebug.notifyError(err,
      {
        metaData:
          {
            componentName: componentName,
            propsData: propsData,
            info: info
          }
      });
  }
};
/*  fundebug 前端 监控  结束 */




/**** ****** *******  **** ****** ** *****/
/*              路由拦截                    */
/**** ****** *******  **** ****** ** *****/
router.beforeEach(async (to, from, next) => { //to:目标，from：来源
  if(to.name=="login"){
    next();
  }else {
    if(store.state.auth.sessionKey){
      if(store.state.auth.user){
        next();
      }else {
        let res=await api.user.getUserInfo();
        console.log("getUserinfo:",res);
        store.commit("USERINFO_SUCCESS",{user:res.data});
        console.log("store.state.auth:",store.state.auth);
        next();
      }
    }else{
      // next({path:"/login"});
      next();
    }
  }
});



//设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
