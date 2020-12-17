const { User } = require('../models')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const createError = require('http-errors')

module.exports = class UserController{
    static register(req,res, next) {
        const { email, password } = req.body
        User.create({
            email, password
        })
        .then(user => {
            res.status(201).json({
                id: user.id,
                email: user.email
            })
        })
        .catch(err => {
            next(err)
        })
    }

    static login(req, res, next) {
        const {email, password} = req.body
        User.findOne({
            where: {
                email
            }
        })
        .then(user => {
            if (!user) {
                throw createError(404, 'wrong email / password')
            }
            const validate = bcryptjs.compareSync(password, user.password)
            if (!validate){
                throw createError(404, 'wrong email / password')
            }
            const access_token = jwt.sign({
                id: user.id,
                email: user.email
            }, "mswingfour")
            res.status(200).json(access_token)

        })
        .catch(err => {
            next(err)
        })
    }
}