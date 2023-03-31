const { BasketDevice, Basket, Device } = require('../models/models');
const ApiError = require('../errors/ApiError');

class BasketController {
    async createBasketDevice(req, res) {
        const {basketId, deviceId} = req.body;

        const basket_device = await BasketDevice.create({basketId, deviceId});
        res.status(200).json(basket_device);
    }

    async getDevices(req, res) {
        const {basketId} = req.query;

        const basketDevices = await BasketDevice.findAll({where: {basketId}});
        let devices = [];
        let id = null;
        let device = {};
        for (let i = 0; i < basketDevices.length; i++) {
            id = basketDevices[i].deviceId;
            device = await Device.findOne({where: {id}});
            devices.push(device);
        }
        
        res.status(200).json(devices);
    }

    async deleteBasketDevice(req, res) {
        const {basketId, deviceId} = req.query;

        const basketDevice = await BasketDevice.findOne({where: {basketId, deviceId}});
        basketDevice.destroy();

        res.status(200).json(basketDevice);
    }
}

module.exports = new BasketController();