const Koa = require('koa');
const fs = require('fs');
const logger = require('./middleware/logger');
const Router = require('koa-router');

let home = new Router();
home.get('/', async (ctx) => {
	let html = `
	<ul>
		<li><a href="/page/helloworld">/page/helloworld</a></li>
		<li><a href="/page/404">/page/404</a></li>
	</ul>
`;
	ctx.body = html;
});

// 子路由2
let page = new Router();
page
	.get('/404', async (ctx) => {
		ctx.body = '404 page!';
	})
	.get('/helloworld', async (ctx) => {
		ctx.body = 'helloworld page!';
	})
	.get('/test', async (ctx) => {
		let url = ctx.url;
		// 从上下文的request对象中获取
		let request = ctx.request;
		let req_query = request.query;
		let req_querystring = request.querystring;

		// 从上下文中直接获取
		let ctx_query = ctx.query;
		let ctx_querystring = ctx.querystring;

		ctx.body = {
			url,
			req_query,
			req_querystring,
			ctx_query,
			ctx_querystring,
		};
	});

// 装载所有子路由
let router = new Router();
router.use('/', home.routes(), home.allowedMethods());
router.use('/page', page.routes(), page.allowedMethods());

const app = new Koa();
// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());
app.use(logger());

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`project start-quick is starting at http://localhost:${PORT}`);
});
