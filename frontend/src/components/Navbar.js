import React from "react"
import {Link} from "react-router-dom";

export default class Navbar extends React.Component{
    render(){
        return(
            <div>
                <nav className="navbar navbar-light bg-light">
                    <Link to = "/home" className="navbar-brand" >HOME</Link>
                    <Link to = "/users" className="navbar-brand" >USERS</Link>
                    <Link to = "/register" className="navbar-brand" >REGISTER</Link>
                    <Link to = "/login" className="navbar-brand" >LOGIN</Link>
                    <Link to = "/addtweet" className="navbar-brand" >ADDTWEET</Link>
                    <Link to = '/profile' className="navbar-brand" >PROFILE</Link>
                </nav>
            </div>
        )
    }
}