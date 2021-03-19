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


function App() {
  return (
    <div>
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/Home">
            <Home></Home>
          </Route>
          <Route path="/Description">
            <Description></Description>
          </Route>
          <Route path="/Blog">
            <Blog></Blog>
          </Route>
          <Route path="/Contact">
            <Contact></Contact>
          </Route>
          <Route path="/Login">
            <Login></Login>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
