import React, { Component } from 'react'
import './css/UploadDocument.css' 
import file from './Images/file.png'
import doclogo from './Images/doclogo.png'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import axios from 'axios';

const config = {     
    headers: { 'content-type': 'multipart/form-data',
    'x-api-key': ' $2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2' }
}
class UploadDocument extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             image:null,
             mobileNumber:this.props.location.state.mobileNumber.mobileNumber,
             userId:'',
            // docId:''
        }
    }
 componentDidMount(){
    axios.get('/stskFmsApi/jobseeker/getByMob/'+this.state.mobileNumber,config)
      
    .then(res =>{
     console.log(res.data.data.id)
            this.setState({
                userId:res.data.data.id,
               })
           })
 }
    handleSubmit = (e) => {
        e.preventDefault();
        // this.setState({
        //     mobileNumber   })

      
       let formData = new FormData();  
    
    formData.append('file',this.state.image);   
    axios.post('/stskFmsApi/jobseekerdoc/createDoc/'+this.state.userId,formData,config)
           .then(res => {
             console.log(res);
             console.log(res.data)
             this.setState({
                // docId:res.data.data
             })


             const timer1 = setTimeout(() => {
                if(res.data.success===1)
                {
                  console.log(res)
                  console.log(res.data)
              
                  this.props.history.push({
                  pathname : '/dashboard',
                  state :{
                  mobileNumber : this.state,
                 // docId:this.state
   
                    }} );
                  }
   
            }, 3000);

                       })
           .catch(err => console.log(err))
    
      
           
   };
   handleChange = (e) => {
      
    console.log(e)
    console.log( e.target.files[0])
    console.log( e.target.files[0].name)
    this.setState({
        image: e.target.files[0]
    })
  
};
    render() {
        console.log(this.state)
        return (
          
           
                <Form onSubmit={this.handleSubmit}>
                      <div class="row">
            
            <div className="col 12">
                <h4 className="uploadDoc">Upload Document</h4>
                <img src={doclogo} id="doclogo"/>
            </div>
           
           
          </div>
                <Form.Field>
               <input type="file" 
                    class="inputfile" id="embedpollfileinput" 
                    name="image"
                    accept="images.jpeg"  onChange={this.handleChange}/>

                    <label for="embedpollfileinput" class="ui huge white right floated button" id="hugewhite">
                   
                    <img src={file} id="fileimg"
                    />
                    <span id="doc">Upload Resume</span>
                    </label>

                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
           
        )
    }
}

export default UploadDocument