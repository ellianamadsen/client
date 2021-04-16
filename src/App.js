import React, { Component } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

import './App.css';

class App extends Component {
  state = {
    name: '',
    description: '',
  }


  handleChange = ({ target: { value, name }}) => this.setState({ [name]: value })

  createAndDownloadPdf = () => {
    axios.post('/create-pdf', this.state)
      .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
      saveAs(pdfBlob, 'WO.pdf');
      })
  }

  render() {
    return (
      <div className="App">
        <div className="main">
        <p className="sign" align="center">Make A New Work Order</p>
        <textarea className="un " type="text" placeholder="Work Order Information" name="wo" id="wo" onChange={this.handleChange}/>
        <textarea className="pass" type="text" placeholder="Description" name="description" onChange={this.handleChange}/>
        <button className="submit" onClick={this.createAndDownloadPdf}>Download PDF</button>
         

       </div>
      </div>
    );
  }
}

export default App;
