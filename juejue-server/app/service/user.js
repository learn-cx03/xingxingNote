const Service = require('egg').Service;

class UserService extends Service {
  async getUserByName(username) {
    const { app } = this;
    try {
      const result = await app.mysql.get('user', { username });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async setRegister(params) {
    const { app } = this;
    try {
      const result = await app.mysql.insert('user', insert);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async editUserInfo(params) {
    const { ctx, app } = this;
    try {
        let result = await app.mysql.update('user', params, {where: {id: params.id }});
        return result
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
}

module.exports = UserService;
