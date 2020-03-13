import React, {Component} from 'react'
import axios from 'axios'
import './css/SendOtp.css'
import back from './Images/Background.png'
import { Form,FormControl } from 'react-bootstrap';
import logo from './Images/Mainlogo.png'
//import PhoneInput from 'react-phone-number-input'

class SendOtp extends Component{
    constructor(props) {
        super(props)
    this.state={
             countryCode:'91',
             mobileNumber:' ',
           }
          this.handleSubmit = this.handleSubmit.bind(this)
        }
    userLogin = (e) => {
        this.props.history.push('/userLogin')
       
    }

    handleGoogle=(e)=>{
        e.preventDefault();
        console.log("face") 
        window.location.replace("http://google.com");

    }
    handleFacebook=(e)=>{
        e.preventDefault();
        console.log("face") 
    
        window.location.replace("http://facebook.com");

    }
        
    handleChange = (e) => {
        this.setState({
            mobileNumber : e.target.value
        })
    }
    handleChange1 = (e) => {
        this.setState({
            countryCode : e.target.value,     
        })

        if(e.target.value.length ==100){
            this.setState({
                disabled: false
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
        console.log(this.state.countryCode)

    this.props.history.push({
        pathname : '/verify',
        state :{
        mobileNumber : this.state
           }
        } 
      );

      axios.post('/stskFmsApi/otpServices/sendOtpBySMS', this.state )
            .then(Response => {
                   console.log(Response)
                   console.log(Response.data)
             })
            .catch(error => {
                console.log(error)
            });
    }
    render(){
     const countries = require("./countryphonecode.json")
     console.log(this.state.countryCode)
    return(
    
    <div id="body">
    <div className="row" id="main1">      
     <center id="center">
     <img className="center" id="logo" src={logo} width="70" height="70"></img>
     <h3 className="center" id="text">Login</h3>  
     <form id="frm" onSubmit={this.handleSubmit}>
        <div className="input-field">
                <input id="sendotpinput" type="tel"  placeholder="Enter mobile number" maxLength="10"
                pattern="[0-9]{10}"  onChange={this.handleChange} required/>
            </div>

          <Form.Group  onChange={this.handleChange1}>
                    
                           <Form.Control as="select" value={this.state.countryCode} onChange={this.handleChange1}
                            id="country">
                              
                               {countries.map((country,i) =>(
                                   <option key={i} value={country.number.slice(1)}>
                                       {/* {console.log(country.dial_code)}  */}
                                        {country.name} 
                                       {/* <img src={this.state.imageUrl} alt="" ></img> */}
                                       {/* <a href="{country.flag}" tittle=""></a>  */}
                                      
                                   </option>
                               ))}
                              
                            </Form.Control>
            </Form.Group>
                  <button id="sendotpbtn">Send OTP</button>
            </form>
            <h6 id="textsignin">Sign in options</h6>
     
            <div className="logo">
            
                <a href="" onClick={this.handleGoogle}  className="fa fa-google" ></a>
                <i onClick={this.handleFacebook} className="fa fa-facebook"></i> 
                <i className="fa fa-user" onClick={this.userLogin} aria-hidden="true"></i>
        </div>
     </center>
    </div> 
    </div>




    )}
}
export default SendOtp