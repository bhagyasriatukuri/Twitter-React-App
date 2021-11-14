
import React from "react";
import { Form } from "react-bootstrap";
import { Button } from 'react-bootstrap';
class Twitter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username : null,
            result:[],
            showDownload: false,
            userexists:true
            
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.disabledownload = this.disabledownload.bind(this);
    }

    handleSubmit(event) {
        
        event.preventDefault();
        console.log(this.state.username);
        this.setState({username: this.state.username,showDownload:false});
        
        fetch("/api/getUser/"+this.state.username)
        .then(res => res.json()).then((result) => {
              
              console.log(result);
              let temp = [];
              if (result.body) {
                
              result.body.data.map(element => {
                    temp.push(element);
              });
              console.log(temp);
              this.setState({result:[...this.state.result,...temp], showDownload: true,userexists:true},() =>  console.log(this.state.result));
              
            }
            else{
              this.setState({showDownload:false,result:[],userexists:false})
              
              
              
            }

               
              
          });
      }
    disabledownload(){
      this.setState({showDownload:false});
    }  
    handleChange(event){
      this.setState({username: event.target.value});
      
     
    }  
      
    render() {
      
    
    return <div className="container" style={{marginTop:"2em"}}><Form >
    
  
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Twitter Username</Form.Label>
      <Form.Control type="username" placeholder="username" value={this.state.username}  onChange={this.handleChange}/>
    </Form.Group>
    
    <Button variant="primary" type="submit" onClick={this.handleSubmit}>
      Submit
    </Button>
  </Form>
  {this.state.showDownload && this.state.username ? 
  <a
            href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify({"tweets":this.state.result})
            )}`}
            download="filename.json" onClick={this.disabledownload}
          >
            {`Download Json`}
          </a>: null}
  {this.state.result.length === 0 && !this.state.userexists? <div>User doesnt exist or no tweets found for the given user</div>:null}

    </div>
    }
  }
  export default Twitter;