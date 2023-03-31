import {Col, Card, Image} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import { DEVICE_ROUTE } from '../utils/consts';

function DeviceItem({device, brandName}) {
    const navigate = useNavigate();

    return ( 
        <Col md = {3} className = 'mt-3'>
            <Card 
                style={{width: 190, cursor: 'pointer'}}
                border = {'light'}
                onClick = {() => navigate(DEVICE_ROUTE + '/' + device.id)}
            >
                <Image width={190} height={200} src={process.env.REACT_APP_API_URL + '/' + device.img}/>
                <div className='d-flex justify-content-between '>
                    <div>{brandName}</div>
                    <div>rating: {device.rating}</div>
                </div>
                <div>{device.name}</div>
            </Card>
        </Col>
    );
}

export default DeviceItem;