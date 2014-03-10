var model = App.model('page');

exports.home = function home(req,res) {
  model.Page.find(function(err, pages){
    res.render('home/home', { pages: pages, title: 'JadeStack' });
  });
};

exports.about = function about(req,res){
  res.render('home/about', { title: 'About' });
};