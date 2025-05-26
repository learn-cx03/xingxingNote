/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const __jwt = middleware.jwtErr(app.config.jwt.secret);
  let clientCheck = app.middleware.clientCheck({ ua: /Chrome/ });
  router.get('/', controller.home.index);
  router.get('/register/:name/:age', controller.home.getParams);
  router.post('/login', controller.home.getBody);
  router.get('/home', clientCheck, controller.home.getHome);
  router.get('/movies', controller.home.getMovieList);
  router.post('/add', controller.home.add);
  router.get('/user', controller.home.user);
  router.post('/add_user', controller.home.addUser);
  router.post('/edit_user', controller.home.editUser);
  router.post('/delete_user', controller.home.deleteUser);
  router.post('/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  router.get('/api/user/get_userInfo', __jwt, controller.user.getUserInfo);
  router.get('/api/user/test', __jwt, controller.user.test);
  router.post('/api/user/edit_userInfo', __jwt, controller.user.editUserInfo);
  router.post('/api/upload', controller.upload.upload);
  router.post('/api/bill/add_bill', controller.bill.addBill);
  router.get('/api/bill/list', controller.bill.list);
};
