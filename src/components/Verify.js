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
                mobileNumber:'9008845003',
                otp_input:'',
                error:'',
                userId:'',
                dash:'',
                loading:false
             }
             componentDidMount(){
                this.setState({
                  //mobileNumber: this.props.location.state.mobileNumber.mobileNumber
                })

                this.props.history.push({
                    pathname : '/userDetails',
                    state :{
                    mobileNumber : this.state
                }})
             }
                        
                    

    handleChange = (e) => {
        this.setState({
            otp_input: e.target.value  
        })
    }
    handleResend= (e)=>{
        axios.post('/stskFmsApi/otpServices/sendOtpBySMS', this.state.mobileNumber,{headers:header} )
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
       {  countryCode:91,
        mobileNumber :this.state.mobileNumber},{headers:header})
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
                            this.setState({
                                loading:true
                            })
                           
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
                                        // axios.get('/stskFmsApi/userLogin/getByMob/'+this.state.mobileNumber)
                                        // .then(res=>{
                                        //     console.log(res.data.data.email)
                                        //     this.setState({
                                        //         email:res.data.data.email
                                        //     })
                                        // })
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
                });           
    }
    render(){
        const {loading}=this.state
        console.log(this.state.userId)
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
                            <input id="partitioned" type="text"  maxLength="6" value={this.state.otp_input} 
                            onChange={this.handleChange} />
                            <br></br>
                            <br></br>
                            <p className="red-text">{this.state.error}</p>
                    </div>
                    <a href="" id="resendotp" onClick={this.handleResend} className="center-align">Resend OTP</a>
                <button id="input-type3"  disabled={loading}>
                {loading && 
                    <div className="preloader-wrapper small active">
                        <div className="spinner-layer spinner-green-only">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div><div className="gap-patch">
                            <div className="circle"></div>
                        </div><div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                        </div>
                    </div>}
                      Verify</button>
                </form>
                <div id="hr" className="separator">or</div>
                <button onClick={this.handleVerify} id="verifymisscall">Give missedcall to verify</button>
            </center>
            </div> 
        </div>



    )}
}
export default withRouter(Verify)

