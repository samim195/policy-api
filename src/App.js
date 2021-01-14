/* eslint-disable no-useless-concat */
import './App.css';
import axios from 'axios';
import { useState } from 'react';
import { Route, Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  const [dataArray, updateData] = useState({policy_ref: '', coverType: '',
                   car: '', address: ''})

  function Login() {
    const username = document.getElementById('InputUsername').value
    console.log(username);
    const password = document.getElementById('InputPassword').value
    console.log(password);
  
    const url = 'https://api.bybits.co.uk/auth/token'
    const headers = {'environment': 'mock', 'Content-Type': 'application/json'}
    const data = {
      "username":"testuser",
      "password":"EbpucVzUP5cvsYha0E9i",
      "type":"USER_PASSWORD_AUTH"
    }
    axios.post(url, data, {headers:headers})
    .then((resp) => {
      console.log(resp)
      var accessToken = resp.data.access_token
      console.log(accessToken)
  
      const auth = 'Bearer ' + accessToken
      const urlTwo = 'https://api.bybits.co.uk/policys/details';
      const headerTwo = {'environment': 'mock', Authorization: auth, 'Content-Type': 'application/json'}
      axios.get(urlTwo, {headers:headerTwo})
      .then((response) => {
        console.log(response)
        const result = response.data;
        const policyRef = result.policy.policy_ref;
        const coverType = result.policy.cover;
        console.log(policyRef)
        console.log(coverType)
        const car = result.vehicle.make + ' ' + result.vehicle.model + ' ' + result.vehicle.colour + 
        ' ' + '-' + result.vehicle.reg;
        console.log(car)
        const address = result.policy.address.line_1 + ', ' + result.policy.address.line_2 + ', ' +
        result.policy.address.postcode
        console.log(address);
        // const insertHtml = "<div"
        updateData(prevInfo => ({...prevInfo, policy_ref: policyRef, coverType: coverType,
        car: car, address: address}))
      });
    });
    
  
  }

  return (
    <Router>
    <Route exact path={['/home', '/']}>
    <div className="">
      <header className="header">
      </header>
      <form className='header'>
      <h1>Sign In</h1>
        <div className='form-group'>
          <label>User Name</label>
          <input type="text" className="form-control" id="InputUsername" placeholder="Enter Username"/>
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input type="password" className="form-control" id="InputPassword" placeholder='Password'></input>
        </div>
        <div className="">
        <Link
        to={{
            pathname: "/policy",
        }}
        >
        <button type="submit" className="btn btn-primary" onClick={Login}>Sign In</button>
        </Link>
        </div>
      </form>
      </div>
      </Route>
      <Route path='/policy'>
      <div id='output' className='resultsBox'>
      <div>
        <h2>My Policy</h2>
        <div>
          <h4>Policy reference:</h4>
          <p>{dataArray.policy_ref}</p>
        </div>
        <div>
          <h4>Cover Type:</h4>
          <p>{dataArray.coverType}</p>
        </div>
        <div>
          <h4>Car:</h4>
          <p>{dataArray.car}</p>
        </div>
        <div>
          <h4>Address:</h4>
          <p>{dataArray.address}</p>
        </div>


      </div>
      </div>
    </Route>
    </Router>
  );
}

export default App;
