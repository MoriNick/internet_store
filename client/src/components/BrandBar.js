import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { Context } from "..";

const BrandBar = observer(() => {
    const {device} = useContext(Context);
    return (
        <ListGroup horizontal>
            {device.brands.map(brand =>
                <ListGroupItem
                    style = {{cursor: 'pointer'}}
                    active = {brand.id === device.selectedBrand.id}
                    onClick = {() => device.setSelectedBrand(brand)}
                    key = {brand.id}
                >
                    {brand.name}
                </ListGroupItem>
            )}
        </ListGroup>
    );
})

export default BrandBar;