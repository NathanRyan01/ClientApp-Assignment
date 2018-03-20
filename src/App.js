import React, { Component } from 'react';
import {Tabs, Tab} from 'react-bootstrap-tabs';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  logout() {
    
  }

  handleSubmit(event) {
    // api 
    
    event.preventDefault();
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
            <div>
            <Tabs selected="Tab 1">
              <Tab label="Positive">
              <div>
                <table>
                    <tr>
                        <th>User</th>
                        <th>Rank</th>
                        <th>Tweet</th>
                  </tr>
                  <tr>
                        <td>Bill</td>
                        <td>1</td>
                        <td>Test 1</td>
                  </tr>
                </table>
                </div>
                </Tab>
                <Tab label="Negative">
              <div>
                <table>
                    <tr>
                        <th>User</th>
                        <th>Rank</th>
                        <th>Tweet</th>
                  </tr>
                  <tr>
                        <td>Bob</td>
                        <td>2</td>
                        <td>Test 2</td>
                  </tr>
                </table>
                </div>
                </Tab>
                <Tab label="Celebrity">
              <div>
                <table>
                    <tr>
                        <th>User</th>
                        <th>Rank</th>
                        <th>Tweet</th>
                  </tr>
                  <tr>
                        <td>Harry</td>
                        <td>3</td>
                        <td>Test 3</td>
                  </tr>
                </table>
                </div>
                </Tab>
                </Tabs>         
            </div>
            <div>
            <button onClick = {this.logout}>CLICK</button>
         </div>
       </div>
    );
  }
}

export default App;
