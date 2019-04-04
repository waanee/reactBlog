require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const api = require('./api');

const mongoose = require('mongoose');

const {
    PORT: port=4000,
    MONGO_URI: mongo_URI
} = process.env;

mongoose.Promise = global.Promise;
mongoose.connect(mongo_URI,{useNewUrlParser:true}).then(()=>{
    console.log('connected to mongodb');
}).catch((e)=>{
    console.log(e);
})

const app = new Koa();
const router = new Router();

router.use('/api', api.routes());

app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, ()=>{
   console.log('listening to port 4000'); 
});