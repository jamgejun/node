const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
 
const app = new Koa();

app.use(bodyParser());

app.use(async ctx => {
  // the parsed body will store in ctx.request.body
  // if nothing was parsed, body will be an empty object {}
  ctx.body = ctx.request.body;
  console.log(ctx.body.rawBody)
});

app.listen(8080)