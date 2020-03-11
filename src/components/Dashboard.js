import React, { Component } from 'react'
import axios from 'axios'
import './css/dashboard.css'
import  mainLogo from './Images/Mainlogo.png'
import dashboard from './Images/dashboard.png'
import { withRouter,Link,NavLink } from 'react-router-dom'
import Popup from "reactjs-popup";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        posts :[],
        details:[],
        userId:'91',
        LoggedIn:'true',
        mobileNumber:'',
        search:'',
        appliedJobs:'',
        searchedJobs:[],
        searchLoading:false,
        searchError:'',

        name:'',
        email:'',
        mob: "",
        experience: "",
        eduQual: "",
        jobUpdate:"",
        address:'',
        jobTypes:[
                 { id:''}
                 ]
    }
}
    componentWillMount(){
        this.setState({
            //userId:this.props.location.state.userId, 
        })
    }
    componentDidMount(){
        this._isMounted = true;
        console.log(this.state.appliedJobs)

        axios.get('/stskFmsApi/jobseeker/getById/'+this.state.userId)
        .then(res =>{
            console.log(res.data.data)
            console.log(res.data.data.mob)
            this.setState({
                details: res.data.data
            });
        })

        axios.get('/stskFmsApi/jobs/recommendedJobs/'+this.state.userId)
        .then(res => {
            console.log(res.data)
            console.log(res.data.data)
            this.setState({
                posts: res.data.data
            });
        }) 

        // axios.put('/stskFmsApi/jobseeker/applyJobs',
        // {  id:91,
        //     jobs:[{
        //         id:13 }]})
        //     .then(res=>{
        //         console.log(res)
        //         console.log(res.data)
        //     })
           

        // axios.get('https://jsonplaceholder.typicode.com/posts')
        // .then(res => {
        //     this.setState({
        //         posts: res.data.slice(0,10)
        //     });
        // })
    }
    // handleApply=(e)=>{
    //     axios.get('/stskFmsApi/jobseeker/getById/'+this.state.userId)
    //     .then(res=>{
    //         console.log(res.data)
    //     })
    // }
    handleLogin=(e)=>{
        this.setState({
            LoggedIn:false
        })
        this.props.history.push('/')
    }
    handleinputSearch=(e)=>{
        this.setState({
            search:e.target.value,  
        })
    }
    handlepopup=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    popupsubmit=(e)=>{
        e.preventDefault();
        axios.put('/stskFmsApi/jobseeker/editJS',{
            name:this.state.name,
            email: this.state.email,
            mob: this.state.mob,
            experience: this.state.experience,
            eduQual: this.state.eduQual,
            jobUpdate:this.state.jobUpdate,
            userLogin:{
              id:this.state.userLogin
            },
            jobTypes:[{
              id:this.state.jobTypes.id
            }]
        })
    }
   
    handleSearch=(e)=>{
        axios.get('/stskFmsApi/jobs/getByJobs/'+this.state.search)
        .then(res=>{
            if(res.data.success===1){
                this.setState({
                    searchedJobs:res.data.data,
                    searchLoading:true,
                    searchError:''
                })
            }
            else{
                this.setState({
                    searchError:'Sorry, No JOb updates..!'
                })
            }
           
        })
    }
    render() {
      
        const {posts} = this.state;
        const postList = posts.length ? (
            posts.map(post => {
                this.handleApply=(e)=>{
                    axios.put('/stskFmsApi/jobseeker/applyJobs',
                        {  id:this.state.userId,
                            jobs:[{
                                id:post.id
                             }]})
                            .then(res=>{
                                // console.log(res)
                                // console.log(res.data)
                                console.log(post.id)
                            }) 
                            axios.get('/stskFmsApi/jobseeker/getById/'+this.state.userId)
                            .then(res=>{
                                this.setState({
                                    appliedJobs:res.data.data.jobs
                                })
                            })
                        }
                
                return(
                    <div className="row post card" key={post.id}>
                        <div className="card-content" >
                        
                            <div className="col s2 m2 l2">
                                <p id="dashtext" id="dashtext">Job position</p>
                                <br></br>
                                <p>{post.jobType}</p>
                            </div>
                             <div className="col s2 m2 l2">
                                 <p id="dashtext">Location</p>
                                <br></br>
                                <p>{post.serviceArea}</p>
                            </div>
                             <div className="col s2 m2 l2">
                                 <p id="dashtext">Age Limit</p>
                                <br></br>
                                <p>{post.ageLimit}</p>
                            </div>
                             <div className="col s3 m3 l3">
                                 <p id="dashtext">Language</p>
                                <br></br>
                                <p>{post.language}</p>
                            </div>
                             <div className="col s2 m2 l2 right-align">
                                <a className="btn" onClick={this.handleApply} value={post.id} id="dashbtn">Apply</a>
                            </div>
                           
                         </div>
                    </div>
                )
            })
        ) : (
            <div className="center"><h5>Loading, please wait....</h5>
            <div className="preloader-wrapper small active">
            <div className="spinner-layer spinner-green-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div><div className="gap-patch">
                <div className="circle"></div>
              </div><div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
            </div>
        )

        const {searchedJobs} = this.state;
        const searchList = searchedJobs.length ? (
            searchedJobs.map(search => {
                return(
                    <div className="row post card" key={search.id}>
                        <div className="card-content" >
                        
                            <div className="col s2 m2 l2">
                                <p id="dashtext" id="dashtext">Job position</p>
                                <br></br>
                                <p>{search.jobType}</p>
                            </div>
                             <div className="col s2 m2 l2">
                                 <p id="dashtext">Location</p>
                                <br></br>
                                <p>{search.serviceArea}</p>
                            </div>
                             <div className="col s2 m2 l2">
                                 <p id="dashtext">Age Limit</p>
                                <br></br>
                                <p>{search.ageLimit}</p>
                            </div>
                             <div className="col s3 m3 l3">
                                 <p id="dashtext">Language</p>
                                <br></br>
                                <p>{search.language}</p>
                            </div>
                             <div className="col s2 m2 l2 right-align">
                                <a className="btn" onClick={this.handleApply} value={search.id} id="dashbtn">Apply</a>
                            </div>
                           
                         </div>
                    </div>
            
                )
            })
        ) :(
            <div></div>
        )


        const {appliedJobs} = this.state;
        const appliedJobsList = appliedJobs.length ? (
        appliedJobs.map(post => {      
                return(
                    <div className="row post card" key={post.id}>
                        <div className="card-content" >
                        
                            <div className="col s2 m2 l2">
                                <p id="dashtext" id="dashtext">Job position</p>
                                <br></br>
                                <p>{post.jobType}</p>
                            </div>
                             <div className="col s2 m2 l2">
                                 <p id="dashtext">Location</p>
                                <br></br>
                                <p>{post.serviceArea}</p>
                            </div>
                             <div className="col s2 m2 l2">
                                 <p id="dashtext">Age Limit</p>
                                <br></br>
                                <p>{post.ageLimit}</p>
                            </div>
                             <div className="col s3 m3 l3">
                                 <p id="dashtext">Language</p>
                                <br></br>
                                <p>{post.language}</p>
                            </div>
                             <div className="col s2 m2 l2 right-align">
                                <a className="btn green" value={post.id} id="dashbtn">Waiting</a>
                            </div>
                           
                         </div>
                    </div>
                )
            })
        ) : (
            <div className="center"><h5>You have not Applied for any Jobs</h5>
            <div className="preloader-wrapper small active">
            <div className="spinner-layer spinner-green-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div><div className="gap-patch">
                <div className="circle"></div>
              </div><div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
            </div>
            
            )
       
        return (
            <div id="back">
               <div className="navbar-fixed white">
                    <nav className="white" >
                        <div className="nav-wrapper white container">
                        <a className="brand-logo left" id="img"> 
                            <img className="center" src={mainLogo} width="50" height="50"></img>
                        </a>
                            <ul id="nav-mobile" className="right">
                                <li><Link to="/dashboard" className="waves-effect waves-light btn-small" id="btnnav">Home</Link></li>
                                <li><Link id="home" to="/help">Help</Link></li>
                                <li><i className="material-icons grey-text large" id="profileicn">account_circle</i></li>
                            </ul>
                        </div>
                    </nav>
                </div>
           

                <div className="row">
                <div className="">
                     <img className="center" id="dashboard" src={dashboard} ></img>
                     
                </div>
                    
                <nav className="container white" id="search">
                <div className="nav-wrapper">
                    
                        <div className="input-field">
                        
                            <input id="dashinput" type="search" onChange={this.handleinputSearch} required placeholder="Search jobs"/>
                            <i className="material-icons right">
                        
                            <a className="btn hide-on-small-only" onClick={this.handleSearch} id="src1">
                            <i className="material-icons right"  id="src">search</i>Search</a></i>

                            <i className="material-icons right show-on-small hide-on-med-and-up grey-text"
                            onClick={this.handleSearch}>search</i>
                            
                        </div>
                      
                </div>
                </nav>
                </div>


            <div className="" id="details">
                <div className="row">
                    <div className="col s12 m12 l12">
                        <div className="col s12 m3 l3 offset-m1 offset-l1 z-depth-1" id="profile">
                        <div id="editicn">
                        <Popup modal trigger={<i className="material-icons small right">edit</i>}>
                        <div className="popup-content ">
                            <h4 className="center-align" id="popTitle">Edit profile</h4>
                            <form onSubmit={this.popupsubmit}>
                            <div className="col s12 m12 l6">
                            
                                <label >First name</label>
                                <input id="inputBorder" name="name" defaultValue={this.state.details.name} onChange={this.handlepopup} type="text"></input>
                            
                            
                                <label >Email</label>
                                <input id="inputBorder" name="email" defaultValue={this.state.details.email} onChange={this.handlepopup}  type="text"></input>
                            
                                <label>Education Qualificatin</label>
                                <input id="inputBorder" name="eduQual" defaultValue={this.state.details.eduQual} onChange={this.handlepopup}  type="text"></input>
                                <label>Get job opening updates</label>
                                <input id="inputBorder" name="jobUpdate" defaultValue={this.state.details.jobType} onChange={this.handlepopup}  type="text"></input>
                                <button id="popcancelbtn" type="text">cancel</button>
                            </div>
                            <div className="col s12 m12 l6">
                                <label>Mobile number</label>
                                <input id="inputBorder" name="mob" defaultValue={this.state.details.mob} onChange={this.handlepopup} type="text"></input>
                                <label>No of years experiance</label>
                                <input id="inputBorder" name="experience" defaultValue={this.state.details.experience} onChange={this.handlepopup}  type="text"></input>
                                <label>Applied for</label>
                                <input id="inputBorder" name="" onChange={this.handlepopup}  type="text"></input>
                                <label>Address</label>
                                <input id="inputBorder" name="address"  onChange={this.handlepopup}  type="text"></input>
                                <button id="popsavebtn" type="text">save</button>
                            </div>
                            </form>
                            </div>
                            
                    </Popup>
                            
                        </div>
                        <div className="center" id="profile1">
                            <i className="material-icons large">person</i><br></br>
                            <strong className="center-align">{this.state.details.name}</strong>
                            <div className="left-align">
                                <p><i className="material-icons small" id="dashicn">location_on</i>{this.state.details.ulCode}</p>
                                <p><i className="material-icons small" id="dashicn">email</i>{this.state.details.email}</p>
                                <p><i className="material-icons small" id="dashicn">call</i>{this.state.details.mob}</p>
                                <p><i className="material-icons small" id="dashicn">book</i>{this.state.details.experience}</p>
                                <p><i className="material-icons small" id="dashicn">book</i>{this.state.details.eduQual}</p>
                            </div> 
                            
                            <hr></hr>
                            <a className="waves-effect waves-light btn" onClick={this.handleLogin} id="logout"><i className="material-icons left">logout</i>Logout</a>
                        </div>
                    </div>
                            <div className="col s12 m7 l7 offset-l1 z-depth-1" id="container">
                            {
                                this.state.search ? (
                                    <div>
                                        <h5>Searched Jobs</h5>
                                        <h4 className="red-text">{this.state.searchError}</h4>
                                        {searchList}
                                    </div>
                                ):(
                                    <div>
                                        <h5>Job recomended for you</h5>
                                        {postList}
                                    </div>
                                )
                            }
                            </div>
                        </div>
                    </div>
               

                <div className="col s12 l8 m8 offset-m1 offset-l1 z-depth-1" id="container2">
                    <div className="">
                        <h5 className="center-align">Status of applied jobs</h5>
                        {appliedJobsList}
                     </div>
                </div>
                </div>
                

                 <footer className="page-footer white">
                 <div className="footer-copyright center" id="footer">
                   <div className="text-center">
                   <p className="center" id="footer1">Copyright @2020 All rights reserved | This tamplate is made with STSK</p>
                   <a className="grey-text text-lighten-4 right" href="#!"></a>
                   </div>
               </div>

               </footer>
            </div>

        )
        
    }
}

export default withRouter(Dashboard)
