import React from 'react';

const Button = (props) => {
    return ( 
        <button  style={{marginBottom: '10px', backgroundColor: props.bgColor}}  onClick={props.button}>{props.buttonText}</button>
     );
}
 
export default Button;