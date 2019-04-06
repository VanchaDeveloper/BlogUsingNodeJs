const express=require('express');
const path= require('path');
const expressEdge=require('express-edge');
const mongoose=require('mongoose');
const app=new express();
const Post =require('./database/models/Post');
const bodyParser=require('body-parser');
const fileUpload = require("express-fileupload");
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const auth = require("./middleware/auth");
const edge = require("edge.js");


const connectFlash = require("connect-flash");

mongoose.connect("mongodb://localhost:27017/nodeBlogDB", { useNewUrlParser: true });
var db=mongoose.connection;

const mongoStore = connectMongo(expressSession);

app.use(expressSession({
    secret: 'secret',
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}));

const createPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const createUserController = require("./controllers/createUser");
const storeUserController = require('./controllers/storeUser');
const loginController = require("./controllers/login");
const loginUserController = require('./controllers/loginUser');
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated')
const logoutController = require("./controllers/logout");

app.use(fileUpload());

app.use(express.static('public'));
app.use(expressEdge);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(connectFlash());
app.set('views' ,`${__dirname}/views`);

const storePost = require('./middleware/storePost');
app.use('/posts/store', storePost);

app.use(expressSession({
    secret: 'secret'
}));

app.use('*', (req, res, next) => {
    edge.global('auth', req.session.userId)
    next()
});

app.get("/", homePageController);
app.get("/post/:id", getPostController);
app.get("/posts/new" ,createPostController);
app.post("/posts/store", auth, storePost, storePostController);
app.get("/auth/login", redirectIfAuthenticated, loginController);
app.post("/users/login", redirectIfAuthenticated, loginUserController);
app.get("/auth/register", redirectIfAuthenticated, createUserController);
app.post("/users/register", redirectIfAuthenticated, storeUserController);
app.get("/auth/logout", logoutController);

app.listen(3000 , ()=>{
  console.log('App listening on port 3000');
});
