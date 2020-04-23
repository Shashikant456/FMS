import React, { Component } from "react";
//import { Dropdown } from 'semantic-ui-react'
import ReactDOM from "react-dom";
import { Form,FormControl, Button, FormGroup,ControlLabel} from 'react-bootstrap';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import axios from 'axios'
import camera from './Images/camerapic.png'
import "./css/userDetails.css";
import Select from 'react-select';  
 import 'bootstrap/dist/css/bootstrap.min.css';  
import Popup from "reactjs-popup";
import jQuery from 'jquery'
import $  from 'jquery'
import { Multiselect } from "multiselect-react-dropdown";

import Bootstrap from "react-bootstrap";
//import file from './Images/file.png'
import camara from './Images/camerapic.png'




const header={
  'x-api-key': ' $2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2' 
}


const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

 Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};


class UserDetails extends Component {
  constructor(props) {
    super(props);
    
  this.state = {
    
    // oplist:[],
    // multiSelect: [],
    // image: null,
    //  selectedFile:null,
    //   dropdown:'',
    //   displayValue:'',
    //   values: [],
    //  focusedValue: -1,
    //   isFocused: false, 
    //   isOpen: false,
    //   typed: '',
    //   checkBoxerror:'',
    selectedValue:null,
    Types:[],
      resume:null,
      check:false,
      name: null,
      email: '',
      mob:'',
       mobileNumber:'',
      panNum: null,
      aadharNum: null,
      
      experience: null,
      eduQual: null,
      working : '',
      jobUpdate:null,
      userId:'',
    //  jobTypes:[
    //     { id:''},
    //  ],
       jobTypes:'',
      fresher:'',
      Current_company:null,
      noticePeriod:null,
      companyName:null,
      currentLocation:null,
      jobLocation:null,
      designation:null,
      negotiable:null,
      upTo:null,
      noOfDays:null,
     
      address:null,
      prevcompanyName:null,
      prevdesignation:null,
      prevjobLocation:null,
      jobs:[],
      
      Updates:["Send Mail","SMS","Both","None"],
      formErrors: {
        name: "",
        email: "",
        mob:"",
        mobileNumber:'',
         panNum: "",
          aadharNum: "",
          experience: "", 
          eduQual: "",
          working:"",
          jobUpdate:"",
          userId:'3',
         //jobss:"",
           //update:"",
          //  userLogin:[
          //   { id:''}
          // ],
        //   jobTypes: 
        //     [{ id:''}]
        //  ,
          jobTypes:[],
          fresher:'',
       Current_company:'',
      noticePeriod:'',
      companyName:'',
      currentLocation:'',
      jobLocation:'',
      designation:'',
      negotiable:'',
      upTo:'',
      noOfDays:'',
      address:null,
      prevcompanyName:'',
      prevdesignation:'',
      prevjobLocation:'',
          // address:'',
          //
         // password: "",
          
        }
   
    };
    this.handleSubmit=this.handleSubmit.bind(this)
  }

  componentWillMount(){
    this.setState({
     mob:this.props.location.state.mobileNumber.mobileNumber,
     mobileNumber:this.props.location.state.mobileNumber.mobileNumber
     
  })  
  fetch('http://stskfacilities.com:8081/stskFmsApi/jobTypes/getAllJobTypes',{headers:header}) 
    

  .then(response => response.json()) 
  
  
  .then(data => { 
  // console.log(data)
  let TypesFromApi = data.data.map(Type => {
      return { id: Type.id, name: Type.name };
    });
    this.setState({
      Types: [
        {
          id: "",
          name:
            "(Select your favourite team)"
        }
      ].concat(TypesFromApi)
    });
  })
  .catch(error => {
      console.log(error);
    });  
  }
  componentDidMount(){
    const config = {     
      headers: { 'content-type': 'multipart/form-data',
      'x-api-key': ' $2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2' }
    }
      let formData = new FormData();  
      formData.append('file',this.state.resume);   
      // console.log(formData)
      axios.post('stskFmsApi/jobseekerdoc/createDoc/608',formData,config)
              .then(res => {
                console.log(res);
              })
              .catch(err => console.log(err))

  // axios.get('/stskFmsApi/jobTypes/getAllJobTypes',{headers:header})
  //   .then(res=>{
  //     console.log(res.data)
  //     console.log(res.data.data)
  //       this.setState({
  //           jobs : res.data.data
  //       })  
  //   })

    axios.get('/stskFmsApi/userLogin/getByMob/'+this.props.location.state.mobileNumber.mobileNumber,{headers:header})
    .then(res=>{
      console.log(res.data)
       this.setState({
            userId:res.data.data.id,
            email:res.data.data.email
        })
    })

    // jobtypes new code



 
 }
 handleRadio=(e)=>{
  console.log(e.target.value)
 

  if(e.target.value=='false'){
    document.getElementById("efgh").style.display = "flex";

  }else{
    document.getElementById("efgh").style.display = "none";
  }
  if(e.target.value=='true'){
    document.getElementById("abcd").style.display = "none";

  }else{
    document.getElementById("abcd").style.display = "none";
  }
  if(e.target.value=='true'){
    document.getElementById("mnop").style.display = "none";

  }else{
    document.getElementById("mnop").style.display = "none";
  }
  if(e.target.value=='false'){
    document.getElementById("pqrs").style.display = "none";

  }else{
    document.getElementById("pqrs").style.display = "none";
  }
  this.setState({
    fresher:e.target.value
  })
}
handleRadio1=(e)=>{
  console.log(e.target.value)
  if(e.target.value=='true'){
    document.getElementById("abcd").style.display = "block";

  }else{
    document.getElementById("abcd").style.display = "none";
  }
  if(e.target.value=='false'){
    document.getElementById("pqrs").style.display = "block";

  }else{
    document.getElementById("pqrs").style.display = "none";
  }
  if(e.target.value=='false'){
    document.getElementById("mnop").style.display = "none";

  }else{
    document.getElementById("mnop").style.display = "none";
  }
  this.setState({
    working:e.target.value
  })
}
handleRadio2=(e)=>{
  console.log(e.target.value)
  if(e.target.value=='true'){
    document.getElementById("mnop").style.display = "block";

  }else{
    document.getElementById("mnop").style.display = "none";
  }
  this.setState({
    noticePeriod:e.target.value
  })
}
handleRadio3=(e)=>{
  console.log(e.target.value)
  this.setState({
    negotiable:e.target.value
  })
}


handleSubmit = e => {  
 
  e.preventDefault();
  console.log(this.state)
  // let formData = new FormData();  

  // formData.append('file',this.state.image,this.state.image.name);   
  
  // console.log(formData)
  // const config = {     
  //     headers: { 'content-type': 'multipart/form-data' }
  // }
  
     
  //     axios.post('stskFmsApi/imageDoc/createDoc/'+this.state.userId,formData,config)
  //         .then(res => {
  //           console.log(res);
  //         })
  //         .catch(err => console.log(err))


    // if(this.state.check===true){
    axios.post('/stskFmsApi/jobseeker/createJS',{
    name:this.state.name,
    email: this.state.email,
    mob: this.state.mob,
    panNum:this.state.panNum,
    aadharNum: this.state.aadharNum,
    eduQual: this.state.eduQual,
    experience: this.state.experience,
    working : this.state.working,
    jobUpdate:this.state.jobUpdate,
    address:this.state.address,
    fresher:this.state.fresher,
    prevcompanyName:this.state.fresher,
    prevdesignation:this.state.fresher,
    prevjobLocation:this.state.fresher,
    companyName:this.state.companyName,
    designation:this.state.designation,
    noticePeriod:this.state.noticePeriod,
    noOfDays:this.state.noOfDays,
    currentLocation:this.state.currentLocation,
    negotiable:this.state.negotiable,
    upTo:this.state.upTo,
    jobLocation:this.state.jobLocation,
    userLogin:{
      id:this.state.userId
    },
    // jobTypes:[{
    //   id:this.state.jobTypes.id
    // }]
    jobTypes:this.state.jobTypes
    
   
  },{
    headers: 
       { 'x-api-key': ' $2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2' }
 })
 
  .then(response=>{
    console.log(response.data)
    if(response.data.success===1)
    {
      console.log(response)
      console.log(response.data)
  
      this.props.history.push({
      pathname : '/dashboard',
      state :{
      mobileNumber : this.state,
        }} );
      }
    })
    .catch(error=>{
      console.log(error)
        })
        if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Full Name: ${this.state.name}
        Mobile Number: ${this.state.mob}
        Email: ${this.state.email}
        panNumber: ${this.state.panNum}
        aadhar: ${this.state.aadharNum}
        years: ${this.state.experience}
        education: ${this.state.eduQual}
        jobUpdate:${this.state.jobUpdate}
        address:${this.state.address},
        working : ${this.state.working},
        userLogin:{
          id:this.state.userId
        }},
        jobTypes:[{
          id:this.state.jobTypes.id
        }],
        fresher:${this.state.fresher},
     
      noticePeriod:${this.state.noticePeriod},
      companyName:${this.state.companyName},
      currentLocation:${this.state.currentLocation},
      jobLocation:${this.state.jobLocation},
      designation:${this.state.designation},
      negotiable:${this.state.negotiable},
      upTo:${this.state.upTo},
      noOfDays:${this.state.noOfDays},
      address:${this.state.address},
      prevcompanyName:${this.state.prevcompanyName},
    prevdesignation:${this.state.prevdesignation},
    prevjobLocation:${this.state.prevjobLocation},
       `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }

        //}
          // else{
          //   this.setState({
          //       checkBoxerror:'Accept Terms & Conditions'
          //   })
          // }
  

 };
  handleChange = e => {
    // this.setState({update : e.target.value});
    // this.setState({value:e.target.value});
    //  const { name, value } = e.target;
    // this.setState({  [name]: value }, () => console.log(this.state));

    this.setState({update : e.target.value});
    
     this.setState({value:e.target.value});
     const { name, value } = e.target;
     let formErrors = { ...this.state.formErrors };
     this.setState({ formErrors, [name]: value }, () => console.log(this.state));

  
   };
   
  handleChange1Arg = (selectedvalue) =>{
  
   console.log(this.state.selectedValue);
    console.log(`Option selected:`, selectedvalue);
    this.setState({ selectedvalue})
    this.setState({jobTypes:selectedvalue})}
  
  handleChange2 = e =>{
    this.setState({
      jobUpdate : e.target.value
    });
  }
  handlefile(e){
    let file=e.target.files[0]
    this.setState({file:file})
    console.log(e.target.files,"$$$$")
    console.log(e.target.files[0],"$$$$")
}
  handleCheck = (e) =>{
    this.setState({
      check:true
    });
  }
  handleImageChange = (e) => {
    console.log(e)
    console.log( e.target.files[0])
    console.log( e.target.files[0].name)
    
  this.setState({
      image: e.target.files[0]
  })
};
handleResumeChange = (e) => {
  console.log( e.target.files[0])
  this.setState({
    resume: e.target.files[0]
})


   
}
 
  onChangeCapture=(e)=>{
    console.log(e.target.files[0]);
    this.setState({
      selectedFile:e.target.files[0]
    })
  }
  handleChange5=(e)=>{
    console.log(e.target.value)
    this.setState({
      address:e.target.value
    })
  }

  fileUploadHandler = () =>{
    const fd = new FormData();
    fd.append('image_src',this.state.selectedFile)
    console.log(fd)
    axios.post('/stskFmsApi/imageDoc/createDoc/2',fd)
    .then(res =>{
      console.log(res)
      console.log(this.state.userId)
    })
  }
  result=(e)=>{
    console.log(e.target.value)
  } 


  Jobs() {  
    return (this.state.jobs.map(job => ({ label: job.name, value: job.id })))  
}  
  render() {
    console.log(this.state.jobTypes)
  // console.log(job.id)
//  const oplist = this.state.jobs.map(function(job){return (job)})
//  console.log(oplist)
  console.log(this.state)
  //console.log(this.state.working)
//  console.log(this.state)
 console.log(this.state.jobUpdate)
 const { selectedValue } = this.state;
    return (
   
      <div className="wrapper5 col m4 offset-l1">
        <div className="form-wrapper4 row " style={{width:'800px',height:'600px'}}>
        <div className="userimage" style={{marginLeft:'329px',marginRight:'332px'}}>
        <i className="material-icons large">person</i>
        
            </div>
            <div className="camera" style={{marginLeft:'385px'}}>
         
            {/* <input type="file" />
        <i className="material-icons small">camera</i> */}
        {/* <span class="select-wrapper"> */}
        <input   type="file"
     name="image" class="image_sr" 
     accept="images.jpeg"  onChange={this.handleImageChange} />
       {/* <button onClick={this.fileUploadHandler}>Upload</button> */}
    {/* <button onclick={() => this.fileInput.click()} id="filebutton">pic file</button>
    <button onClick={this.fileUploadHandler}>Upload</button> */}
    {/* <i className="material-icons small" id="pic">camera</i>  */}
  {/* </span> */}
  <img className="center-align" id="cmmr" src={camara} width="50" height="50"></img>

        </div>
          <div className="text-center">
        
            {/* <h3 className="text-center4">JobSeeker</h3> */}
           
   
            {/* <h2>{this.props.match.params.name}</h2> */}
          </div>
          {/* <Multiselect options={data} onSelectOptions={this.result} /> */}
       
         
          <form onSubmit={this.handleSubmit} class="form-row">
          
          {/* <Dropdown placeholder='Applied For'  fluid multiple selection options={options} /> */}
          
   
          <div class="col-md-4 mb-3">
         {/* <div className="fullName" style={{width:'35%',marginLeft:'10%'}}> */}
                <input
                className=""
                placeholder="Full Name"
                type="text"
                name="name"
                required
                onChange={this.handleChange}
                id="input"
                
              />
             
            </div>
            <div class="col-md-4 mb-3">
            {/* <div className="mobileNumber" style={{width:'35%',marginLeft:'10%'}}> */}
              
              <input
                className="" 
                placeholder="Mobile Number"
                type="tel"
                name="mob"
                required
                value={this.state.mob}
                id="input"
              
                
              />
            
            </div>
            <div class="col-md-4 mb-3">
            {/* <div className="Email"  style={{width:'35%',marginLeft:'10%'}}> */}
             
              <input
                className=""
                placeholder="Email"
                type="email"
                name="email"
                required
                value={this.state.email}
                id="input"
                
              />
              {/* <div style={{color:"red"}}>{this.state.emailError}</div> */}
            </div>
            <div class="form-row">
            <div class="col-md-4 mb-3" style={{width:'400px'}}>
         
              
              <input
                className=""
                placeholder="Pan Number"
                type="text"
                name="panNum"
                
                required
                onChange={this.handleChange}
                id="input"
                pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                title="Enter valid pannumber"
              />
             
            </div>
            <div class="col-md-4 mb-3">
           
              
              <input
                className=""
                placeholder="AadharCard Number"
                type="text"
                name="aadharNum"
                required
                onChange={this.handleChange}
                id="input"
                pattern="^\d{4}\d{4}\d{4}$" title="Addhar Card"
                title="4 digit space 4 digit space 4digit"
              />
             
            </div>
          
        
        <div class="col-md-4 mb-3">
            {/* <div className="education  "  style={{width:'35%',marginLeft:'10%'}} > */}
             
              <input
                className=""
                placeholder="Education Qualification"
                type="text"
                name="eduQual"
                required
                onChange={this.handleChange}
                id="input"
              />

{/* <ReactMultiSelectCheckboxes options={this.Updates} /> */}
               
            </div>
       </div>
       <div class="form-row">
       <div class="col-md-4 mb-3" style={{width:'500px'}}>
           
          <Popup trigger={<input type="select"  placeholder="select" id="popup"/>} position=" center">
           
               <Multiselect options={this.state.Types}
                 value={selectedValue} displayValue="name"
                 onSelect={this.handleChange1Arg} id="demo"/>   
  </Popup>
       
</div> 
    <div class="col-md-4 mb-3">
       
    <Form.Control as="select" onChange={this.handleChange2} id="update" >
    <option value='1'>Please Select</option>
    {this.state.Updates.map(jobUpdate =>(
          <option key={jobUpdate} value={jobUpdate}>
             {jobUpdate}
          </option>
      ))}
 </Form.Control> 
  
            </div>
            <div class="col-md-4 mb-3" style={{marginTop:'15px',marginLeft:'-19px'}}>
            {/* <div className="address"  style={{width:'35%',marginLeft:'9%'}}> */}
             
             <textarea id="address"  placeholder="Address" onChange={this.handleChange5}>
 
             </textarea>
  </div>
            </div>
            <div class="form-row" style={{marginTop:'-35px'}}>
            <div class="col-md-6 mb-3" style={{display:'contents'}} >
 
 {/* <div className="choose" style={{width:'35%',marginLeft:'10%'}} > */}
 <p id="label">Are you a fresher?</p>

   <p>
   <label >
   <input name="fresher"  value="true" onClick={this.handleRadio} type="radio" id="ra" />
       <span id="label">Yes</span>
       </label>
   </p>
   <p>
   <label>
     <input name="fresher" value="false" onClick={this.handleRadio} type="radio" id="ra"/>
     <span id="label">No</span>
   </label>
 </p>
 </div>
 {/* <div class="col-md-6 mb-3" style={{marginLeft: '31px',
    marginTop: '-16px'}} >
 <input type="file" 
                onChange={this.handleResumeChange}
                class="inputfile" id="embedpollfileinput" />

                    <label for="embedpollfileinput" class="ui huge white right floated button" id="hugewhite">
                    
                    <img src={file} id="fileimg"/>
                   
                    </label>

  </div> */}
  </div>
  <div class="form-row" id="efgh" style={{marginTop:'0px',marginLeft:'-233px',display:'none'}}>
            <div class="col-md-6 mb-3"  style={{display:'contents'}} >
  {/* <div className="fresher" id="efgh" style={{display:'none',width:'35%',marginLeft:'10%'}} > */}
              <p id="label">Currently working?</p>
  
              <p>
              <label>
              <input name="working"  value="true" onClick={this.handleRadio1} type="radio" id="ra" />
                  <span id="label">Yes</span>
                  </label>
              </p>
              <p>
              <label>
                <input name="working" value="false" onClick={this.handleRadio1} type="radio" id="ra"/>
                <span id="label">No</span>
              </label>
            </p>
            </div>
            </div>
            <div class="form-row" className="a" id="abcd" style={{marginTop:'0px',marginLeft:'0px',display:'none'}}>
          {/* <div id="abcd" style={{display:'none'}} className="a" > */}
          <div class="col-md-4 mb-3 years">
           {/* <div className="years"  style={{width:'155%',marginLeft:"-158%"}} > */}
              
                <input
                className=""
                placeholder="Years of Experience"
                type="text" 
                name="experience"
                
                pattern="[0-9]*"
                title="It should be Numeric"
                onChange={this.handleChange}
                id="input"
                maxLength="2"
              /> 
              </div>
              <div class="col-md-4 mb-3 company">
              {/* <div className="company" > */}
              <input
                className=""
                placeholder="Enter Current Company Name"
                type="text"
                name="companyName"
                
                
                onChange={this.handleChange}
                id="input"
               
              /> 
              </div>
              <div class="col-md-4 mb-3 place">
              {/* <div className="place"  > */}
              <input
                className=""
                placeholder="Job Location"
                type="text"
                name="jobLocation"
                onChange={this.handleChange}
                id="input"
                
              /> 
               </div>
              
               {/* <div class="form-row"> */}
               <div class="col-md-4 mb-3 designation">
               {/* <div className="designation"  style={{width:'35%'}}> */}
              <input
                className=""
                placeholder="Designation"
                type="text"
                name="designation"
               
                
                onChange={this.handleChange}
                id="input"
                
              /> 
              </div>
              <div className="col-md-4 mb-3 currentLocation" style={{marginLeft: '229px',marginTop: '-48px'}}>
              <input
                className=""
                placeholder="Current Location"
                type="text"
                name="currentLocation"
                
                
                onChange={this.handleChange}
                id="input"
                
              /> 
              </div>
              
              <div class="col-md-4 mb-3 notice_period" style={{marginLeft:'60%'}}>
              {/* <div className="notice_period" > */}
            <p id="label">notice period?</p>
  
              <p>
              <label >
              <input name="noticePeriod"  value="true" onClick={this.handleRadio2} type="radio" id="ra" />
                  <span id="label">Yes</span>
                  </label>
              </p>
              <p>
              <label>
                <input name="noticePeriod" value="false" onClick={this.handleRadio2} type="radio" id="ra"/>
                <span id="label">No</span>
              </label>
            </p>
            </div>
              </div>
              {/* </div> */}
              {/* abcd */}
              <div class="form-row" id="pqrs" style={{display:'none'}}>
              <div class="col-md-4 mb-3 years"  style={{width: '695px',
    marginTop: '-69px'}}>
              {/* <div id="pqrs" style={{display:'none'}} className="c"> */}
           {/* <div className="years"  > */}
              
                <input
                className=""
                placeholder="Years of Experience"
                type="text"
                name="experience"
                
                pattern="[0-9]*"
                title="It should be Numeric"
                onChange={this.handleChange}
                id="input"
                maxLength="2"
              /> 
              </div>
               <div class="col-md-4 mb-3 company"  style={{marginLeft:'35%',
    marginTop: '-46px'}}>
              
              <input
                className=""
                placeholder="Enter previous Company Name"
                type="text"
                name="prevcompanyName"
               
                
                onChange={this.handleChange}
                id="input"
               
              /> 
              </div>
              <div class="col-md-4 mb-3 place"  style={{marginLeft: '71%',
    marginTop: '-48px'}}>
              
              <input
                className=""
                placeholder=" previous Job Location"
                type="text"
                name="prevjobLocation"
                onChange={this.handleChange}
                id="input"
                
              /> 
               </div>
               <div class="col-md-4 mb-3 designation"  style={{marginLeft:'0px'}}>
               
              <input
                className=""
                placeholder="Previous Designation"
                type="text"
                name="prevdesignation"
                onChange={this.handleChange}
                id="input"
                
              /> 
              </div>
              <div className="col-md-4 mb-3 currentLocation" style={{marginLeft: '243px',marginTop: '-48px'}}>
              <input
                className=""
                placeholder="Current Location"
                type="text"
                name="currentLocation"
                
                
                onChange={this.handleChange}
                id="input"
                
              /> 
              </div>
              
          </div>
          {/* </div> */}
              {/* pqrs */}
         
         
             
              {/* <div className="place">
              <input
                className=""
                placeholder="Place"
                type="text"
                name="place"
                required
                
                onChange={this.handleChange}
                id="input"
                
              />  */}
              {/* </div> */}
            <div class="form-row" id="mnop" style={{display:'none'}} >
            {/* <div id="mnop" style={{display:'none'}} className="b"> */}
            {/* <div className="days" > */}
            <div class="col-md-4 mb-3 days" style={{marginTop: '-31px',
    marginLeft: '10px',
    width: '730px'}}>
              <input
                
                placeholder="days"
                type="text"
                name="noOfDays"
                
                
                onChange={this.handleChange}
                id="input"
                
              /> 
              </div>
              <div class="col-md-4 mb-3 negotiable" style={{display: 'flex',
    marginTop:'-34px',
    marginLeft: '268px'}}>
               {/* <div className="negotiable" > */}
            <p id="label">negotiable</p>
  
              <p>
              <label >
              <input name="negotiable"  value="true" onClick={this.handleRadio3} type="radio" id="ra" />
                  <span id="label">Yes</span>
                  </label>
              </p>
              <p>
              <label>
                <input name="negotiable" value="false" onClick={this.handleRadio3} type="radio" id="ra"/>
                <span id="label">No</span>
              </label>
            </p>
            </div>
              <div class="col-md-4 mb-3 salary" style={{marginLeft: '69%',
    marginTop: '-78px'}}>
              {/* <div className="salary" > */}
              <input
                
                placeholder="upTo"
                type="text"
                name="upTo"
                
                
                onChange={this.handleChange}
                id="input"
                
              /> 
              </div>
              
            
            </div>
            {/* </div> */}
            {/* <div class="col-md-4 mb-3" style={{marginTop:'159px'}}>
          

<label>
  <input name="check" value="false " onClick={this.handleCheck} type="checkbox" />
  <span id="label">Terms and Conditions</span>
</label>
<p className="center red-text">{this.state.checkBoxerror}</p>
</div>  */}
  
            <div className="createAccount1">
              <button type="submit" id="submit1">Submit</button>
            </div> 
            {/* mnop */}
          
              {/* <div className="designation">
              <input
                className=""
                placeholder="Designation"
                type="text"
                name="destination"
                required
                
                onChange={this.handleChange}
                id="input"
                
              /> 
              </div> */}
              {/* </div> */}
             
              
           
           
           
           
              {/* <div className="Resume">
              
              <input
                className=""
                placeholder="Resume"
                type="file"
                name="resume"
                noValidate
                onChange={this.handleChange}
                id="input"
              />
              <small>Select Resume</small>
             
             </div> */}
             {/* </div> */}

          </form>
        </div>
       </div>
    );
  }
}

// jQuery(document).ready(function() {
//   jQuery('#demo').multiselect({
//     includeSelectAllOption: true,
//  });
// });



export default UserDetails;

