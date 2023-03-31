const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError = require('../errors/ApiError');
const {User, Basket, BasketDevice} = require('../models/models');

function generateToken(id, email, role, basketId) {
    return jwt.sign(
        {id, email, role, basketId},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class userController {
    async registration(req, res, next) {
        const {email, password, role} = req.body;

        if (!email || !password)
            return next(ApiError.badRequest('Не указан email или password!'));

        const candidate = await User.findOne({where: {email}});
        if (candidate)
            return next(ApiError.badRequest('Пользователь с таким email уже существует!'));

        const hashPassword = await bcrypt.hash(password, 6);
        const user = await User.create({email, role, password: hashPassword});
        const user_basket = await Basket.create({userId: user.id});
        const token = generateToken(user.id, email, user.role, user_basket.id);

        return res.status(200).json({token});
    }

    async login(req, res, next) {
        const {email, password} = req.body;

        const candidate = await User.findOne({where: {email}});
        if (!candidate)
            return next(ApiError.badRequest('Пользователя с таим email не существует!'));
        if (!bcrypt.compareSync(password, candidate.password))
            return next(ApiError.badRequest('Пароль указан неверно!'));

        const userId = candidate.id;
        const user_basket = await Basket.findOne({where: {userId}});
        const token = generateToken(candidate.id, email, candidate.role, user_basket.id);

        return res.status(200).json({token});
    }

    async check(req, res) {
        const token = generateToken(req.user.id, req.user.email, req.user.role, req.user.basketId);
        return res.status(200).json({token});
    }
}

module.exports = new userController();