const { Controller } = require('egg');
const defaultAvatar = 'http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png'

class UserController extends Controller {

    async register() {
        const { ctx } = this;
        const { username, password } = ctx.request.body;
        const userInfo = await ctx.service.user.getUserByName(username);
        if (userInfo && userInfo.id) {
            ctx.body = { code: 0, message: '用户名已存在', data: null  };
            return;
        } else {
            const params = {
                username,
                password,
                signature: '世界和平。',
                avatar: defaultAvatar,
            }
            const result = await ctx.service.user.setRegister(params);
            if (result) {
                ctx.body = { code: 1, message: '注册成功', data: result };
                return;
            } else {
                ctx.body = { code: 0, message: '注册失败', data: null };
                return;
            }

        }

    }

    async login() {
        const { ctx, app } = this;
        const { username, password } = ctx.request.body;
        const userInfo = await ctx.service.user.getUserByName(username);
        console.log('###', userInfo);
        if (!userInfo || !userInfo.id) {
            ctx.body = { code: 0, message: '用户名不存在', data: null };
            returnd
        } 
        if (userInfo && userInfo.password !== password) {
            ctx.body = { code: 0, message: '密码错误', data: null };
            return
        }
        const token = app.jwt.sign({
            id: userInfo.id,
            username: userInfo.username,
            exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24小时过期
        }, app.config.jwt.secret);
        ctx.body = { code: 1, message: '登录成功', data: { token } };
    }
    async test() {
        const { ctx, app } = this;
        const token = ctx.request.header.authorization;
        const decode = app.jwt.verify(token, app.config.jwt.secret);
        ctx.body = { code: 1, message: '登录成功', data: {...decode} };
    }

    async getUserInfo() {
        const { ctx, app } = this;
        const token = ctx.request.header.authorization;
        const decode = app.jwt.verify(token, app.config.jwt.secret);
        const userInfo = await ctx.service.user.getUserByName(decode.username)
        ctx.body = { code: 1, message: '获取成功', data: {
            ...userInfo
        } };
    }
    async editUserInfo() {
        const { ctx, app } = this;
        const { signature = '', avatar = '' } = ctx.request.body;
        try {
            let user_id 
            const token = ctx.request.header.authorization;
            const decode = app.jwt.verify(token, app.config.jwt.secret);
            user_id = decode.id;
            const userInfo = await ctx.service.user.getUserByName(decode.username)
            const result = await ctx.service.user.editUserInfo({...userInfo, signature, avatar});
            ctx.body = { code: 1, message: '修改成功', data: result };
        } catch (error) {
            ctx.body = { code: 0, message: '修改失败', data: null };
        } 
    }
}

module.exports = UserController;