import React, { useContext, useState } from 'react';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import { Container, Card, Form, FormControl, Row, Button, Col } from 'react-bootstrap';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '..';

const Auth = observer(() => {
    const {user} = useContext(Context);
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const navigate = useNavigate();
    const [userData, setUserData] = useState({email: '', password: ''});

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(userData.email, userData.password);
            } else {
                data = await registration(userData.email, userData.password);
            }
            user.setIsAuth(true);
            user.setUser({
                id: data.id, 
                email: data.email, 
                role: data.role, 
                basketId: data.basketId
            });
            navigate(SHOP_ROUTE);
        } catch(e) {
            alert(e.response.data.message);
        }
    }

    return (
        <Container
            className='d-flex justify-content-center align-items-center'
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 800}} className='p-5'>
                <h2 className='m-auto'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form>
                    <FormControl 
                        className='mt-3'
                        placeholder='Введите email...'
                        value = {userData.email}
                        onChange = {e => setUserData({...userData, email: e.target.value})}
                        onKeyUp = {e => {if (e.key === 'Enter') click()}}
                    />
                    <FormControl 
                        className='mt-3'
                        placeholder='Введите пароль...'
                        type='password'
                        value = {userData.password}
                        onChange = {e => setUserData({...userData, password: e.target.value})}
                        onKeyUp = {e => {if (e.key === 'Enter') click()}}
                    />
                    <Row className='justify-content-between mt-3 ps-3 pe-3'>
                        <Col className='p-0'>
                            {isLogin ?
                                <div>Нет аккаунта? <NavLink to = {REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink></div>
                                :
                                <div>Есть аккаунт? <NavLink to = {LOGIN_ROUTE}>Войди!</NavLink></div>
                            }
                        </Col>
                        <Col className='p-0 d-flex justify-content-end'>
                            <Button onClick={click} variant='outline-success'>{isLogin ? 'Войти' : 'Зарегистрируйся'}</Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
})

export default Auth;
