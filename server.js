const express= require('express');
const mongoose= require('mongoose');
const bodyParser= require('body-parser');
const port=8000;
const app= express();
const User=require('./models/User');
mongoose.connect('mongodb://localhost/userData')

app.use(bodyParser.json());

app.listen(port, ()=>{
	console.log(`server is listening on port:${port}`)
})


function sendResponse(res,err,data){
  if(err){
    res.json({
      success: false,message: err
    })
  } else if (!data){
    res.json({
      success: false, message: 'not found'
    })
  } else {
    res.json({
      success: true, data: data
    })
  }
}
// CREATE
app.post('/users',(req,res)=>{
  User.create(
    {...req.body.newData},
    (err, data) => {sendResponse(res,err,data)}
  )
})

app.route('/users/:id')
// READ
.get((req,res)=>{
  User.findById(req.params.id, (err, data)=>{sendResponse(res,err,data)})
})
// UPDATE
.put((req,res)=>{
  User.findByIdAndUpdate(
    req.params.id,
    {...req.body.newData},
    {
      new: true
    }, (err,data)=>{sendResponse(res,err,data)}
  )
})
// DELETE
.delete((req,res)=>{
  User.findByIdAndDelete(
    req.params.id,
    (err,data)=>{sendResponse(res,err,data)}
  )
})


// per continuare con il tutorial e approfondire:

// Encrypt your user passwords with a library like "bcrypt" before saving them.
// https://www.npmjs.com/package/bcrypt

// Add a nested collection (activities, pets, blog posts, etc... ) to your User model using the "populate" method.
// https://mongoosejs.com/docs/populate.html

// Use a library like JSON web token to authenticate your users in a login route.
// https://www.npmjs.com/package/jsonwebtoken

// Use middleware for your mongoose model or express routes to check if there is a valid token that matches the user's id before saving data.
// https://mongoosejs.com/docs/populate.html
// https://expressjs.com/en/guide/using-middleware.html