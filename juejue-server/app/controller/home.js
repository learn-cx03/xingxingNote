const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('index.html', {
      title: 'Hello Egg111',
    })
  }
  async getQuery() {
    const { ctx } = this;
    ctx.body = ctx.query;
  }
  async getParams() {
    const { ctx } = this;
    ctx.body = ctx.params.age;
  }

  async getBody() {
    const { ctx } = this;
    ctx.body = ctx.request.body;
  }

  async getHome(){
    await this.ctx.render('index', {msg:'Hello Egg'});
  }
  
  async getMovieList() {
    let data = await this.ctx.service.home.findMovies()
    this.ctx.body = data.movieList
  }

  async add() {
    const { ctx } = this;
    const { title } = ctx.request.body;
    ctx.body = { title };
  }
  
  async user() {
    const { ctx } = this;
    const result = await ctx.service.home.user()
    ctx.body = result;
  }
  async addUser() {
    const { ctx } = this;
    const { name } = ctx.request.body;
    try {
      const result = await ctx.service.home.addUser(name);
      ctx.body = {
        code: 200,
        data: result,
        message: '添加成功',
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        data: null,
        message: '添加失败',
      };
    }
  }
  async editUser() {
    const { ctx } = this;
    const { id, name } = ctx.request.body;
    try {
      const result = await ctx.service.home.editUser(id, name);
      ctx.body = {
        code: 200,
        data: result,
        message: '修改成功',
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        data: null,
        message: '修改失败',
      };
    }
  }
  async deleteUser() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    try {
      const result = await ctx.service.home.deleteUser(id);
      ctx.body = {
        code: 200,
        data: result,
        message: '删除成功',
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        data: null,
        message: '删除失败',
      };
    }
  }
}

module.exports = HomeController;
