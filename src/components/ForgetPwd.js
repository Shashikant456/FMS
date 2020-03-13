
import React, { Component } from 'react'
import axios from 'axios'
import { Form,FormControl } from 'react-bootstrap';
import {  withRouter } from 'react-router-dom'

class ForgetPwd extends Component {
state = {      
            countryCode:'91',
            mobileNumber:'',
            input_otp:'',
            otpLoading:false
        }
    
        handleChange1 = (e) => {
            this.setState({
                mobileNumber : e.target.value
            })
        }
        handleChange2 = (e) => {
            this.setState({
                input_otp : e.target.value
            })
        }
        handleVerify=(e)=>{
            axios.post('/stskFmsApi/otpServices/resendOtpBySMS',
            {  countryCode:91,
             mobileNumber :this.state.mobileNumber})
             .then(res =>{
                 console.log(res)
             })
        }
        handleCountryCode = (e) => {
            this.setState({
                countryCode : e.target.value,     
            })
        }

        handleSend = (e) => {
            e.preventDefault();
            this.setState({
                otpLoading:!this.setState.otpLoading
            })
            axios.post('/stskFmsApi/otpServices/sendOtpBySMS',
             {  countryCode:91,
                mobileNumber :this.state.mobileNumber})
            .then(Response => {
                   console.log(Response)
                   console.log(Response.data)
             })
            .catch(error => {
                console.log(error)
            });
        }
        handleVerify = (e) => {
            e.preventDefault();
            axios.post('/stskFmsApi/otpServices/sendOtpBySMS',
            {   countryCode:91,
                mobileNumber :this.state.mobileNumber,
                otp_input: this.state.otp_input})
                .then(Response => {
                   console.log(Response)
                   console.log(Response.data)

                   if (Response.data.type==="success")
                   {
                    this.props.history.push({
                        pathname : '/changePwd',
                        state :{
                        mobileNumber : this.state
                        }
                    } )
                   }
                   else {
                       alert("Otp miss-match")
                   }
             })
            .catch(error => {
                console.log(error)
            });
        }

    render() {
        const countries = require("./countryphonecode.json")
        console.log(this.state.countryCode)
        return (
            <div id="body">
                <div className="row" id="main1">      
                    <center id="center">
                    <h3 className="center" id="otp">OTP</h3>  
                   
                {
                    this.state.otpLoading ? (
                    <div> 
                        <form onSubmit={this.handleSend}>
                        <div className="input-field">
                        <input id="sendotpinput" type="tel"  placeholder="Enter mobile number" maxLength="10"
                        pattern="[0-9]{10}"  onChange={this.handleChange} required/>
                    </div>
                   <Form.Group  onChange={this.handleChange1}>
                
                        <Form.Control as="select" value={this.state.countryCode} onChange={this.handleCountryCode}
                            id="country">
                            {countries.map((country,i) =>(
                                <option key={i} value={country.number.slice(1)}>
                                        {country.name} 
                                </option>
                            ))}
                            </Form.Control>
                    </Form.Group>
                            <button id="verifymisscall">Send otp</button>
                        </form>

                        <form onSubmit={this.handleVerify}>
                            <input id="partitioned" type="text" required maxLength="6" onChange={this.handleChange2} 
                             title="Must contain only Numeric value"
                            />
                        <button id="input-type3" >Verify</button>
                        </form>
                        <button id="verifymisscall1" onClick={this.handleVerify} type="submit">Give missedcall to verify</button>
                    </div>
                    ) : (
                        <form onSubmit={this.handleSend}>
                        <div className="input-field">
                            <input id="sendotpinput" type="tel"  placeholder="Enter mobile number" maxLength="10"
                              onChange={this.handleChange} required/>
                        </div>
                       <Form.Group  onChange={this.handleChange1}>
                        <Form.Control as="select" value={this.state.countryCode} onChange={this.handleCountryCode}
                            id="country">
                            
                            {countries.map((country,i) =>(
                                <option key={i} value={country.number.slice(1)}>
        
                                        {country.name} 
                                    
                                </option>
                            ))}
                            
                            </Form.Control>
                        </Form.Group>
                            <button id="input-forgot">Send otp</button>
                        </form>
                    
                    )
                }
                    
                    </center>
                </div> 
            </div>
        )
    }
}

export default ForgetPwd

