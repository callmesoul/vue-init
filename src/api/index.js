import axios from './config'
import user from './user'

let Api = {
  host: axios.defaults.baseURL,
  user:user,
};


export default Api;
