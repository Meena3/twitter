import React from "react";
import axios from "axios";
export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            details:[],
            follow:false
        }
    }
    componentDidMount = () =>{
        axios.get("http://127.0.0.1:5000/all-users")
        .then(response =>{
            // console.log(response)
            this.setState({
                details:response.data
            })
        })
        .catch(error =>{
            console.log(error)
        })
    }
    render(){
        // console.log(this.state.details)
        return(
            <div>
                <h4></h4>
                {this.state.details.map((e) =>{
                    return( 
                        <div class="card mb-3" style={{width: "540px",marginLeft:"300px"}}>
                            <div class="row no-gutters">
                                <div class="col-md-4">
                                    <img src={e[1]} className="card-img" alt="No image"/>
                                </div>
                                <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">{e[0]}</h5>
                                    <p class="card-text">{e[2]}</p>
                                </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

