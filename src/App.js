import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Description from './Components/Destinetion/Description';
import Blog from './Components/Blog/Blog';
import Contact from './Components/Contact/Contact';
import Login from './Components/Login/Login';
import { createContext, useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();


function App() {

  const [loggedInUser, setLoggedInUser] = useState({})

  return (
    
     <UserContext.Provider value = {[loggedInUser, setLoggedInUser]} >
        <Router>
          <h2>Email: {loggedInUser.email}</h2>
        <Header></Header>
        <Switch>
          <Route path="/Home">
            <Home></Home>
          </Route>
          <PrivateRoute path="/Description/:id">
            <Description></Description>
          </PrivateRoute>
          <Route path="/Blog">
            <Blog></Blog>
          </Route>
          <Route path="/Contact">
            <Contact></Contact>
          </Route>
          <Route path="/Login">
            <Login></Login>
          </Route>
          <Route exact="/">
            <Home></Home>
          </Route>
        </Switch>
      </Router>
     </UserContext.Provider>
   
  );
}

export default App;
