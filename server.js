const express= require('express');
const bodyParser= require('body-parser');
const cors= require('cors');
const bcrypt = require('bcrypt');
const register= require('./controllers/register.js');
const signin= require('./controllers/signin.js');
const profile= require('./controllers/profile.js');
const image= require('./controllers/image.js');
var knex = require('knex');

const db= knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'alohomorapostgresql',
    database : 'node'
  }
});

const app= express();

app.use(bodyParser.json());
app.use(cors());


app.get('/', function(req,res){
	res.send(database.users);
})
app.post('/signin', (req,res)=>{signin.signinHandler(req,res,bcrypt,db)});

app.post('/register', (req,res)=>{register.registerHandler(req,res,bcrypt,db)});

app.get('/profile/:id', (req,res)=>{profile.profileHandler(req,res,db)});

app.put('/image', (req,res)=>{image.imageHandler(req,res,db)});
app.post('/imageApi', (req,res)=>{image.imageApiHandler(req,res)});

app.listen(2000);