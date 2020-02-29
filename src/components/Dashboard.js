import React, { Component } from 'react'
import axios from 'axios'
import './css/dashboard.css'
import  mainLogo from './Images/Mainlogo.png'
import dashboard from './Images/dashboard.png'
import { withRouter,Link,NavLink } from 'react-router-dom'

class Dashboard extends Component {
    state = {
        posts :[],
        details:[]
    }
    componentDidMount(){
        this._isMounted = true;
        // document.addEventListener('DOMContentLoaded', function() {
        //     var elems = document.querySelectorAll('.sidenav');
        //     var instances = M.Sidenav.init(elems,{});
        // });



        // axios.get('http://stskfacilities.com:8081/stskFmsApi/jobseeker/getById/'+1)
        // .then(res =>{
        //     console.log(res.data)
        //     console.log(res.data.data)
        //     this.setState({
        //         details: res.data.data
        //     });
        // })

        // axios.get('https://jsonplaceholder.typicode.com/posts')
        // .then(res => {
        //     this.setState({
        //         posts: res.data.slice(0,10)
        //     });
        // })

        axios.get('http://stskfacilities.com:8081/stskFmsApi/jobs/getAllJobs')
        .then(res => {
            this.setState({
                posts: res.data.data
            });
        })
        
    }
   
    render() {
        
        console.log(this.state)
        console.log(this.state.details.email)

        const {posts} = this.state;
        const postList = posts.length ? (
            posts.map(post => {
                return(
                    <div className="row post card" key={post.id}>
                        <div className="card-content" >

                            <div className="col s3 m3 l3">
                                <strong className="text-bold">{post.jobType}</strong>
                                <p>{post.serviceArea}</p>
                            </div>
                             <div className="col s3 m3 l3">
                                <strong className="text-bold">{post.jobType}</strong>
                                <p>{post.serviceArea}</p>
                            </div>
                             <div className="col s3 m3 l3">
                                <strong className="text-bold">{post.jobType}</strong>
                                <p>{post.serviceArea}</p>
                            </div>
                             <div className="col s3 m3 l3 right-align">
                                <a className="btn" id="dashbtn">Apply</a>
                            </div>
                           
                         </div>
                    </div>
                )
            })
        ) : (
            <div className="center"><h5>Loading, please wait....</h5></div>
        )
       
        return (
            <div id="back">
                <nav >
                    <div className="nav-wrapper white ">
                    <a className="brand-logo left" id="img"> 
                        <img className="center" id="logo" src={mainLogo} width="60" height="60"></img>
                    </a>
                        <ul id="nav-mobile" className="right">
                            <li><Link to="/dashboard" className="waves-effect waves-light btn-small" id="btnnav">Home</Link></li>
                            <li><Link to="/help">Help</Link></li>
                            <li><a href="">Profile</a></li>
                        </ul>
                    </div>
                </nav>

           

                <div className="row">
                <div className="">
                     <img className="center" id="dashboard" src={dashboard} ></img>
                     
                </div>

                <nav className="container white" id="search">
                <div className="nav-wrapper">
                        <div className="input-field">
                        <input type="search" placeholder="Search jobs"></input>
                        <i className="material-icons right">
                    
                        <a className="waves-effect waves-light btn teal lighten-2 text-white" id="src1"><i className="material-icons right" id="src">search</i>Search</a></i>
                        
                        <label className="label-icon"><i className="material-icons">search</i>
                    </label>
                    </div>
                </div>
                </nav>
                </div>





            <div className="container" id="details">
                <div className="col s12">
                <div className="row">
                    <div className="col s4 z-depth-1" id="profile">
                        <div id="editicn">
                            <i className="material-icons small right">edit</i>
                        </div>
                        <div className="center" id="profile1">
                            <i className="material-icons large">person</i>
                            <p>{}</p>
                            <div className="left-align">
                                <p><i className="material-icons small" id="dashicn">location_on</i>{this.state.details.ulCode}</p>
                                <p><i className="material-icons small" id="dashicn">email</i>{this.state.details.email}</p>
                                <p><i className="material-icons small" id="dashicn">call</i>Mobile number</p>
                                <p><i className="material-icons small" id="dashicn">book</i>Address</p>
                                <p><i className="material-icons small" id="dashicn">book</i>Pin-code</p>
                            </div> 
                            
                            <hr></hr>
                            <a className="waves-effect waves-light btn" id="src1"><i className="material-icons left">logout</i>Logout</a>
                        </div>
                    </div>
                    
                    <div className="col m8 l8 offset-l1 z-depth-1" id="container">
                        <h5>Job recomended for you</h5>
                        {postList}
                    </div>
                    </div>
                    </div>
               

                <div className="row z-depth-1" id="container2">
                    <div className="container">
                        <h5>Status of apllied jobs</h5>
                        {postList}
                     </div>
                </div>
                </div>
                

                 <footer className="page-footer white">
                 <div className="footer-copyright center" id="footer">
                   <div className="center">
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
