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
// import { Dropdown } from 'semantic-ui-react'
import Bootstrap from "react-bootstrap";
// import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

 
  // Object.values(formErrors).forEach(val => {
  //   val.length > 0 && (valid = false);
  // });

 
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};


class UserRole extends Component {
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
      
      check:false,
      name: null,
      email: '',
      mob:'',
      panNum: null,
      aadharNum: null,
      
      experience: null,
      eduQual: null,
      working : '',
      jobUpdate:null,
      userId:'',
      jobTypes:[
        { id:''}
      ],
      fresher:'',
      Current_company:'',
      noticePeriod:'',
      companyName:'',
      currentLocation:'',
      jobLocation:'',
      destination:'',
      negotiable:'',
      upTo:'',
      noOfDays:'',
     
      address:null,
      jobs:[],
      
      Updates:["Send Mail","SMS","Both","None"],
      formErrors: {
        name: "",
        email: "",
          mob: "",
         panNum: "",
          aadharNum: "",
          experience: "", 
          eduQual: "",
          working:"",
          jobUpdate:"",
          userId:"3",
         //jobss:"",
           //update:"",
          //  userLogin:[
          //   { id:''}
          // ],
          jobTypes:
            { id:''}
          ,
          fresher:'',
      Current_company:'',
      noticePeriod:'',
      companyName:'',
      currentLocation:'',
      jobLocation:'',
      destination:'',
      negotiable:'',
      upTo:'',
      noOfDays:'',
      address:null,
          // address:'',
          //
         // password: "",
          
        }
   
    };
    this.handleSubmit=this.handleSubmit.bind(this)
  }

  componentWillMount(){
    this.setState({
      mob:this.props.location.state.mobileNumber.mobileNumber ,
    //  email:this.props.location.state.email,
    //  userId:this.props.location.state.userId
  })  
  }
  componentDidMount(){

  axios.get('/stskFmsApi/jobTypes/getAllJobTypes',{
    headers: 
       { 'x-api-key': ' $2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2' }
 })
    .then(res=>{
      console.log(res.data)
      console.log(res.data.data)
        this.setState({
            jobs : res.data.data
        })  
    })
    axios.get('/stskFmsApi/userLogin/getByMob/'+this.state.mob,{
      headers: 
         { 'x-api-key': ' $2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2' }
   })
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
  this.setState({
    working:e.target.value
  })
}
handleRadio1=(e)=>{
  console.log(e.target.value)
  this.setState({
    fresher_exp:e.target.value
  })
}
handleRadio2=(e)=>{
  console.log(e.target.value)
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
    experience: this.state.experience,
    working : this.state.working,
    eduQual: this.state.eduQual,
    jobUpdate:this.state.jobUpdate,
    address:this.state.address,
    fresher:this.state.fresher,
    companyName:this.state.companyName,
    destination:this.state.destination,
    noticePeriod:this.state.noticePeriod,
    noOfDays:this.state.noOfDays,
    currentLocation:this.state.currentLocation,
    negotiable:this.state.negotiable,
    upTo:this.state.upTo,
    jobLocation:this.state.jobLocation,
    userLogin:{
      id:this.state.userId
    },
    jobTypes:[{
      id:this.state.jobTypes.id
    }]
   
  },{
    headers: 
       { 'x-api-key': ' $2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2' }
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
      userId: this.state.userId
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
      destination:${this.state.destination},
      negotiable:${this.state.negotiable},
      upTo:${this.state.upTo},
      noOfDays:${this.state.noOfDays},
      address:${this.state.address}
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
  handleChange1Arg = (e) =>{
    // console.log(this.state.jobTypes.id)
    // alert(this.state.jobTypes.id);
    // var options = e.target.value;
    // var value = [];
    // for (var i = 0, l = options.length; i < l; i++) {
    //   if (options[i].selected) {
    //     value.push(options[i].value);
    //   }
    //   alert(value);
    // }
    // var select = document.getElementById('option');
    // var textarea = document.getElementById('opitems');
    // select.onchange = function() {
    //   textarea.value = select.value;
    // }


    
    var dropDown = document.getElementById('demo'), jobtypesArray = [], i;
    for (i = 0; i < dropDown.options.length ; i += 1) {
        if (dropDown.options[i].selected) {
            //countryArray.push( dropDown.options[i].value); //If you need only values 
            jobtypesArray.push(dropDown.options[i].value );
        }
    }

    // console.log(jobtypesArray);

    //  var x = jobtypesArray.toString();
    
    // var x = jobtypesArray;
    // console.log(x)
    // var dataobj={jobtypesArray:[]};
    // var finalval = JSON.stringify(x); 
     
//      var arrayToString = JSON.stringify(Object.assign({}, array)); 
//  console.log(arrayToString);
//  function arrayToJSONObject (arr){
  //header
//    var keys = arr[0];

  
//   var newArr = arr.slice(1, arr.length);

//   var formatted = [],
//   data = newArr,
//   cols = keys,
//   l = cols.length;
//   for (var i=0; i<data.length; i++) {
//           var d = data[i],
//                   o = {};
//           for (var j=0; j<l; j++)
//                   o[cols[j]] = d[j];
//           formatted.push(o);
//   }
//   return formatted;
  
// }
// console.log(arrayToJSONObject (arr))
var arr = jobtypesArray; //6,8
var count =arr.length;
var finaldata='';
for(var i=1;i<=count;i++){
  finaldata+="{'id':"+i+"},";
}
var newdata="["+finaldata+ "]";



//  var json = Object.assign({}, arr);
//  var jsonobj = arr.reduce((json, value, key) => { json[key] = value; return json; }, {});
// console.log(jsonobj)

    this.setState({
      jobTypes:{
        id:e.target.value
      }
      // jobTypes:newdata
    })
    
  }
  
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
  // console.log(job.id)
//  const oplist = this.state.jobs.map(function(job){return (job)})
//  console.log(oplist)
  console.log(this.state)
  //console.log(this.state.working)
//  console.log(this.state)
 console.log(this.state.jobUpdate)
    return (
   
      <div className="wrapper5 col m4 offset-l1">
        <div className="form-wrapper4 row ">
        <div className="userimage">
        <i className="material-icons large">person</i>
        
            </div>
            <div className="camera">
         
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
          <div className="text-center">
        
            {/* <h3 className="text-center4">JobSeeker</h3> */}
           
   
            {/* <h2>{this.props.match.params.name}</h2> */}
          </div>
          {/* <Multiselect options={data} onSelectOptions={this.result} /> */}
       
         
          <form onSubmit={this.handleSubmit}>
          
          {/* <Dropdown placeholder='Applied For'  fluid multiple selection options={options} /> */}
          
      

         <div className="fullName  ">
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
            <div className="mobileNumber  ">
              
              <input
                className="" 
                placeholder="Mobile Number"
                type="tel"
                name="mob"
                required
                value={this.state.mob}
                id="input"
                onChange={this.handleChange}
                
              />
            
            </div>
            <div className="Email  ">
             
              <input
                className=""
                placeholder="Email"
                type="email"
                name="email"
                required
                value={this.state.email}
                id="input"
                onChange={this.handleChange}
              />
              {/* <div style={{color:"red"}}>{this.state.emailError}</div> */}
            </div>
            <div className="panNumber  ">
              
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
            <div className="aadhar  ">
              
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
            {/* <div className="years  ">
              
                <input
                className=""
                placeholder="Years of Experience"
                type="text"
                name="experience"
                required
                pattern="[0-9]*"
                title="It should be Numeric"
                onChange={this.handleChange}
                id="input"
                maxLength="2"
              /> 

              
              </div> */}
        
           
            <div className="education  ">
             
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
       
            <div className="applied  ">
          
           
  
         
        {/* <Popup trigger={<input type="select" placeholder="select" id="popup"/>} position=" center">
    <div><Select  options={this.Jobs()}  value="6"  style={{width:'100%'}} onChange={this.handleChange1Arg} 
            id="multi" isMulti 
           placeholder="select some options"/>
           </div>
  </Popup> */}
               {/* <textarea id="opitems"  placeholder="PleaseSelect" onChange={this.handleChange5}>

</textarea> */}

  <Popup trigger={<input type="select" placeholder="select" id="popup"/>} position=" center">
                <Form.Control as="select"  onChange={this.handleChange1Arg} placeholder="Select ids" id="demo" > 
                
               
               {/* <option value=" " disabled selected>Choose your option</option> */}
  
                
             {this.state.jobs.map(function(job,i){
                   return( <option key={job.id} value={job.id} id="option">
                      {job.name}
                    </option>
                      
                    
                   ) })}
                   


                  </Form.Control> 
                
       </Popup>
                   </div> 
            <div className="jobOpening  ">
            
    <Form.Control as="select" onChange={this.handleChange2} id="update" >
    <option value='1'>Please Select</option>
    {this.state.Updates.map(jobUpdate =>(
          <option key={jobUpdate} value={jobUpdate}>
             
             
              {jobUpdate}
              
          </option>
      ))}


      
  </Form.Control> 
  
            </div>
 
            <div className="choose  ">
            <p id="label">Are you a fresher?</p>
  
              <p>
              <label >
              <input name="working"  value="true" onClick={this.handleRadio} type="radio" id="ra" />
                  <span id="label">Yes</span>
                  </label>
              </p>
              <p>
              <label>
                <input name="working" value="false" onClick={this.handleRadio} type="radio" id="ra"/>
                <span id="label">No</span>
              </label>
            </p>
            </div>
          
           <div className="years">
              
                <input
                className=""
                placeholder="Years of Experience"
                type="text"
                name="experience"
                required
                pattern="[0-9]*"
                title="It should be Numeric"
                onChange={this.handleChange}
                id="input"
                maxLength="2"
              /> 
              </div>
              <div className="fresher">
            <p id="label">Are you working?</p>
  
              <p>
              <label >
              <input name="fresher"  value="true" onClick={this.handleRadio1} type="radio" id="ra" />
                  <span id="label">Yes</span>
                  </label>
              </p>
              <p>
              <label>
                <input name="fresher" value="false" onClick={this.handleRadio1} type="radio" id="ra"/>
                <span id="label">No</span>
              </label>
            </p>
            </div>
            <div className="company">
              <input
                className=""
                placeholder="Enter Current Company Name"
                type="text"
                name="companyName"
                required
                
                onChange={this.handleChange}
                id="input"
               
              /> 
              </div>
              <div className="place">
              <input
                className=""
                placeholder="Job Location"
                type="text"
                name="jobLocation"
                required
                
                onChange={this.handleChange}
                id="input"
                
              /> 
              {/* </div>
               <div className="place">
              <input
                className=""
                placeholder="Place"
                type="text"
                name="place"
                required
                
                onChange={this.handleChange}
                id="input"
                
              />  */}
              </div>
              {/* <div className="designation">
              <input
                className=""
                placeholder="Designation"
                type="text"
                name="designation"
                required
                
                onChange={this.handleChange}
                id="input"
                
              /> 
              </div> */}
              <div className="notice_period">
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
            <div className="days">
              <input
                
                placeholder="days"
                type="text"
                name="noOfDays"
                required
                
                onChange={this.handleChange}
                id="input"
                
              /> 
              </div>
              <div className="salary">
              <input
                
                placeholder="salary"
                type="text"
                name="upTo"
                required
                
                onChange={this.handleChange}
                id="input"
                
              /> 
              </div>
               <div className="negotiable">
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
            <div className="currentLocation">
              <input
                className=""
                placeholder="Current Location"
                type="text"
                name="currentLocation"
                required
                
                onChange={this.handleChange}
                id="input"
                
              /> 
              </div>
              <div className="designation">
              <input
                className=""
                placeholder="Designation"
                type="text"
                name="destination"
                required
                
                onChange={this.handleChange}
                id="input"
                
              /> 
              </div>
             
              
           
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
            <div className="address">
             
            <textarea id="address"  placeholder="Address" onChange={this.handleChange5}>

            </textarea>
 </div>
 

            
           {/* <div className="checkbox">

<label>
  <input name="check" value="false " onClick={this.handleCheck} type="checkbox" />
  <span id="label">Terms and Conditions</span>
</label>
<p className="center red-text">{this.state.checkBoxerror}</p>
</div>  */}
        
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

