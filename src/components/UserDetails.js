import React, { Component } from "react";
//import { Dropdown } from 'semantic-ui-react'
import ReactDOM from "react-dom";
import { Form,FormControl} from 'react-bootstrap';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import axios from 'axios'
import camera from './Images/camerapic.png'
import "./css/userDetails.css";
import Select from 'react-select';  
import 'bootstrap/dist/css/bootstrap.min.css';  
import Popup from "reactjs-popup";

class UserRole extends Component {
  constructor(props) {
    super(props);
  this.state = {
    multiSelect: [],
    image: null,
     selectedFile:null,
      dropdown:'',
      displayValue:'',
      values: [],
     focusedValue: -1,
      isFocused: false, 
      isOpen: false,
      typed: '',
      checkBoxerror:'',
      
      check:false,
      name: null,
      email: null,
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
      jobs:[],
      Updates:["Send Mail","SMS","Both","None"],
   
    };
    this.handleSubmit=this.handleSubmit.bind(this)
  }

  componentWillMount(){
    this.setState({
     mob:this.props.location.state.mobileNumber.mobileNumber ,
     email:this.props.location.state.email,
     userId:this.props.location.state.userId
  })  
  }
  componentDidMount(){

  axios.get('/stskFmsApi/jobTypes/getAllJobTypes')
    .then(res=>{
      console.log(res.data)
      console.log(res.data.data)
        this.setState({
            jobs : res.data.data
        })  
    })

    axios.get('/stskFmsApi/userLogin/getByMob/'+this.state.mob)
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
handleSubmit = e => {  
 
  e.preventDefault();
  
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
      id:this.state.userId
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
      userId: this.state.userId
        }} );
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
    this.setState({value:e.target.value});
     const { name, value } = e.target;
     //let formErrors = { ...this.state.formErrors };
     this.setState({  [name]: value }, () => console.log(this.state));
    // this.setState({[name]: value }, () => console.log(this.state));
  };
  handleChange1Arg = (e) =>{

    // axios.get('/stskFmsApi/userLogin/getByMob/'+this.state.mob)
    // .then(res=>{
    //   console.log(res.data)
    //    this.setState({
    //         userId:res.data.data.id
    //     })
    // })

    // axios.get('/stskFmsApi/userLogin/getByMob/7909185027')
    // .then(res=>{
    //   console.log(res.data)
    //    this.setState({
    //         userId:res.data.data.id
    //     })
    // })
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
  
//  const oplist = this.state.jobs.map(function(job,i){return (job)})
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
            <div className="years  ">
              
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
               
            </div>
       
            <div className="applied  ">
          
           
  
         
        {/* <Popup trigger={<input type="select" placeholder="select" id="popup"/>} position=" center">
    <div><Select  options={this.Jobs()} value={this.Jobs()} style={{width:'100%'}} onChange={this.handleChange1Arg}
            id="multi" isMulti 
           placeholder="select some options"/></div>
  </Popup> */}
               
                <Form.Control as="select"  onChange={this.handleChange1Arg}  id="demo">
                {/* <select multiple={true} value={this.state.value} onChange={this.handleChange1Arg}> */}
               <option value="1" disabled selected>Choose your option</option>
                
                
                  {this.state.jobs.map(function(job,i){
                   return( <option key={job.id} value={job.id} id="option">
                      {job.name}
                    </option>
                      
                    
                   ) })}
                   
                  {/* </select> */}
              </Form.Control>  
              
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
            <p id="label">Currently Working</p>
  
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
             
            <textarea id="address"  placeholder="Address">

            </textarea>
              
           </div>
           <div className="checkbox">

           <label >
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

