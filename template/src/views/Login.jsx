import { Link } from "react-router-dom"

const Login = () => {
  return (
    <>
      <h1>Welcome to ∀ PXL</h1>
      <label htmlFor="username">Username</label>
      <input type="text" name="username" id="username" />
      <br />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" />
      <br />
      <br />
      <button>Login &#x2713;</button>
      <p>Don&apos;t have an account yet? <Link to='/register'>Register</Link> here</p>

    </>
  )
}

export default Login
