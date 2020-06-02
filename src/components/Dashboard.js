import React, { Component } from 'react'
import axios from 'axios'
import './css/dashboard.css'
import  mainLogo from './Images/Mainlogo.png'
import dashboard from './Images/dashboard.png'
import { withRouter,Link,NavLink } from 'react-router-dom'
import Popup from "reactjs-popup";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logout from './Images/logout.png'
import call from './Images/call.png'
import location from './Images/location.png'
import experiance from './Images/experiance.png'
import book from './Images/book.png'
import edit from './Images/edit.png'
import mail from './Images/mail.png'
import file from './Images/file.png'
import uploadfile from './Images/upload.png'
import { Multiselect } from "multiselect-react-dropdown";
import { Form,FormControl, Button, FormGroup,ControlLabel} from 'react-bootstrap';
const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
  
   Object.values(rest).forEach(val => {
      val === null && (valid = false);
    });
  
    return valid;
  };
  
const header={
     'x-api-key': ' $2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2' 
 }

toast.configure();
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        createeditprofileimage:'null',
        
        createeditprofileimagepath:'',
        createeditprofileimagedocId:'',
        editprofileimage:'',
        editprofileimagedocId:'',
        mobileNumberUserloginId:'',
        wantedit:'',
        profileimagepath:'',
        profileimageretrievedocId:'',
        blobData:null,
        resume:null,
        uploadedResume:'',
        Types:[],
        selectedValue:null,
        posts :[],
        details:[],
        editProfile:[],
        userId:'',
        LoggedIn:'true',
        mobileNumber:'',
        search:'',
        appliedJobs:'',
        searchedJobs:[],
        searchLoading:false,
        searchError:'',
        appliedJobsId:[18],
        Updates:["Send Mail","SMS","Both","None"],
        //docId:'',
        path:'',
        fileName:''
       
     }
}
handlejobtypes(){
  
   
}
handleRadioEdit(e){
    console.log(e.target.value)
    // this.setState({
    //     wantedit:e.target.value
    // })
   if(e.target.value=='false'){
       alert('hi')
   }
}

componentDidMount(e){
 
    
      fetch('http://stskfacilities.com:8081/stskFmsApi/jobTypes/getAllJobTypes',{headers:header}) 
    .then(response => response.json()) 
 .then(data => { 
  
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
  
        this._isMounted = true;
        this.setState({
            mobileNumber:this.props.location.state.mobileNumber.mobileNumber
        })
    
        axios.get('/stskFmsApi/jobseeker/getByMob/'+this.props.location.state.mobileNumber.mobileNumber,{headers:header})
        .then(res =>{
          console.log(res.data)
                this.setState({
                    userId:res.data.data.id,
                    details: res.data.data,
                    editProfile:res.data.data,
                    userLoginMobile:res.data.data.mob
                })
               })
            
              const timer = setTimeout(() => {
                axios.get('/stskFmsApi/jobs/recommendedJobs/'+this.state.userId,{headers:header})
                .then(res => {
                    console.log(res.data.data)
                    console.log(res.data.success)

                    if(res.data.success===1){
                        this.setState({
                            posts: res.data.data
                        });
                    }
                    else{
                        console.log("No jobs present")
                    }
                    }) 
                }, 2000);

                const timer1 = setTimeout(() => {
                    axios.get('/stskFmsApi/jobseeker/getById/'+this.state.userId,{headers:header})
                    .then(res=>{
                    this.setState({
                    appliedJobs:res.data.data.jobs,
                    // appliedJobdId:[...this.state.appliedJobdId, res.data.data.jobs]
                        })    
                    })
                }, 3000);
                const timer2 = setTimeout(() => {
                    axios.get('/stskFmsApi/jobseekerdoc/getByJobSeekerId/'+this.state.userId,{headers:header})
                    .then(res=>{
                        console.log(res.data.data[0].docId)
                    this.setState({
                        docId:res.data.data[0].docId
                        })    
                    })
                }, 4000);
                const timer3 =  setTimeout(()=>{
                    axios.get('/stskFmsApi/jobseekerdoc/retriveWithPath/'+this.state.docId, {headers: header})
                    .then(res => {
                      console.log(res.data.data.path);
                      this.setState({       
                         path:res.data.data.path,
                         fileName:res.data.data.docName
                     })
                 })
                    .catch(err => console.log(err))
               },5000)
                const timer4 =  setTimeout(()=>{
                axios.get('/stskFmsApi/userLogin/getByMob/'+this.state.mobileNumber, {headers: header})
                .then(res => {
                console.log(res.data.data.id);
                this.setState({
                mobileNumberUserloginId:res.data.data.id
            })
         
            })
                .catch(err => console.log(err))
            },6000)
            const timer5 =  setTimeout(()=>{
                axios.get('/stskFmsApi/imageDoc/getByLoginId/'+this.state.mobileNumberUserloginId, {headers: header})
                .then(res => {
                console.log(res.data.data[0].docId);
                this.setState({
                profileimageretrievedocId:res.data.data[0].docId
            })
         
            })
                .catch(err => console.log(err))
            },7000)
            const timer6 =  setTimeout(()=>{
                axios.get('/stskFmsApi/imageDoc/retriveWithPath/'+this.state.profileimageretrievedocId, {headers: header})
                .then(res => {
                console.log(res);
                this.setState({
                profileimagepath:res.data.data.path
            })
         
            })
                .catch(err => console.log(err))
            },8000)
                // axios.get('/stskFmsApi/jobseekerdoc/getByJobSeekerId'+this.state.userId,{headers:header})
                // .then(res => {
                //     console.log(res.data.data.docId)
                //     console.log(res)
                //     this.setState
                //     ({
                //         docId:res.data.data.docId
                //     })
                //  })
                // const timer2 = setTimeout(() => {
                // axios.get('/stskFmsApi/jobseekerdoc/getByJobSeekerId/3'+this.state.userId,{headers:header})
                // .then(res => {
                //     console.log(res.data.data.docId)
                //     console.log(res)
                //     this.setState
                //     ({
                //         docId:res.data.data.docId
                //     })
                //  })
                //  }, 4000);
    }
  

    handleApply=(id)=>{
        console.log(id)
        toast.success("Applied successfully",{position: toast.POSITION.BOTTOM_CENTER})
        axios.post('/stskFmsApi/jobseeker/applyJobs',
            { 
                id:this.state.userId,
                jobs:[{
                    id:id
                 }]
                },{headers:header})
                .then(res=>{
                    console.log(res.data)
                    console.log(res)
                }) 
                axios.get('/stskFmsApi/jobseeker/getById/'+this.state.userId,{headers:header})
                .then(res=>{
                    console.log(res.data)
                    this.setState({
                        appliedJobs:res.data.data.jobs
                    })
                })
                const posts = this.state.posts.filter(job =>{
                    return job.id !== id
                })
                const searchedJobs = this.state.searchedJobs.filter(job =>{
                    return job.id !== id
                })
                this.setState({
                    posts,
                    searchedJobs,
                    //appliedJobsId:[...this.state.appliedJobsId, id],
                })
               
              
        }    
    handleLogin=(e)=>{
        this.setState({
            LoggedIn:false
        })
        this.props.history.push('/')
    }
   
    handleinputSearch=(e)=>{
        this.setState({
            search:e.target.value,  
        })
    }
   
    handlepopup=(e)=>{
    
        const { editProfile } = { ...this.state };
        const currentState = editProfile;
        const { name, value } = e.target;
        currentState[name] = value;
        this.setState({ editProfile: editProfile });
        
    }
    handleResume = (e) => {
        e.preventDefault();
      
        console.log(e)
        console.log( e.target.files[0])
        console.log( e.target.files[0].name)
        this.setState({
              resume: e.target.files[0]
          })
         
        }
        handleResume1Submit = (e) =>{
          let formData = new FormData();  
            formData.append('file',this.state.resume);   
            axios.post('/stskFmsApi/jobseekerdoc/editDoc/'+this.state.docId,formData,
            {headers: { 'x-api-key': ' $2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2' }}
            )
                   .then(res => {
                     console.log(res);
                    
                   })
                   .catch(err => console.log(err))
        }
        popupsubmit=(e)=>{
        e.preventDefault();
        axios.put('/stskFmsApi/jobseeker/editJS',{
            name:this.state.name,
            email: this.state.email,
            mob: this.state.mob,
            panNum:this.state.panNum,
            aadharNum:this.state.editprofile.aadharNum,
            eduQual: this.state.editprofile.eduQual,
            experience: this.state.editprofile.experience,
            working:this.state.editprofile.working,
            jobUpdate:this.state.editprofile.jobUpdate,
            address:this.state.editprofile.address,
            fresher:this.state.editprofile.fresher,
            companyName:this.state.editprofile.companyName,
            destination:this.state.editprofile.destination,
            noticeperiod:this.state.editprofile.noticeperiod,
            noOfDays:this.state.editprofile.noOfDays,
            currentLocation:this.state.editprofile.currentLocation,
            negotiable:this.state.editprofile.negotiable,
            upTo:this.state.editprofile.upTo,
            jobLocation:this.state.editprofile.jobLocation,
            userLogin:this.state.editprofile.jobLocation,
            jobTypes:this.state.editprofile.jobTypes
        },{headers:header})
        .then(res=>{
            console.log(res.data)
        })
        if (formValid(this.state)) {
            console.log(`
              --SUBMITTING--
              Full Name: ${this.state.editprofile.name}
              Mobile Number: ${this.state.editprofile.mob}
              Email: ${this.state.editprofile.email}
              panNumber: ${this.state.editprofile.panNum}
              aadhar: ${this.state.editprofile.aadharNum}
              years: ${this.state.editprofile.experience}
              education: ${this.state.editprofile.eduQual}
              jobUpdate:${this.state.editprofile.jobUpdate}
              address:${this.state.editprofile.address},
              working : ${this.state.editprofile.working},
              userLogin:{
                id:this.state.userId
              }},
              jobTypes:[{
                id:this.state.jobTypes.id
              }],
              fresher:${this.state.editprofile.fresher},
           
            noticePeriod:${this.state.editprofile.noticePeriod},
            companyName:${this.state.editprofile.companyName},
            currentLocation:${this.state.editprofile.currentLocation},
            jobLocation:${this.state.editprofile.jobLocation},
            designation:${this.state.editprofile.designation},
            negotiable:${this.state.editprofile.negotiable},
            upTo:${this.state.editprofile.upTo},
            noOfDays:${this.state.editprofile.noOfDays},
            address:${this.state.editprofile.address},
            prevcompanyName:${this.state.editprofile.prevcompanyName},
          prevdesignation:${this.state.editprofile.prevdesignation},
          prevjobLocation:${this.state.editprofile.prevjobLocation},
             `);
          } else {
            console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
          }
    }
    handleEditImage=(e)=>{
        console.log( e.target.files[0])
        console.log( e.target.files[0].name)
        this.setState({
            editprofileimage: e.target.files[0],
            createeditprofileimage: e.target.files[0]
        })
      const timer10 =  setTimeout(()=>{
            let formData = new FormData();  
         
         formData.append('file',this.state.createeditprofileimage);   
        axios.post('/stskFmsApi/imageDoc/createDoc/'+this.state.userId,formData, {headers: 
         { 'x-api-key': ' $2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2' }
         })
                .then(res => {
                  console.log(res);
                  console.log(res.data)
                  this.setState({
                    createeditprofileimagedocId:res.data.data
                  })
                 })
                .catch(err => console.log(err))
                },4000)
                const timer11 =  setTimeout(()=>{
                    axios.get('/stskFmsApi/imageDoc/retriveWithPath/'+this.state.createeditprofileimagedocId, {headers: header})
                    .then(res => {
                      console.log(res);
                      this.setState({
                        createeditprofileimagepath:res.data.data.path
                      })
                     
                 })
                    .catch(err => console.log(err))
                },5000)
               
        const timer =  setTimeout(()=>{
            let formData = new FormData();  
         
         formData.append('file',this.state.editprofileimage);   
        axios.post('/stskFmsApi/imageDoc/EditDoc/'+this.state.profileimageretrievedocId,formData, {headers: 
         { 'x-api-key': ' $2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2' }
         })
                .then(res => {
                  console.log(res,'test');
                  console.log(res.data)
                  this.setState({
                      editprofileimagedocId:res.data.data
                  })
                 })
                .catch(err => console.log(err))
                },3000)

        // if(editprofileimagedocId==null){






        // }
               
    }
    handleChange2Arg = (selectedvalue) =>{
        console.log(selectedvalue)
          console.log(`Option selected:`, selectedvalue);
          this.setState({ selectedvalue})
          this.setState({jobTypes:selectedvalue})
          // var test=document.getElementsByClassName('_2OR24XnUXt8OCrysr3G0XI ')[0].innerHTML;
          // document.getElementById("valsel").innerHTML=test;
        }
    handleSearch=(e)=>{
        this.setState({
            search:e.target.value,  
        })
        const timer1 = setTimeout(() => {
            axios.get('/stskFmsApi/jobs/getByJobs/'+this.state.search,{headers:header})
        .then(res=>{
            if(res.data.success===1){
                this.setState({
                    searchedJobs:res.data.data,
                    searchLoading:true,
                    searchError:''
                })
            }
            else{
                this.setState({
                    searchError:'Sorry, No JOb updates..!'
                })
            }
        })
        }, 1000);
        
    }
  
    render() {
    
        console.log(this.state.uploadedResume)
        
        console.log(this.state.editProfile.jobTypes)
        console.log(this.state)
        const {posts} = this.state;
        const { path } = this.state;
        const postList = posts.length ? (
            posts.map(post => {
                // return this.state.appliedJobsId.map(item2 => {
            
                //      if(item2!==post.id){
                //          console.log('yehh')
                //      }else{
                //          console.log('puss')
                //      }
                //    })
                return(
                    <div className="row card"  key={post.id}>
                    
                        <div className="card-content" id="cardContent">
                        
                        <div className="col s6 m6 l3">
                             <p id="dashtext">Job position-<span className="grey-text">{post.jobType}</span></p>
                          </div>
                        <div className="col s6 m6 l3">
                              <p id="dashtext">Experience-<span className="grey-text">{post.id}</span></p>
                          </div>
                        <div className="col s6 m6 l3">
                              <p  id="dashtext">Location-<span className="grey-text">{post.serviceArea}</span></p>
                          </div>      
                          <Popup 
                           trigger={
                            <div className="col s6 m6 l2 right-align">
                            <h6 id="viewdetails" className="right-align" value={post.id}> <u>ViewDetails</u></h6>
                            </div>} modal>
                            {close => (
                            <div className="popup-content">
                                <div className="col s12 m12 l12">
                                    <div className="right-align">
                                        <i className="material-icons" id="dashcancelbtn" onClick={()=>{close();}}>clear</i>
                                    </div>

                                    <h4 className="center align grey-text">View Details</h4>
                                    
                                    <br></br>
                                    <div className="col s12 m12 l6">
                                        <h6>Job position-<span className="grey-text">{post.jobType}</span></h6>
                                        <br></br>
                                    </div>
                                    <div className="col s12 m12 l6">
                                        <h6>Experience - <span className="grey-text">{post.jobType}</span></h6>
                                        <br></br>
                                    </div>
                                    <div className="col s12 m12 l6">
                                        <h6>Language - <span className="grey-text">{post.language}</span> </h6>
                                        <br></br>
                                    </div>
                                    
                                    <div className="col s12 m12 l6">
                                        <h6> Age limit - <span className="grey-text">{post.ageLimit}</span></h6>
                                        <br></br>
                                    </div>
                                    <div className="col s12 m12 l6">
                                        <h6> Valid Upto - <span className="grey-text">{post.validUpto}</span></h6>
                                        <br></br>
                                    </div>
                                    <div className="col s12 m12 l6">
                                        <h6>Location - <span className="grey-text">{post.serviceArea}</span></h6>
                                        <br></br>
                                    </div>
                                    <div className="col s12 m12 l6">
                                        <h6>Vacancy -<span className="grey-text">{post.id}</span></h6>
                                        <br></br>
                                    </div>
                                    <div className="col s12 m12 l6">
                                        <h6> Salary range - <span className="grey-text">{post.salaryRange}</span></h6>
                                        <br></br>
                                    </div>
                                   <div>
                                        <h6>Description</h6>
                                        <br></br>
                                        <p className="grey-text">Lorem Ipsum is simply dummy text of the printing and typesetting
                                         industry. since the 1500s, when an unknown</p>
                                    </div>
                                    <div className="col s12 m12 l12">
                                        <h4>Before Applying Do you want to edit?</h4>
                                    <p>
                                    <label>
                                    <input name="wantedit"  value="true" onClick={this.handleRadioEdit}   type="radio"  />
                                        <span id="label">Yes</span>
                                        </label>
                                    </p>
                                    <p>
                                    <label>
                                        <input name="wantedit" value="false" onClick={this.handleRadioEdit} type="radio"/>
                                        <span id="label">No</span>
                                    </label>
                                    </p>
                                    </div>
    

                                    <div className="col s12 m6 l6">
                                        <button className="grey-text" onClick={() => {close();}} id="popcancelbtn" type="text">cancel</button>
                                        <br></br>
                                    </div>
                                    
                                    <div className="col s12 m6 l6">
                                        <button onClick={()=>{this.handleApply(post.id)}} value={post.id} id="popsavebtn" type="text">Apply</button>
                                        <br></br>
                                       
                                    </div>
                                </div>
                            </div>
                            )}
                            </Popup>
                        </div>
                         </div>    
                )
             })
        ) : (
            <div className="center"><h5>Loading, please wait....</h5>
            <div className="preloader-wrapper small active">
            <div className="spinner-layer spinner-green-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div><div className="gap-patch">
                <div className="circle"></div>
              </div><div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
            </div>
        )
        
            

        const {searchedJobs} = this.state;
        const searchList = searchedJobs.length ? (
            searchedJobs.map(search => {
               
                return(
                    <div className="row card"  key={search.id}>
                        <div className="card-content" id="cardContent">
                        
                        <div className="col s6 m6 l3">
                             <p id="dashtext">Job position-<span className="grey-text">{search.jobType}</span></p>
                          </div>
                        <div className="col s6 m6 l3">
                              <p id="dashtext">Experience-<span className="grey-text">{search.serviceArea}</span></p>
                          </div>
                        <div className="col s6 m6 l3">
                              <p  id="dashtext">Location-<span className="grey-text">{search.serviceArea}</span></p>
                          </div>
                          <div>
                         
                          <Popup trigger={ <div className="col s6 m6 l2 right-align">
                          <h6 id="viewdetails" className="right-align" value={search.id}> <u>ViewDetails</u></h6>
                          </div> } modal> 
                          {close => (
                                <div className="popup-content">
                                    <div className="col s12 m12 l12">
                                  
                                        <div className="right-align">
                                            <i className="material-icons" id="dashcancelbtn" onClick={()=>{close();}}>clear</i>
                                        </div>
                                        <h4 className="center align grey-text">View Details</h4>
                                        
                                        <br></br>
                                        <div className="col s12 m12 l6">
                                            <h6>Job position-<span className="grey-text">{search.jobType}</span></h6>
                                            <br></br>
                                        </div>
                                        <div className="col s12 m12 l6">
                                            <h6>Experience - <span className="grey-text">{search.jobType}</span></h6>
                                            <br></br>
                                        </div>
                                        <div className="col s12 m12 l6">
                                            <h6>Language - <span className="grey-text">{search.language}</span> </h6>
                                            <br></br>
                                        </div>
                                        
                                        <div className="col s12 m12 l6">
                                            <h6> Age limit - <span className="grey-text">{search.ageLimit}</span></h6>
                                            <br></br>
                                        </div>
                                        <div className="col s12 m12 l6">
                                            <h6> Valid Upto - <span className="grey-text">{search.validUpto}</span></h6>
                                            <br></br>
                                        </div>
                                        <div className="col s12 m12 l6">
                                            <h6>Location - <span className="grey-text">{search.serviceArea}</span></h6>
                                            <br></br>
                                        </div>
                                        <div className="col s12 m12 l6">
                                            <h6>Vacancy -<span className="grey-text">{search.id}</span></h6>
                                            <br></br>
                                        </div>
                                        <div className="col s12 m12 l6">
                                            <h6> Salary range - <span className="grey-text">{search.salaryRange}</span></h6>
                                            <br></br>
                                        </div>
                                       <div>
                                            <h6>Description</h6>
                                            <br></br>
                                            <p className="grey-text">Lorem Ipsum is simply dummy text of the printing and typesetting
                                             industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown</p>
                                        </div>
                                        <div className="col s12 m6 l6">
                                            <button className="grey-text" onClick={()=>{close();}} id="popcancelbtn" type="text">cancel</button>
                                            <br></br>
                                        </div>
                                        <div className="col s12 m6 l6">
                                            <button onClick={()=>{this.handleApply(search.id)}} id="popsavebtn" type="text">Apply</button>
                                            <br></br>
                                        </div>
                                    </div>
                                </div>
                          )}
                            </Popup>
                         </div>
                    </div>
                    </div>
                )
            })
        ) :(
            <div>Loading please wait...</div>
        )


        const {appliedJobs} = this.state;
        const appliedJobsList = appliedJobs.length ? (
        appliedJobs.map(applied => {      
            
                return(
                    <div className="row card"  key={applied.id}>
                    <div className="card-content" id="cardContent">
                    
                    <div className="col s6 m6 l3">
                    <p id="dashtext">Job position-<span className="grey-text">{applied.jobType}</span></p>
                      </div>
                    <div className="col s6 m6 l3">
                        <p id="dashtext">Experience-<span className="grey-text">{applied.serviceArea}</span></p>
                    </div>
                    <div className="col s6 m6 l3">
                    <p  id="dashtext">Location-<span className="grey-text">{applied.serviceArea}</span></p>
                    </div>                
                    <Popup trigger={ 
                    <div className="col s6 m6 l2 right-align">
                    <h6 id="viewdetails"  onClick={()=>this.setState({model_open2:true})} className="right-align" value={applied.id}> <u>ViewDetails</u></h6>
                    </div> } modal > 
                    {close => (
                       <div className="popup-content">
                           <div className="col s12 m12 l12">
                               <div className="right-align">
                                   <i className="material-icons" id="dashcancelbtn" onClick={()=>{close();}}>clear</i>
                               </div>
                               <h4 className="center align grey-text">View Details</h4>
                               
                               <br></br>
                               <div className="col s12 m12 l6">
                                   <h6>Job position-<span className="grey-text">{applied.jobType}</span></h6>
                                   <br></br>
                               </div>
                               <div className="col s12 m12 l6">
                                   <h6>Experience - <span className="grey-text">{applied.jobType}</span></h6>
                                   <br></br>
                               </div>
                               <div className="col s12 m12 l6">
                                   <h6>Language - <span className="grey-text">{applied.language}</span> </h6>
                                   <br></br>
                               </div>
                               
                               <div className="col s12 m12 l6">
                                   <h6> Age limit - <span className="grey-text">{applied.ageLimit}</span></h6>
                                   <br></br>
                               </div>
                               <div className="col s12 m12 l6">
                                   <h6> Valid Upto - <span className="grey-text">{applied.validUpto}</span></h6>
                                   <br></br>
                               </div>
                               <div className="col s12 m12 l6">
                                   <h6>Location - <span className="grey-text">{applied.serviceArea}</span></h6>
                                   <br></br>
                               </div>
                               <div className="col s12 m12 l6">
                                   <h6>Vacancy -<span className="grey-text">{applied.id}</span></h6>
                                   <br></br>
                               </div>
                               <div className="col s12 m12 l6">
                                   <h6> Salary range - <span className="grey-text">{applied.salaryRange}</span></h6>
                                   <br></br>
                               </div>
                              <div>
                                   <h6>Description</h6>
                                   <br></br>
                                   <p className="grey-text">Lorem Ipsum is simply dummy text of the printing and typesetting
                                    industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown</p>
                               </div>
                                    <div className="col s12 m6 l6">
                                        <button className="grey-text" onClick={()=>{close();}} id="popcancelbtn" type="text">cancel</button>
                                        <br></br>
                                    </div>
                                    <div className="col s12 m6 l6">
                                        <button value={applied.id} id="popsavebtn" type="text">Appled</button>
                                        <br></br>
                                    </div>
                                </div>
                            </div>
                    )}
                        </Popup>
                     </div>
            
                </div>
                )
            })
        ) : (
            <div className="center"><h5>You have not Applied for any Jobs</h5>
            
            </div>
            
            )
       
        return (
            <div id="back">
               <div className="navbar-fixed white">
                    <nav className="white" >
                        <div className="nav-wrapper white container">
                        <a className="brand-logo left" id="img"> 
                            <img className="center" src={mainLogo} width="50" height="50"></img>
                        </a>
                            <ul id="nav-mobile" className="right">
                                <li><Link to="/dashboard" className="waves-effect waves-light btn-small" id="btnnav">Home</Link></li>
                                <li><Link id="home" to={{
                                    pathname : '/help',
                                    state :{
                                    mobileNumber : this.state,
                                 }
                                }}>Help</Link></li>
                                <li><i className="material-icons grey-text large" id="profileicn">account_circle</i></li>
                            </ul>
                        </div>
                    </nav>
                </div>
           
                <div className="row">
                <div className="">
                
                     <img className="center" id="dashboard" src={dashboard}></img>
                     <div className="center-align"><h6 id="textimg">Find your job here</h6></div>
                </div>
                
                <nav className="container white" id="search">
                <div className="nav-wrapper">
                    
                        <div className="input-field">
                            <input id="dashinput" type="search" onChange={this.handleSearch} required placeholder="Search jobs"/>
                            <i className="material-icons right">
                        
                            <a className="btn hide-on-small-only" onClick={this.handleSearch} id="src1">
                            <i className="material-icons right"  id="src">search</i>Search</a></i>

                            <i className="material-icons right show-on-small hide-on-med-and-up grey-text"
                            onClick={this.handleSearch}>search</i>
                            
                        </div>
                      
                </div>
                </nav>
                </div>


            <div className="" id="details">
                <div className="row">
                    <div className="col s12 m12 l12">
                        <div className="col s10 m3 l3 offset-m1 offset-l1 offset-s1 z-depth-1" id="profile">
                        <div id="editicn" >
                        <Popup modal trigger={
                        
                            <div className="right-align"><img src={edit} width="20" height="20"></img>
                            <br></br></div>
                        }>
                        
                        <div className="popup-content">
                            <h4 className="center-align" id="popTitle">Edit profile</h4>
                            <div class="d-flex justify-content-center">
                            <img src={this.state.profileimagepath} style={{height:'100px',width:'100px',borderRadius:'50px'}}></img>
                                <Popup trigger={<h3>Update Images</h3>} position=" center" id="updateimage"
                                >
                                     <div className="popup-content1" id="newimage">
                                        <h5 id="change">Change Pictures</h5>
                                        <div class="imageload">
                                        <img src={this.state.profileimagepath} style={{height:'100px',width:'100px',borderRadius:'50px'}}></img> 
                                        </div>
                                       
                                        <input type="file" 
                    class="inputfile" id="embedpollfileinput" 
                    name="image"
                    accept="images.jpeg"  onChange={this.handleEditImage}/>

                    <label for="embedpollfileinput" 
                   // class="ui huge Persian Green
 //right floated button" 
 id="hugegreen">
                   
                    <img src={uploadfile} id="fileimg"
                    />
                    <span id="docfile">Upload Image</span>
                    </label>
                                     </div>
                                </Popup>
                            
                            {/* <img src={this.state.createeditprofileimagepath} style={{height:'100px',width:'100px',borderRadius:'50px'}}></img> */}
                            {/* <input type="file" id="editImage" onChange={this.handleEditImage}/> */}
                            </div>
                            
                            <form onSubmit={this.popupsubmit}>
                            <div className="col s12 m12 l6">
                            
                                <label >First name</label>
                                <input id="inputBorder" name="name" required defaultValue={this.state.editProfile.name} 
                                onChange={this.handlepopup} type="text"></input>
                            
                            
                                <label >Email</label>
                                
                                <input id="inputBorder" name="email" defaultValue={this.state.editProfile.email} onChange={this.handlepopup}  type="text"></input>
             
                                <label >Pan Number</label>
                                
                                <input id="inputBorder" name="panNum" defaultValue={this.state.editProfile.panNum} onChange={this.handlepopup}  type="text"></input>
                                <label>Education Qualificatin</label>
                                <input id="inputBorder" name="eduQual" defaultValue={this.state.editProfile.eduQual} onChange={this.handlepopup}  type="text"></input>
                                {/* <label>Get job opening updates</label> */}
                                {/* <input id="inputBorder" name="jobUpdate" defaultValue={this.state.editProfile.jobType} onChange={this.handlepopup}  type="text"></input> */}
                                <Form.Control as="select" onChange={this.handleChange2} id="update" defaultValue={this.state.editProfile.jobUpdate}>
                                <option value='1'>Get job opening updates</option>
                                {this.state.Updates.map(jobUpdate =>(
                                    <option key={jobUpdate} value={jobUpdate}>
                                        {jobUpdate}
                                    </option>
                                ))}
                                </Form.Control> 
                                <input id="inputBorder" name="resume" value={this.state.uploadResume} onChange={this.handleResume}  accept="images.jpeg"  type="file"></input>
                                {/* <a href="#" onClick={this.downloadEmployeeData}>Download</a> */}
                        
                                {/* <p id="label">Are you fresher?</p>

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
 </p> */}
                                {/* <div id="popcancelbtn" onClick={()=>this.setState({popup:false})} className="center-align">cancel</div> */}
                                <div id="popcancelbtn" onClick={this.handleResume1Submit} className="center-align">cancel</div>  
                            </div>
                            <div className="col s12 m12 l6">
                                <label>Mobile number</label>
                                <input id="inputBorder" name="mob" defaultValue={this.state.editProfile.mob} onChange={this.handlepopup} type="text"></input>
                                <label>No of years experiance</label>
                                <input id="inputBorder" name="experience" defaultValue={this.state.editProfile.experience} onChange={this.handlepopup}  type="text"></input>
                                <label>Aadhar Number</label>
                                <input id="inputBorder" name="aadharnum" defaultValue={this.state.editProfile.aadharNum} onChange={this.handlepopup}  type="text"></input>
              
                                {/* <label>Applied for</label> */}
                                {/* <input id="inputBorder" name="" onChange={this.handlepopup}  type="text">
                               
                                </input> */}
                                 {/* <input id="inputB" name="aadharnum"  onChange={this.handlejobtypes}  type="text"></input> */}
            
                                 <Popup trigger={<div id="printjobname" onChange={this.handlejobtypes}><h5 id="valsel" >selected</h5></div>} position=" center"
                                    style={{width:'250px'}}
                                    defaultValue={this.state.editProfile.jobTypes}>
                                    <Multiselect options={this.state.Types}
                                    displayValue="name"
                                    onSelect={this.handleChange2Arg} id="demo" /> 
                                 </Popup>
                                <label>Address</label>
                                <input id="inputBorder" name="address" defaultValue={this.state.editProfile.address} onChange={this.handlepopup}  type="text"></input>
                            <a href={path}>{this.state.fileName}</a>
                                <input type="file" 
                    class="inputfile" id="embedpollfileinput" 
                    name="image"
                    accept="images.jpeg"  onChange={this.handleChange}/>
                    <label for="embedpollfileinput" class="ui huge white right floated button" id="white">
                   
                    <img src={file} id="fileimg" />
                    <span id="doc">Upload Resume</span>
                    <span><i class="far fa-times-circle fa-2x" id="close" ></i></span>

                    </label>
                                {/* <p id="label">Currently working?</p>
  
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
</p> */}
                                <button id="popsavebtn" type="text">save</button>
                            </div>
                            </form>
                            </div>
                    </Popup>
                            
                    </div>
                        <div className="center" id="profile1">
                        <div className="center">
                            <img src={this.state.profileimagepath} style={{height:'100px',width:'100px',borderRadius:'50px'}}></img>
                            {/* <i className="material-icons large">person</i> */}
                            <br></br>
                        </div>
                            <strong className="center-align">{this.state.details.name}</strong>
                            <div className="left-align">
                                <p><img className="center" id="dashicn" src={location} width="23" height="23"></img>{this.state.details.currentLocation}</p>
                                <p><img className="center" id="dashicn" src={mail} width="20" height="20"></img>{this.state.details.email}</p>
                                <p><img className="center" id="dashicn" src={call} width="20" height="20"></img>{this.state.details.mob}</p>
                                <p><img className="center" id="dashicn" src={experiance} width="20" height="20"></img>{this.state.details.experience}</p>
                                <p><img className="center" id="dashicn" src={book} width="23" height="23"></img>{this.state.details.eduQual}</p>
                              
                                
                            </div> 
                            
                            <hr></hr>
                            <a className="waves-effect waves-light btn" onClick={this.handleLogin} id="logout">
                            <img className="center" src={logout} width="20" height="20"></img>Logout</a>
                        </div>
                    </div>
                            <div className="col s12 m7 l7 offset-l1 z-depth-1" id="container">
                            {
                                this.state.search ? (
                                    <div>
                                        <h5>Searched Jobs</h5>
                                        <h4 className="red-text">{this.state.searchError}</h4>
                                        {searchList}
                                    </div>
                                ):(
                                    <div>
                                        <h4 className="grey-text">Job recomended for you</h4>
                                        {postList}
                                    </div>
                                )
                            }
                            </div>
                        </div>
                    </div>
                <div className="col s12 l8 m8 offset-m1 offset-l1 z-depth-1" id="container2">
                    <div className="">
                        <h4 className="grey-text">Status of applied jobs</h4>
                        {appliedJobsList}
                     </div>
                </div>
                </div>
                 <div className="footer-copyright" id="footer">
                 <h6 className="center v-center"> Copyright @2020 All rights reserved | This tamplate is made with STSK</h6>
               </div>
            </div>
        )       
    }
}
export default withRouter(Dashboard)