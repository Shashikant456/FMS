import React, { Component } from 'react'

import axios from 'axios'
import '../AssociationCSS/Navbar.css'
import  mainLogo from '../Images/Mainlogo.png'
import dashboard from '../Images/dashboard.png'
import { withRouter,Link,NavLink } from 'react-router-dom'


class Navbar extends Component {
    render() {
        return (
            <div className="white"> 
            <div className="navbar-fixed white">
            <nav className="white" >
                <div className="nav-wrapper white container">
                <a className="brand-logo left" id="img"> 
                    <img className="center" src={mainLogo} width="50" height="50"></img>
                </a>
                    <ul id="nav-mobile" className="right">
                        <li><Link to="/" className="waves-effect waves-light btn-small">Property Details</Link></li>
                        <li><Link id="home" to="/">Vendor</Link></li>
                        <li><Link id="home" to="/">Resident Details</Link></li>
                        <li><Link id="home" to="/">Payment</Link></li>
                        <li><Link id="home" to="/associationPageHelp">Help</Link></li>
                        <li><i className="material-icons grey-text large" id="profileicn">account_circle</i></li>
                    </ul>
                </div>
            </nav>
          </div>
        
            <div className="row white">
                <div className="col s12 m10 l10 offset-m1 offset-l1 z-depth-1 ">
                <h4>Block Details</h4>
                    <div id="MianBlock" className="col s2 m2 l2 z-depth-1 grey container" onClick={this.handleVendor} >
                    <br></br>
                     <div id="block" className="button center-align white"><i class="material-icons left">keyboard_arrow_right</i><i class="material-icons right">edit</i>Block A</div>
                    <h6 className="center white-text"><i class="material-icons">add</i>Add flat</h6>
                    </div>
                    
                    <div id="MianBlock" className="col s2 m2 l2 z-depth-1 grey container" onClick={this.handleVendor} >
                    <br></br>
                     <div id="block" className="button center-align white"><i class="material-icons left">keyboard_arrow_right</i><i class="material-icons right">edit</i>Block A</div>
                    <h6 className="center white-text"><i class="material-icons">add</i>Add flat</h6>
                    </div>

                    <div id="MianBlock" className="col s2 m2 l2 z-depth-1 grey container" onClick={this.handleVendor} >
                    <br></br>
                     <div id="block" className="button center-align white"><i class="material-icons left">keyboard_arrow_right</i><i class="material-icons right">edit</i>Block A</div>
                    <h6 className="center white-text"><i class="material-icons">add</i>Add flat</h6>
                    </div>
                    <div id="MianBlock" className="col s2 m2 l2 z-depth-1 grey container" onClick={this.handleVendor} >
                    <br></br>
                     <div id="block" className="button center-align white"><i class="material-icons left">keyboard_arrow_right</i><i class="material-icons right">edit</i>Block A</div>
                    <h6 className="center white-text"><i class="material-icons">add</i>Add flat</h6>
                    </div>
                </div>
            </div>
            

        </div>
        )
    }
}

export default Navbar
