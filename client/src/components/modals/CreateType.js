import { useState } from 'react';
import {Modal, Button, Form, FormControl} from 'react-bootstrap';
import { createType } from '../../http/deviceAPI';

function CreateType({show, onHide}) {
    const [value, setValue] = useState('');

    const addType = () => {
        createType({name: value}).then(data => console.log(data));
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
                    Добавить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormControl 
                        placeholder='Введите название типа'
                        value = {value}
                        onChange = {e => setValue(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => onHide(false)}  variant = "outline-danger">Закрыть</Button>
                <Button onClick={addType}  variant = "outline-success">Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateType;