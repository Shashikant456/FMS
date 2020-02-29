import React, { Component } from 'react'
import './css/dashboardHelp.css'
import  mainLogo from './Images/Mainlogo.png'
import dashboard from './Images/dashboard.png'
import {  withRouter, Link} from 'react-router-dom'
import jobseeker from './Images/jobseeker.png'
import vendor from './Images/vendor.png'
import association from './Images/association.png'
import recident from './Images/resident.png'
import * as $ from 'jquery'


export class dashboardHelp extends Component {
  
    render() {
    //   function react() {
    //     $('.collapsible').collapsible("toggle");
      
    // }
        return (
            <div id="back">
            
            <div>
            <nav >
            <div className="nav-wrapper white ">
            <a className="brand-logo left" id="img"> 
                <img className="center" id="logo" src={mainLogo} width="60" height="60"></img>
            </a>
                <ul id="nav-mobile" className="right">
                <li><Link to="/dashboard">Home</Link></li>
                <li><a href="" className="waves-effect waves-light btn-small" >Help</a></li>
                <li><a href="">Profile</a></li>
            </ul>
            </div>
        </nav>

     
        <div className="row">
        <img className="center" id="dashboard" src={dashboard} ></img>


        <nav className="container white" id="search">
        <div className="nav-wrapper">
                <div className="input-field">
                <input type="search" placeholder="Search jobs" required ></input>
                <i className="material-icons right">
            
                <a className="waves-effect waves-light btn teal lighten-2 text-white" id="src1"><i className="material-icons right" id="src">search</i>Search</a></i>
                
                <label className="label-icon"><i className="material-icons">search</i>
            </label>
            </div>
        </div>
        </nav>
        </div>
          
            
        <h4 className="center">Got questions?</h4>
        <p className="center" id="textcolor">Perfect, we've got answer!</p>

        <div className="row container">
          <div className="col s3 m3 l3">
            <div className="card">
              <div className="card-image">
                <img src={jobseeker} width="30" height="50"/>
              </div>
              <div className="card-content">
                <p>Job seeker</p>
              </div>
            </div>
            </div>

            <div className="col s3 m3 l3 ">
            <div className="card">
              <div className="card-image">
                <img src={vendor}/>
              </div>
              <div className="card-content">
                <p>Vendor</p>
              </div>
            </div>
            </div>

            <div className="col s3 m3 l3">
            <div className="card">
              <div className="card-image">
                <img src={association}/>
              </div>
              <div className="card-content">
                <p>Association</p>
              </div>
            </div>
            </div>

            <div className="col s3 m3 l3">
            <div className="card">
              <div className="card-image">
                <img src={recident}/>
              </div>
              <div className="card-content">
                <p>Recident</p>
              </div>
            </div>
            </div>
          </div>

          
            <div className="row">
              <div className="container"> 
                <ul className="col s8 m8 l8 offset-s2 offset-l2 offset-m2 collapsible" id="toggle">
                <li>
                  <div className="collapsible-header"><i className="material-icons">expand_more</i>First</div>
                  <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                </li>
              </ul>
              </div>
            </div> 
              



              <h5 className="center">You still have a questions?</h5>
              <p className="center gray-text" id="textcolor">Lets talk about everything!</p>


              <div className="row container">
              <div className="col s6 m5 l5 offset-m3 offset-l3 z-depth-1 center " id="mail">
                 <i className="material-icons">email</i>
                 <p id="textcolor">send us an email <a href="">info@stskfecilities.com</a></p>
              </div>
              <div className="col s6 m5 l5 offset-s1 offset-l1 offset-m1 z-depth-1 center" id="mail">
                 <i className="material-icons ">call</i>
                 <p id="textcolor">Call us on <a href="">1800-121-0786</a></p>
              </div>
            </div>


            <div className="container z-depth-1">
              <ul className="">
                <div className="collapsible-header">System info: <p>Its </p></div>
              </ul>
            </div>

          
                  <footer className="page-footer" id="address">
                  <div className="center align">
                    <div className="row ">
                      <div className="col l6 s12 m6 ">
                        <h5 className="black-text">Come and visit our office</h5>
                        <p className="" id="textcolor">To get in touch with us, and to know more about us and our service,</p>
                        <p className="" id="textcolor">please come and visit us.</p>
                        <p className="black-text ">Working hours: 9 to 7</p>
                        <div className="center">
                            <i className="material-icons small" id="locicon">location_on</i>
                            <p id="textcolor">#195/6/2,#3rd Floor, Ward No. 192, Bhartena Agrahara,Above MG Showroom, Hosur Main Road, Electronic City, Bengaluru-560100</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="footer-copyright center" id="footer">
                    <div>
                    Copyright @2020 All rights reserved | This tamplate is made with STSK
                    <a className="grey-text text-lighten-4 right" href="#!"></a>
                    </div>
                </div>

                </footer>
               
            
        </div>
        </div>
        )
    }
}
// $(document).ready(function(){
//   $('#collapsible').collapsible();
// });
export default withRouter(dashboardHelp)
