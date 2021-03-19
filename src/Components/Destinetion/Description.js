import React, { useEffect, useState } from 'react';
import './Description.css'
import map from '../../images/Map.png';
import { useParams } from 'react-router';
import data from '../FakeData/FakeData.json';

const Description = () => {
    const { id } = useParams();
    const [transports, setTransport] = useState([]);
    useEffect(() => {
        setTransport(data);
    })

    const newData = transports.find(trs => trs.id === parseInt(id));
    console.log(newData);   

    const[handleSearch, setHandleSearch] = useState(false);

    return (
        <div className="deign-page row ">
           
            <div className="col d flex justify-content-center align-items-center">
                <div className="form-design">
                    
                    {
                        handleSearch ?
                        (<div className="destination-text-design">
                            <h6 >Mirpur 12</h6>
                            <h6>to</h6>
                            <h6>Dhanmondi</h6>
                        </div>) :
                        <p> pick form</p>
                    }
                    {
                        handleSearch ?
                        (<div style={{display:"block"}} className="d-flex" >
                        <img src={newData.image} className="mx-4" alt=""/>
                        <h6 className="mx-4" >{newData.name}</h6>
                        <h6 className="mx-4" >Person:{newData.person}</h6>
                        </div>) :
                        <input className="form-control" type="text" name="" id="" />
                    }
                    {
                        handleSearch ? 
                        (<div style={{display:"block"}} className="d-flex" >
                        <img src={newData.image} className="mx-4" alt=""/>
                        <h6 className="mx-4" >{newData.name}</h6>
                        <h6 className="mx-4" >Person:{newData.person}</h6>
                        </div>)  :
                        <p>Pick to</p>
                    }
                    {
                        handleSearch ?
                        (<div style={{display:"block"}} className="d-flex" >
                        <img src={newData.image} className="mx-4" alt=""/>
                        <h6 className="mx-4" >{newData.name}</h6>
                        <h6 className="mx-4" >Person:{newData.person}</h6>
                        </div>) :
                        <input className="form-control" type="text" name="" id="" />
                    }
                    <br/>
                    <input type="submit" value="search" onClick={()=>setHandleSearch(!handleSearch)} className="btn btn-primary"/>
                </div>
                <div>
                    <img src={map} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Description;