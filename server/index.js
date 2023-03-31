require('dotenv').config();//подключает файл с переменными окружения
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');
const errorsHandler = require('./middlewares/ErrorHandlingMiddleware');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());                                            //использовать cors, который нужен для отправки запросов с браузера
app.use(express.json());                                    //возможность парсить json формат
app.use(express.static(path.resolve(__dirname, 'static'))); //возможность использовать статические данные
app.use(fileUpload({}));                                    //для работы с файлами (нужен для подгрузки картинки продукта из data-form)
app.use('/api', router);

//обработка ошибок, поэтому всегда должен быть последним (поэтому там нет вызова next())
app.use(errorsHandler);

const start = async () => {
    try {
        //Подключение базы данных
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));
    } catch(e) {
        console.log(e);
    }
}

start();