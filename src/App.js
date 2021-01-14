/* eslint-disable no-useless-concat */
import './App.css';
import axios from 'axios';
import { useState } from 'react';
import { Route, Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  const [username, updateUser] = useState('')
  const [password, updatePassword] = useState('')
  const [dataArray, updateData] = useState({policy_ref: '', coverType: '',
                   car: '', address: ''})

  function Login() {
    console.log(username);
    console.log(password);
  
    const urlLogin = 'https://api.bybits.co.uk/auth/token'
    const headerLogin = {'environment': 'mock', 'Content-Type': 'application/json'}
    const data = {
      "username":username,
      "password":password,
      "type":"USER_PASSWORD_AUTH"
    }
    axios.post(urlLogin, data, {headers:headerLogin})
    .then((resp) => {
      console.log(resp)
      var accessToken = resp.data.access_token
      console.log(accessToken)
  
      const auth = 'Bearer ' + accessToken
      const urlPolicy = 'https://api.bybits.co.uk/policys/details';
      const headerPolicy = {'environment': 'mock', Authorization: auth, 'Content-Type': 'application/json'}
      axios.get(urlPolicy, {headers:headerPolicy})
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
          <input type="text" onChange={e => updateUser(e.target.value)} className="form-control" id="InputUsername" placeholder="Enter Username"/>
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input type="password" onChange={e => updatePassword(e.target.value)} className="form-control" id="InputPassword" placeholder='Password'></input>
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
