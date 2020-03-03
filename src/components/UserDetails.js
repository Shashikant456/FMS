import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Form,FormControl } from 'react-bootstrap';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import axios from 'axios'
import "./css/userDetails.css";


// import "./css/chosen.jquery.min.js";
import 'jquery';


// const emailRegex = RegExp(
//   /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
// );

// const formValid = ({ formErrors, ...rest }) => {
//   let valid = true;

 
//   Object.values(formErrors).forEach(val => {
//     val.length > 0 && (valid = false);
//   });

 
//   Object.values(rest).forEach(val => {
//     val === null && (valid = false);
//   });

//   return valid;
// };





class UserRole extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // nameError:"",
      // emailError:"",
      // mobError:"",
      // panNumError: "",
      // aadharNumError: "",
      // eduQualError:"",
      checkBoxerror:'',
      check:false,
      name: null,
      email: null,
      mob:'',
      panNum: null,
      aadharNum: null,
      
      experience: null,
      eduQual: null,
      working : true,
      jobUpdate:null,
      //jobss:null,
      // update:null,
      userLogin:'',
      jobTypes:[
        { id:''}
      ],
     

      // selectedOption: '',
      // value:" ",
      jobs:[],
      Updates:["Send Mail","SMS","Both","None"],
     formErrors: {
      name: "",
      email: "",
        mob: "",
       panNum: "",
        aadharNum: "",
        experience: "",
        working:"",
        eduQual: "",
        
        jobUpdate:"",
       //jobss:"",
         //update:"",
        //  userLogin:[
        //   { id:''}
        // ],
        jobTypes:[
          { id:''}
        ]
        //
       // password: "",
        
      }
    };
    this.handleSubmit=this.handleSubmit.bind(this)
    // this.handleCheck=this.handleCheck.bind(this)
  }
  

  componentDidMount(){
   
    axios.get('/stskFmsApi/jobTypes/getAllJobTypes')
    .then(res=>{
      console.log(res.data)
      console.log(res.data.data)
      console.log(this.state.mob)
        this.setState({
            jobs : res.data.data,
            //mob:this.props.location.state.mobileNumber.mob 
        })  
    })
   
  
 }
 handleRadio=(e)=>{
  console.log(e.target.value)
  this.setState({
    working:e.target.value
  })
}
// validate(){
  // let nameError=""
  // let emailError=""
  // // let mobError=""
  // let eduQualError=""
  // if(!this.state.name){
  //   nameError="name can not be blank"
  // }
  // if(!this.state.email.includes('@')){
  //   emailError="invalid email"
  // }
  // if(this.state.mob!=10){
  //   mobError="Enter valid mobile number"
  // }
//   if(!this.state.eduQual){
//     eduQualError="Education Qualification can't be empty "
//   }
//   if(emailError || nameError || eduQualError){
//     this.setState({
//       emailError,nameError,eduQualError
//     })
//     return false;
//   }
//   return true;
 //}
 handleSubmit = e => {
  e.preventDefault();
  //  const isValid = this.validate();
  // if (isValid){
   // console.log(this.state)
  // }
  //clear form

//   this.props.history.push({
//             pathname : '/dashboard',
//             state :{
//             mobileNumber : this.state,
//             userId: this.state.userLogin.id
//             }
//             } 
//           );
//  }
 
   if(this.state.check===true){
  axios.post('/stskFmsApi/jobseeker/createJS',{
    name:this.state.name,
    email: this.state.email,
    mob: this.state.mob,
    panNum:this.state.panNum,
    aadharNum: this.state.aadharNum,
    experience: this.state.experience,
    working : this.state.working,
    eduQual: this.state.eduQual,
    jobUpdate:this.state.jobUpdate,
    userLogin:{
      id:this.state.userLogin
    },
    jobTypes:[{
      id:this.state.jobTypes.id
    }]
    
  })
 
  .then(response=>{
    if(response.data.success===1)
    {
      console.log(response)
      console.log(response.data)
      this.props.history.push('./dashboard')
      this.props.history.push({
        pathname : '/dashboard',
        state :{
        mobileNumber : this.state,
        userId: this.state.userLogin.id
        }
        } 
      );
     
    }
   
    })
    .catch(error=>{
      console.log(error)
  })

  }
    else{
      this.setState({
          checkBoxerror:'Accept Terms & Conditions'
      })
    }
  
 };
  handleChange = e => {
   
      this.setState({update : e.target.value});
    //this.setState({value:e.target.value});
     this.setState({value:e.target.value});
     const { name, value } = e.target;
     let formErrors = { ...this.state.formErrors };
     this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };
 
  handleChange1Arg = (e) =>{
    axios.get('/stskFmsApi/userLogin/getByMob/'+this.state.mob)
    .then(res=>{
      console.log(res.data)
       
        this.setState({
            userLogin : {
              id:res.data.data.id
            }
        })
    })

    this.setState({
      jobTypes:{
        id:e.target.value
      }
    })

    console.log(e.target.value)
  }
  handleChange2 = e =>{
    this.setState({
      jobUpdate : e.target.value
    });
  }
  handleCheck = (e) =>{
    this.setState({
      check:true
    });
  }
  handleRadio=(e)=>{
    this.setState({
      working: e.target.value
    })
  }

  render() {
  console.log(this.state.userLogin)
  console.log(this.state.working)
    // const { formErrors } = this.state;
    
// console.log(this.state.mobileNumber)
//  console.log(this.state)
// console.log(this.state.userLogin)
    //  console.log(this.state.jobss)
       console.log(this.state.jobUpdate)
    return (
      <div className="wrapper5">
        <div className="form-wrapper4">
         
          <div className="text-center">
            <h3 className="text-center4">JobSeeker</h3>
            {/* <h2>{this.props.match.params.name}</h2> */}
          </div>

          <form onSubmit={this.handleSubmit} noValidate>
        
            <div className="fullName">
            {/* <div className="A">
        <Multiselect options={update} onSelectOptions={this.result} />
      </div> */}


              <input
                className=""
                placeholder="Full Name"
                type="text"
                name="name"
                noValidate
                onChange={this.handleChange}
                id="input"
                id="input"
              />
              {/* <div style={{color:"red"}}>{this.state.nameError}</div> */}
              {/* {formErrors.name.length > 0 && (
                <span className="errorMessage">{formErrors.name}</span>
              )} */}
            </div>
            <div className="mobileNumber">
              
              <input
                className="" 
                placeholder="Mobile Number"
                type="tel"
                name="mob"
                noValidate
                onChange={this.handleChange}
                id="input"
              />
            
            </div>
            <div className="Email">
             
              <input
                className=""
                placeholder="Email"
                type="text"
                name="email"
                noValidate
                onChange={this.handleChange}
                id="input"
              />
              {/* <div style={{color:"red"}}>{this.state.emailError}</div> */}
            </div>
            <div className="panNumber">
              
              <input
                className=""
                placeholder="Pan Number"
                type="text"
                name="panNum"
                noValidate
                onChange={this.handleChange}
                id="input"
              />
             
            </div>
            <div className="aadhar">
              
              <input
                className=""
                placeholder="AadharCard Number"
                type="text"
                name="aadharNum"
                noValidate
                onChange={this.handleChange}
                id="input"
              />
             
            </div>
            <div className="years">
              
                <input
                className=""
                placeholder="Years of Experience"
                type="text"
                name="experience"
                noValidate
                onChange={this.handleChange}
                id="input"
              /> 

              
              </div>
        
           
            <div className="education">
             
              <input
                className=""
                placeholder="Education Qualification"
                type="text"
                name="eduQual"
                noValidate
                onChange={this.handleChange}
                id="input"
              />
               {/* <div style={{color:"red"}}>{this.state.eduQualError}</div> */}
            </div>
       
            <div className="applied">
            
               
               <Form.Control as="select"  onChange={this.handleChange1Arg}  id="demo" >
               
               <option value="" disabled selected>Choose your option</option>
                {/* {this.state.jobs.map(job =>(
                    <option key={job.id} value={job.name}  >
                     </option>
                  ))} */}
                
                  {this.state.jobs.map(function(job,i){
                   return( <option key={job.id} value={job.id}>
                      {job.name}
                    </option>
                      // console.log(job.id)
                      // console.log(job.name)
                      // console.log(job.id)
                   ) })}
                  
              </Form.Control> 
              
             
              

            </div>
            <div className="jobOpening">
         
    <Form.Control as="select" onChange={this.handleChange2} id="update" >
    <option value='1'>Please Select</option>
    {this.state.Updates.map(jobUpdate =>(
          <option key={jobUpdate} value={jobUpdate}>
             
             
              {jobUpdate}
              
          </option>
      ))}
      
  </Form.Control> 
            </div>
 
            <div className="choose">
            <p id="label">Currently Working</p>
  
              <p>
              <label >
              <input name="working"  value="true" onClick={this.handleRadio} type="radio" checked />
                  <span id="label">Yes</span>
                  </label>
              </p>
              <p>
              <label>
                <input name="working" value="false" onClick={this.handleRadio} type="radio" />
                <span>No</span>
              </label>
            </p>

         

              </div>
              <div className="checkbox">

                  <label>
                    <input name="check" value="false " onClick={this.handleCheck} type="checkbox" />
                    <span id="label">Terms and Conditions</span>
                  </label>
              <p className="center red-text">{this.state.checkBoxerror}</p>
              </div> 
        
                <div className="createAccount">
              <button type="submit" id="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default UserRole;

