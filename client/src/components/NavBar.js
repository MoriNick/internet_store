import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import {Navbar, Container, Nav, Button} from 'react-bootstrap';
import {NavLink, useNavigate} from 'react-router-dom';
import { Context } from '..';
import {SHOP_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE, BASKET_ROUTE} from '../utils/consts';

const NavBar = observer(() => {
    const {user} = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        navigate(SHOP_ROUTE);
    }

    return ( 
        <Navbar bg="dark" variant="dark">
            <Container>
              <NavLink style={{color: 'white', textDecoration: 'none'}} to = {SHOP_ROUTE}>Store</NavLink>
              {user.isAuth ?
                    <Nav className="ml-auto">
                        {user.role === "ADMIN" && 
                            <Button variant='outline-secondary' onClick={() => navigate(ADMIN_ROUTE)}>Админ панель</Button>
                        }
                        <Button variant='outline-secondary' className='ms-2' onClick={() => navigate(BASKET_ROUTE)}>Корзина</Button>
                        <Button variant='outline-secondary' className='ms-2' onClick={logOut}>Выйти</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto">
                        <Button variant='outline-secondary' onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
     );
})

export default NavBar;