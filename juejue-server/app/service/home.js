const Service = require('egg').Service

class HomeService extends Service {
  async findMovies() {
    let response = await this.ctx.curl('https://m.maoyan.com/ajax/movieOnInfoList', {
      method: 'get'
    })
    let data = JSON.parse(response.data)
    return data
  }
  async user() {
    const { ctx, app } = this;
    const QUERY_STR = 'id,name';
    let sql = `SELECT ${QUERY_STR} FROM list`;  
    try {
      const result = await app.mysql.query(sql);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async addUser(name) {
    const { ctx, app } = this;
    try {
      const result = await app.mysql.insert('list', { name });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async editUser(id, name) {
    const { ctx, app } = this;
    try {
      const result = await app.mysql.update('list', { name }, { where: { id } });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async deleteUser(id) {
    const { ctx, app } = this;
    try {
      const result = await app.mysql.delete('list', { id });
      return result
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = HomeService