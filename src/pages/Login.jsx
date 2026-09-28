import { useState } from 'react'
import { Link } from 'react-router-dom'

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="wz-auth-page">
      <div className="wz-auth-banner">
        <span className="wz-logo wz-auth-logo">WALLZ</span>
      </div>

      <div className="wz-auth-content">
        <div className="wz-auth-form-wrap">
          <p className="wz-auth-title">Entrar</p>
          <p className="wz-auth-subtitle">Faça o login da sua conta</p>

          <form onSubmit={(e) => e.preventDefault()}>
            <label className="wz-auth-label" htmlFor="login-email">Email</label>
            <div className="wz-auth-input-group">
              <span className="wz-auth-input-icon"><i className="fa-solid fa-envelope"></i></span>
              <input
                id="login-email"
                type="email"
                className="wz-auth-input"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <label className="wz-auth-label" htmlFor="login-password">Senha</label>
            <div className="wz-auth-input-group">
              <span className="wz-auth-input-icon"><i className="fa-solid fa-lock"></i></span>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                className="wz-auth-input"
                placeholder="Digite a sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="wz-auth-input-icon wz-auth-toggle-password"
                onClick={() => setShowPassword((v) => !v)}
                aria-label="Mostrar senha"
              >
                <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>

            <p className="wz-auth-forgot">
              <a href="#">Esqueci minha senha</a>
            </p>

            <button type="submit" className="wz-auth-submit" disabled={!email || !password}>
              Entrar
              <i className="fa-solid fa-arrow-right ms-2"></i>
            </button>
          </form>

          <p className="wz-auth-register">
            Não possui uma conta? <Link to="#">Crie agora!</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
