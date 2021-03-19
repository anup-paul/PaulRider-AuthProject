import React from 'react';
import './Home.css'
import backgroundImage from '../../images/Bg.png';
import bike from '../../images/Frame.png';
import car from '../../images/Frame-2.png';
import bus from '../../images/Frame-1.png';
import train from '../../images/Group.png';
import { Link } from 'react-router-dom';

const Home = () => {
    // const backgroundDesign =
    // {

    // }
    return (
        <body style={{ backgroundImage: `url(${backgroundImage})`, height:"100%"}}>
            <div className="homepage-design d-flex justify-content-center align-items-center">
                <Link><img src={bike} alt=""/></Link>
                <Link><img src={car} alt=""/></Link>
                <Link><img src={bus} alt=""/></Link>
                <Link><img src={train} alt=""/></Link>
            </div>
        </body>
        
    );
};

export default Home;