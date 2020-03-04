import React, { Component } from 'react'
import axios from 'axios'
import logo from './Images/Mainlogo.png'

class ChangePwd extends Component {

        state = {
        mob:'',
        password:'',
        confirmPassword:'',
        error:''
    }

        componentDidMount(){
            this.setState({
                //mob: this.props.location.state.mobileNumber.mobileNumber
            })
         }

        handleChange1 = (e) => {
            this.setState({
                password : e.target.value
            })
        }
        

        handleChange2 = (e) => {
            this.setState({
                confirmPassword : e.target.value
            })
        }
        handleSubmit = (e) => {
         e.preventDefault();
        const { password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            
            this.setState({
                password:'',
                confirmPassword:'',
                error:"Password and Confirmpassword miss-match"
            })
        } else {
            axios.put('/stskFmsApi/userLogin/resetpassword', 
            {   countryCode:91,
                mob:this.state.mob,
                password:this.state.password})
           .then(Response => {
        
                this.props.history.push('./userLogin')
            
                console.log(Response)
                console.log(Response.data)
            })
          
           .catch(error => {
               console.log(error)
           });
        }
    }

    render() {
        return (
            // <div>
            //     <div id="body">
            //         <div className="row" id="main">      
            //         <center id="center">
            //         <h5 className="center" id="text">Forget Password</h5>  
            //         <form onSubmit={this.handleSubmit}>
            //             <input type="password" value={this.state.password} onChange={this.handleChange1} placeholder="Enter password" ></input>
            //             <input type="password" value={this.state.confirmPassword} onChange={this.handleChange2} placeholder="Conform Password"></input>
            //             <button  className="waves-effect waves-light btn">Save</button>
            //         </form>
            //         </center>
            //         </div> 
            //     </div>
            // </div>



            <div id="body">
            <div className="row" id="main2">      
             <center id="center">
             <img className="center" id="logo" src={logo} width="60" height="60"></img>
             <form id="frm" onSubmit={this.handleSubmit}>
             <div className="input-field">
                    <i id="iconn" className="material-icons prefix">lock</i>
                    <input id="icon_prefix" type="password" required value={this.state.password} onChange={this.handleChange1}
                    minLength="6" placeholder="Enter password" onChange={this.handleChange1}/>
                    
                </div>
                    <div className="input-field">
                    <i id="iconn" className="material-icons prefix">lock</i>
                    <input id="icon_prefix" type="password" required value={this.state.confirmPassword} onChange={this.handleChange2}
                    minLength="6" placeholder="Confirm password" onChange={this.handleChange2}/>
                     <p className="red-text">{this.state.error}</p>
                </div>
                
            <button id="input-type4">Save</button>
             </form>
            
             </center>
            </div> 
            </div>
        )
    }
}

export default ChangePwd
