const Koa = require('koa');
const static = require('koa-static');
const multer = require('koa-multer');
const app = new Koa();

const logger = require('./logger')
const router = require('./routes/index')
const koaBody = require('koa-body')({
	multipart: true, // 允许上传多个文件
})

//配置静态资源中间件
app.use(static(__dirname + '/public'));
app.use(koaBody)
// app.use(logger)
router(app)

app.listen(3000, () => {
	console.log('starting at port 3000');
});