'use strict';

const moment = require('moment')

const Controller = require('egg').Controller;

class BillController extends Controller {
    async addBill() {
        const { ctx, app } = this;
        // 获取请求中携带的参数
        const { amount, type_id, type_name, date, pay_type, remark = '' } = ctx.request.body;

        // 判空处理，这里前端也可以做，但是后端也需要做一层判断。
        if (!amount || !type_id || !type_name || !date || !pay_type) {
            ctx.body = {
                code: 400,
                msg: '参数错误',
                data: null
            }
        }

        try {
            let user_id
            const token = ctx.request.header.authorization;
            // 拿到 token 获取用户信息
            const decode = await app.jwt.verify(token, app.config.jwt.secret);// 拿到用户信息，后面就可以根据用户信息做一些操作，比如获取用户账单信息，或者添加用户账单信息等等。
            if (!decode) return
            user_id = decode.id
            // user_id 默认添加到每个账单项，作为后续获取指定用户账单的标示。
            // 可以理解为，我登录 A 账户，那么所做的操作都得加上 A 账户的 id，后续获取的时候，就过滤出 A 账户 id 的账单信息。
            const result = await ctx.service.bill.addBill({
                amount,
                type_id,
                type_name,
                date,
                pay_type,
                remark,
                user_id
            });
            ctx.body = {
                code: 200,
                msg: '请求成功',
                data: null
            }
        } catch (error) {
            ctx.body = {
                code: 500,
                msg: '系统错误',
                data: null
            }
        }
    }
    async list() {
        const { ctx, app } = this;
        const { date, page = 1, page_size = 5, type_id = 'all' } = ctx.query;
        try {
            let user_id
            const token = ctx.request.header.authorization;
            const decode = await app.jwt.verify(token, app.config.jwt.secret);
            if (!decode) return
            user_id = decode.id
            const list = await ctx.service.bill.list(user_id);
            const _list = list.filter(item => {
                if (type_id !== 'all') {// 当 type_id 为 all 时，返回所有账单信息
                    return moment((item.date)).format('YYYY-MM') === date && type_id === item.type_id
                }
                return moment((item.date)).format('YYYY-MM') === date
            })
            let listMap = _list.reduce((curr, item) => {
                const date = moment(Number(item.date)).format('YYYY-MM-DD')
                if (curr && curr.length && curr.findIndex(item => item.date === date) === -1) {
                    const index = curr.findIndex(item => item.date === date)
                    curr[index].bill.push(item)
                }
                if (curr && curr.length && curr.findIndex(item => item.date === date) !== -1) {
                    curr.push({
                        date,
                        bill: [item]
                    })
                }
                if (!curr || !curr.length) {
                    curr.push({
                        date,
                        bill: [item]
                    })
                }
                return curr
            }, []).sort((a, b) => moment(b.date) - moment(a.date))
            const filterListMap = listMap.slice((page - 1) * page_size, page * page_size)
            let __list = list.filter(item => moment(Number(item.date)).format('YYYY-MM') == date)
            // 累加计算支出
            let totalExpense = __list.reduce((curr, item) => {
                if (item.pay_type == 1) {
                    curr += Number(item.amount)
                    return curr
                }
                return curr
            }, 0)
            // 累加计算收入
            let totalIncome = __list.reduce((curr, item) => {
                if (item.pay_type == 2) {
                    curr += Number(item.amount)
                    return curr
                }
                return curr
            }, 0)
            ctx.body = {
                code: 200,
                msg: '请求成功',
                data: {
                    totalExpense, // 当月支出
                    totalIncome, // 当月收入
                    totalPage: Math.ceil(listMap.length / page_size), // 总分页
                    list: filterListMap || [] // 格式化后，并且经过分页处理的数据
                }
            }
        } catch (error) {
            ctx.body = {
                code: 500,
                msg: '系统错误',
                data: null
            }
        }
    }
    // 获取账单详情
    async detail() {
        const { ctx, app } = this;
        // 获取账单 id 参数
        const { id = '' } = ctx.query
        // 获取用户 user_id
        let user_id
        const token = ctx.request.header.authorization;
        // 获取当前用户信息
        const decode = await app.jwt.verify(token, app.config.jwt.secret);
        if (!decode) return
        user_id = decode.id
        // 判断是否传入账单 id
        if (!id) {
            ctx.body = {
                code: 500,
                msg: '订单id不能为空',
                data: null
            }
            return
        }

        try {
            // 从数据库获取账单详情
            const detail = await ctx.service.bill.detail(id, user_id)
            ctx.body = {
                code: 200,
                msg: '请求成功',
                data: detail
            }
        } catch (error) {
            ctx.body = {
                code: 500,
                msg: '系统错误',
                data: null
            }
        }
    }

}

module.exports = BillController;
