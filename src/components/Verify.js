import React, {Component} from 'react'
import {  withRouter } from 'react-router-dom'
import axios from 'axios'
import image from './Images/Background.png'
import logo from './Images/Mainlogo.png'

import './css/Verify.css'

const header={
    'x-api-key': ' $2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2' 
}


class Verify extends Component{
    
    state = {  
                countryCode:'91',
                mobileNumber:'111111111',
                otp_input:'',
                error:'',
                userId:'',
                dash:'',
                loading:false
             }
             componentDidMount(){
                this.setState({
                   mobileNumber: this.props.location.state.mobileNumber.mobileNumber,
                   countryCode: this.props.location.state.countryCode.countryCode
                 })                
             }
                        
                    

    handleChange = (e) => {
        this.setState({
            otp_input: e.target.value  
        })
    }
    handleResend= (e)=>{
    
        e.preventDefault()

        axios.post('/stskFmsApi/otpServices/sendOtpBySMS',{
            countryCode:this.state.countryCode,
            mobileNumber:this.state.mobileNumber
        } ,{headers:header} )
        .then(Response => {
               console.log(Response)
               console.log(Response.data)
              
         })
        .catch(error => {
            console.log(error)
        });
    }
   handleVerify=(e)=>{
       axios.post('/stskFmsApi/otpServices/resendOtpBySMS',
       {  countryCode:this.state.countryCode,
        mobileNumber :this.state.mobileNumber},{headers:header})
        .then(res =>{
            console.log(res)
        })
   }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            otp_input:'',
            loading:true
        })
        axios.post('/stskFmsApi/otpServices/verifyOtpBySMS', 
        {   countryCode:91,
            mobileNumber :this.state.mobileNumber,
            otp_input: this.state.otp_input},{headers:header})
                .then(Response => {
                    
                      console.log(Response)
                      console.log(Response.data) 
                    
                    if (Response.data.type==="success")
                    {
                        axios.get('/stskFmsApi/userLogin/getByMob/'+this.state.mobileNumber,{headers:header})
                        .then(Response => {
                            console.log(Response.data)
                            if (Response.data.success===1){
                               
                                console.log("Dashboard")
                                axios.get('/stskFmsApi/jobseeker/getByMob/'+this.state.mobileNumber,{headers:header})
                                .then(res =>{
                                    if(res.data.success===1){
                                        this.setState({
                                            userId:res.data.data.id,
                                        })
                                        this.props.history.push({
                                            pathname : '/dashboard',
                                            state :{
                                            mobileNumber : this.state,
                                            userId: this.state.userId 
                                         }} );
                                    }
                                    else{
                
                                        this.props.history.push({
                                            pathname : '/userDetails',
                                            state :{
                                            mobileNumber : this.state
                                        }} );
                                        }
                                }) 
                            }
                            else {
                                this.props.history.push({
                                    pathname : '/preregister',
                                    state :{
                                    mobileNumber : this.state }});
                                }
                            })
                    }
                    else {
                        console.log("error")
                        this.setState({
                            error: 'otp miss-match',
                            loading:false
                        })
                        this.props.history.push('./verify')
                    }
                })
                .catch(error => {
                    
                    console.log(error)
                    console.log(this.props.number)
                });           
    }
    render(){
        const {loading}=this.state
        console.log(this.state)
    
    return(
        <div id="body">
            <div className="row" id="main1">      
            <center id="center">
                <img className="center" id="logo" src={logo} width="70" height="70"></img>
                <h4 className="center" id="otpheader">Enter OTP</h4>  
                <form id="frm" onSubmit={this.handleSubmit}>
                <h6 id="enterHere">Enter Otp Here</h6>
                    <div className="input-field">
                            <input id="partitioned" type="text" required minLength="6" maxLength="6" value={this.state.otp_input} 
                            onChange={this.handleChange} />
                            <br></br>
                            <br></br>
                            <h6 className="red-text">{this.state.error}</h6>
                    </div>
                    <h6 id="resendotp" onClick={this.handleResend} className="center-align">Resend OTP</h6>
                <button id="input-type3">
                {loading && 
                    <i className="fa fa-spinner fa-spin"></i>}
                      Verify</button>
                </form>
                <div id="hr" className="separator">or</div>
                <button onClick={this.handleVerify} id="verifymisscall">Give missed call to verify</button>
            </center>
            </div> 
        </div>
    )}
}
export default withRouter(Verify)

