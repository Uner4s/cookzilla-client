import React from 'react'
import { Link } from 'react-router'

export default {
  login: 'Entrar',
  email: 'Email',
  twoFactor: 'Two factor code',
  password: 'Contraseña',
  confirmPassword: 'Confirmar contraseña',
  register: 'Registrarse',
  passwordDoesntMatch: 'Las contraseñas no coinciden',
  otherLinksInRegister: () => (
    <div>Si ya tienes cuenta <Link to="/login">entra</Link></div>
  ),
  otherLinksInLogin: () => (
    <div>
      Si no tienes cuenta
      {' '}
      <Link to="/register">registrate</Link>
      . If you forgot your password
      {' '}
      <Link to="/forgot">click here</Link>
    </div>
  )
}
