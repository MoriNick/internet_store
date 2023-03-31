import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Image, Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { fetchOneDevice } from '../http/deviceAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { pushDeviceToBasket } from '../http/basketAPI';

const DevicePage = observer(() => {
    const {id} = useParams();
    const {user} = useContext(Context);
    const [device, setDevice] = useState({info: []});
    const [activeButton, setActiveButton] = useState(false);

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addToBasket = () => {
        if (!user.isAuth)
            alert('Для добавления товара в корзину необходимо авторизоваться')
        else if (!activeButton)
            pushDeviceToBasket(user.basketId, device.id)
                .then(() => setActiveButton(true))
        else
            alert('Товар уже добавлен в корзину')
    }

    return (
        <Container className='mt-3'>
            <Row>
                <Col md = {4} className = 'd-flex justify-content-center'>
                    {device.img && <Image height = {350} width = {300} src={process.env.REACT_APP_API_URL + '/' + device.img}/>}
                </Col>
                <Col md = {4}>
                    <h2>{device.name}</h2>
                    <h4
                        style={{cursor: 'pointer', display: 'inline'}}
                    >
                        Rating: {device.rating}
                    </h4>
                    {device.info.length !== 0 &&
                        <Card className='mt-4'>
                            <ListGroup>
                                {device.info.map(item =>
                                    <ListGroupItem
                                        style={{background: item.id % 2 === 0 && 'lightgray'}}
                                        key = {item.id}
                                    >
                                        {item.title}: {item.description}
                                    </ListGroupItem>
                                )}
                            </ListGroup>
                        </Card>
                    }
                </Col>
                <Col md = {4} className = 'd-flex justify-content-center'>
                    <Card style={{width: 300}} className = 'p-5 d-flex flex-sm-column justify-content-between'>
                        <h2 style={{textAlign: 'center'}}>{device.price} руб.</h2>
                        <Button variant='outline-secondary' onClick = {addToBasket}>
                            {activeButton ? 'Товар добавен в корзину' : 'Добавить в корзину'}
                        </Button>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
})

export default DevicePage;
