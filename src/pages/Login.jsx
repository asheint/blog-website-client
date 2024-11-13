import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import {UserContext} from '../context/UserContext'
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState('')
  const navigate = useNavigate()

  const {setCurrentUser} = useContext(UserContext)

  const changeInputHandle = (e) => {
    setUserData(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value}
    })
  }

  const loginUser = async (e) => {
    e.preventDefault()
    setError('') 
    try {
      const response = await axios.post(`${BASE_URL}/users/login`, userData)
      const user = response.data
      setCurrentUser(user)
      navigate('/')
    } catch (error) {
      setError(error.response?.data?.message || "Login failed")
    }
  }

  return (
    <section className="login">
      <div className="container">
        <h2>
          Sign In
        </h2>
        <form  className="form login__form" onSubmit={loginUser}>
          {error && <p className="form__error-message">{error}</p>}
          <input type="text" placeholder="Email" name='email' value={userData.email} onChange={changeInputHandle} autoFocus />
          <input type="password" placeholder="Password" name='password' value={userData.password} onChange={changeInputHandle} />
          <button type="submit" className='btn primary'>Login</button>
        </form>
        <small>Don't have an account ? <Link to='/register'>Sign up</Link></small>
      </div>
    </section>
  )
}

export default Login