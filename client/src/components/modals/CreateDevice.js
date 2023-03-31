import { useContext, useState, useRef } from 'react';
import {Modal, Button, Form, FormControl, Dropdown, ListGroup, Card} from 'react-bootstrap';
import { Context } from '../..';
import { createDevice } from '../../http/deviceAPI';

function InfoAdder({info, setInfo}) {
    const inputsInfo = useRef();

    const addInfo = () => {
        const newInfoItem = {
            id: info.length,
            title: inputsInfo.current.childNodes[0].value,
            description: inputsInfo.current.childNodes[1].value
        }
        
        setInfo([...info, newInfoItem]);
        inputsInfo.current.childNodes[0].value = '';
        inputsInfo.current.childNodes[1].value = '';
    }

    return (
        <Card className='mt-3 p-3'>
            <div ref = {inputsInfo}>
                <FormControl placeholder='Введите название характеристики'/>
                <FormControl placeholder='Введите параметр характеристики' className='mt-3'/>
            </div>
            <Button variant='outline-secondary' className='mt-3' onClick={addInfo}>Добавить характиристику</Button>
        </Card>
    )
}

function InfoList({info, setInfo}) {
    const deleteInfo = (item) => {
        const newInfo = info.filter(elem => elem.id !== item.id);
        setInfo(newInfo);
    }

    return (
        <ListGroup className='mt-3'>
            {info.map(item => 
                <ListGroup.Item key={item.id} className = 'd-flex justify-content-between align-items-center'>
                    <div>
                        {item.title}: {item.description}
                    </div>
                    <Button onClick = {() => deleteInfo(item)}>Удалить запись</Button>
                </ListGroup.Item>
            )}
        </ListGroup>
    )
}

function CreateDevice({show, onHide}) {
    const {device} = useContext(Context);
    const [typeToggle, setTypeToggle] = useState({id: -1, name: 'Выберите тип'});
    const [brandToggle, setBrandToggle] = useState({id: -1, name: 'Выберите бренд'});
    const [infoArr, setInfo] = useState([]);
    const namePriceImg = useRef();

    const addDevice = (request) => {
        createDevice(request).then(data => onHide(false));
    }

    const checkParams = () => {
        if (typeToggle.id === -1) alert('Выберите тип устройства');
        else if (brandToggle.id === -1) alert('Выберите бренд устройства');
        else if (!namePriceImg.current.childNodes[0].value) alert('Введите название устройства');
        else if (!namePriceImg.current.childNodes[1].value) alert('Введите цену устройства');
        else if (!namePriceImg.current.childNodes[2]) alert ('Выберите фотографию устройства');
        else {
            const formData = new FormData();
            formData.append('name', namePriceImg.current.childNodes[0].value);
            formData.append('price', namePriceImg.current.childNodes[1].value);
            formData.append('brandId', `${brandToggle.id}`);
            formData.append('typeId', `${typeToggle.id}`);
            formData.append('img', namePriceImg.current.childNodes[2].files[0]);
            formData.append('info', JSON.stringify(infoArr));
            addDevice(formData);
        }
    }

    return (
        <Modal
            show = {show}
            onHide = {onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <div className='d-flex'>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {typeToggle.name}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {device.types.map(type => 
                                    <Dropdown.Item 
                                        key = {type.id}
                                        onClick = {() => setTypeToggle({id: type.id, name: type.name})}
                                    >
                                        {type.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown className='ms-2'>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {brandToggle.name}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {device.brands.map(brand => 
                                    <Dropdown.Item 
                                        key = {brand.id}
                                        onClick = {() => setBrandToggle({id: brand.id, name: brand.name})}
                                    >
                                        {brand.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div ref = {namePriceImg}>
                        <FormControl placeholder='Введите название устройства' className='mt-3'/>
                        <FormControl placeholder='Введите цену устройства' type='number' className='mt-3'/>
                        <FormControl type = "file" className='mt-3'/>
                    </div>
                    {infoArr.length !== 0 && <InfoList info = {infoArr} setInfo = {setInfo}/>}

                    <InfoAdder info = {infoArr} setInfo = {setInfo}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    onClick={() => onHide(false)} 
                    variant = "outline-danger"
                >
                    Закрыть
                </Button>
                <Button 
                    onClick={checkParams} 
                    variant = "outline-success"
                >
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateDevice;