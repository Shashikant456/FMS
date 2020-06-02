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
import file from './Images/file.png'
//import Avatar from 'react-avatar-edit'




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
    const src = 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png'
  this.state = {
  
    // preview: null,
    // src,
    profileimage: null,
    profileimagedocId:'',
    profileimagepath:'',
  
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
      YOP:["1","2","3","4","5","6","7","8","9","10"],
      formErrors: {
        profileimage: null,
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
          userId:'',
        
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
         
          
        }
   
    };
    
    this.handleSubmit=this.handleSubmit.bind(this)
  }
  
  componentWillMount(){
   
    this.setState({
    mob:this.props.location.state.mobileNumber.mobileNumber,
    mobileNumber:this.props.location.state.mobileNumber.mobileNumberx
     
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
            "(Select your desire job)"
        }
      ].concat(TypesFromApi)
    });
  })
  .catch(error => {
      console.log(error);
    });  
  }
  componentDidMount(){
  axios.get('/stskFmsApi/userLogin/getByMob/'+this.props.location.state.mobileNumber.mobileNumber,{headers:header})
    .then(res=>{
      console.log(res.data)
       this.setState({
            userId:res.data.data.id,
            email:res.data.data.email
        })
    })
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
 


    if(this.state.check===true){
 
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
      pathname : '/uploadDocument',
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

        }
          else{
            this.setState({
                checkBoxerror:'Accept Terms & Conditions'
            })
          }
  

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
    var i=selectedvalue.length;
    var jobnamearray =[];
    for(var j=0;j<=i-1;j++){
   var jobname=jobnamearray.push(selectedvalue[j]['name']);

    }
  
  console.log(selectedvalue)
    console.log(`Option selected:`, selectedvalue);
    this.setState({ selectedvalue})
    this.setState({jobTypes:selectedvalue})
   
     document.getElementById("valsel").innerHTML=jobnamearray;
     //var str = jobnamearray;
      // if(str.length > 2) 
      // {str = str.substring(0,10)};
     // alert('str')
  
  }
  
  handleChange2 = e =>{
    this.setState({
      jobUpdate : e.target.value
    });
  }
  handleCheckLength=(e)=>{
    alert('hi')
  }

//   handlefile(e){
//     let file=e.target.files[0]
//     this.setState({file:file})
//     console.log(e.target.files,"$$$$")
//     console.log(e.target.files[0],"$$$$")
// }
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
     profileimage: e.target.files[0]
 })

   const timer =  setTimeout(()=>{
   let formData = new FormData();  

formData.append('file',this.state.profileimage);   
// const timer =  setTimeout(()=>{
axios.post('/stskFmsApi/imageDoc/createDoc/'+this.state.userId,formData, {headers: 
{ 'x-api-key': ' $2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2' }
})
       .then(res => {
         console.log(res);
         console.log(res.data)
         this.setState({
             profileimagedocId:res.data.data
         })
        })
       .catch(err => console.log(err))
       },3000)
        const timer1 =  setTimeout(()=>{
        axios.get('/stskFmsApi/imageDoc/retriveWithPath/'+this.state.profileimagedocId, {headers: header})
        .then(res => {
          console.log(res);
          this.setState({
            profileimagepath:res.data.data.path
          })
         
     })
        .catch(err => console.log(err))
    },4000)


 
};

 
  // onChangeCapture=(e)=>{
  //   console.log(e.target.files[0]);
  //   this.setState({
  //     selectedFile:e.target.files[0]
  //   })
  // }
  handleChange5=(e)=>{
    console.log(e.target.value)
    this.setState({
      address:e.target.value
    })
  }


  result=(e)=>{
    console.log(e.target.value)
  } 
 
render() {
  console.log(this.state)
  console.log(this.state.jobUpdate)
 const { selectedValue } = this.state;
    return (
   
      <div className="wrapper5 col m4 offset-l1">
        <div className="form-wrapper4 row " style={{width:'1000px',height:'650px'}}>
          
          {/* <h3 className="center-align" id="Registertext">{this.props.match.params.name}</h3> */}
         
        <h3 className="center-align" id="usertext">JobSeeker</h3>
        {/* <Avatar
          width={390}
          height={295}
          onCrop={this.onCrop}
          onClose={this.onClose}
          src={this.state.src}
        />
        <img src={this.state.preview} alt="Preview" /> */}
     
      
<div className="userimage" style={{marginLeft:'407px',marginRight:'499px'}}>

<img 
        src={this.state.profileimagepath} 
        //src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" 
        //onChange={this.handleNewImage}
        placeholder={file}
        style={{height:'100px',width:'100px',borderRadius:'50px'}}>
       
        </img>

       
      
        {/* <i className="material-icons large">person</i> */}
            </div>
            <div className="camera" style={{marginLeft:'463px'}}>
     
        <input   type="file" 
     name="image" class="image_src" 
     accept="images.jpeg"  onChange={this.handleImageChange} />
   
        </div>
          <div className="text-center">
        
            {/* <h3 className="text-center4">JobSeeker</h3> */}
           
   
            {/* <h2>{this.props.match.params.name}</h2> */}
          </div>
      
       
         
          <form onSubmit={this.handleSubmit} class="form-row" style={{}}>
          
        
          
   
          <div class="col-md-4 mb-3" style={{paddingRight:'40px',paddingLeft: '30px'}}>
         {/* <div className="fullName" style={{width:'35%',marginLeft:'10%'}}> */}
                <input
                className=""
                placeholder="Enter full name"
                type="text"
                name="name"
                required
                onChange={this.handleChange}
                id="input"
                pattern='[A-Za-z\\s]*'
                title="only alphabetical values are allowed"
              />
             
            </div>
            <div class="col-md-4 mb-3" style={{paddingRight:'40px',paddingLeft: '30px'}}>
            {/* <div className="mobileNumber" style={{width:'35%',marginLeft:'10%'}}> */}
              
              <input
                className="" 
                placeholder="Phone number"
                type="tel"
                name="mob"
                required
                value={this.state.mob}
                // value="8825290842"
                id="input"
              
                
              />
            
            </div>
            <div class="col-md-4 mb-3" style={{paddingRight:'40px',paddingLeft: '30px'}}>
            {/* <div className="Email"  style={{width:'35%',marginLeft:'10%'}}> */}
             
              <input
                className=""
                placeholder="Enter email address"
                type="email"
                name="email"
                required
                value={this.state.email}
                // value="alka@gmail.com"
                id="input"
                
              />
              {/* <div style={{color:"red"}}>{this.state.emailError}</div> */}
            </div>
        
            <div class="form-row" style={{marginLeft: '0px'}}>
            <div class="col-md-4 mb-3" style={{width:'475px',paddingRight:'40px',paddingLeft: '30px'}}>
         
              
              <input
                className=""
                placeholder="PAN number"
                type="text"
                name="panNum"
                
                required
                onChange={this.handleChange}
                id="input"
                pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                title="Enter valid pannumber"
              />
             
            </div>
            <div class="col-md-4 mb-3" style={{paddingRight:'40px',paddingLeft: '30px'}}>
           
              
              <input
                className=""
                placeholder="Aadhar card number"
                type="text"
                name="aadharNum"
                required
                onChange={this.handleChange}
                id="input"
                pattern="^\d{4}\d{4}\d{4}$" title="Addhar Card"
                title="4 digit space 4 digit space 4digit"
              />
             
            </div>
          
        
        <div class="col-md-4 mb-3" style={{paddingRight:'40px',paddingLeft: '30px'}}>
            {/* <div className="education  "  style={{width:'35%',marginLeft:'10%'}} > */}
             
              <input
                className=""
                placeholder="Education qualification"
                type="text"
                name="eduQual"
                required
                onChange={this.handleChange}
                id="input"
              />


               
            </div>
       </div>
       <div class="form-row">
       <div class="col-md-4 mb-3" style={{width:'500px',paddingRight:'35px',paddingLeft: '35px',marginTop:'5px'}}>
           
          {/* <Popup trigger={<input type="select" 
         onClick={this.handleValue}
           placeholder="Applied for"  onSelect={this.handleChange1Arg}   value={selectedValue}
          
           />} position=" center"
           style={{width:'250px'}}>
         
               <Multiselect options={this.state.Types}
                 value={selectedValue} displayValue="name"
                 onSelect={this.handleChange1Arg} id="demo" />   
  </Popup> */}
           <Popup trigger={<div id="printjobname" onChange={this.handleCheckLength}><h5 id="valse" >select</h5></div>} position=" center"
           style={{width:'250px'}}>
         
               <Multiselect options={this.state.Types}
                 value={selectedValue} displayValue="name"
                 onSelect={this.handleChange1Arg} id="demo" />   
  </Popup>
  <h5  id="valsel"></h5>
 
 
   
     
</div> 
    <div class="col-md-4 mb-3"  style={{width:'500px',paddingRight:'40px',paddingLeft: '34px'}}>
       
    <Form.Control as="select" onChange={this.handleChange2} id="update" >
    <option value='1'>Get job opening updates</option>
    {this.state.Updates.map(jobUpdate =>(
          <option key={jobUpdate} value={jobUpdate}>
             {jobUpdate}
          </option>
      ))}
 </Form.Control> 
  
            </div>
            <div class="col-md-4 mb-3" style={{marginTop:'20px',marginLeft:'-19px',paddingRight:'40px',paddingLeft: '36px'}}>
            {/* <div className="address"  style={{width:'35%',marginLeft:'9%'}}> */}
             
             <textarea id="address"  placeholder="Address" onChange={this.handleChange5} style={{width:'236px'}}>
 
             </textarea>
  </div>
            </div>
            <div class="form-row" style={{marginTop:'-35px',marginLeft: '28px'}} >
            <div class="col-md-6 mb-3" style={{display:'contents',paddingRight:'40px',paddingLeft: '30px'}} >
 
 {/* <div className="choose" style={{width:'35%',marginLeft:'10%'}} > */}
 <p id="label">Are you fresher?</p>

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
    marginTop: '-16px',paddingRight:'40px',paddingLeft: '30px'}} >
 <input type="file" 
                onChange={this.handleResumeChange}
                class="inputfile" id="embedpollfileinput" />

                    <label for="embedpollfileinput" class="ui huge white right floated button" id="hugewhite">
                    
                    <img src={file} id="fileimg"/>
                   
                    </label>

  </div> */}
  </div>
  <div class="form-row" id="efgh" style={{marginTop:'0px',marginLeft:'25px',display:'none'}}>
            <div class="col-md-4 mb-3"  style={{display:'contents'}} >
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
            <div  className="a" id="abcd" style={{marginTop:'0px',marginLeft:'30px',display:'none'}}>
          {/* <div id="abcd" style={{display:'none'}} className="a" > */}
          <div class="form-row">
          <div class="col-md-4 mb-3 years" style={{paddingRight:'42px',paddingLeft: '24px'}}>
          
              
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
               {/* <Form.Control as="select" onChange={this.handleChange2} id="YOP" >
    <option value='1'>Years of experience</option>
    {this.state.YOP.map(YOPS =>(
          <option key={YOPS} value={YOPS}>
             {YOPS}
          </option>
      ))}
 </Form.Control>  */}
              </div>
              <div class="col-md-4 mb-3 company" 
              style={{marginRight:'-21px',marginLeft: '26px',marginTop:'-21px',paddingRight: '45px'}}>
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
              <div class="col-md-4 mb-3 place" style={{paddingRight:'-42px',paddingLeft: '94px'}}>
              {/* <div className="place"  > */}
              <input
                className=""
                placeholder="Job Location"
                type="text"
                name="jobLocation"
                onChange={this.handleChange}
                id="input"
                style={{width:'242px'}}
                pattern='[A-Za-z\\s]*'
                title="only alphabetical values are allowed"
              /> 
               </div>
              
         
          </div>
               <div class="form-row">
               <div class="col-md-4 mb-3 designation" style={{paddingRight:'44px',paddingLeft: '23px',marginTop:'-2px'}}>
               {/* <div className="designation"  style={{width:'35%'}}> */}
              <input
                className=""
                placeholder="Designation"
                type="text"
                name="designation"
                onChange={this.handleChange}
                id="input"
                pattern='[A-Za-z\\s]*'
                title="only alphabetical values are allowed"
              /> 
              </div>
              <div className="col-md-4 mb-3 currentLocation" 
              style={{marginLeft: '0px',marginTop: '-2px',paddingRight:'20px',paddingLeft: '30px'}}>
              <input
                className=""
                placeholder="Current Location"
                type="text"
                name="currentLocation"
                onChange={this.handleChange}
                id="input"
                pattern='[A-Za-z\\s]*'
                title="only alphabetical values are allowed"
              /> 
              </div>
              
              <div class="col-md-4 mb-3 notice_period" style={{marginLeft:'67%',paddingRight:'40px',paddingLeft: '30px'}}>
              {/* <div className="notice_period" > */}
            <p id="label" style={{marginTop:'-17px'}}>Are you serving notice period?</p>
  
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
              </div>
              {/* abcd */}
              <div class="form-row" id="pqrs" style={{display:'none'}}>
              <div class="col-md-4 mb-3 years"  style={{paddingRight: '30px',
    marginTop: '-69px',paddingLeft:'35px'}}>
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
               <div class="col-md-4 mb-3 company"  style={{marginLeft:'37%',paddingRight:'61px',
    marginTop: '-46px'}}>
              
              <input
                className=""
                placeholder="Previous Company Name"
                type="text"
                name="prevcompanyName"
                onChange={this.handleChange}
                id="input"
               
              /> 
              </div>
              <div class="col-md-4 mb-3 place"  style={{marginLeft: '70%',
    marginTop: '-48px',paddingRight:'60px'}}>
              
              <input
                className=""
                placeholder="Previous Job Location"
                type="text"
                name="prevjobLocation"
                onChange={this.handleChange}
                id="input"
                pattern='[A-Za-z\\s]*'
                title="only alphabetical values are allowed"
              /> 
               </div>
               <div class="col-md-4 mb-3 designation"  style={{marginLeft:'32px',paddingRight:'62px'}}>
               
              <input
                className=""
                placeholder="Previous Designation"
                type="text"
                name="prevdesignation"
                onChange={this.handleChange}
                id="input"
                pattern='[A-Za-z\\s]*'
                title="only alphabetical values are allowed"
              /> 
              </div>
              <div className="col-md-4 mb-3 currentLocation" style={{marginLeft: '340px',
              marginTop: '-48px',paddingRight:'59px'}}>
              <input
                className=""
                placeholder="Current Location"
                type="text"
                name="currentLocation"
                onChange={this.handleChange}
                id="input"
                pattern='[A-Za-z\\s]*'
                title="only alphabetical values are allowed"
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
    marginLeft: '30px',paddingRight:'70px'
   }}>
              <input
                
                placeholder="Days"
                type="number"
                name="noOfDays"
                
                
                onChange={this.handleChange}
                id="input"
                
              /> 
              </div>
              <div class="col-md-4 mb-3 negotiable" style={{display: 'flex',
    marginTop:'-34px',
    marginLeft: '344px'}}>
            
            <p id="label">Is it negotiable?</p>
  
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
              <div class="col-md-4 mb-3 salary" style={{marginLeft: '70%',
    marginTop: '-79px'}}>
             
              <input style={{width: '243px'}}
                
                placeholder="UpTo"
                type="text"
                name="upTo"
                
                
                onChange={this.handleChange}
                id="input"
                
              /> 
              </div>
              
            
            </div>
          
            <div class="col-md-4 mb-3" style={{marginLeft:'40%'}}>
          

<label>
  <input name="check" value="false " onClick={this.handleCheck} type="checkbox" />
  <span id="label">Terms and Conditions</span>
</label>
<p className="center red-text">{this.state.checkBoxerror}</p>
</div> 
{/* 
          <button type="button" onChange={this.handleImageChange}>Button Text</button> */}
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
              </form>
        </div>
       </div>
    );
  }
}
export default UserDetails;