const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'test',
        database: 'facial'
    }
});

const app = express();
app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {res.json(db.users)})
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => image.handleApiCall(req, res))


app.listen(3000, () => {
    console.log('app is running on port 3000')
})




// The plan
/*
/ --> res = This is working
/signin  --> POST = success/fail
/register --> POST = success/fail
/profile/:userId --> GET = user
/image --> PUT = user
*/