import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Card, Container, ListGroup, Image, Button } from 'react-bootstrap';
import { Context } from '..';
import { fetchDevicesFromBasket, deleteFromBasket } from '../http/basketAPI';

const Device = ({device, brand, basketId, devices, setDevices}) => {

    const remove = () => {
        deleteFromBasket(device.id, basketId)
            .then(() => {
                let i = null;
                devices.find((item, index) => {
                    if (item.id === device.id) {
                        i = index;
                        return true;
                    }
                })
                if (!i)
                    setDevices(devices.filter((item, index) => index !== i));
            });
    }

    return (
        <div className='d-flex justify-content-between p-2 mb-2' style={{height: 90}}>
            <div className='d-flex align-items-center'>
                <Image width={80} height={90} src={process.env.REACT_APP_API_URL + '/' + device.img}/>
                <div className='ms-2'>
                    {brand.name} {device.name}
                </div>
            </div>
            <div className='d-flex align-items-center'>
                <div className='me-2'>
                    {device.price} руб.
                </div>
                <Button variant='outline-secondary' onClick={remove}>Удалить из корзины</Button>
            </div>
        </div>
    )
}

const Basket = observer(() => {
    const {user, device} = useContext(Context);
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        fetchDevicesFromBasket(user.basketId)
            .then(data => setDevices(data.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container className='d-flex justify-content-center'>
            <Card style={{width: 800}} className = "p-3 mt-3">
                <h2>Корзина</h2>
                {devices.length === 0 ?
                    <h2 className='pt-3'>Корзина пуста</h2>
                    :
                    <div className='d-flex flex-md-column'>
                        <ListGroup variant='flush'>
                            {devices.map((d, index) => 
                                <ListGroup.Item key = {index}>
                                    <Device 
                                        device = {d} 
                                        brand = {device.brands.find(item => item.id === d.brandId)}
                                        basketId = {user.basketId}
                                        devices = {devices}
                                        setDevices = {setDevices}
                                    />
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                        <Button variant='outline-secondary' className='mt-3'>Оформить заказ</Button>
                    </div>
                }
            </Card>
        </Container>
    );
})

export default Basket;
