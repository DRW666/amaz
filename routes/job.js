var express = require('express');
var router = express.Router();
var jobControl = require("../control/job");

//Multer 是一个 node.js 中间件,主要用于上传文件  $ npm install --save multer  
//导入
var multer  = require('multer');

//文件上传的配置项  第一个参数：文件上传后放入那个位置
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/img')
    },
    //文件上传后的文件名称
    filename: function (req, file, cb) {
      cb(null,  Date.now()+"-"+file.originalname)
    }
  })
  //文件上传
  var upload = multer({ storage: storage })

  //上传文件的配置项
  var cpUpload = upload.fields([{ name: 'company_logo', maxCount: 1 }])

//Multer配置完毕在router中使用,只要通过当前路径上传文件，需要使用当前路由
//router是内置中间件可以接收当前文件的配置项
router.post('/addJob', cpUpload, jobControl.addjob);
router.get('/jobList',  jobControl.joblist);
router.get('/jobDelete',  jobControl.jobdelete);
router.post('/jobModify', cpUpload, jobControl.jobmodify);

module.exports = router;