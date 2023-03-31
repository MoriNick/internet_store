import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import CreateBrand from '../components/modals/CreateBrand';
import CreateDevice from '../components/modals/CreateDevice';
import CreateType from '../components/modals/CreateType';

function Admin() {
    const [typeVisible, setTypeVisible] = useState(false);
    const [brandVisible, setBrandVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);

    return (
        <Container className='d-flex flex-column'>
            <Button 
                variant='outline-secondary' 
                className='mt-3 p-2'
                onClick={() => setDeviceVisible(true)}
            >
                Добавить устройство
            </Button>
            <Button 
                variant='outline-secondary' 
                className='mt-3 p-2'
                onClick={() => setTypeVisible(true)}
            >
                Добавить тип
            </Button>
            <Button 
                variant='outline-secondary' 
                className='mt-3 p-2'
                onClick={() => setBrandVisible(true)}
            >
                Добавить бренд
            </Button>
            <CreateBrand show={brandVisible} onHide={setBrandVisible}/>
            <CreateDevice show={deviceVisible} onHide={setDeviceVisible}/>
            <CreateType show={typeVisible} onHide={setTypeVisible}/>
        </Container>
    );
}

export default Admin;
