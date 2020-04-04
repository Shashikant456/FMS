import React, { Component } from "react";
import { withRouter} from 'react-router-dom'
import "./css/register1.css";
import logo from './Images/Mainlogo.png'
import axios from 'axios'
import $ from 'jquery'
import jQuery from 'jquery'

const header={
  'x-api-key': ' $2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2' 
}

class Register extends Component {
    state = {
      isPasswordShown:"false",
      mob:"",
      mobileNumber:'',
      email:"",
      password: "",
      userRoles:{
               "id":'' ,
              //  "name":""
                },
      conformPwd:'',
       error:''
      }
  
      
  componentDidMount(){
    this.setState({
      //  mobileNumber:this.props.location.state.mobileNumber.mobileNumber,
      //  mob:this.props.location.state.mobileNumber.mobileNumber,
      //   userRoles:{
      //   id:this.props.match.params.id,
      //   name:this.props.match.params.name
      // }
    })
  }


  handleSubmit = (e) => {
    
    e.preventDefault();
    console.log(this.state)
    const { password, conformPwd } = this.state;

    if (password !== conformPwd) {
        this.setState({
            password:'',
            conformPwd:'',
            error:'Password and conformPassword mis-match'
        })
    } 
    else {
       this.setState({error:''})
       
        axios.post('/stskFmsApi/userLogin/createUL',{
          mob:this.state.mob,
          email:this.state.email,
          password: this.state.password,
          userRoles:{
                id:this.state.userRoles.id
           }    
           },{headers:header})
        .then(response=>{
          console.log(response)
          console.log(this.state)
          this.props.history.push({
            pathname:'/userDetails',
             state :{
             mobileNumber : this.state,
         }})
          })
          .catch(error=>{
            console.log(error)
        })
        
// if(userRoles.name==jobseeker){
       
  
      // }
      // else{
      //   this.props.history.push({
      //     pathname:'/dropdown',
      //      state :{
      //      mobileNumber : this.state,
      //      email:this.state.email
      //  }})
      // }
      };
}

handleChange10(){
  var x = document.getElementById("myInput");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

    handleChange1 = (e) => {
    this.setState({
      email:e.target.value
    })
  }
  handleChange2 = (e) => {
    this.setState({
      password:e.target.value
    })
    
  };
  handleChange3 = (e) => {
    this.setState({
      conformPwd :e.target.value
    })
  }
  handleButton = (e) => {
    alert('hi')
    //console.log(this.state)
  }
  togglePasswordVisibility = () =>{
    const {isPasswordShown} = this.state;
    this.setState({isPasswordShown:!isPasswordShown});
  }

  render() {
     const {mob,email,password,userRoles} = this.state
     const {isPasswordShown} = this.state;
     console.log(this.state)
    // const { formErrors } = this.state;

    return (

     

      <div id="body">
      <div className="row" id="main1">      
       <center id="center">
         <h3 className="center-align" id="Registertext">{this.props.match.params.name}</h3>
         {/* <div class="person">
         <i className="material-icons grey-text large">account_circle</i>
         <div class="cameraa">
              <input   type="file"
     name="image" class="image_src" 
     accept="images.jpeg"  onChange={this.handleImageChange} />
              </div>
         </div> */}
         <div className="image_wrapper">
         <div className="userimages">
        <i className="material-icons large">person</i>
        
            </div>
            <div className="cameraa">
         
            {/* <input type="file" />
        <i className="material-icons small">camera</i> */}
        {/* <span class="select-wrapper"> */}
        <input   type="file"
     name="image" class="image_src" 
     accept="images.jpeg"  onChange={this.handleImageChange} />
       {/* <button onClick={this.fileUploadHandler}>Upload</button> */}
    {/* <button onclick={() => this.fileInput.click()} id="filebutton">pic file</button>
    <button onClick={this.fileUploadHandler}>Upload</button> */}
    {/* <i className="material-icons small" id="pic">camera</i>  */}
  {/* </span> */}
        </div>
        </div>
     
       
       <form id="frm" onSubmit={this.handleSubmit}>
       {/* <input type="password" id="pwd" class="form-control" placeholder="Password" name="pass"/>
                              <span class="input-group-btn">
                                 <button class="btn btn-default btn-md" id="showhide" data-val='1'>
                                   <span id='eye' class="glyphicon glyphicon-eye-open"></span>
                                   </button>
                              </span> */}
  {/* <label>
        <input type="checkbox" class="filled-in" onclick="myFunction()" onChange={this.handleChange10} />
        <span>Filled in</span>
      </label> */}
       <div className="input-field">
              <i id="iconn" className="material-icons prefix">person</i>
              <input id="icon_prefix" type="email" size="30"
               placeholder="User Id/ Mail Id" required onChange={this.handleChange1}/>
          </div>
          <div className="input-field">
          <i id="iconn" className="material-icons prefix">lock</i>
              <input id="icon_prefixs" type={(isPasswordShown) ? "password" : "text"} size="30"
               placeholder="password" required name="pass" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
               title="Must contain at least one number
               and one uppercase and lowercase letter,
                and at least 6 or more characters" onChange={this.handleChange2}/>
               <i className="fa fa-eye" id="eye" onClick={this.togglePasswordVisibility}></i>

          </div>
          <div className="input-field">
          <i id="iconn" className="material-icons prefix">lock</i>
              <input id="icon_prefixs" type={(isPasswordShown) ? "password" : "text"} size="30"
               placeholder="password" required name="pass" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
               title="Must contain at least one number
               and one uppercase and lowercase letter,
                and at least 6 or more characters" onChange={this.handleChange3}/>
               <i className="fa fa-eye" id="eyes" onClick={this.togglePasswordVisibility}></i>
               <br></br>
              
            <h6 className="red-text center-align">{this.state.error}</h6>
          </div>

              {/* <div className="input-field">
                <i id="iconn" className="material-icons prefix">lock</i>
                <input id="icon_prefix" type="password" value="FakePSW1"  placeholder="Enter password" required onChange={this.handleChange2}
                 pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                 id="password-field"
                title="Must contain at least one number
                 and one uppercase and lowercase letter,
                  and at least 6 or more characters"/>
                  <span class="input-group-btn">
                                 <button class="btn btn-default btn-md" id="showhide" data-val='1'>
                                   <span id='eye' class="glyphicon glyphicon-eye-open"></span>
                                   </button>
                              </span>
              </div>
              <div className="input-field">
                <i id="iconn" className="material-icons prefix">lock</i>
                <input id="icon_prefix" type="password" value="FakePSW1" 
                 id="myInput" placeholder="Confirm password"
                  required onChange={this.handleChange3}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                title="Must contain at least one number and 
                one uppercase and lowercase letter, and at 
                least 6 or more characters"/>
                <p className="red-text">{this.state.error}</p>
                <span class="input-group-btn">
                                 <button class="btn btn-default btn-md" id="showhide" data-val='1'>
                                   <span id='eye' class="glyphicon glyphicon-eye-open"></span>
                                   </button>
                              </span>
                                  </div> */}
                  {/* <div className="input-field">
                  <i id="icon" className="material-icons prefix">lock</i>
                            <input type="password" id="pwd" class="form-control" placeholder="Password" name="pass"/>
                              <span class="input-group-btn">
                                 <button class="btn btn-default btn-md" id="showhide" data-val='1'>
                                   <span id='eye' class="glyphicon glyphicon-eye-open"></span>
                                   </button>
                              </span>

                              </div>

                              <div className="input-field">
                  <i id="icons" className="material-icons prefix">lock</i>
                             <input type="password" id="pwds" class="form-control" placeholder="Password" name="pass"/>
                              <span class="input-group-btn">
                                 <button class="btn btn-default btn-md" id="showhides" data-val='1'>
                                   <span id='eyes' class="glyphicon glyphicon-eye-open"></span>
                                   </button>
                              </span>

                              </div>  */}
                
      
      <button id="RegisterButton" type="submit" onChange={this.handleButton}><i className="material-icons right">arrow_forward</i>Next</button>
       </form>
       </center>
      </div> 
      </div>
    
    );
  }
}

export default withRouter(Register);

(($) => {

  class Toggle {

    constructor(element, options) {

      this.defaults = {
        icon: 'fa-eye'
      };

      this.options = this.assignOptions(options);

      this.$element = element;
      this.$button = $(`<button class="btn-toggle-pass"><i class="fa ${this.options.icon}"></i></button>`);

      this.init();
    };

    assignOptions(options) {

      return $.extend({}, this.defaults, options);
    }

    init() {

      this._appendButton();
      this.bindEvents();
    }

    _appendButton() {
      this.$element.after(this.$button);
    }

    bindEvents() {

      this.$button.on('click touchstart', this.handleClick.bind(this));
    }

    handleClick() {

      let type = this.$element.attr('type');

      type = type === 'password' ? 'text' : 'password';

      this.$element.attr('type', type);
      this.$button.toggleClass('active');
    }
  }

  $.fn.togglePassword = function (options) {
    return this.each(function () {
      new Toggle($(this), options);
    });
  }

})(jQuery);

$(document).ready(function() {
  $('#password').togglePassword();
  $('#password-custom').togglePassword({
  	'icon': 'fa-lock'
  });
})


 $(document).ready(function() 
      {
         $("#showhide").click(function() 
         {
            if ($(this).data('val') == "1") 
            {
               $("#pwd").prop('type','text');
               $("#eye").attr("class","glyphicon glyphicon-eye-close");
               $(this).data('val','0');
            }
            else
            {
               $("#pwd").prop('type', 'password');
               $("#eye").attr("class","glyphicon glyphicon-eye-open");
               $(this).data('val','1');
            }
         });
      });
      
$(document).ready(function()

      {
         $("#remove").click(function()
         {
           $("#uname").val('');
         });
         
      });
 
      (($) => {

        class Toggle {
      
          constructor(element, options) {
      
            this.defaults = {
              icon: 'fa-eye'
            };
      
            this.options = this.assignOptions(options);
      
            this.$element = element;
            this.$button = $(`<button class="btn-toggle-pass"><i class="fa ${this.options.icon}"></i></button>`);
      
            this.init();
          };
      
          assignOptions(options) {
      
            return $.extend({}, this.defaults, options);
          }
      
          init() {
      
            this._appendButton();
            this.bindEvents();
          }
      
          _appendButton() {
            this.$element.after(this.$button);
          }
      
          bindEvents() {
      
            this.$button.on('click touchstart', this.handleClick.bind(this));
          }
      
          handleClick() {
      
            let type = this.$element.attr('type');
      
            type = type === 'password' ? 'text' : 'password';
      
            this.$element.attr('type', type);
            this.$button.toggleClass('active');
          }
        }
      
        $.fn.togglePassword = function (options) {
          return this.each(function () {
            new Toggle($(this), options);
          });
        }
      
      })(jQuery);
      
      $(document).ready(function() {
        $('#password').togglePassword();
        $('#password-custom').togglePassword({
          'icon': 'fa-lock'
        });
      })
      
      
       $(document).ready(function() 
            {
               $("#showhides").click(function() 
               {
                  if ($(this).data('val') == "1") 
                  {
                     $("#pwds").prop('type','text');
                     $("#eyes").attr("class","glyphicon glyphicon-eye-close");
                     $(this).data('val','0');
                  }
                  else
                  {
                     $("#pwds").prop('type', 'password');
                     $("#eyes").attr("class","glyphicon glyphicon-eye-open");
                     $(this).data('val','1');
                  }
               });
            });
            
      $(document).ready(function()
      
            {
               $("#remove").click(function()
               {
                 $("#uname").val('');
               });
               
            });