module.exports = function(app) {
  var homeRoutes = App.route('homeRoutes')
  app.get('/',                         homeRoutes.home);
  app.get('/about',                    homeRoutes.about);

  var pageRoutes = App.route('pageRoutes')
  app.get('/page/:url_name',           pageRoutes.show);
  app.get('/delete/:id',               pageRoutes.remove);

  var formRoutes = App.route('formRoutes')
  app.get('/add',                      formRoutes.add);
  app.post('/submit_new',              formRoutes.submitNew);
  app.get('/edit/:id',                 formRoutes.edit);
  app.post('/submit_edit/:id',         formRoutes.submitEdit)

  var loginRoutes = App.route('loginRoutes')
  app.get('/login',                    loginRoutes.login);
}