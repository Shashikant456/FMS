import React, { Component } from 'react'
import axios from 'axios'
import logo from './Images/Mainlogo.png'
import './css/userLogin.css'

class UserLogin extends Component {
state = {
              email:'',
              password:''   
        }
    
        handleChange1 = (e) => {
            this.setState({
                email : e.target.value
            })
        }
        handleChange2 = (e) => {
            this.setState({
                password : e.target.value
            })
        }
        forgetPwd=(e)=>{
            this.props.history.push('/forgotPwd')
        }
        handleSubmit=(e)=>{
            e.preventDefault();
            console.log(this.state)
            axios.post('http://stskfacilities.com:8081/stskFmsApi/userLogin/verifyUser', this.state )
            .then(Response => {
                   if (Response.data.success===1)
                    {
                        this.props.history.push('./dashboard')
                    }
                     else if(Response.data.message==="User ID or Password error"){
                        alert("User ID or Password error")
                    }
                    else{
                        alert("Register here")
                        this.props.history.push('./')
                    }
             })
            .catch(error => {
                console.log(error)
            });
        }


    render() {
        return (
            // <div className="container">
            //     <form onSubmit={this.handleSubmit}>
            //         <input type="text" onChange={this.handleChange1} placeholder="email" ></input>
            //         <input type="text" onChange={this.handleChange2} placeholder="password"></input>
            //         <button  className="waves-effect waves-light btn">button</button>
            //     </form>
            //     <a onClick={this.forgetPwd}>Forget Password</a>
            // </div>




            <div id="body">
            <div className="row" id="main1">      
             <center id="center">
             <img className="center" id="logo" src={logo} width="60" height="60"></img>
             <h3 className="center" id="text">Login</h3>  
             <form id="frm" onSubmit={this.handleSubmit}>
             <div className="input-field">
                    <i id="iconn" className="material-icons prefix">email</i>
                    <input id="icon_prefix" type="text" placeholder="Email Id" required onChange={this.handleChange1}/>
                
                </div>
                    <div className="input-field">
                    <i id="iconn" className="material-icons prefix">lock</i>
                    <input id="icon_prefix" type="text" placeholder="password" required onChange={this.handleChange2}/>
                
                </div>
            <button id="input-type3">Login</button>
             </form>
             <a id="forgot" onClick={this.forgetPwd}>Forgot Password</a>
            
             </center>
            </div> 
            </div>

        )
    }
}

export default UserLogin

