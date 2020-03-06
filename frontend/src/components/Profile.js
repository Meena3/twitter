import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";

export default class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            profile:"",
            content:[],
            tokenId:localStorage.getItem("token")
        }
    }   
    componentDidMount = () => {
        var user_id = this.props.match.params.id
        axios.post("http://127.0.0.1:5000/user-profile", {user_id:this.props.match.params.id})
        .then(response =>{
            // console.log(response)
            // console.log("am loged in")
            this.setState({
                profile:response.data
            })    
        })
        .catch(error =>{
            console.log(error)
        });
        axios.post("http://127.0.0.1:5000/user-profile-tweet",
        {user_id:this.props.match.params.id})
        .then(response =>{
            console.log(response)
            // console.log("am loged in")
            this.setState({
                content:response.data
            })    
        })
        .catch(error =>{
            console.log(error)
        });
    }
    // componentDidMount = () => {
    //     var user_id = this.props.match.params.id
       
    // }
    render(){
        // console.log(this.state.content)
        // console.log(this.props.match.params.id)
        return(
            <div >
                <h1>Your Tweets</h1>
                <img src = {this.state.profile[0]} style = {{height:"150px"}} alt = "..."/>
                <Link to = "/editprofile"><button className = "btn btn-primary ml-3" >Edit Profile</button></Link>
                    {this.state.content.map((e) =>{
                        return(
                            <div className="card col-8 mt-4" style = {{marginLeft:"250px"}}>
                                <div className="card-body">
                                    <h4>{e[0]}</h4>
                                </div>
                            </div>  
                        )
                    })}
            </div>
        )
    }
}