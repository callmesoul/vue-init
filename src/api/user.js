import ax from './config'

export default {
  get:function (params) {
    return ax.get("/read/getReadStars.do",{params:params});
  },
}
