import React, { useEffect, useState } from 'react';
import './Description.css'
import map from '../../images/Map.png';
import { useParams } from 'react-router';
import data from '../FakeData/FakeData.json';
import { Map } from '../Map/Map';

const Description = () => {
    const { id } = useParams();
    const [transports, setTransport] = useState([]);
    useEffect(() => {
        setTransport(data);
    })

    const newData = transports.find(trs => trs.id === parseInt(id));   

    const[handleSearch, setHandleSearch] = useState(false);

    const [searchPickup, setSearchPickup] = useState('');
    const handlePickUp = (event) => {
        setSearchPickup(event.target.value);
    }

    const [searchDestination, setSearchDestination] = useState('');
    const handleDestination = (event) => {
        setSearchDestination(event.target.value)
    }

    return (
        <div className="deign-page row ">
           
            <div className="col d flex justify-content-center align-items-center">
                <div className="form-design">
                    
                    {
                        handleSearch ?
                        (<div className="destination-text-design">
                            <h6 >{searchPickup}</h6>
                            <h6>to</h6>
                            <h6>{searchDestination}</h6>
                        </div>) :
                        <h5> pick form</h5>
                    }
                    {
                        handleSearch ?
                        (<div style={{display:"block"}} className="d-flex" >
                        <img src={newData.image} className="mx-4" alt=""/>
                        <h6 className="mx-4" >{newData.name}</h6>
                        <h6 className="mx-4" >Person:{newData.person}</h6>
                        </div>) :
                        <input className="form-control" type="text" name="pick-up" required onChange={handlePickUp} placeholder="enter your pickup address" />
                    }
                    {
                        handleSearch ? 
                        (<div style={{display:"block"}} className="d-flex" >
                        <img src={newData.image} className="mx-4" alt=""/>
                        <h6 className="mx-4" >{newData.name}</h6>
                        <h6 className="mx-4" >Person:{newData.person}</h6>
                        </div>)  :
                        <h5>Pick to</h5>
                    }
                    {
                        handleSearch ?
                        (<div style={{display:"block"}} className="d-flex" >
                        <img src={newData.image} className="mx-4" alt=""/>
                        <h6 className="mx-4" >{newData.name}</h6>
                        <h6 className="mx-4" >Person:{newData.person}</h6>
                        </div>) :
                        <input className="form-control" type="text" name="destination" required onChange={handleDestination}  placeholder="enter your destination address" />
                    }
                    <br/>
                    {
                        handleSearch ? "" 
                        : <input type="submit" value="search" onClick={()=>setHandleSearch(!handleSearch)} className="btn btn-primary"/>
                    }
                    
                </div>
                <div>
                    {/* <Map></Map> */}
                </div>
            </div>
        </div>
    );
};

export default Description;