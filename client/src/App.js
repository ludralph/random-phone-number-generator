import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      value: '',
      message: '',
      fileId: '',
      error: '',
      phoneNumbers: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.viewPhoneNumbers = this.viewPhoneNumbers.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    })
  }

  handleSubmit = (event) => {
    const totalNumber = Number(this.state.value)
    if (Number.isInteger(totalNumber)){
      axios.post('http://localhost:3000/phone-numbers', {
        totalNumber
      })
      .then( (response) => {
        this.setState({
          message: response.data.message,
          fileId: response.data.id
        })
      })
      .catch((error) => {
        console.log('>>>>>', error);
        this.setState({
          error: error
        })
      });
    }else{
      this.setState({
        error: 'Number must be an integer'
      })
    }
    event.preventDefault();
  }

  viewPhoneNumbers = (event) => {
    if(this.state.fileId){
      axios.get(`http://localhost:3000/phone-numbers/${this.state.fileId}`,)
      .then(response => {
        const phoneNumberString = response.data
        console.log(`phone=> `, phoneNumberString.split(' '))
        
      })
      .catch(error => {
        console.log(error)
      })
    }
    else{
      console.log('FileId is null')
    }
    event.preventDefault()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary text-white mb-5">
            Random Phone Number Generator
          </nav>
        </header>
        { 
          this.state.message ? 
          <div className="alert alert-success" role="alert">{this.state.message}</div> 
          : 
          ''
        }
        <div className="card container mt-5 mb-5">
        
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="total">Enter Total Numbers to be Generated:</label>
                <input type="text" value={this.state.value} onChange={this.handleChange} />
              </div>
              <button type="button" className="btn btn-primary mr-4" onClick= {this.handleSubmit}>Generate File</button>
              <button type="button" className="btn btn-primary" onClick= {this.viewPhoneNumbers}>View Numbers</button>
            </form>
          </div>
        </div>
        
        <ul className="list-group">
          <li className="list-group-item"></li>
        </ul>
      </div>
    );
  }
}

export default App;
