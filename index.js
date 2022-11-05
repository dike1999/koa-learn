const Koa = require('koa');
const logger = require('./middleware/logger');
const app = new Koa();
app.use(logger());
app.use(async (ctx) => {
	ctx.body = 'Hello';
});
const PORT = 3000;
app.listen(PORT, () => {
	console.log(`project start-quick is starting at http://localhost:${PORT}`);
});
