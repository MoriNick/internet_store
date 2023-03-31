import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import TypeBar from '../components/TypeBar';
import { Context } from "..";
import { fetchDevices } from "../http/deviceAPI";
import { observer } from 'mobx-react-lite';

const Shop = observer(() => {
    const {device} = useContext(Context);
    const pages = Math.ceil(device.devicesCount / 5);
    const items = [];

    for (let number = 1; number <= pages; number++)
        items.push(
            <Pagination.Item
                key={number}
                active={number === device.selectedPage}
                onClick = {() => device.setSelectedPage(number)}
            >
                {number}
            </Pagination.Item>,
        );

    useEffect(() => {
        fetchDevices(device.selectedBrand.id, device.selectedType.id, 4, device.selectedPage)
            .then(data => device.setDevices(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [device.selectedPage, device.selectedBrand, device.selectedType])

    return (
        <Container className='mt-3'>
            <Row>
                <Col md = {3}>
                    <TypeBar />
                </Col>
                <Col md = {9}>
                    <BrandBar />
                    <DeviceList />
                    <Pagination className='mt-3'>{items}</Pagination>
                </Col>
            </Row>
        </Container>
    );
})

export default Shop;
