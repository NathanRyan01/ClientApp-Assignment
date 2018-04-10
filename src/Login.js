import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FetchHttpClient from 'fetch-http-client';


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
             <RaisedButton buttonStyle={{ borderRadius: 100, width:145,height:45}}
                                          style={{ borderRadius: 100,width:145,height:45 }}
                                          labelColor={'#FFFFFF'}
                                          backgroundColor={"#0066e8"}

              label="Go To Twitter" primary={true} onClick={this.login}/>
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