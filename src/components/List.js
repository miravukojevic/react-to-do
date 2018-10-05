import React from 'react';
import ListItem from './ListItem'

const List = (props) => {
    return ( 
        <div>
            <ul>
                {props.toDo.map((item ,key) => <ListItem key={key} item={item} remove={props.removeItem}/> )} 
            </ul>
        </div>
     );
}
 
export default List;