import React from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './App.css';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FetchHttpClient, { json } from 'fetch-http-client';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', post: '', user: '', pUser: [], pScore :[], pTweet: [], 
      nUser: [], nScore :[], nTweet: [], cUser: [], cScore :[], cTweet: [], query: [], trend: [], tweet: [] };

    this.searchUser = this.searchUser.bind(this);
    this.submitTweet = this.submitTweet.bind(this);
    this.postTweet = this.postTweet.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.handleUser = this.handleUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.refresh = this.refresh.bind(this);
    this.storeHistory = this.storeHistory.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleUser(event) {
    this.setState({user: event.target.value});
  }

  handlePost(event){
    this.setState({post: this.refs.post.value});
  }

  refresh(){
    this.setState({post: '', user: '', value: ''});
  }

  logout() {
   
  }

  submitTweet(event){
    var type = '/search';
    this.handleSubmit(event,type);
  }

  postTweet(event){
    var type = '/post';
    this.handleSubmit(event,type);
  }

  searchUser(event){
    var type = '/userPost';
    this.handleSubmit(event,type);
  }

  storeHistory(value, category){
    if(category === '/search'){
      if(this.state.trend.length >= 5){
        this.state.trend.shift();
      }
      this.setState({      
        trend : this.state.trend.concat(value),
      })
    }
    else if(category === '/post'){
      if(this.state.tweet.length >= 5){
        this.state.tweet.shift();
      }
      this.setState({      
        tweet : this.state.tweet.concat(value),
      })
    }
    else{
      if(this.state.query.length >= 5){
        this.state.query.shift();
      }
      this.setState({      
        query : this.state.query.concat(value),
      })
    }
  }

  handleSubmit(event,type) {
    this.setState({
      pUser: [], pScore :[], pTweet: [], nUser: [], nScore :[], 
      nTweet: [], cUser: [], cScore :[], cTweet: []
    });
    const client = new FetchHttpClient('http://localhost:3001');
        // Add access token
    client.addMiddleware(request => {
      request.options.headers['X-Access-Token'] = 'secret';
    });
    
    // Add json support
    client.addMiddleware(json());
    
    // Add Logging
    client.addMiddleware(request => response => {
      console.log(request, response);
    });
    var input = type === '/post'?  this.state.post : type === '/userPost' ? this.state.user: this.state.value;
    this.storeHistory(input, type);
    client.post(type,{
      json: {
        data: input,
      }}).then((res) => {
        this.display(res);
      });
      event.preventDefault();
  }

  display(res){
    var data= [];
    var test = [];
    data = res.jsonData;
    if(data.length < 1){
        for (var i in data){
          test = data[i].split("+");
          if(test[0]==='positive'){
            this.setState({
              pUser : this.state.pUser.concat([test[1]]),
              pTweet: this.state.pTweet.concat([test[2]]),
              pScore: this.state.pScore.concat([test[3]]),
            })
          }
          else if(test[0]==='negative'){
            this.setState({
              nUser : this.state.nUser.concat([test[1]]),
              nTweet: this.state.nTweet.concat([test[2]]),
              nScore: this.state.nScore.concat([test[3]]),
            })
          }
          else if(test[0]==='celebrity'){
            this.setState({      
              cUser : this.state.cUser.concat([test[1]]),
              cTweet: this.state.cTweet.concat([test[2]]),
              cScore: this.state.cScore.concat([test[3]]),
            })
          }
        }
        this.refresh();
      }
      else{
        this.setState({
          value: '', post: '',user: ''
        });
        alert("Your action returned no results, please try again.");
      }
  }
  render() {
    return (
      <div>
           <MuiThemeProvider>
          <div>
          <AppBar
              titleStyle={{textAlign: "center"}}
               title="Middleware Application"             
           />         
         </div>
         </MuiThemeProvider>  
         <div>
      <form onSubmit={this.submitTweet}>
        <label>
          Query: 
          <input type="text" placeholder = 'Please enter your query' value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Enter" />
      </form>
      </div>
      <div>
      <form onSubmit={this.searchUser}>
        <label>
          User:
          <input type="text" placeholder = 'Enter the user: ' value={this.state.user} onChange={this.handleUser} />
        </label>
        <input type="submit" value="Enter" />
      </form>
      </div>
      <div>
      <form onSubmit={this.postTweet}>
        <label>
          Enter Twitter Post:
          <textarea maxLength="280" type="text" ref="post" placeholder = 'Please enter your post' value={this.state.post} onChange={this.handlePost} />
        </label>
        <input type="submit" value="Post" />
       </form>
      </div>
        <div>
         <Tabs>
          <TabList>
            <Tab>Recent Trends</Tab>
            <Tab>Recent Queries</Tab>
            <Tab>Recent Trends</Tab>
          </TabList>
          <TabPanel>
                <table>                                
                  <tr>
                  <th>Recently Trends</th>
                      {this.state.trend.map((trend, index) => (
                              <td>{trend}</td>
                      ))}
                  </tr>                 
                </table>
          </TabPanel>
          <TabPanel>
          <table>
                <tr>
                  <th>Recent Queries</th>
                      {this.state.query.map((query, index) => (
                              <td>{query}</td>
                      ))}               
                  </tr>
                </table>
          </TabPanel>
          <TabPanel>
          <table>
                <tr>
                  <th>Recent Tweets</th>
                      {this.state.tweet.map((tweet, index) => (
                              <td>{tweet}</td>
                      ))}
                  </tr>
                </table>
          </TabPanel>
        </Tabs>
        
           </div>
         <div>
         <Tabs>
          <TabList>
            <Tab>Positive</Tab>
            <Tab>Negative</Tab>
            <Tab>Celebrity</Tab>
          </TabList>
          <TabPanel>
          <table>                  
                  <tr>
                  <th>User</th>
                  {this.state.pUser.map((pUser, index) => (
                          <td>{pUser}</td>
                  ))}
                  </tr>
                  <tr>
                  <th>Score</th>
                  {this.state.pScore.map((pScore, index) => (
                          <td>{pScore}</td>
                  ))}
                  </tr>
                  <tr>
                  <th>Tweet</th>
                  {this.state.pTweet.map((pTweet, index) => (
                          <td>{pTweet}</td>
                  ))}
                  </tr>                 
                </table>
          </TabPanel>
          <TabPanel>
          <table>
                <tr>
                  <th>User</th>
                      {this.state.nUser.map((nUser, index) => (
                              <td>{nUser}</td>
                      ))}               
                  </tr>
                  <tr>
                  <th>Score</th>
                      {this.state.nScore.map((nScore, index) => (
                              <td>{nScore}</td>
                      ))}
                  </tr>
                  <tr>
                  <th>Tweet</th>
                      {this.state.nTweet.map((nTweet, index) => (
                              <td>{nTweet}</td>
                      ))}
                  </tr>
                </table>
          </TabPanel>
          <TabPanel>
          <table>
                <tr>
                  <th>User</th>
                      {this.state.cUser.map((cUser, index) => (
                              <td>{cUser}</td>
                      ))}
                  </tr>
                  <tr>
                  <th>Score</th>
                      {this.state.cScore.map((cScore, index) => (
                              <td>{cScore}</td>
                      ))}
                  </tr>
                  <tr>
                  <th>Tweet</th>
                      {this.state.cTweet.map((cTweet, index) => (
                              <td>{cTweet}</td>
                      ))}
                  </tr>
                </table>
          </TabPanel>
        </Tabs>
        </div>   
      <button  style={style} onClick = {this.logout}>Logout</button>
       </div>
    );
  }
}

const style = {
  margin: 15
 };
 

export default App;
