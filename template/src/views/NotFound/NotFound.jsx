import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
      <div>
        <h1>404 not found!</h1>
        <button onClick={() => navigate(-1)}>&larr; Back</button>
      </div>
  )
}

export default NotFound
