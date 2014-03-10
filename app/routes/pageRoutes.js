var model = App.model('page');
var marked = require('marked');

exports.show = function show(req,res) {
  var url_name_from_route = req.params.url_name;

  model.Page.find({ url_name: url_name_from_route }, function(err, results){
    if (err) {
      return res.status(422).send('Problem loading the records: ', err.message);
    };
    res.render('pages/show', { page: results[0], md: marked });
  });
};

exports.remove = function remove(req,res) {
  var pageToDelete = req.params.id;

  model.Page.findByIdAndRemove(pageToDelete, function(err, data){
    if (err) {
      return res.status(422).send('Problem deleting the record: ', err.message);
    };
    res.redirect('/');
  });
};