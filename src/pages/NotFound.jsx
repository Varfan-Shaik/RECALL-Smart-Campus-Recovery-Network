import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

function NotFound() {
  const navigate = useNavigate()

  return (
    <section className="not-found-page">
      <div className="not-found-code">404</div>

      <p className="eyebrow">RECOVERY SIGNAL LOST</p>

      <h1>Page not found.</h1>

      <p className="not-found-text">
        The requested route does not exist in the RECALL recovery network.
      </p>

      <Button onClick={() => navigate('/')}>
        Return to Home
      </Button>
    </section>
  )
}

export default NotFound