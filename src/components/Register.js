
import React, { Component } from "react";
import { withRouter} from 'react-router-dom'
import "./css/register1.css";
import logo from './Images/Mainlogo.png'
import axios from 'axios'

class Register extends Component {
    state = {
      mob:"",
      email:"",
      password: "",
      userRoles:{
               "id":'' 
                },
       conformPwd:'',
       error:''
      }
  
  componentDidMount(){
    this.setState({
      mob:this.props.location.state.mobileNumber.mobileNumber,
      userRoles:{
        id:this.props.match.params.id,
      }
    })
  }


  handleSubmit = e => {
    e.preventDefault();
    const { password, conformPwd } = this.state;

    if (password !== conformPwd) {
        this.setState({
            password:'',
            conformPwd:'',
            error:'Password and conformPassword mis-match'
        })
    // } else {
       
    //   this.props.history.push({
    //     pathname:'/userDetails',
    //      state :{
    //      mobileNumber : this.state
    //  }})
    
    
    //     axios.post('/stskFmsApi/userLogin/createUL',{
    //       mob:this.state.mob,
    //       email:this.state.email,
    //       password: this.state.password,
    //       userRoles:{
    //             id:this.state.userRoles.id
    //        }    
    //     })
    //     .then(response=>{
    //       console.log(response)
    //       console.log(this.state)
         
    //       })
    //       .catch(error=>{
    //         console.log(error)
    //     })
      };
}


    handleChange1 = (e) => {
    this.setState({
      email:e.target.value
    })
  }
  handleChange2 = (e) => {
    this.setState({
      password:e.target.value
    })
    
  };
  handleChange3 = (e) => {
    this.setState({
      conformPwd :e.target.value
    })
  }

  render() {
     const {mob,email,password,userRoles} = this.state
     console.log(this.state)
    // const { formErrors } = this.state;

    return (

      // <div className="wrapper">
      //   <div className="form-wrapper">
       
      //     <div className="text-center">
      //       <img src={logo} className="img3"></img>
      //     </div>
      //      <h2 className="text-center3">{this.props.match.params.name}</h2>

      //     <form onSubmit={this.handleSubmit} noValidate>
          
            
      //       <div className="email1">
      //         <input
      //           className=""
      //           placeholder="Email Id/User Id"
      //           type="email"
      //           name="email"
      //           onChange={this.handleChange1}
      //           value={email}
      //         />
      //       </div>
            
      //       <div className="password1"> 
      //          <input
      //           className=""
      //           placeholder="Password"
      //           type="password"
      //           name="password"
      //           value={this.state.password}
      //           onChange={this.handleChange2}
      //           value={password}
      //         /> 
      //       </div>
      //       <div className="confirmpassword1"> 
      //          <input
      //           className=""
      //           placeholder="Conform Password"
      //           type="password"
      //           name="confirmpassword"
      //           value={this.state.conformPwd}
      //           onChange={this.handleChange3}
      //         /> 
      //       </div> 
      //         <p className="red-text">{this.state.error}</p>
      //       <div className="createAccount">
      //         <button type="submit">Next</button>
      //         </div>
           
      //     </form>
      //   </div>
       
      // </div>


      <div id="body">
      <div className="row" id="main1">      
       <center id="center">
         <h3 className="center-align" id="Registertext">Login{this.props.match.params.name}</h3>
        <i className="material-icons grey-text large">account_circle</i>
       <form id="frm" onSubmit={this.handleSubmit}>
       <div className="input-field">
              <i id="iconn" className="material-icons prefix">person</i>
              <input id="icon_prefix" type="email" size="30"
               placeholder="User Id/ Mail Id" required onChange={this.handleChange1}/>
          </div>
              <div className="input-field">
                <i id="iconn" className="material-icons prefix">lock</i>
                <input id="icon_prefix" type="password" placeholder="Enter password" required onChange={this.handleChange2}
                 pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"/>
             </div>
              <div className="input-field">
                <i id="iconn" className="material-icons prefix">lock</i>
                <input id="icon_prefix" type="password" placeholder="Confirm password" required onChange={this.handleChange3}
                // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"/>
                <p className="red-text">{this.state.error}</p>
                </div>
      <button id="RegisterButton"><i className="material-icons right">arrow_forward</i>Next</button>
       </form>
       </center>
      </div> 
      </div>
    
    );
  }
}

export default withRouter(Register);
