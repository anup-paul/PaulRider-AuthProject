import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {
     const[loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid ">
                    <div>
                        <Link to="/Home" className="navbar-brand"><strong>Paul Rider</strong></Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link to="/Home" className="nav-link active" aria-current="page">Home</Link>
                            <Link to="/Description" className="nav-link active" aria-current="page">Description</Link>
                            <Link to="/Blog" className="nav-link active" aria-current="page">Blog</Link>
                            <Link to="/Contact" className="nav-link active" aria-current="page">Contact</Link>
                            {
                                loggedInUser.email ?
                                <h5 className="nav-link active" aria-current="page" >{loggedInUser.email}</h5> :
                                <Link to="/Login" className="nav-link active" aria-current="page">Login</Link>
                            }
                            
                            
                             
                        </div>
                    </div>
                </div>
            </nav>

        </div>
    );
};

export default Header;