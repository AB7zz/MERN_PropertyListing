import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Connection from './db.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import multer from 'multer'
import path from 'path'
import Bcrypt from 'bcryptjs'

// const express = require('express')
// const dotenv = require('dotenv')
// const mongoose = require('mongoose')
// const cors = require('cors')
// const bodyParser = require('body-parser')
// const multer = require('multer')
// const path = require('path')
// const Connection = require('./db')

dotenv.config()

const PORT = 9000
const app = express()
const username = process.env.AB7_USERNAME
const password = process.env.AB7_PASSWORD
const router = express.Router()
Connection(username, password)
app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`))
app.use(bodyParser.json({extended: true}))
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/', router)

const accountSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    }, 
    password: {
        type: String,
        required: true
    }
})
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    devName: {
        type: String,
        required: true
    },
    devLogo: {
        type: String,
        required: true
    },
    image: [{
        type: String,
        required: true
    }],
    location: {
        type: String,
        required: true
    },
    beds: {
        type: Number,
        required: true
    },
    baths: {
        type: Number,
        required: true
    },
    sqft: {
        type: Number,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true
    }
    // We will add amenities and images afterwards 
},{timestamps: true})
const Posts = mongoose.model('Posts', postSchema)
const Accounts = mongoose.model('Accounts', accountSchema)
const __dirname = path.resolve(path.dirname(''));
app.use('/images', express.static(path.join(__dirname, '/images')))
const devImgStorage = multer.diskStorage({
    destination: 'images', 
    filename: (request, file, callback) => {
        callback(null, request.body.name)
    }
})
const prodImgStorage = multer.diskStorage({
    destination: 'images', 
    filename: (request, file, callback) => {
        callback(null, request.body.prodImages.name)
    }
})
const devImgUpload = multer({storage: devImgStorage})
const prodImgUpload = multer({storage: prodImgStorage})


app.post('/devImgUpload', devImgUpload.single('file'), (request, response) => {
    response.status(200).json('File has been uploaded')
})

app.post('/prodImgUpload', prodImgUpload.array('prodImages', 5), (request, response) => {
    response.status(200).json('File has been uploaded')
})


router.post('/register', async(request, response) => {
    try {
        const existsignup = await Accounts.findOne({email: request.body.email})
        if(existsignup){
            response.send({message: 'Account already exists'})
        }
        request.body.password = Bcrypt.hashSync(request.body.password, 10)
        const user = request.body
        const newUser = new Accounts(user)
        await newUser.save()
        response.send({message: 'You have successfully created an account'})
    } catch (error) {
        console.log('Error 1: ', error.message)
    }
})

router.post('/login', async(request, response) => {
    try {
        const existlogin = await Accounts.findOne({email: request.body.email})
        if(existlogin){
            const userPassword = existlogin.password
            const hash = Bcrypt.compareSync(request.body.password, userPassword)
            if(hash){
                response.send({message: `${request.body.email} has successfully logged in`, isLogin: true, useremail: `${request.body.email}`})
            }else{
                response.send({message: 'You have entered the wrong password!', isLogin: false}) 
            }
        } else{
            response.send({message: 'This account does not exist in the database', isLogin: false})
        }
    } catch (error){
        console.log('Error 4: ', error.message)
    }
})

router.post('/post', async(request, response) => {
    try{
        const newPost = new Posts(request.body)
        const savePost = await newPost.save()
        response.status(200).json(savePost)
    }catch(error){
        response.status(500).json(error)
        console.log('Error 23: ', error.message)
    }
})

router.put('/edit/:id', async(request, response) => {
    try{
        console.log(request.params.id)
        const updatePost = await Posts.findByIdAndUpdate(
            request.params.id,
            {
                $set: request.body
            },
            { new: true }
        )
        response.status(200).json(updatePost)
    }catch(error){
        response.status(500).json(error)
        console.log('Error 11: ', error.message)
    }
})

router.delete("/delete/:id", async (request, response) => {
    try{
        const post = await Posts.findById(request.params.id)
        await post.delete()
        response.status(200).json(post)
    }catch(error){
        response.status(500).json(error)
        console.log('Error 13: ', error.message)
    }
})

router.get('/post', async(request, response) => {
    try{
        // console.log(request)
        const posts = await Posts.find()
        response.status(200).json(posts)
    }catch(error){
        response.status(500).json(error)
        console.log('Error 32: ', error.message)
    }
})

router.get('/post/:id', async(request, response) => {
    try{
        const post = await Posts.findById(request.params.id)
        response.status(200).json(post)
    }catch(error){
        response.status(500).json(error)
        console.log('Error 24: ', error.message)
    }
})