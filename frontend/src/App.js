import React from 'react';
import './App.css';
import {BrowserRouter,Route,Redirect} from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Addtweet from './components/Addtweet';
import Profile from './components/Profile';
import Home from "./components/Home";
import Users from "./components/Users";
import EditProfile from "./components/EditProfile";

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      tokenId:localStorage.getItem("token"),
      id:""
    }
  }
  render(){
    var token = this.state.tokenId
    // console.log(token)
    return (
      <div className="App">
        <BrowserRouter>
           <Navbar/>
           <Route path = "/home" exact render = {(props) => {return <Home {...props}/>}}/>
           <Route path = "/users" exact render = {(props) => {return <Users {...props}/>}}/>
           <Route path = "/register" render = {(props) => {return <Register {...props}/>}}/>
           <Route path = "/login" exact render = {(props) => {return <Login {...props}/>}}/>
           <Route path = "/addtweet" exact render = {(props) => token ? (<Addtweet {...props}/>) : (<Redirect to = "/login"/>)}/>
           <Route path = "/profile" exact render = {(props) => token ? (<Profile {...props}/>) : (<Redirect to = "/home"/>)}/>
           <Route path = "/editprofile/:id" exact render = {(props) => token ? (<EditProfile {...props}/>) : (<Redirect to = "/home"/>)}/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
