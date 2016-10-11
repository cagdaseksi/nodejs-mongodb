var express = require('express');
var router = express.Router();
const Post = require('../models/Post');

/* GET users listing. */
router.get('/', (req, res) => {

res.render('files/index');

});

router.get('/new', (req, res) => {
  res.render('files/new');
});

router.post('/new', (req, res) => {

console.log(req.body);
var multiparty = require('multiparty');
var form = new multiparty.Form();

console.log(form);

  form.parse(req, function(err, fields, files) {

      //res.send("Name:" + fields.name);
      //console.log(files.file[0]);

      var img = files.file[0];
      var fs = require('fs');

      fs.readFile(img.path, function(err,data){

      //var path = "./public/files/" + img.originalFilename;
      var path = "./public/files/" + "filename.jpg";

      fs.writeFile(path,data,function(error){

        if(error)
        console.log(error);

        console.log(data);

        res.send("Upload Success");

      });

    });

  });

});

module.exports = router;
