import React, {Component} from 'react'
import {  withRouter } from 'react-router-dom'
import axios from 'axios'
import image from './Images/Background.png'
import logo from './Images/Mainlogo.png'

import './css/Verify.css'

class Verify extends Component{
    
    state = {  
                mobileNumber:'',
                otp_input:'',
                error:'',
                userId:'',
                dash:''
             }
             componentDidMount(){
                this.setState({
                    mobileNumber: this.props.location.state.mobileNumber.mobileNumber
                })
             }
                           
                    
    handleChange = (e) => {
        this.setState({
            otp_input: e.target.value  
        })
    }
   handleVerify=(e)=>{
       axios.post('http://stskfacilities.com:8081/stskFmsApi/otpServices/resendOtpBySMS',
       {  countryCode:91,
        mobileNumber :this.state.mobileNumber})
        .then(res =>{
            console.log(res)
        })
   }
    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state.userRoles)
        this.setState({
            otp_input:''
        })
        axios.post('http://stskfacilities.com:8081/stskFmsApi/otpServices/verifyOtpBySMS', 
        {   countryCode:91,
            mobileNumber :this.state.mobileNumber,
            otp_input: this.state.otp_input})
                .then(Response => {
                      console.log(Response)
                      console.log(Response.data) 
                    
                    if (Response.data.type==="success")
                    {
                        axios.get('http://stskfacilities.com:8081/stskFmsApi/userLogin/getByMob/'+this.state.mobileNumber)
                        .then(Response => {
                            console.log(Response.data)
                          
                           
                            if (Response.data.success===1){
                                console.log("Dashboard")
                                //history.push('/login', {Login});
                                //this.props.history.push('./dashboard')
                                this.props.history.push({
                                    pathname : '/dashboard',
                                    state :{
                                    mobileNumber : this.state,
                                    //userId: this.state.userId
                                    }
                                    } 
                                  );
                                
                            }
                            else {
                                //this.props.history.push('./register')
                                this.props.history.push({
                                    pathname : '/preregister',
                                    state :{
                                    mobileNumber : this.state
                                    }
                                    } 
                                  );
                                }
                            })
                    }
                    else {
                        console.log("error")
                        this.setState({
                            error: 'otp miss-match'
                        })
                        this.props.history.push('./verify')
                        this.setState({
                            otp_input:''
                        })
                    }

                })
                .catch(error => {
                    
                    console.log(error)
                    console.log(this.props.number)
                    
                    //this.props.history.push('./register')
                });           
    }
    render(){
        console.log(this.state.otp_input)
    return(
        
        <div className="wrapper">

        <div className="form-wrapper">
        <div className="text-center">
          
        <img src={logo} alt="" className="img1"></img>
        <h2 id="verifyotp">Enter Otp</h2>
        </div>
         
          <form onSubmit={this.handleSubmit} noValidate>
           
            <div className="otp">
              {/* <label htmlFor="email">Email</label> */}
              <h6>Enter Otp Here</h6>
                <input placeholder="Enter Otp" type="text" value={this.state.otp_input} onChange={this.handleChange}/>
                <p className="red-text">{this.state.error}</p>
                 </div>
                    <div className="Verify">
                        <button type="submit">Verify</button>
                    </div>
                </form>
                            
                            <br/> <br/>
                            <span className="border-right"><small className="text-center1"><h4>or</h4></small></span>
                            <br/><br/>
                            <div className="missedcall">
                            <button onClick={this.handleVerify} type="submit">Give missedcall to verify</button>
                    
                    </div>
                
             </div>
         </div>
    )}
}
export default withRouter(Verify)

