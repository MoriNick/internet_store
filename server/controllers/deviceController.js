const {Device, DeviceInfo, BasketDevice} = require('../models/models');
const ApiError = require('../errors/ApiError');
const path = require('path');
const uuid = require('uuid');

class deviceController {
    async create(req, res) {
        let {name, price, brandId, typeId, info} = req.body;
        const {img} = req.files;
        let fileName = uuid.v4() + ".jpg";
        img.mv(path.resolve(__dirname, '..', 'static', fileName));
        const device = await Device.create({name, price, brandId, typeId, img: fileName});

        if (info) {
            info = JSON.parse(info);
            info.forEach(i => {
                DeviceInfo.create({
                    title: i.title,
                    description: i.description,
                    deviceId: device.id
                });
            });
        }

        return res.status(200).json(device);
    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query;
        limit = limit || 5;                 //количество записей на странице
        page = page || 1;                   //текущая страница
        let offset = page * limit - limit;  //сдвиг в списке записей (с какого элемента начинается page страница)
        let devices;

        if (brandId && typeId) {
            devices = await Device.findAndCountAll({where: {brandId, typeId}, limit, offset});
        } else if (brandId && !typeId) {
            devices = await Device.findAndCountAll({where: {brandId}, limit, offset});
        } else if (!brandId && typeId) {
            devices = await Device.findAndCountAll({where: {typeId}, limit, offset});
        } else if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({limit, offset});
        }

        return res.status(200).json(devices);
    }

    async getOne(req, res) {
        const {id} = req.params;
        const device = await Device.findOne({
            where: {id},
            include: [{model: DeviceInfo, as: 'info'}]//дополнительно получить массив характеристик
        })

        res.status(200).json(device);
    }
}

module.exports = new deviceController();