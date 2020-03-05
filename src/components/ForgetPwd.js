
import React, { Component } from 'react'
import axios from 'axios'
import {  withRouter } from 'react-router-dom'

class ForgetPwd extends Component {
state = {      
            countryCode:'91',
            mobileNumber:'',
            input_otp:''   
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
       

        handleSend = (e) => {
            e.preventDefault();
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
        return (
            // <div className="container">
            //     <form onSubmit={this.handleSubmit}>
            //     <h5>Forget password</h5>
            //         <input type="text" onChange={this.handleChange1} placeholder="enterPassword" ></input>
            //         <input type="text" onChange={this.handleChange2} placeholder="conformPassword"></input>
            //         <button  className="waves-effect waves-light btn">Save</button>
            //     </form>
            // </div>

            <div id="body">
                <div className="row" id="main1">      
                    <center id="center">
                    <h3 className="center" id="otp">OTP</h3>  
                    <form onSubmit={this.handleSend}>
                    
                    <div className="input-field">
                        <i id="iconn" className="material-icons prefix">phone_iphone</i>
                        <input id="icon_prefix" type="text" required placeholder="Enter mobile numbers" onChange={this.handleChange1}/>
                    
                   </div>
                        <button id="verifymisscall">Send otp</button>
                    </form>

                    <form onSubmit={this.handleVerify}>
                        <input id="icon_prefix" type="text" required onChange={this.handleChange2} placeholder="Enter OTP here"></input>
                        <button id="input-type3" >Verify</button>
                    </form>
                    
                    <button id="verifymisscall" onClick={this.handleVerify} type="submit">Give missedcall to verify</button>
                    </center>
                </div> 
            </div>
        )
    }
}

export default ForgetPwd

