import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Row } from "react-bootstrap";
import { Context } from "..";
import DeviceItem from './DeviceItem';

const DeviceList = observer(() => {
    const {device} = useContext(Context);

    return (
        <Row className="mt-3">
            {device.devices.map(d =>
                <DeviceItem 
                    key={d.id} 
                    device = {d} 
                    brandName = {device.brands.find(item => item.id === d.brandId).name}
                />
            )}
        </Row>
    );
})

export default DeviceList;