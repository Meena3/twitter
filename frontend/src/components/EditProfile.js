import React from "react";
import axios from "axios";

export default class EditProfile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            profile_image:""
        }
    }
    onChange =(e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleClick = (e) =>{
        e.preventDefault()
        axios.post("http://127.0.0.1:5000/edit-profile",{user_id:this.props.param.match})
        .then(response =>{
            console.log(response)
        })
        .catch(response=>{
            console.log(response)
        })
    }
    
    render(){
        return(
            <React.Fragment>
                <h1>Change Profile Here..!</h1>
                <div style = {{marginLeft:"500px"}}>
                <form className = "col-4">
                    <div class="form-group">
                        <input type="file" name = "profile_image" className="form-control-file"
                            value = {this.state.profile_image} onChange = {(e) =>{this.handleChange(e)}}
                        /> 
                    </div>
                    <button className = "btn btn-danger" onClick = {(e) =>{this.handleClick(e)}}>CHANGE</button>
                </form>
                </div>
            </React.Fragment>
        )
    }
}