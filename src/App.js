import React, { Component } from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import SendOtp from './components/SendOtp'
import Verify from './components/Verify'
import UserLogin from './components/UserLogin'
import ForgetPwd from './components/ForgetPwd'
import PreRegister from './components/PreRegister'
import Dashboard from './components/Dashboard'
import Register from './components/Register'
import dashboardHelp from './components/dashboardHelp'
import ChangePwd from './components/ChangePwd'
import UserDetails from './components/UserDetails'
import Dropdown from './components/Dropdown'
import axios from 'axios'
axios.defaults.baseURL ="http://stskfacilities.com:8081"


//import dashboardHelp from './components/dashboardHelp'

// import Verify from './components/Verify'

 class App extends Component {
  render() {
    return (
      <BrowserRouter>     
        <div className="App" id="root">
           <Switch>
              <Route exact path="/" component={ SendOtp } />
              <Route exact path="/verify" component={ Verify } />
              <Route exact path="/userLogin" component={ UserLogin } />
              <Route exact path="/forgotPwd" component={ ForgetPwd } />
              <Route exact path="/changePwd" component={ ChangePwd } />
              <Route exact path="/dashboard" component={ Dashboard } />
              <Route exact path="/dropdown" component={Dropdown}/>
              <Route exact path="/preregister" component={ PreRegister } />
              <Route exact path="/register/:id?/:name?" component={ Register } />
              <Route  path="/userDetails" component={ UserDetails } />
              <Route exact path="/help" component={ dashboardHelp } />
           </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
export default App
