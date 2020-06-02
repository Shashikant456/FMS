import React, { Component } from 'react'
import axios from 'axios'
import logo from './Images/Mainlogo.png'
import './css/userLogin.css'
import Loader from 'react-loader-spinner'
import $ from 'jquery'
import jQuery from 'jquery'

const header={
    'x-api-key': ' $2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2' 
}

class UserLogin extends Component {
state = {
            isPasswordShown:"false",
              email:'',
              email1:'',
              password:'',
              userId:'',
              error:'',
              mobileNumber:'',
              loading:false,
             
        }
        togglePasswordVisibility = () =>{
            const {isPasswordShown} = this.state;
            this.setState({isPasswordShown:!isPasswordShown});
          }
    
        handleChange1 = (e) => {
            this.setState({
                email :"'" + e.target.value + "'",
                email1: e.target.value
            })
            
        }
        handleChange2 = (e) => {
            this.setState({
                password :e.target.value
            })

        }
        forgetPwd=(e)=>{
            this.props.history.push('/forgotPwd')
        }
        componentDidMount(){
            // axios.get('/stskFmsApi/jobseekerdoc/getByJobSeekerId/3',{headers:header})
            // .then(res => {
            //     console.log(res.data.data.docId)
            //     this.setState
            //     ({
            //         docId:res.data.data.docId
            //     })
                // console.log(res.data.success)

                // if(res.data.success===1){
                //     this.setState({
                //         posts: res.data.data
                //     });
                // }
                // else{
                //     console.log("No jobs present")
                // }
                //}) 
        }
        handleSubmit=(e)=>{
            e.preventDefault();
            console.log(this.state)
            this.setState({
                loading:true
            })
            axios.get('/stskFmsApi/jobseeker/getByEmailid/'+ this.state.email,{headers:header})
            .then(res=>{
                console.log(res.data)
                console.log(res.data.data)
                if(res.data.data===null){
                    
                    axios.get('stskFmsApi/userLogin/getByEmailid/'+ this.state.email,{headers:header})
                    .then(res=>{
                        if(res.data.success===1){
                            this.setState({
                                mobileNumber:res.data.data.mob
                            })
                        }
                        else{
                            this.setState({
                                error:'Opps! email id does not registered'
                            })
                        }
                    })
                }else{
                console.log(res.data.data)
                this.setState({
                    userId:res.data.data.id,
                    mobileNumber:res.data.data.mob
                })}

            })
          

            axios.post('/stskFmsApi/userLogin/verifyUser',{
                email:this.state.email1,
                password:this.state.password
                 },{headers:header})
                .then(Response => {
                console.log(Response.data)
                console.log(Response.data.success)
                   if (Response.data.success===1)
                    {
                        axios.get('/stskFmsApi/jobseeker/getByEmailid/'+ this.state.email,{headers:header})
                        .then(res=>{
                            console.log(res.data)
                            console.log(res.data.data)
                            if(res.data.data===null){
                                this.props.history.push({
                                    pathname : '/userDetails',
                                    state :{
                                    mobileNumber : this.state
                                }} );
                             }
                             else{
                           
                            this.props.history.push({
                                pathname : '/dashboard',
                                state :{
                                mobileNumber : this.state,
                                userId: this.state.userId 
                             }})
                            }
                        })
                    }
                     else if(Response.data.message==="User ID or Password error"){
                        this.setState({
                            error:'User ID or Password error',
                            loading:false
                        })
                    }
                    else{
                        this.setState({
                            error:'Opps! email id does not registered',
                            loading:false
                        })
                    }
             })
            .catch(error => {
                console.log(error)
            });

        }


    render() {
        console.log(this.state)
        const {loading}=this.state
        const {isPasswordShown} = this.state;
        return (
        
            <div className="" id="body">
            <div className="row" id="main1">      
             <center id="center">
             <img className="center" id="logo" src={logo} width="70" height="70"></img>
             <h3 className="" id="userloginHeading">User Login</h3>  
             <form id="frm" onSubmit={this.handleSubmit}>
             <div className="input-field">
                    <i id="iconn" className="material-icons prefix">person</i>
                    <input id="icon_prefix" type="email" size="30" required
                     placeholder="User Id/ Mail Id"  onChange={this.handleChange1}/>
                </div>
            
                    <div className="input-field">
                    <i id="iconn" className="material-icons prefix">lock</i>
                    <input id="icon_prefix" type="password" placeholder="Password"
                     type={(isPasswordShown) ? "password" : "text"} size="30"
                     required  onChange={this.handleChange2}
                    
                     pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"/>
                     <i className="fa fa-eye" id="eyesssss" onClick={this.togglePasswordVisibility}></i>
                   <br></br>
                   <br></br>
                    <h6 className="red-text">{this.state.error}</h6>
                </div>
                <br></br>
            <button id="UserLoginButton">
            {loading && 
                <i className="fa fa-spinner fa-spin"></i>}
                Login</button>
             </form>
             <h6 id="forgot" onClick={this.forgetPwd}>Forgot Password?</h6>
            
             </center>
            </div> 
            </div>

        )
    }
}

export default UserLogin