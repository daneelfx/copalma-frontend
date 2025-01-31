import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const { data } = await axios.post(
        'http://100.29.65.13:3002/api/auth/login/',
        {
          username,
          password,
        }
      )
      localStorage.setItem('token', data.token)
      navigate('/lines')
    } catch (error) {
      setErrorMessage('Credenciales inválidas. Intente nuevamente')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Usuario:</label>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <br />
        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        {username && password ? <button type="submit">Ingresar</button> : null}
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  )
}

export default LoginPage
