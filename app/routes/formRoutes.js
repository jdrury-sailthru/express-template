var model = App.model('page');
var marked = require('marked');

exports.add = function add(req,res) {
  res.render('forms/blank_form');
};

exports.submitNew = function submit(req,res) {
  var generateUrlName = function(name) {
    if (typeof name != "undefined" && name !== "") {
      return name.replace(/[\s]/ig,"_").replace(/[^\w]/ig,"");
    } else {
      return Math.random().toString(36).substring(2,7);
    }
  };

  var title     = req.body.title
    , body      = req.body.body
    , url_name  = generateUrlName(title)
    , page      = new model.Page({
      'title'   : title,
      'body'    : body,
      'url_name': url_name
  });
  page.save();
  res.redirect('/page/' + url_name)
};

exports.edit = function edit(req,res) {
  var editId = req.params.id;

  model.Page.findOne({ '_id': editId }, function(err, pageById){
  if (err) {
    return res.status(422).send('Problem loading the records: ', err.message);
  };
    res.render('forms/edit_form', { page: pageById });
  });
};

exports.submitEdit = function submitEdit(req,res) {
  var newTitle = req.body.title
    , newBody  = req.body.body
    , editId = req.params.id;

  model.Page.findByIdAndUpdate(editId, { title: newTitle, body: newBody }, function(err, page){
    if (err) {
      return res.status(422).send('Problem loading the records: ', err.message);
    };
    page.save();
    res.redirect('/page/' + page.url_name);
  });
};