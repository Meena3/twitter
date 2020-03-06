import React from "react";
import axios from "axios";

export default class Addtweet extends React.Component{
    constructor(props){
        super(props);
        this.state={
            content:"",
        }
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleClick = (e) =>{
        e.preventDefault()
        var details = {
            content:this.state.content,
        }
        axios.post("http://127.0.0.1:5000/tweet-add",details)
        .then(response =>{
            console.log(response)
            this.props.history.push("/users")   
            alert(response)
        })
        .catch(error =>{
            console.log(error)
        });
    }
    render(){
        // console.log(this.state.details)
        return(
            <div style = {{marginLeft:"400px"}}>
                <form>
                    <div className="form-group col-6">
                        <label for="exampleFormControlTextarea1">Add Your Thoughts here</label>
                        <textarea className="form-control" rows="4" name = "content" value = {this.state.content} onChange = {(e) =>{this.handleChange(e)}}></textarea>
                        <button className = "btn btn-danger mt-4" onClick = {(e) =>{this.handleClick(e)}}>ADD TWEET</button>
                    </div>
                </form>
            </div>
        )
    }
}