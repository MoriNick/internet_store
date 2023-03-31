const {Brand} = require('../models/models');
const ApiError = require('../errors/ApiError');

class brandController {
    async create(req, res) {
        const {name} = req.body;
        const brand = await Brand.create({name});
        return res.status(200).json(brand);
    }

    async getAll(req, res) {
        const brands = await Brand.findAll();
        return res.status(200).json(brands);
    }
}

module.exports = new brandController();