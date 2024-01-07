const {setJson,getJson} = require("../utility/jsonMethod");
const { v4: uuidv4 } = require('uuid');
uuidv4(); 
const express = require("express")
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const { validationResult } = require("express-validator");

const usersController = {
    register: (req,res)=>{
        res.render("users/register")
    },
    store: (req,res)=>{
        const errors = validationResult(req);

        // if(errors.errors.length > 0){
        //     return res.render("users/register",{
        //         errors: errors.mapped(),
        //         old: req.body
        //     })
        // }

        console.log(req.body);

        if(errors.isEmpty()){
        const users = getJson("usersDataBase")
        const user = req.body
        user.id = uuidv4();
		user.image = req.file.filename
		users.push(user)
        setJson(users,"usersDataBase")
		res.redirect("/")
        } else {
            res.render("users/register",
            {errors: errors.mapped(),
            old: req.body
        })
        }
        
    },
    login:(req,res,next)=>{
        res.render("users/login")
    }
}

module.exports = usersController;