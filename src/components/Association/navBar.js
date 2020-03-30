import React, { Component } from 'react'

import axios from 'axios'
import '../AssociationCSS/Navbar.css'
import  mainLogo from '../Images/Mainlogo.png'
import dashboard from '../Images/dashboard.png'
import { withRouter,Link,NavLink } from 'react-router-dom'


class Navbar extends Component {
    state={
        Block:true
    }
    componentDidMount(){
        axios.get('/stskFmsApi/blocks/getAllBlocks')
        .then(res =>{
            console.log(res)
            console.log(res.data)
        })
    }
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
        
          <div className="row">                                                                                                                     
          <div className="">
               <img className="center" id="dashboard" src={dashboard} ></img>
               </div>
          </div>

          {this.state.Block ? ( 
        <div className="row white">
          <div className="col s10 m10 l10">
          <div className="col s10 m10 l10 offset-m1 offset-l1 z-depth-1">
          <h4>Block Details</h4>
              <div id="MianBlock" className="col s5 m2 l2 z-depth-1 grey container" onClick={this.handleVendor} >
              <br></br>
               <div id="block" onClick={()=>this.setState({Block:false})} className="button center-align white">
               <i class="material-icons left">keyboard_arrow_right</i><i class="material-icons right">edit</i>Block A</div>
              <h6 className="center white-text"><i class="material-icons">add</i>Add flat</h6>
              </div>
          </div>
          </div>
      </div>
      ):(
          <div className="row">
          <div className="col s10 m10 l10">
          <div className="col s10 m10 l10 offset-m1 offset-l1 z-depth-1">
            <div className="row white">
            <div className="col s10 m10 l10">
                <h4>Block Details</h4>
                <div id="MianBlock" className="col s5 m2 l2 z-depth-1 red container" onClick={this.handleVendor} >
                <br></br>
                <div id="block" onClick={()=>this.setState({Block:true})} className="button center-align white">
                <i class="material-icons left">keyboard_arrow_down</i><i class="material-icons right">edit</i>Block A</div>
                <br></br>
                </div>
            </div>
            </div>

            <div className="row white">
            <div className="col s12 m10 l10">
                <h4>Block A- Flore Details</h4>
                <div id="MianBlock" className="col s4 m2 l2 z-depth-1 grey container" onClick={this.handleVendor} >
                <br></br>
                <div id="block" onClick={()=>this.setState({Block:true})} className="button center-align white">
                <i class="material-icons left">keyboard_arrow_right</i><i class="material-icons right">edit</i>Ground Flore</div>
                <h6 className="center white-text"><i class="material-icons">add</i>Add a room</h6>
                </div>
            </div>
            </div>
        </div>
        </div>
</div>
     )}
           

        </div>
        )
    }
}

export default Navbar
