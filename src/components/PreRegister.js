
import React, { Component } from 'react'
import { withRouter,Link, Route} from 'react-router-dom'
import logo from './Images/Mainlogo.png'
import left from './Images/leftside.png'
import right from './Images/rightside.png'
import job from './Images/jobseeker2.png'
import vendor from './Images/vendor2.png'
import association from './Images/association2.png'
import resident from './Images/resident2.png'
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
        return (

            <div className="center row" id="body">
            
                <div className="center col s10" id="main">      
                    <img className="left align" id="side" src={left} width="50" height="50"></img>
                    <img className="right align" id="side" src={right} width="50" height="50"></img>
                    <center id="center">
                        <img id="logo" className="center" src={logo} width="60" height="60"></img>
                        <h3 className="center" id="texttt">Choose Category</h3>  
                        
                        <div className='row'>
                            <div className="col m6 l6" id="jobseeeker">
                                <img className="left align"  src={job} width="60" height="60"></img>{postList[0]}
                            </div>
                            <div className="col m6 l6" id="associationn">
                                <img className="left align"  src={association} width="60" height="60"></img>{postList[1]}
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col m6 l6" id="vendorr">
                                <img className="left align"  src={vendor} width="60" height="60"></img>{postList[2]}
                            </div>
                            <div className="col m6 l6" id="residentt">
                                <img className="left align"  src={resident} width="60" height="60"></img>{postList[3]}
                            </div>
                        </div>
                     
                    </center>
                </div> 
        
            </div>

        )
    }
}
export default withRouter(Register)