import React from 'react';

const ListItem = (props) => {
    console.log({props})
    return ( 
        <li onClick={() => { props.remove(props.item)}} key={props.item}>{props.item}<span>-</span><div className="title">Click Here to remove an item</div></li>
     );
}
 
export default ListItem;