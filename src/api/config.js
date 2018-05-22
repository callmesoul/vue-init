import axios from 'axios';
import store from '../vuex/store'
if(process.env.NODE_ENV=="development"){//测试域名
  axios.defaults.baseURL = "https://qktyd.qk100.com";
}else{//正式域名
  axios.defaults.baseURL = "https://readapi.qk100.com";
}
console.log(store.state.auth.sessionKey);
axios.defaults.headers.common['sessionKey'] = store.state.auth.sessionKey;
// axios.defaults.headers['sessionkey'] = store.state.auth.sessionKey;
import { Indicator } from 'mint-ui';

axios.interceptors.request.use(
  config => {
    Indicator.open('加载中...');
    return config;
  }
);
axios.interceptors.response.use(
  response => {
    Indicator.close();
    return response.data;
  },
  error => {
    Indicator.close();
    if (error.response) {
      if (error.response.status === 403 || error.response.status === 401) {
        alert(error.response.data.error);
        store.commit("LOGOUT_USER");
      }
    }
    return Promise.reject(error.response.data);  // 返回接口返回的错误信息
  }
);

export default axios;
