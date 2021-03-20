import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Transport.css';

const Transport = (props) => {
    const { id, name, image } = props.transport;
    const history = useHistory()
    const handleClick = (id) =>{
        history.push(`/Description/${id}`)
    }
    return (
        <div className=" page-design">
            <div className=" image-size">
               <Link onClick={()=>handleClick(id)} > <img src={image} alt="" /></Link>
            </div>
        </div>
    );
};

export default Transport;