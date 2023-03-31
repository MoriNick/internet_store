import { useState } from 'react';
import {Modal, Button, Form, FormControl} from 'react-bootstrap';
import { createBrand } from '../../http/deviceAPI';

function CreateBrand({show, onHide}) {
    const [value, setValue] = useState('');

    const addBrand = () => {
        createBrand({name: value}).then(data => console.log(data));
        onHide(false);
    }

    return (
        <Modal
            show = {show}
            onHide = {onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить бренд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormControl 
                        placeholder='Введите название бренда'
                        value = {value}
                        onChange = {e => setValue(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => onHide(false)} variant = "outline-danger">Закрыть</Button>
                <Button onClick={addBrand} variant = "outline-success">Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateBrand;