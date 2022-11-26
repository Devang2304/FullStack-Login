const express= require('express');
const router=express.Router();
const bcrypt = require('bcryptjs');

const User =require('../models/User');
//login
router.get('/login',(req,res)=>res.render('login'));

//register 
router.get('/register',(req,res)=>res.render('register'));


router.post('/register',(req,res)=>{
    const {name,email,password,password2}=req.body;

    let errors =[];
    //checking if required fields are filled or not
    if(!name || !email || !password || !password2){
        errors.push({msg: 'Please fill the required fields'});
    }

    //password check
    if(password!==password2){
        errors.push({msg: 'Passwords not matched'});
    }

    if (password.length<6) {
        errors.push({msg: 'Password shoud be of 6 characters'})
    }
    if (errors.length>0) {
        res.render('register',{
            errors,
            email,
            password,
            password2
        });
    } else {
        // validation done
        User.findOne({email:email})
        .then(user => {
            if(user){
                errors.push({msg :'Email already registered'});
                res.render('register',{
                    errors,
                    email,
                    password,
                    password2
                });  
            }
            else{
                const newUser =new User({
                    name,
                    email,
                    password
                });

                //hashing the password
                bcrypt.genSalt(10,(err,salt)=>
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if (err) throw err;

                    newUser.password = hash;    
                    //save the new user
                    newUser.save()
                    .then(user=>{
                        res.redirect('/login');
                    })
                    .catch(err=>console.log(err));
                }))
            }
        });
    }
});

module.exports = router;