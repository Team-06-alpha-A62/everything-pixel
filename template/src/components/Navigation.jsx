import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/register'>Get started</NavLink>
      <NavLink to='/login'>Login</NavLink>
    </nav>

  )
}

export default Navigation
