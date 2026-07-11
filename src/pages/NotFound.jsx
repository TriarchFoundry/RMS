import { Link } from 'react-router-dom'
import Button from '../components/Buttons/Button'

export default function NotFound() {
  return (
    <div className="container section" style={{ textAlign: 'center' }}>
      <p className="eyebrow">404</p>
      <h1>This room isn't listed.</h1>
      <p>The page you're looking for has moved or never existed.</p>
      <Button as={Link} to="/" variant="primary">Back to home</Button>
    </div>
  )
}
