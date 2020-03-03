
import React, { Component } from "react";
import { withRouter} from 'react-router-dom'
import "./css/register1.css";
import logo from './Images/Mainlogo.png'
import axios from 'axios'


// import image from "../src/image/icon.png";

// const emailRegex = RegExp(
//   /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
// );

// const formValid = ({ formErrors, ...rest }) => {
//   let valid = true;

 
//   Object.values(formErrors).forEach(val => {
//     val.length > 0 && (valid = false);
//   });

  
//   Object.values(rest).forEach(val => {
//     val === null && (valid = false);
//   });

//   return valid;
// };

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
    } else {
       
      this.props.history.push({
        pathname:'/userDetails',
         state :{
         mobileNumber : this.state
     }})
    
    
        axios.post('/stskFmsApi/userLogin/createUL',{
          mob:this.state.mob,
          email:this.state.email,
          password: this.state.password,
          userRoles:{
                id:this.state.userRoles.id
           }    
        })
        .then(response=>{
          console.log(response)
          console.log(this.state)
         
          })
          .catch(error=>{
            console.log(error)
        })
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
 
    // this.setState({[e.target.name]:e.target.value})
    // const { name, value } = e.target;
    // let formErrors = { ...this.state.formErrors };

    // switch (name) {
    //   case "email":
    //     formErrors.email = emailRegex.test(value)
    //       ? ""
    //       : "invalid email address";
    //     break;
    //   case "password":
    //     formErrors.password =
    //       value.length < 6 ? "minimum 6 characaters required" : "";
    //     break;
    //     case "confirmpassword":
    //         formErrors.confirmpassword =
    //           value.length < 6 ? "minimum 6 characaters required" : "";
          
    //         break;
    //   default:
    //     break;
    // }

    // this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    
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
      //       {/* <img src={image}></img> */}
      //     </div>
      //     <h5 className="text-center">{this.props.match.params.name}</h5>

      //     <form onSubmit={this.handleSubmit} noValidate>
     
            
      //       <div className="email">
      //         {/* <label htmlFor="email">Email Id/User Id</label> */}
      //         <input
      //           className=""
      //           placeholder="Email Id/User Id"
      //           type="email"
      //           name="email"
      //           // noValidate
      //           onChange={this.handleChange}
      //           value={email}
      //         />
      //         {/* {formErrors.email.length > 0 && (
      //           <span className="errorMessage">{formErrors.email}</span>
      //         )} */}
      //       </div>
            
      //       <div className="password">
      //         {/* <label htmlFor="password">Password</label> */}
      //         <input
      //           className=""
      //           placeholder="Password"
      //           type="password"
      //           name="password"
      //           noValidate
      //           onChange={this.handleChange}
      //           value={password}
      //         />
      //         {/* {formErrors.password.length > 0 && (
      //           <span className="errorMessage">{formErrors.password}</span>
      //         )} */}
      //       </div>
      //       <div className="confirmpassword">
      //         {/* <label htmlFor="password">Confirm Password</label> */}
      //         <input
      //           className=""
      //           placeholder="Confirm Password"
      //           type="password"
      //           name="confirmpassword"
      //           noValidate
      //           onChange={this.handleChange}
      //         />
      //         {/* {formErrors.confirmpassword.length > 0 && (
      //           <span className="errorMessage">{formErrors.confirmpassword}</span>
      //         )} */}
      //       </div>

      //       <div className="createAccount">
      //         <button type="submit">Next</button>
            
      //       </div>
      //     </form>
      //   </div>
      // </div>aaaaa

      <div className="wrapper">
        <div className="form-wrapper">
       
          <div className="text-center">
            <img src={logo} className="img3"></img>
          </div>
           <h2 className="text-center3">{this.props.match.params.name}</h2>

          <form onSubmit={this.handleSubmit} noValidate>
          
            
            <div className="email1">
              {/* <label htmlFor="email">Email Id/User Id</label> */}
              <input
                className=""
                placeholder="Email Id/User Id"
                type="email"
                name="email"
                // noValidate
                onChange={this.handleChange1}
                value={email}
              />
              {/* {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )} */}
            </div>
            
            <div className="password1"> 
              {/* <label htmlFor="password">Password</label> */}
               <input
                className=""
                placeholder="Password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange2}
                value={password}
              /> 
              {/* {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )} */}
            </div>
            <div className="confirmpassword1"> 
              {/* <label htmlFor="password">Confirm Password</label> */}
               <input
                className=""
                placeholder="Conform Password"
                type="password"
                name="confirmpassword"
                value={this.state.conformPwd}
                onChange={this.handleChange3}
              /> 
              {/* {formErrors.confirmpassword.length > 0 && (
                <span className="errorMessage">{formErrors.confirmpassword}</span>
              )} */}
            </div> 
              <p className="red-text">{this.state.error}</p>
            <div className="createAccount">
              <button type="submit">Next</button>
              </div>
           
          </form>
        </div>
       
      </div>
    );
  }
}

export default withRouter(Register);
