import React, { useState, } from 'react'
import './Signup.css'
import { doCreateUserWithEmailAndPassword } from '../../firebase/Auth';
import { useNavigate } from 'react-router-dom';
function Signup() {



  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isRegistering, setIsRegistering] = useState('')
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);
    if (!isRegistering) {
      setIsRegistering(true);
      try {
        await doCreateUserWithEmailAndPassword(username, email, password);
        navigate('/');
      } catch (error) {
        setErrorMessage(error.message);
        setIsRegistering(false);
      }
    }
  }

  return (
    <div className='signup'>
      <h1>Sign up</h1>
      <div className="signup-form">
        <form onSubmit={handleSubmit}>
          <label htmlFor='username'>
            Username:
          </label>
          <br />
          <input
            type="text"
            id='username'
            autoComplete='off'
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <br />

          <label htmlFor='emailId'>
            Email Id:
          </label>
          <br />
          <input type="email"
            id='emailId'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />

          <label htmlFor='password'>
            Password:
          </label>
          <br />
          <input
            type="password"
            id='password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />

          <button disabled={!username || !password || !email ? true : false}>Sign Up</button>
        </form>
        <br />
        {errorMessage && <p className="error"><i class="fa-solid fa-circle-info"></i>{errorMessage}</p>}

        <p>
          Already registered? <span onClick={handleLogin}>Login Here</span>
        </p>
      </div>
    </div>
  )
}

export default Signup
