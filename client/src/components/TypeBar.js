import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { Context } from "..";

const TypeBar = observer(() => {
    const {device} = useContext(Context);

    return ( 
        <ListGroup>
            {device.types.map(type => 
                <ListGroupItem
                    style={{cursor: 'pointer'}}
                    active = {type.id === device.selectedType.id}
                    onClick = {() => device.setSelectedType(type)}
                    key = {type.id}
                >
                    {type.name}
                </ListGroupItem>
            )}
        </ListGroup>
    );
})

export default TypeBar;