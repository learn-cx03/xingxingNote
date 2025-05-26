module.exports = (options, app) => {
    return async (ctx, next) => {
      // 1.获取客户端的请求信息
      let userAgent = ctx.get('user-agent')
      // 2.判断客户端是否是谷歌浏览器
      let flag = options.ua.test(userAgent)
      if (flag) {
        ctx.status = 401
        ctx.body = '不支持当前的浏览器'
      } else {
        next()
      }
    }
  }