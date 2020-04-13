
import React, { Component } from 'react'
import { withRouter,Link, Route} from 'react-router-dom'
import logo from './Images/Mainlogo.png'
import left from './Images/leftside.png'
import right from './Images/rightside.png'
import job from './Images/Pre-reg_icon_jobseeker.png'
import './css/preregister.css'
import axios from 'axios'

const header={
    'x-api-key': ' $2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2' 
}


export class Register extends Component {
    

   state= { userRoless:[],
            mobileNumber:'',
            userRoles:{
                id: ''
            }
        }
    
    componentDidMount(){
        this._isMounted = true;
        axios.get('/stskFmsApi/userRoles/getAllUserRoles',{headers:header})
        .then(res=>{
            console.log(res.data)
            console.log(res.data.data)
            this.setState({
                userRoless : res.data.data,
                mobileNumber: this.props.location.state.mobileNumber.mobileNumber,
            })
           
        })
     }

    handleChange=(e)=>{
       
         this.props.history.push({
             path:('/register'),
            state :{
            mobileNumber : this.state
            //name:this.state.name
        }})
    }
   
    render() {

        const {userRoless} = this.state;
        console.log(this.state)
        const postList = userRoless.map((post,index) =>{
            
        
            return(
                
                <div key={index} >
                
                     <Link to={"/register"+"/"+post.id+"/"+post.name}><h6 id="pre">{post.name}</h6></Link>
                    
                </div>

            )})
        // {console.log(userRole.name)}
        // {this.state.userRoles.map(userRole=>(<option key={userRole.id} value={userRole.name}>
            
            
        //     </option>

        //     ))}
        return (

            <div className="center row" id="body">
            
                    <div className="center col s10" id="main">      
                    <img className="left align" id="side" src={left} width="50" height="50"></img>
                    <img className="right align" id="side" src={right} width="50" height="50"></img>
                    <center id="center">
                    <img id="logo" className="center" src={logo} width="60" height="60"></img>
                    <h3 className="center" id="text">Choose Category</h3>  
                    
                    <div className='row'>
                            <div className="col s6 m6 l6">
                                <div id="jobseeker" type='submit' name='btn_login' onClick={this.handleChange}
                                className='btn btn-large white'>{postList[0]}
                                </div>
                            </div>
                            <div className="col s6 m6 l6">
                                <div id="vendor" type='submit' name='btn_login' onClick={this.handleChange}
                                className='btn btn-large white '>{postList[1]}</div>
                            </div>
                        </div>

                    <div className='row'>
                        <div className="col s6 m6 l6">
                                <div id="association" type='submit' name='btn_login' onClick={this.handleChange}
                                className='btn btn-large white '>{postList[2]}</div>
                            </div>
                        <div className="col s6 m6 l6">
                            <div id="resident" type='submit' name='btn_login' onClick={this.handleChange}
                            className='btn btn-large white '>{postList[3]}</div>
                        </div>
                    </div>
                    
                    </center>
                    </div> 
        
            </div>

        )
    }
}
export default withRouter(Register)