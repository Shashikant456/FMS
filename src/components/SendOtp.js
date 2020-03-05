import React, {Component} from 'react'
import axios from 'axios'
import './css/SendOtp.css'
import back from './Images/Background.png'
import { Form,FormControl } from 'react-bootstrap';
import logo from './Images/Mainlogo.png'

class SendOtp extends Component{
    constructor(props) {
        super(props)
    this.state={
             countryCode:'91',
             mobileNumber: ' ',
           }
          this.handleSubmit = this.handleSubmit.bind(this)
        }
    userLogin = (e) => {
        this.props.history.push('/userLogin')
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
        console.log(this.state)
        console.log(this.state.countryCode)
    //   this.props.history.push('./verify', {mobileNumber:this.state})

    this.props.history.push({
        pathname : '/verify',
        state :{
       
        mobileNumber : this.state
           }
        } 
      );

      e.preventDefault();
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
    //  console.log(countries)
    return(
    //     <div className="main">
    //     <div className="col s12 m6">
       
    //    </div>
    //     <form action="" onSubmit={this.handleSubmit} className="form">
   
    //         <img id="img1" src={logo} alt="LOGO" height="50" width="50"></img>
            
    //         <div className="form1">
   
    //             <h2>Login</h2>

    //          <div className="inputIcon">

    //          <div>
                
    //             <input id="input1" type="tel" onChange={this.handleChange} id="mobile" required minLength="10"
    //             className="placeicon" placeholder="Enter Your Mobile Number "></input>
    //         </div>

    //          <span id="message"></span>
    //         <Form.Group  onChange={this.handleChange1}>
                    
    //                 <Form.Control as="select" value={this.state.countryCode} onChange={this.handleChange1}
    //                  id="country">
                        
    //                     {countries.map((country,i) =>(
    //                         <option key={i} value={country.number.slice(1)}>
    //                             {/* {console.log(country.dial_code)}  */}
    //                              {country.name} 
    //                             {/* <img src={this.state.imageUrl} alt="" ></img> */}
    //                             {/* <a href="{country.flag}" tittle=""></a>  */}
                                
    //                         </option>
    //                     ))}
                        
    //                 </Form.Control>
    //                 </Form.Group>
    //              </div>
    //             <button id="button1" disabled={this.state.disabled} type="submit">Send OTP</button>
    //             <h3>Sign in options</h3>
    //             <div className="logo">
    //                 <a href="#" className="fa fa-google" ></a>
    //                 <i className="fa fa-facebook"></i> 
    //                 <i className="fa fa-user" onClick={this.userLogin} aria-hidden="true"></i>
    //             </div>
    //     </div>
    //     </form>
    // </div>



    <div id="body">
    <div className="row" id="main1">      
     <center id="center">
     <img className="center" id="logo" src={logo} width="70" height="70"></img>
     <h3 className="center" id="text">Login</h3>  
     <form id="frm" onSubmit={this.handleSubmit}>
        <div className="input-field">
                <input id="sendotpinput" type="text" placeholder="Enter mobile number" maxLength="10"
                onChange={this.handleChange} required/>
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
                <a href="#" className="fa fa-google" ></a>
                <i className="fa fa-facebook"></i> 
                <i className="fa fa-user" onClick={this.userLogin} aria-hidden="true"></i>
        </div>
     </center>
    </div> 
    </div>




    )}
}
export default SendOtp