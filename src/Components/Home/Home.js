import React, { useEffect, useState } from 'react';
import './Home.css'
import backgroundImage from '../../images/Bg.png';
import bike from '../../images/Frame.png';
import car from '../../images/Frame-2.png';
import bus from '../../images/Frame-1.png';
import train from '../../images/Group.png';
import { Link } from 'react-router-dom';
import data from '../FakeData/FakeData.json';
import Transport from '../Transport/Transport';

const Home = () => {

    const [transports, setTransport] = useState([]);
    useEffect(() => {
        setTransport(data)
    },[])

    return (
        <body style={{ backgroundColor: "lightblue" }}>
            <div className="d-flex justify-content-center align-items-center homepage-design">
                {
                    transports.map(transport => <Transport transport={transport} ></Transport>)
                }
            </div>
        </body>

    );
};

export default Home;