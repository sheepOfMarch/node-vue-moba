module.exports = app => {
    const {
        compareSync
    } = require('bcrypt')


    const express = require('express')
    const router = express.Router()

    const assert = require('http-assert')
    const jwt = require('jsonwebtoken')

    const AdminUser = require('../../models/AdminUser')
    const User = require('../../models/User')

    const authMiddleware = require('../../middleware/auth')

    router.post('/users', async (req, res) => {
        const model = await User.create(req.body)
        res.send(model)
    })

    router.get('/users', authMiddleware(), async (req, res) => {
        const items = await User.find().limit(10)
        res.send(items)
    })

    router.delete('/users/:id', authMiddleware(), async (req, res) => {
        await User.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })


    router.post('/adminUsers', async (req, res) => {
        const model = await AdminUser.create(req.body)
        res.send(model)
    })

    router.get('/adminUsers', authMiddleware(),async (req, res) => {
        const items = await AdminUser.find().limit(10)
        res.send(items)
    })

    router.delete('/adminUsers/:id', authMiddleware(), async (req, res) => {
        await AdminUser.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })


    //登录
    app.post('/admin/api/login', async (req, res) => {
        const {
            username,
            password
        } = req.body
        // 1、根据用户名找用户
        const user = await AdminUser.findOne({
            username
        }).select('+password')

        assert(user, 422, "用户不存在")

        // if (!user) {
        //     return res.status(422).send({
        //         message: "用户不存在"
        //     })
        // }

        // 2、校验密码
        const isValid = compareSync(password, user.password)

        assert(isValid, 422, "密码错误")

        // if (!isValid) {
        //     return res.status(422).send({
        //         message: "密码错误"
        //     })
        // }

        // 3、返回token
        const token = jwt.sign({
            id: user._id
        }, app.get('secret'))
        res.send({
            token: token,
            adminUserName: username
        })
    })


    app.use('/admin/api', router)

    // 错误处理
    app.use(async (err, req, res, next) => {
        console.log(err)
        // res.status(err.status).send({
        //     message: err.message
        // })
    })
}