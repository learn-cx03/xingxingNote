const Service = require('egg').Service;

class BillService extends Service {
    async addBill(params) {
        const { app } = this;
        try {
            const result = await app.mysql.insert('bill', params);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async list(id) {
        const { ctx, app } = this;
        const QUERY_STR = 'id, amount, type_id, type_name, date, pay_type, remark';
        let sql = `SELECT ${QUERY_STR} FROM bill WHERE user_id = ${id}`;
        try {
            const result = await app.mysql.query(sql);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
module.exports = BillService;