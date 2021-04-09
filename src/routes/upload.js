const Router = require("koa-router")
const koajwt = require('koa-jwt')
const router = new Router()
const multer = require('@koa/multer')//加载koa-multer模块
const {avatarUpload} = require('../controller/upload')
//验证是否授权
const auth = koajwt({
    'secret': "my_token"
})

//以下是配置
var storage = multer.diskStorage({
	//定义文件保存路径
	destination:function(req,file,cb){
	    cb(null,'./public/');//路径根据具体而定。如果不存在的话会自动创建一个路径
	},                       //注意这里有个，
	//修改文件名
	filename:function(req,file,cb){
	    var fileFormat = (file.originalname).split(".");
    	    cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
	}
})
 
var upload = multer({ storage: storage });
 
 
router.post('/upload',auth,upload.single('file'), avatarUpload)
 

module.exports = router