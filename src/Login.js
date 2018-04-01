import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FetchHttpClient, { json } from 'fetch-http-client';


class Login extends React.Component {
constructor(props){
  super(props);
  this.state={
  username:'',
  password:''
  }
 }

 login() {
  const client = new FetchHttpClient('http://localhost:3001/twitter/');
  client.get('login').then(response =>console.log);     
}

render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
              titleStyle={{textAlign: "center"}}
               title="Home Page"             
           />         
             <RaisedButton label="Go To Twitter" primary={true} style={style} onClick={this.login}/>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
 margin: 15
};


export default Login;